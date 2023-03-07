<template>
  <div>
    <div class="desktop_orderitem ">
      <div
        v-if="item && providerProduct && product"
        class="products align-center"
      >
        <div class="ml-auto mr-1 err-info">
          <v-icon
            v-if="!checkStatus.result"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            color="error"
          >
            mdi-alert-circle-outline
          </v-icon>
          <div v-if="hover" class="tooltip">
            {{ checkStatus.message }}
          </div>
        </div>
        <div class="image d-flex align-center justify-center mr-2">
          <img v-if="product.images[0]" :src="product.images[0].image" alt="" />
          <img v-else src="@/assets/image/photos/default.svg" alt="" />
        </div>
        <div v-if="product" class="name mr-2">
          <div class="">
            <nuxt-link :to="`/Products/${product.id}`">
              <p class="ps">{{ product.name }}</p>
            </nuxt-link>

            <div class="d-none d-sm-block">
              <p class=" my-clamp">{{ product.description }}</p>
            </div>
          </div>
          <div
            class="counter d-flex d-sm-none align-center justify-space-between mr-2 mt-3"
          >
            <div class="d-flex justify-space-between">
              <img
                @click="removeItem()"
                src="@/assets/image/icons/minus.svg"
                alt=""
                class=""
              />
              <v-text-field
                v-model="amount"
                @input="setItem"
                class="my-count d-flex align-center justify-center"
                hide-details
                solo
                type="number"
              >
              </v-text-field>

              <img
                @click="addItem()"
                src="@/assets/image/icons/plus.svg"
                alt=""
                class=""
              />
            </div>
            <img
              @click="deleteItem()"
              src="@/assets/image/icons/delete.svg"
              alt=""
              class=""
            />
          </div>
        </div>
        <div
          class="counter d-none d-sm-flex align-center justify-space-between mr-2"
        >
          <h3 class="discount-price">
            <span v-if="providerProduct.discount > 0">
              {{ $price(providerProduct.price) }}
            </span>
            {{ $price(calculateProductDiscount(providerProduct)) }}
          </h3>
          <div class="d-flex justify-space-between">
            <img
              @click="removeItem()"
              src="@/assets/image/icons/minus.svg"
              alt=""
            />
            <v-text-field
              v-model="amount"
              @input="setItem"
              class="my-count mx-1 d-flex align-center justify-center"
              hide-details
              solo
              type="number"
            >
            </v-text-field>

            <img
              @click="addItem()"
              src="@/assets/image/icons/plus.svg"
              alt=""
            />
          </div>
        </div>
        <div class="total d-flex flex-column align-center justify-center mr-2">
          <h3
            v-if="providerProduct.discount > 0"
            class="discount-price mb-2 d-sm-none"
          >
            <span>
              {{ $price(providerProduct.price) }}
            </span>
            {{ $price(calculateProductDiscount(providerProduct)) }}
          </h3>
          <h3 class="fw600">
            {{ $price(calculateTotal(providerProduct)) }}
          </h3>
        </div>
        <div
          @click="deleteItem()"
          class="delete d-none d-sm-flex align-center justify-center"
        >
          <img src="@/assets/image/icons/delete.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    hover: false,
    amount: 0,
    timer: null
  }),
  props: { item: Object },
  computed: {
    providerProduct() {
      if (this.item?.provider_product) return this.item.provider_product;
      return false;
    },
    product() {
      if (this.item?.provider_product?.product)
        return this.item.provider_product.product;
      return false;
    },
    purchase() {
      if (this.providerProduct) return this.providerProduct.purchase;
      return "C";
    },
    checkStatus() {
      let result, message;
      if (this.purchase == "C") {
        if (this.amount >= this.providerProduct.min_count) result = true;
        else {
          result = false;
          message = `Вам нужно купить еще ${this.providerProduct.min_count -
            this.amount} шт.`;
        }
      } else if (this.purchase == "M") {
        if (
          this.amount *
            (this.providerProduct.price -
              (this.providerProduct.price * this.providerProduct.discount) /
                100) >=
          this.providerProduct.min_price
        )
          result = true;
        else {
          result = false;
          message = `Вам нужно докупить на сумму ${this.providerProduct
            .min_price -
            (this.amount *
              (this.providerProduct.price * this.providerProduct.discount)) /
              100} тг.`;
        }
      } else result = false;
      return { result, message };
    }
  },
  created() {
    this.amount = this.item.amount;
  },
  methods: {
    purchaseValue() {
      let result;
      if (this.purchase == "C" && this.providerProduct.min_count)
        result = parseInt(this.providerProduct.min_count);
      else if (this.purchase == "M" && this.providerProduct.min_price)
        result = parseInt(this.providerProduct.min_price);
      else result = 1;
      return result;
    },
    calculateProductDiscount(provider_product) {
      let discount = parseInt(provider_product.discount);
      let price = parseInt(provider_product.price);
      if (discount > 0) return price - (price * discount) / 100;
      return price;
    },
    calculateTotal(provider_product) {
      let discount = parseInt(provider_product.discount);
      if (discount > 0)
        return this.calculateProductDiscount(provider_product) * this.amount;
      return this.calculateProductDiscount(provider_product) * this.amount;
    },
    reloadOrders() {
      this.$store.dispatch("fetchBasket");
      this.$emit("fetchOrders");
    },
    async updateOrderItem() {
      let body = {
        amount: this.amount,
        session_key: localStorage.session_key
      };
      let params = {
        user_type: this.$store.state.client_type
      };

      await this.$axios
        .$patch(`order-items/${this.item.id}/`, body, { params })
        .then(res => {
          this.reloadOrders();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async deleteItem() {
      let params = {
        session_key: localStorage.session_key,
        user_type: this.$store.state.client_type
      };

      await this.$axios
        .$delete(`order-items/${this.item.id}/`, { params })
        .then(res => {
          this.reloadOrders();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    setItem() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    addItem() {
      clearTimeout(this.timer);
      this.amount++;
      this.timer = setTimeout(() => {
        this.updateOrderItem();
      }, 1000);
    },
    removeItem() {
      if (this.purchase == "M") {
        if ((this.amount - 1) * this.item.price < this.purchaseValue()) return;
        clearTimeout(this.timer);
        this.amount--;
        this.timer = setTimeout(() => {
          this.updateOrderItem();
        }, 1000);
      } else {
        if (this.amount - 1 < this.purchaseValue()) return;
        clearTimeout(this.timer);
        this.amount--;
        this.timer = setTimeout(() => {
          this.updateOrderItem();
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  display: grid;
  padding: 16px 0;
  grid-template-columns: 30px 15% 1fr 30% 16% 9%;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 2;
  &-err-grid {
    grid-template-columns: 30px 15% 1fr 30% 16% 9%;
  }
  &:last-child {
    border: none;
  }
}
.image {
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;
  img {
    max-width: 80%;
    max-height: 100%;
    margin: auto;
  }
}
.counter {
  .count {
    min-width: 50px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    border-radius: 3px;
  }
  img {
    cursor: pointer;
  }
}
.delete {
  img {
    cursor: pointer;
  }
}
.err-info {
  position: relative;
}
.tooltip {
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  padding: 6px 8px;
  background: rgba(138, 149, 158, 1);
  border-radius: 5px;
  transform: translate(-50%, 40px);
  margin-left: 12px;
  border-color: rgba(138, 149, 158, 0.1);
  box-shadow: 0px 3px 15px rgba(138, 149, 158, 0.1);
  z-index: 1000;
  cursor: pointer;

  &:after {
    content: " ";
    position: absolute;
    bottom: 100%; /* At the top of the tooltip */
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent rgba(138, 149, 158, 1) transparent;
  }
}
.discount-price {
  span {
    width: 100px;
  }
}
@media screen and (max-width: 600px) {
  .products {
    grid-template-columns: 90px 1fr 100px;
    position: relative;
  }
  .err-info {
    right: 10px;
    top: 5px;

    position: absolute;
  }
  .tooltip {
    left: 100%;
    transform: translate(-100%, 40px);
    margin-left: 8px;
    &:after {
      left: 100%;
      margin-left: -30px;
    }
  }
  .counter {
    width: 100%;
    max-width: 150px;
    img {
      width: 24px;
    }
  }
  .name {
    .ps {
      font-weight: normal;
      font-size: 13px;
      line-height: 16px;
    }
  }

  // .mobile_orderitem {
  //   flex-direction: row;
  //   align-items: center;
  //   border-bottom: 1px solid rgba(228, 228, 228, 1);
  //   padding: 16px 15px;
  //   .image {
  //     display: flex !important;
  //     justify-content: flex-start !important;

  //     width: 90px !important;
  //     height: 90px;

  //     margin: 0 10px 0 0 !important;

  //     img {
  //       width: 90px;
  //       max-width: 90px;
  //       height: 90px;
  //       margin: 0 !important;
  //     }
  //   }
  //   .order_desription {
  //     margin-bottom: auto;
  //     width: 100%;
  //     .ps {
  //       font-size: 13px !important;
  //       line-height: 16px;
  //     }
  //     .my-clamp {
  //       font-size: 12px !important;
  //       line-height: 14px;
  //     }
  //     .counter {
  //       margin-top: 15px;
  //       margin-right: 0 !important;

  //       img {
  //         width: 30px;
  //         height: 30px;
  //       }
  //     }
  //   }
  //   .price {
  //     margin: auto auto auto 0;
  //     min-width: 69px;
  //     .discount-price {
  //       width: 100%;
  //       text-align: right;
  //       font-size: 10px !important;
  //       line-height: 13px;
  //       font-weight: 400;
  //       span {
  //         width: 200px;
  //       }
  //     }
  //     .total {
  //       margin-right: 0 !important;
  //       h4 {
  //         width: 100%;
  //         text-align: right;
  //         font-size: 15px !important;
  //         line-height: 19px;
  //         font-weight: 500;
  //       }
  //     }
  //   }
  // }
}
</style>
