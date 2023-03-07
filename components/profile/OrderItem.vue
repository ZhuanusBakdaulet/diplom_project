<template>
  <div v-if="order" class="order my-2">
    <div class="blocks d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <h3 class="fw600" :style="`color: ${statusName.colormain}`">
          Заказ № {{ order.id }}
        </h3>
        <p class="s ml-7">
          Статус:
          <span class="ps ml-1" :style="`color: ${statusName.color}`">
            {{ statusName.name }}</span
          >
        </p>
      </div>
      <p class="grey-color">
        {{ $date(order.arrival_time) }}
      </p>
    </div>
    <div class="line"></div>
    <div v-for="item in order.order_items.slice(0, 5)" :key="item.id">
      <div class="blocks d-flex align-center">
        <div v-if="item.provider_product.product" class="image">
          <img
            v-if="item.provider_product.product.images[0]"
            :src="item.provider_product.product.images[0].image"
            alt=""
          />
          <img v-else src="@/assets/image/photos/default.svg" alt="" />
        </div>
        <div class="description">
          <nuxt-link
            :to="`/Products/${item.provider_product.product.id}`"
            class="orange-color d-flex align-center"
          >
            <p class="m">{{ item.provider_product.product.name }}</p>
          </nuxt-link>
          <div
            class="
              description_text
              mt-1
              d-flex
              align-end align-sm-center
              justify-space-between
            "
          >
            <p class="grey-color small my-clamp">
              {{ item.provider_product.product.description }}
            </p>
            <p class="m">x {{ item.amount }} шт</p>
          </div>
          <div
            class="
              description_text_sm
              mt-1
              d-flex
              align-center
              justify-space-between
            "
          >
            <div>
              <p class="grey-color small my-clamp">
                {{ item.provider_product.product.description }}
              </p>
              <h3>
                {{ $price(item.price) }}
              </h3>
            </div>
            <div>
              <p class="m">x {{ item.amount }} шт</p>
              <p class="price mt-2">{{ $price(calculateDiscount(item)) }}/шт</p>
            </div>
          </div>
        </div>
        <div class="ml-auto text-right asd">
          <h3>
            {{ $price(item.price) }}
          </h3>
          <p class="price mt-2">{{ $price(calculateDiscount(item)) }}/шт</p>
        </div>
      </div>
      <div class="line"></div>
    </div>

    <div class="blocks d-flex justify-space-between py-6">
      <h3
        v-if="isRepeat"
        @click="repeatOrder"
        class="green-color fw600 d-flex align-center pointer mr-auto"
      >
        Повторить заказ
      </h3>

      <nuxt-link
        :to="`/Products?provider[]=${order.provider.id}`"
        class="orange-color d-flex align-center"
      >
        {{ order.provider.individual_name }}
      </nuxt-link>

      <p
        @click="goDetails(order.id)"
        class="ml-auto orange-color d-flex align-center justify-end"
      >
        Детали заказа
        <svg
          class="ml-7"
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.745899 15.7589C0.44784 15.4667 0.420743 15.0095 0.66461 14.6873L0.745899 14.595L7.47342 8L0.745899 1.40503C0.44784 1.11283 0.420743 0.655583 0.66461 0.333375L0.745899 0.241064C1.04396 -0.0511349 1.51037 -0.0776984 1.83904 0.161374L1.93321 0.241064L9.2541 7.41802C9.55216 7.71022 9.57926 8.16746 9.33539 8.48967L9.2541 8.58198L1.93321 15.7589C1.60534 16.0804 1.07376 16.0804 0.745899 15.7589Z"
            fill="#FF7A29"
          />
        </svg>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    isRepeat: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    statusName() {
      let result = {
        1: {
          name: "Заказ создан",
          color: "#FFC700",
          colormain: "#FFC700"
        },
        2: {
          name: "В обработке",
          color: "#FFA800",
          colormain: "#FFA800"
        },
        3: {
          name: "Подтвержден поставщиком",
          color: "#FF6B00",
          colormain: "#FF6B00"
        },
        4: {
          name: "Отменён",
          color: "#DF4041",
          colormain: "#DF4041"
        },
        5: {
          name: "В ваш заказ внесли изменения",
          color: "#FF3232",
          colormain: "#FF3232"
        },
        6: {
          name: "Ваш заказ собирают",
          color: "#7FE200",
          colormain: "#7FE200"
        },
        7: {
          name: "Ваш заказ в пути",
          color: "#72CA03",
          colormain: "#72CA03"
        },
        8: {
          name: "Доставлен",
          color: "#0FBA00",
          colormain: "#0FBA00"
        },
        9: {
          name: "Проверка заказа",
          color: "#FFD029",
          colormain: "#FFD029"
        },
        10: {
          name: "Заказ завершен",
          color: "#52B059",
          colormain: "#52B059"
        }
      };
      if (this.order?.status) return result[`${this.order.status}`];
      return result[1];
    }
  },
  methods: {
    findItemFromBasket(id) {
      let find = basketitem => {
        return basketitem.provider_product.id == id;
      };
      if (this.$store.state.basket.find(find))
        return this.$store.state.basket.find(find);
      else false;
    },
    async repeatOrder() {
      for (let index = 0; index < this.order.order_items.length; index++) {
        this.submitOrderItem(this.order.order_items[index]);
      }
    },
    submitOrderItem(item) {
      let body = {
        provider_product: item.provider_product.id,
        amount: item.amount,
        user_type: this.$store.state.client_type
      };

      let basketItem = this.findItemFromBasket(item.provider_product.id);

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
        this.$notifier.showMessage({
          color: "warning",
          text: "Этот продукт уже в корзине"
        });
      }
    },
    goDetails(id) {
      this.$router.push({
        path: `/Profile/Order/${id}`
      });
    },
    lastStatus(statuses) {
      if (statuses[statuses.length - 1])
        return statuses[statuses.length - 1].created_at;
    },
    calculateDiscount(item) {
      let result = 0;
      if (item?.provider_product) {
        result =
          item.provider_product.price -
          (item.provider_product.discount * item.provider_product.price) / 100;
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  max-width: 856px;
  background: #ffffff;
  border-radius: 5px;
}
.blocks {
  width: 100%;
  padding: 13px 88px 13px 50px;
}
.line {
  width: 100%;
  height: 2px;
  background: #e4e4e4e4;
}
.image {
  width: 60px;
  height: 56px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.small {
  max-width: 100%;
  width: 100%;
}
.description {
  width: 100%;
  // max-width: 240px;
}
.asd {
  width: 100%;
  max-width: 120px;
}
.orange-color {
  cursor: pointer;
}
.description_text_sm {
  display: none !important;
}
@media screen and (max-width: 600px) {
  .blocks {
    padding: 15px;

    .description div {
      flex-direction: column;
      align-items: flex-start !important;
    }
    & p:last-child {
      font-size: 12px;
    }
  }
  .image {
    margin-right: 8px;
    width: 50px;
    height: 50px;
    img {
      margin: auto;
      max-width: 50px !important;
      max-height: 50px !important;
    }
  }
  .s {
    display: none !important;
  }
  .orange-color {
    margin-left: 0 !important;
    max-width: 100%;
    width: 100%;
    justify-content: space-between;
  }
  .green-color {
    display: none !important;
  }
  .m {
    margin-top: 5px;
    font-size: 13px;
    line-height: 16px;
  }
  h3.fw600 {
    font-size: 13px;
    line-height: 16px;
  }
  .grey-color {
    font-size: 14px !important;
    line-height: 18px;
  }
  .my-clamp {
    display: none;
    font-size: 13px !important;
    line-height: 16px !important;
  }
  .orange-color {
    font-size: 15px !important;
    line-height: 19px !important;
  }
  .text-right {
    display: none !important;
  }
  .description_text_sm {
    display: flex !important;

    div {
      max-width: 100%;
      width: 100%;
      display: flex;
      flex-direction: row !important;
      justify-content: space-between;
      align-items: center !important;

      h3 {
        width: 100%;
        text-align: right;
        font-size: 17px;
        line-height: 22px;
      }
    }
  }
  .price {
    font-size: 13px !important;
    line-height: 16px;
    font-weight: 500;
  }
  .description_text {
    display: none !important;
  }
}
@media screen and (max-width: 337px) {
  .orange-color {
    font-size: 13px !important;
    line-height: 16px !important;
  }
}
</style>
