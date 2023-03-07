<template>
  <div v-if="item" class="align-center white-bg shop">
    <div class="rating">
      <div class="d-flex align-center">
        <div class="d-flex align-center">
          <nuxt-link
            :to="`/Products?provider[]=${item.provider.id}`"
            class="orange-color pointer h2"
          >
            {{ item.provider.individual_name || "Имя поставщика" }}
          </nuxt-link>
          <div v-if="parseInt(item.discount) > 0" class="discount">
            -{{ item.discount }}%
          </div>
        </div>

        <div
          v-if="
            $auth.loggedIn && !$isProvider() && !$isAdmin() && !$isCallCenter()
          "
          @click="liked"
          class="heart ml-3"
          :class="{ 'heart-active': isLike }"
        ></div>
      </div>

      <div
        class="product-rating d-flex align-center pointer"
        @click="goToProviderRating"
      >
        <v-rating
          class="mr-2"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          half-increments
          length="5"
          readonly
          size="20"
          color="#DF4041"
          :value="parseInt(item.provider_rating)"
        >
        </v-rating>
        <p class="grey-color">{{ item.provider_rating }}</p>
      </div>
    </div>

    <div class="">
      <p class="grey-color">
        Оплата:
        <span>
          {{ paymentMethods(item.provider.payment_methods) }}
        </span>
      </p>
      <p class="grey-color mob mt-3">
        Мин заказ: <span>{{ item.min_count }}</span>
      </p>
    </div>
    <h3 class="fw600 d-flex align-center">
      <span v-if="item.discount_price != item.price">
        {{ $price(item.price) }}
      </span>
      {{ $price(item.discount_price) }}

      <button
        @click="toCart()"
        v-if="!isCounter"
        class="ml-auto mob-tocard mob fw600 h3"
      >
        Выбрать
      </button>
    </h3>

    <div class="tocart">
      <button @click="toCart()" v-if="!isCounter" class="ml-auto btn fw600 h3">
        В корзину {{ item.min_count || 1 }} шт
      </button>

      <div v-else class="adding d-flex align-center justify-space-between">
        <div class="counter d-flex align-center">
          <img
            @click="removeItem(item.min_count)"
            class="mr-3"
            src="@/assets/image/icons/minus.svg"
            alt=""
          />
          <v-text-field
            v-model="count"
            solo
            hide-details
            class="my-count h3 d-flex align-center justify-center"
            @input="setCount"
            type="number"
          >
          </v-text-field>
          <img
            @click="addItem()"
            class="ml-3"
            src="@/assets/image/icons/plus.svg"
            alt=""
          />
        </div>
        <h3 class="fw600 ml-2">
          {{ $price(item.price) }}
        </h3>
        <nuxt-link
          v-if="!$isProvider() && !$isAdmin() && !$isCallCenter()"
          to="/Basket"
          style="text-decoration: none"
          class="btn fw600 h3"
        >
          В корзину
        </nuxt-link>
        <div v-else class="ml-auto"></div>
      </div>
    </div>
    <!-- <div v-if="parseInt(item.discount) > 0" class="discount desk">
      -{{ item.discount }}
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    timer: null,
    isCounter: false,
    count: 0,
    favorites: [],
    isLike: false
  }),
  props: { item: Object },
  watch: {
    "$auth.loggedIn"() {
      this.checkLogedInBasket();
      this.initializeFavorites();
    }
  },
  created() {
    this.checkLogedInBasket();
    this.initializeFavorites();
  },
  methods: {
    async liked() {
      if (this.$auth.loggedIn) {
        let liked_arr = this.$store.state.liked_providers;
        if (liked_arr.includes(this.item.provider.id)) {
          this.$store.commit("removeFromLikedProviders", this.item.provider.id);
          this.isLike = false;
        } else {
          this.$store.commit("addToLikedProviders", this.item.provider.id);
          this.isLike = true;
        }

        let body = {
          favorite_providers: liked_arr
        };
        await this.$axios
          .patch(`auth/users/me/`, body)
          .then(res => {
            this.$store.dispatch("fetchFavoriteProviders");
            this.initializeFavorites();
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else this.isLike = !this.isLike;
    },
    checkIsLiked() {
      let find = favorite => {
        return favorite == this.item.provider.id;
      };
      if (this.favorites.find(find)) this.isLike = true;
      else this.isLike = false;
    },
    initializeFavorites() {
      let results = this.$store.state.liked_providers;
      this.favorites = [...results];
      this.checkIsLiked();
    },
    goToProviderRating() {
      if (this.item.rating)
        this.$router.push(`/ProviderRating/${this.item.provider.id}`);
    },
    paymentMethods(items) {
      let payment = {
        1: "Наличными",
        2: "Банковская карта",
        3: "Кредит в банке",
        4: "Расрочка у поставщика"
      };
      let result = "";

      items.map((item, index) => {
        result += payment[item];
        if (index !== items.length - 1) result += ", ";
      });
      if (items.length == 0) result = "";

      return result;
    },
    setCount() {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    async updateOrderItem() {
      let body = {
        amount: this.count,
        session_key: localStorage.session_key
      };
      let params = {
        user_type: this.$store.state.client_type
      };
      let basketItem = this.findItemFromBasket();
      await this.$axios
        .$patch(`order-items/${basketItem.id}/`, body, { params })
        .then(res => {
          this.$store.dispatch("fetchBasket");
        })
        .catch(err => {
          console.log(err);
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async toCart() {
      if (this.$isAdmin() || this.$isProvider()) {
        this.$notifier.showMessage({
          color: "warning",
          text: "Вы не можете покупать товар"
        });
        return;
      }
      this.count = this.item.min_count || 1;
      this.isCounter = true;

      let body = {
        provider_product: this.item.id,
        amount: this.item.min_count || 1,
        session_key: localStorage.session_key,
        user_type: this.$store.state.client_type
      };

      let basketItem = this.findItemFromBasket();
      if (!basketItem) {
        this.$axios
          .$post(`order-items/`, body)
          .then(res => {
            this.$store.dispatch("fetchBasket");
          })
          .catch(err => {
            console.log(err);
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else {
        this.updateOrderItem();
      }
    },
    checkLogedInBasket() {
      let basketItem = this.findItemFromBasket();
      if (basketItem) {
        this.isCounter = true;
        this.count = basketItem.amount;
      } else {
        this.isCounter = false;
        this.count = 0;
      }
    },
    findItemFromBasket() {
      let find = basketitem => {
        return basketitem.provider_product.id == this.item.id;
      };
      if (this.$store.state.basket.find(find))
        return this.$store.state.basket.find(find);
      else false;
    },
    async deleteItem() {
      let basketItem = this.findItemFromBasket();
      let params = {
        session_key: localStorage.session_key,
        user_type: this.$store.state.client_type
      };
      await this.$axios
        .$delete(`order-items/${basketItem.id}/`, { params })
        .then(res => {
          this.$store.dispatch("fetchBasket");
          this.$emit("fetchOrders");
          this.count = 0;
          this.isCounter = false;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    addItem() {
      clearTimeout(this.timer);
      this.count++;
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    removeItem() {
      if (this.count == 0 || this.count == this.item.min_count) {
        this.deleteItem();
        this.isCounter = false;
        return;
      }
      clearTimeout(this.timer);
      this.count--;
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.shop {
  position: relative;
  display: grid;
  grid-template-columns: 23% 26% 9% 39%;
  grid-gap: 10px;
  padding: 22px 60px;
  border-bottom: 1px solid #e4e4e4;
}
.discount {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 10px;
  height: 27px;
  transform: translateY(0);
  background: #ff7a29;
  border-radius: 5px 0;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    position: static;
    margin-left: 12px;
    padding: 0 4px;
    height: 20px;
    border-radius: 5px 0;
  }
}
.tocart {
  .btn {
    width: 100%;
    max-width: 240px;
    height: 50px;
    border: 1px solid $green-color;
    box-sizing: border-box;
    border-radius: 5px;
    color: $green-color;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.22s;
    &:hover {
      color: white;
      background: $green-color;
    }

    @media (max-width: 600px) {
      display: none;
    }
  }
}
.mob-tocard {
  padding: 0 12px;
  height: 32px;
  background: #52b059;
  border-radius: 3px;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
}
.adding {
  .btn {
    max-width: 150px;
    border-color: $orange-color;
    color: $orange-color;

    &:hover {
      color: #fff; //
      background: $orange-color;
    }
  }
}
img {
  cursor: pointer;
}
.counter {
  width: 142px;
  height: 40px;

  .count {
    width: 50px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    border-radius: 3px;
    color: asdf;
  }
}

.heart {
  width: 20px;
  height: 20px;
  background: url("@/assets/image/icons/heart.svg") no-repeat center center;
  cursor: pointer;
  &-line {
    top: 16px;
    right: 15px;
  }
  &-active {
    background: url("@/assets/image/icons/heart-red.svg") no-repeat center
      center;
  }
}
@media screen and (max-width: 780px) {
  .shop {
    grid-template-columns: 1fr;
    padding: 10px 18px !important;

    .rating {
      display: flex;
      justify-content: space-between;

      .product-rating p {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .tocart {
    .btn {
      height: none;
      padding: 13px 42px;
      margin: 0 auto;
    }
  }
}
</style>
