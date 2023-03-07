<template>
  <div
    v-if="item"
    class="catalog-item d-flex"
    :class="[
      active_view == 'line'
        ? 'catalog-item-line flex-row align-center'
        : 'flex-column'
    ]"
  >
    <div class="namename">
      <nuxt-link class="text-decoration-none" :to="`/Products/${item.id}`">
        <div class="avatar">
          <img
            :src="
              item.images && item.images[0]
                ? item.images[0].image
                : require('@/assets/image/photos/default.svg')
            "
            alt=""
            class=""
          />
        </div>
        <h3
          class="fw600 name mt-4 mb-3"
          :class="[active_view == 'line' ? 'd-none' : '']"
        >
          {{ item.name }}
        </h3>
      </nuxt-link>
    </div>
    <div
      class=""
      :class="[active_view == 'line' ? 'content-line ml-5' : 'content']"
    >
      <h3
        class="fw600 name mt-4 mb-3"
        :class="[active_view == 'line' ? '' : 'd-none']"
      >
        {{ item.name }}
      </h3>
      <div class="product-rating d-flex align-center">
        <v-rating
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          half-increments
          length="5"
          readonly
          size="12"
          color="#DF4041"
          :value="parseInt(item.rating)"
        >
        </v-rating>
        <p class="ml-1 grey-color">{{ item.rating }}</p>
      </div>
      <p class="grey-color mt-1">{{ providerCount(item.provider_count) }}</p>
      <div v-if="item.price" class="">
        <p class="grey-color mt-2">
          от <span class="h2">{{ $price(item.price) }} </span>/шт
        </p>
        <div class="d-flex align-center justify-space-between mt-3 tocart">
          <button class="cart-btn mr-3" v-if="!isCounter" @click="toCart">
            В корзину
          </button>
          <p v-if="!isCounter" class="grey-color">
            по {{ item.count ? item.count : 1 }} шт
          </p>

          <div v-else class="d-flex align-center justify-space-between w100">
            <div class="counter d-flex align-center">
              <img
                @click="removeItem(item.count)"
                class="mr-0 mr-sm-3"
                src="@/assets/image/icons/minus.svg"
                alt=""
              />
              <v-text-field
                v-model="count"
                solo
                hide-details
                class="my-count h3 d-flex align-center justify-center"
                type="number"
                @input="setCount"
              >
              </v-text-field>
              <img
                @click="addItem"
                class="ml-0 ml-sm-3"
                src="@/assets/image/icons/plus.svg"
                alt=""
              />
            </div>
            <img
              @click="deleteItem"
              src="@/assets/image/icons/delete.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-else class="">
        <h3 class="mt-2 no-product">Товара нет в наличии</h3>
      </div>
    </div>

    <div
      v-if="$auth.loggedIn && !$isProvider() && !$isAdmin() && !$isCallCenter()"
      @click="liked"
      class="heart"
      :class="{ 'heart-active': isLike, 'heart-line': active_view == 'line' }"
    ></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    count: 0,
    isCounter: false,
    timer: null,
    favorites: [],
    isLike: false
  }),
  props: {
    item: Object,
    active_view: { type: String, default: "block" }
  },
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
    providerCount(count) {
      let result = count + "";
      let mod = +count % 10;

      if (mod == 1) result += " поставщик";
      else if (
        count == 11 ||
        (mod == 5 && mod == 6 && mod == 7 && mod == 8 && mod == 9 && mod == 0)
      ) {
        result += " поставщиков";
      } else result += " поставщика";
      return result;
    },
    checkIsLiked() {
      let find = favorite => {
        return favorite == this.item.id;
      };
      if (this.favorites.find(find)) this.isLike = true;
      else this.isLike = false;
    },
    initializeFavorites() {
      let results = this.$store.state.liked;
      this.favorites = [...results];
      this.checkIsLiked();
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
    setCount() {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    addItem(min_count) {
      clearTimeout(this.timer);

      this.count++;
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    removeItem(count) {
      if (this.count == 1 || this.count == count) {
        this.deleteItem();
        return;
      }
      clearTimeout(this.timer);
      this.count--;
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
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
    async liked() {
      if (this.$auth.loggedIn) {
        let liked_arr = this.$store.state.liked;
        if (liked_arr.includes(this.item.id)) {
          this.$store.commit("removeFromLiked", this.item.id);
          this.isLike = false;
        } else {
          this.$store.commit("addToLiked", this.item.id);
          this.isLike = true;
        }

        let body = {
          favorite_products: liked_arr
        };
        await this.$axios
          .patch(`auth/users/me/`, body)
          .then(res => {
            this.$store.dispatch("fetchFavoriteProducts");
            this.initializeFavorites();
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else this.isLike = !this.isLike;
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
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    findItemFromBasket() {
      let find = basketitem => {
        return basketitem.provider_product.id == this.item.provider_product_id;
      };
      if (this.$store.state.basket.find(find))
        return this.$store.state.basket.find(find);
      else false;
    },
    async toCart() {
      if (this.$isAdmin() || this.$isProvider()) {
        this.$notifier.showMessage({
          color: "warning",
          text: "Вы не можете покупать товар"
        });
        return;
      }
      this.count = this.item.count || 1;
      this.isCounter = true;

      // session key
      if (!localStorage.session_key) localStorage.setItem("session_key", "");
      // session key

      let body = {
        provider_product: this.item.provider_product_id,
        amount: this.item.count,
        session_key: localStorage.session_key,
        user_type: this.$store.state.client_type
      };
      let basketItem = this.findItemFromBasket();

      if (!basketItem) {
        this.$axios
          .$post(`order-items/`, body)
          .then(res => {
            localStorage.setItem("session_key", res.session_key);
            this.$store.dispatch("fetchBasket");
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else {
        this.updateOrderItem();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.catalog-item {
  position: relative;
  width: 100%;
  min-height: 390px;
  padding: 16px 12px;

  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 5px;

  &-line {
    min-height: 125px;
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
}
.no-product {
  min-height: 78px;
}
.avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
.grey-color {
  color: #7b8794;
}
.name {
  &:hover {
    color: $orange-color;
  }
}
.heart {
  position: absolute;
  top: 9px;
  right: 12px;
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
.product-rating {
  p {
    font-style: 12px;
    line-height: 18px;
  }
}
button {
  width: 140px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #52b059;
  border-radius: 3px;
  color: white;
}
.counter {
  width: 128px;
  height: 40px;

  .count {
    width: 50px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    border-radius: 3px;
    color: #252626;
  }
}
.tocart {
  img {
    cursor: pointer;
  }
}
.cart-btn {
  max-width: 125px;
}
.content {
  margin-top: auto;
}
.content-line {
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .catalog-item {
    min-height: auto;

    max-width: 100%;
    width: 100%;
    .name {
      font-size: 13px;
      line-height: 16px;
    }
  }
  .cart-btn {
    width: 112px;
  }
  .counter {
    width: 100%;
    max-width: 128px;
    img {
      width: 24px;
    }
  }
}
@media only screen and (max-width: 400px) {
  .catalog-item {
    max-width: 169px;
    &-line {
      max-width: unset;
    }
  }
}
@media only screen and (max-width: 360px) {
  .catalog-item {
    max-width: 162px;
    &-line {
      max-width: unset;
    }
  }
}
@media only screen and (max-width: 348px) {
  .catalog-item {
    max-width: 148px;
    &-line {
      max-width: unset;
    }
  }
}
</style>
