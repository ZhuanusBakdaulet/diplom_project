<template>
  <div
    v-if="item"
    class="box d-flex align-center"
    :style="`border-color: #${checkStatus(item.status).color}`"
  >
    <div class="w100">
      <div class="d-flex align-center">
        <h5 class="mr-12 grey-color">Заказ № {{ item.id }}</h5>
        <h4 class="fw700">
          {{
            `${item.customer.first_name} ${item.customer.last_name} (email: ${item.customer.email})`
          }}
        </h4>
      </div>
      <div class="d-flex align-center mt-6">
        <h4 class="blue-color mr-6">
          Статус:
          <span
            class="fw700"
            :style="`color: #${checkStatus(item.status).color}`"
            >{{ checkStatus(item.status).text }}</span
          >
        </h4>

        <h4 class="blue-color mr-6">
          Доставка:
          <span class="fw700">
            {{ $date(item.arrival_time) }}
          </span>
        </h4>

        <h4 class="blue-color mr-6">
          Сумма:
          <span class="fw700">{{ $price(item.total_price) }}</span>
        </h4>
      </div>
    </div>
    <div v-if="item.status < 3" class="mx-auto">
      <button @click="accept" class="orange-btn">Принять</button>
      <button @click="cancel" class="orange-btn-outline">Отклонить</button>
    </div>

    <nuxt-link :to="`/provider/Orders/${item.id}`" class="ml-auto pl-4">
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976312 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071Z"
          fill="#7B8794"
        />
      </svg>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    status: Number,
    item: Object
  },
  created() {},
  methods: {
    checkStatus(status) {
      let result = {
        1: { text: "Заказ создан", color: "FFC700" },
        2: { text: "Заказ оформлен", color: "FFA800" },
        3: { text: "Подтвержден поставщиком", color: "FF6B00" },
        4: { text: "Заказ отменен", color: "DF4041" },
        5: { text: "Заказ изменен", color: "FF3232" },
        6: { text: "Заказ собирают", color: "7FE200" },
        7: { text: "Заказ в пути", color: "72CA03" },
        8: { text: "Доставлен", color: "0FBA00" },
        9: { text: "Проверка заказа", color: "FFD029" },
        10: { text: "Заказ завершен", color: "52B059" }
      };
      return result[`${status}`];
    },
    async accept() {
      this.$axios
        .$patch(`order/confirm/${this.item.id}/`)
        .then(() => {
          this.$emit("fetch");
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async cancel() {
      this.$axios
        .$patch(`order/cancel/${this.item.id}/`)
        .then(() => {
          this.$emit("fetch");
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
@import "@/assets/css/provider.scss";
.grey-color {
  color: #a0aec0;
}
.box {
  background: #fff;
  width: 100%;
  border-left: 5px solid #fff;
  padding: 20px 25px 20px 25px;
}
.blue-color {
  color: #2a4365;
}
.inofs {
  width: 100%;
  max-width: 580px;
}
span {
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
button {
  width: 180px;
  height: 30px;
  margin: 5px 7px;
}
.orange-btn-outline {
  color: $orange-color;
  &:hover,
  &-active {
    color: #fff;
  }
}
</style>
