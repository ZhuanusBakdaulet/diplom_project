<template>
  <div>
    <div v-if="item" class="desktop_box">
      <div class="image">
        <img
          v-if="item.images && item.images[0]"
          :src="item.images[0].image"
          alt=""
        />
        <img v-else src="@/assets/image/photos/default.svg" alt="" />
      </div>
      <div class="">
        <nuxt-link :to="`/Products?category[]=${item.id}`">
          <h3 class="fw600">{{ item.name }}</h3>
        </nuxt-link>
        <p class="s mt-2 grey-color my-clamp">{{ item.description }}</p>
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
        <p v-if="isActive" class="s mt-2 grey-color">
          {{ `${item.provider_count} поставщик (-ов)` }}
        </p>
        <h3 v-if="isActive" class="s mt-2">
          {{ $price(item.price) }}
        </h3>
        <h3 v-else class="s mt-2">Товара нет в наличии</h3>
      </div>

      <div v-if="isActive" class="d-flex align-end relative">
        <div @click="unlike" class="like pointer">
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.048 1.07649C10.4268 0.382319 9.57449 0 8.6478 0C7.95511 0 7.32074 0.225637 6.76227 0.670591C6.48047 0.895191 6.22513 1.16997 6 1.4907C5.77496 1.17007 5.51953 0.895191 5.23764 0.670591C4.67926 0.225637 4.04489 0 3.3522 0C2.42551 0 1.57306 0.382319 0.951874 1.07649C0.338104 1.76255 0 2.69982 0 3.71575C0 4.7614 0.378204 5.71856 1.19019 6.72808C1.91656 7.6311 2.96054 8.5478 4.16949 9.60929C4.58231 9.9718 5.05023 10.3827 5.5361 10.8204C5.66446 10.9362 5.82916 11 6 11C6.17075 11 6.33554 10.9362 6.46371 10.8206C6.94958 10.3828 7.41779 9.97171 7.83078 9.60901C9.03955 8.54771 10.0835 7.6311 10.8099 6.72799C11.6219 5.71856 12 4.7614 12 3.71566C12 2.69982 11.6619 1.76255 11.048 1.07649Z"
              fill="#FF7A29"
            />
          </svg>
        </div>
        <button v-if="!isCounter" @click="toCart" class="green-btn">
          В корзину
        </button>
        <div
          v-else
          class="d-flex align-center justify-space-between w100 cart-controls"
        >
          <div class="counter d-flex align-center">
            <img
              @click="removeItem(item.provider_count)"
              class="mr-3 pointer"
              src="@/assets/image/icons/minus.svg"
              alt="minus"
            />
            <v-text-field
              v-model="count"
              solo
              hide-details
              class="my-count h3 d-flex align-center justify-center"
              @input="editItem"
              type="number"
            >
            </v-text-field>
            <img
              @click="addItem"
              class="ml-3 pointer"
              src="@/assets/image/icons/plus.svg"
              alt="plus"
            />
          </div>
          <img
            class="pointer"
            @click="deleteItem"
            src="@/assets/image/icons/delete.svg"
            alt="delete"
          />
        </div>
      </div>
    </div>
    <div class="mobile_box relative">
      <div @click="unlike" class="like pointer">
        <svg
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.048 1.07649C10.4268 0.382319 9.57449 0 8.6478 0C7.95511 0 7.32074 0.225637 6.76227 0.670591C6.48047 0.895191 6.22513 1.16997 6 1.4907C5.77496 1.17007 5.51953 0.895191 5.23764 0.670591C4.67926 0.225637 4.04489 0 3.3522 0C2.42551 0 1.57306 0.382319 0.951874 1.07649C0.338104 1.76255 0 2.69982 0 3.71575C0 4.7614 0.378204 5.71856 1.19019 6.72808C1.91656 7.6311 2.96054 8.5478 4.16949 9.60929C4.58231 9.9718 5.05023 10.3827 5.5361 10.8204C5.66446 10.9362 5.82916 11 6 11C6.17075 11 6.33554 10.9362 6.46371 10.8206C6.94958 10.3828 7.41779 9.97171 7.83078 9.60901C9.03955 8.54771 10.0835 7.6311 10.8099 6.72799C11.6219 5.71856 12 4.7614 12 3.71566C12 2.69982 11.6619 1.76255 11.048 1.07649Z"
            fill="#FF7A29"
          />
        </svg>
      </div>
      <div class="left_side">
        <div class="image">
          <img
            v-if="item.images && item.images[0]"
            :src="item.images[0].image"
            alt=""
          />
          <img v-else src="@/assets/image/photos/default.svg" alt="" />
        </div>
      </div>
      <div class="right_side">
        <div class="product_name">
          <h3 class="fw600">{{ item.name }}</h3>
          <p class="s mt-2 grey-color my-clamp">{{ item.description }}</p>
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
        </div>
        <div class="count">
          <div class="ratings">
            <p v-if="isActive" class="s mt-2 grey-color">
              {{ `${item.provider_count} поставщик (-ов)` }}
            </p>
            <h3 v-if="isActive" class="s mt-2">
              {{ $price(item.price) }}
            </h3>
            <h3 v-else class="s mt-2">Товара нет в наличии</h3>
          </div>
          <div v-if="isActive" class="d-flex align-end relative">
            <button v-if="!isCounter" @click="toCart" class="green-btn">
              В корзину
            </button>
            <div
              v-else
              class="
                d-flex
                align-center
                justify-space-between
                w100
                cart-controls
              "
            >
              <div class="counter d-flex align-center">
                <img
                  @click="removeItem(item.provider_count)"
                  class="mr-3 pointer"
                  src="@/assets/image/icons/minus.svg"
                  alt="minus"
                />
                <v-text-field
                  v-model="count"
                  solo
                  hide-details
                  class="my-count h3 d-flex align-center justify-center"
                  @input="editItem"
                  type="number"
                >
                </v-text-field>
                <img
                  @click="addItem"
                  class="ml-3 pointer"
                  src="@/assets/image/icons/plus.svg"
                  alt="plus"
                />
              </div>
              <img
                class="pointer"
                @click="deleteItem"
                src="@/assets/image/icons/delete.svg"
                alt="delete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isCounter: false,
    count: 0,
    timer: null
  }),
  props: { item: Object },
  created() {
    this.checkLogedInBasket();
  },

  computed: {
    isActive() {
      if (!this.item.provider_product_id) return false;
      return true;
    }
  },
  methods: {
    editItem() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    addItem() {
      clearTimeout(this.timer);
      this.count++;
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    removeItem(provider_count) {
      if (this.count == 0 || this.count == provider_count) {
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
          this.$emit("fetchFavorites");
          this.count = 0;
          this.isCounter = false;
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
    async toCart() {
      if (this.$isAdmin() || this.$isProvider()) {
        this.$notifier.showMessage({
          color: "warning",
          text: "Вы не можете покупать товар"
        });
        return;
      }
      this.count = this.item.provider_count;
      this.isCounter = true;

      // session key
      if (!localStorage.session_key) localStorage.setItem("session_key", "");
      // session key

      let body = {
        provider_product: this.item.provider_product_id,
        amount: this.item.provider_count,
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
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else {
        this.updateOrderItem();
      }
    },
    checkLogedInBasket() {
      this.$store.dispatch("fetchBasket");
      let basketItem = this.findItemFromBasket();
      if (basketItem) {
        this.isCounter = true;
        this.count = basketItem.amount;
      } else {
        this.isCounter = false;
        this.count = 0;
      }
    },
    async unlike() {
      await this.$store.dispatch("fetchFavoriteProducts");

      let findLiked = product => {
        return product === this.item.id;
      };

      let favorites = [...this.$store.state.liked];
      let index = favorites.indexOf(this.item.id);
      if (index > -1) favorites.splice(index, 1);

      this.$axios
        .$patch(`auth/users/me/`, { favorite_products: favorites })
        .then(() => {
          this.$emit("fetchFavorites");
          this.$store.dispatch("fetchFavoriteProducts");
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.desktop_box {
  width: 100%;
  padding: 17px 24px;
  background: #ffffff;

  display: grid;
  grid-template-columns: 110px 1fr 180px;

  .image {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
  }
  .product-rating {
    p {
      font-style: 12px;
      line-height: 18px;
    }
  }

  .green-btn {
    max-width: 112px;
    height: 32px;
    margin-top: 8px;
  }
  .like {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.mobile_box {
  display: none;
}
@media screen and (max-width: 600px) {
  .desktop_box {
    display: none;
  }
  .mobile_box {
    .green-btn {
      max-width: 100%;
      width: 100%;
      height: auto;
      padding: 9px 24px;
    }
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .like {
      position: absolute;
      top: 0;
      right: 0;
    }
    .image {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      img {
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
    }
    .right_side {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .product-rating {
        p {
          font-style: 12px;
          line-height: 18px;
        }
      }
      .product_name h3 {
        font-size: 14px !important;
        line-height: 16px;
      }
      .count {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // flex-wrap: wrap;

        .ratings {
          display: flex;
          justify-content: space-between;
          align-items: center;

          max-width: 100%;
          width: 100%;

          h3 {
            font-size: 16px !important;
            line-height: 21px;
          }
          p {
            font-size: 10px !important;
            line-height: 13px;
          }
        }
        .pointer {
          display: none;
        }
        .counter {
          justify-content: space-between;

          max-width: 100%;
          width: 100%;
          height: 30px;
          .v-input__slot {
            border: none !important;
            margin: 0 auto;
          }
          img {
            display: block;

            border: 1px solid #dcdcdc;
            border-radius: 5px;
            width: 34px;
            height: 34px;
          }
        }
        .relative {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
