<template>
  <div v-if="status && orderID">
    <h3 class="green-color mt-3">Статус</h3>

    <div class="mt-5">
      <div
        v-for="(item, index) in slice"
        :key="item.id"
        class="status"
        :class="[
          statusName(index, status).status <= index + 1 ? 'status-disabled' : ''
        ]"
      >
        <svg
          v-if="index == 1 && status == 4"
          class="status-icon"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 0C5.83151 0 0 5.83151 0 13C0 20.1685 5.83151 26 13 26C20.1685 26 26 20.1685 26 13C26 5.83151 20.1685 0 13 0Z"
            fill="#FE2929"
          />
          <path
            d="M14.65 13.0003L17.7436 9.90668C18.0854 9.56487 18.0854 9.0107 17.7436 8.66942L17.3312 8.257C16.9893 7.91508 16.4351 7.91508 16.0938 8.257L13.0003 11.3505L9.90668 8.25636C9.56487 7.91455 9.0107 7.91455 8.66942 8.25636L8.25636 8.66878C7.91455 9.0107 7.91455 9.56487 8.25636 9.90615L11.3505 13.0003L8.257 16.0938C7.91508 16.4358 7.91508 16.9899 8.257 17.3312L8.66942 17.7436C9.01124 18.0854 9.5654 18.0854 9.90668 17.7436L13.0003 14.65L16.0938 17.7436C16.4358 18.0854 16.9899 18.0854 17.3312 17.7436L17.7436 17.3312C18.0854 16.9893 18.0854 16.4351 17.7436 16.0938L14.65 13.0003Z"
            fill="white"
          />
        </svg>
        <svg
          v-else-if="index == 1 && status == 5"
          class="status-icon"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 0C5.83151 0 0 5.83151 0 13C0 20.1685 5.83151 26 13 26C20.1685 26 26 20.1685 26 13C26 5.83151 20.1685 0 13 0Z"
            fill="#FFC83A"
          />
          <path
            d="M19.5888 10.2452L12.5471 17.2867C12.3358 17.498 12.0585 17.6043 11.7812 17.6043C11.5039 17.6043 11.2266 17.498 11.0153 17.2867L7.49454 13.766C7.07083 13.3425 7.07083 12.6577 7.49454 12.2342C7.91805 11.8105 8.6026 11.8105 9.02631 12.2342L11.7812 14.9891L18.057 8.71344C18.4805 8.28973 19.1651 8.28973 19.5888 8.71344C20.0123 9.13695 20.0123 9.8215 19.5888 10.2452Z"
            fill="#FAFAFA"
          />
        </svg>
        <svg
          v-else
          class="status-icon"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 0C5.83151 0 0 5.83151 0 13C0 20.1685 5.83151 26 13 26C20.1685 26 26 20.1685 26 13C26 5.83151 20.1685 0 13 0Z"
            fill="#52B059"
          />
          <path
            d="M19.5888 10.2452L12.5471 17.2867C12.3358 17.498 12.0585 17.6043 11.7812 17.6043C11.5039 17.6043 11.2266 17.498 11.0153 17.2867L7.49454 13.766C7.07083 13.3425 7.07083 12.6577 7.49454 12.2342C7.91805 11.8105 8.6026 11.8105 9.02631 12.2342L11.7812 14.9891L18.057 8.71344C18.4805 8.28973 19.1651 8.28973 19.5888 8.71344C20.0123 9.13695 20.0123 9.8215 19.5888 10.2452Z"
            fill="#FAFAFA"
          />
        </svg>
        <div class="pb-1">
          <p class="pt-1">{{ statusName(index, status).name }}</p>
          <button
            v-if="index == 1 && status == 5"
            class="mt-4 orange-btn-outline"
            @click="show_changes = true"
          >
            Посмотреть
          </button>
          <p v-else class="grey-color mt-1 pb-4">
            {{ dateOfStatus(index, status) }}
          </p>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="show_changes"
      width="680"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <div class="my-modal py-7 px-10">
          <div class="text-center h2">Изменения</div>
          <img
            @click="show_changes = false"
            src="@/assets/image/icons/close-orange.svg"
            alt=""
            class="close"
          />
          <h3 class="mt-6 green-color h3">Заказ {{ `№ ${orderID}` }}</h3>
          <p class="grey-color mt-2">Товары, в которых есть изменения</p>

          <div class="mt-8 products">
            <div
              v-for="item in order_items"
              :key="item.id"
              class="d-flex align-start products-item w100"
            >
              <div class="image">
                <img
                  v-if="item.provider_product.product.images[0]"
                  class=""
                  :src="item.provider_product.product.images[0].image"
                  alt=""
                />
                <img
                  v-else
                  class=""
                  src="@/assets/image/photos/default.svg"
                  alt=""
                />
              </div>
              <div class="pl-2 pt-4">
                <p>{{ item.provider_product.product.name }}</p>
                <p
                  v-if="
                    item.provider_amount === null ||
                      item.amount === item.provider_amount
                  "
                  class="mt-2 piece"
                >
                  х {{ item.provider_amount }} шт
                </p>
                <p v-else class="mt-2 piece piece-active">
                  <span> {{ `x ${item.amount} шт ` }}</span>
                  <span>
                    {{
                      item.provider_amount == 0
                        ? "нет в наличии"
                        : `x ${item.provider_amount} шт `
                    }}
                  </span>
                </p>
              </div>
              <div class="ml-auto">
                <h3
                  v-if="
                    item.provider_amount === null ||
                      item.amount === item.provider_amount
                  "
                >
                  {{ $price(item.price) }}
                </h3>
                <div v-else class="changed-price">
                  <h4>{{ $price(item.price) }}</h4>
                  <h3 :class="{ 'grey-color': item.provider_amount == 0 }">
                    {{ calculateChangedPrice(item) }}
                  </h3>
                </div>
                <p class="grey-color">
                  {{ $price(calculateDiscount(item.provider_product)) }}/шт
                </p>
              </div>
            </div>
          </div>

          <div
            class="btns mx-auto mt-9 d-flex align-center justify-space-between"
          >
            <button @click="cancelChanges" class="red-btn-outline p">
              Отклонить
            </button>
            <button @click="approveChanges" class="green-btn p">
              Подтвердить
            </button>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    show_changes: false,
    slice: 7
  }),
  props: {
    status: Number,
    statuses: Array,
    order_items: Array,
    orderID: Number
  },
  methods: {
    calculateChangedPrice(item) {
      let result =
        parseInt(item.provider_amount) *
        this.calculateDiscount(item.provider_product);
      return this.$price(result);
    },
    calculateDiscount(provider_product) {
      let price = parseInt(provider_product.price),
        discount = parseInt(provider_product.discount),
        result = price - (price * discount) / 100;
      return result;
    },
    async approveChanges() {
      await this.$axios
        .$patch(`order/provider-change-confirm/${this.orderID}/`)
        .then(res => {
          this.$emit("reFetchOrder");
          this.show_changes = false;
        })
        .catch(err => {
          this.$emit("reFetchOrder");
          this.show_changes = false;
        });
    },
    async cancelChanges() {
      await this.$axios
        .$patch(`order/cancel/${this.orderID}/`)
        .then(res => {
          this.$emit("reFetchOrder");
          this.show_changes = false;
        })
        .catch(err => {
          this.$emit("reFetchOrder");
          this.show_changes = false;
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    dateOfStatus(index, status) {
      let date = searchstat => {
        let findDate = stats => {
          return stats.name === searchstat;
        };

        return this.statuses.find(findDate)
          ? this.$moment
              .unix(this.statuses.find(findDate).created_at)
              .format("LLL")
          : "date";
      };

      let status_results = {
        1: [date(1), date(status)],
        2: [date(1), date(status)],
        3: [date(1), date(status)],
        4: [date(1), date(status)],
        5: [date(1), date(status)],
        6: [date(1), date(3), date(status)],
        7: [date(1), date(3), date(status - 1), date(status)],
        8: [date(1), date(3), date(status - 2), date(status - 1), date(status)],
        9: [
          date(1),
          date(3),
          date(status - 3),
          date(status - 2),
          date(status - 1),
          date(status)
        ],
        10: [
          date(1),
          date(3),
          date(status - 4),
          date(status - 3),
          date(status - 2),
          date(status - 1),
          date(status)
        ]
      };

      for (let i = 0; i <= index + 1; i++) {
        if (i == index) {
          return status_results[`${status}`][i];
        }
      }
    },
    statusName(index, status) {
      let stat = status;
      if (status == 3) {
        stat = 3;
        this.slice == 7;
      } else if (status < 4) {
        stat = 2;
        this.slice == 7;
      } else if (status == 4) {
        stat = 3;
        this.slice = 2;
      } else if (status == 5) {
        stat = 3;
        this.slice = 7;
      } else {
        stat = stat - 2;
        this.slice = 7;
      }

      if (index == 0) {
        return {
          name: "Заказ оформлен",
          status: stat
        };
      } else if (index == 1) {
        if (status == 4)
          return {
            name: "Ваш заказ отменен",
            status: stat
          };
        else if (status == 5)
          return {
            name: "В ваш заказ внесли изменения",
            status: stat
          };
        return {
          name: "Подтвержден поставщиком",
          status: stat
        };
      } else if (index == 2)
        return {
          name: "Ваш заказ собирают",
          status: stat
        };
      else if (index == 3)
        return {
          name: "Ваш заказ в пути",
          status: stat
        };
      else if (index == 4)
        return {
          name: "Доставлен",
          status: stat
        };
      else if (index == 5)
        return {
          name: "Проверка заказа",
          status: stat
        };
      else if (index == 6)
        return {
          name: "Заказа завершен",
          status: stat
        };
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  width: 0px;
  min-height: 32px;

  border: 1px dashed #7b8794;
  margin: 0 auto;
  &-change {
    min-height: 56px;
  }
}
.status {
  position: relative;
  margin-left: 13px;
  padding-left: 25px;
  border-left: 2px dashed #7b8794;

  min-height: 58px;
  &:last-child {
    border-color: transparent;
  }
  &-icon {
    position: absolute;
    top: 0;
    left: -14px;
  }
  &-disabled {
    p {
      color: #e4e4e4;
    }
    .grey-color {
      display: none;
    }
    svg {
      width: 26px;
      height: 26px;
      background: #ccc;
      border-radius: 50%;
      path {
        display: none;
      }
    }
  }
}
.orange-btn-outline {
  width: 112px;
  height: 30px;
}
.my-modal {
  background: #ffffff;
  border-radius: 5px;
}

.products-item {
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #e4e4e4;
  &:last-child {
    border: none;
  }
  .image {
    width: 100px;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.btns {
  width: 100%;
  max-width: 440px;
  button {
    max-width: 205px;
  }
}
.piece {
  white-space: nowrap;

  &-active {
    span {
      color: #a8a8a8;
      text-decoration: line-through;
      &:last-child {
        margin-left: 10px;
        text-decoration: none;
        color: #ff7a29;
      }
    }
  }
}
.changed-price {
  h4 {
    font-size: 11px;
    line-height: 18px;
    text-align: right;
    color: #a3a3a3;
    text-decoration: line-through;
  }
}
@media screen and (max-width: 600px) {
  .green-color {
    font-size: 17px;
    line-height: 22px;
  }
}
</style>
