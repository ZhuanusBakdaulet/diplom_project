<template>
  <div class="">
    <Bread :links="links" />
    <div class="mt-8">
      <div class="order-items">
        <div
          class="pt-5 px-6 pb-4 grey-color"
          :style="`color:${getStatusName(order.status).color}`"
        >
          Заказ №{{ order.id }} {{ getStatusName(order.status).name }}
        </div>
        <ProductItem
          :isCheck="isCheck"
          :isDone="isDone"
          v-for="item in order.order_items"
          :key="item.id"
          :item="item"
          isProviderOrders
        />

        <div
          v-if="!isCheck"
          class="py-5 pb-0 px-14 d-flex align-center justify-space-between"
        >
          <p class="m">Сумма</p>
          <h3 class="" style="font-weight: normal;">
            {{ $price(order.total_price) }}
          </h3>
        </div>
        <div
          v-if="!isCheck"
          class="py-5 px-14 d-flex align-center justify-space-between"
        >
          <p class="m green-color">Итого</p>
          <h3 class="green-color" style="font-weight: normal;">
            {{ $price(order.total_price) }}
          </h3>
        </div>
      </div>
      <div v-if="!isCheck" class="order-items mt-5">
        <div class="pa-6 pb-0 d-flex align-center justify-space-between">
          <p class="m">Поставщик</p>
          <button
            v-if="isDone && order.rating == null"
            class="orange-btn-outline p"
            @click="dialog = true"
          >
            Оценить поставщика
          </button>
          <nuxt-link
            v-if="order.provider && order.provider.individual_name"
            to="/"
            class="orange-color h3"
            style="font-weight: normal;"
          >
            {{ order.provider.individual_name }}
            <v-icon class="ml-10" color="warning">
              mdi-chevron-right
            </v-icon>
          </nuxt-link>
        </div>
        <div class="pa-6 pb-0 d-flex align-center justify-space-between">
          <p class="m">Адрес доставки</p>
          <h3 class="" style="font-weight: normal;">
            {{ order.address }}
          </h3>
        </div>
        <div class="pa-6 d-flex align-center justify-space-between">
          <p class="m ">Оплата</p>
          <h3 class="" style="font-weight: normal;">
            {{ paymentMethod(order.payment_method) }}
          </h3>
        </div>
      </div>
      <button v-if="isCheck" class="ml-auto orange-btn mt-8 h3 fw600">
        Готово
      </button>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/profile/Menu";
import Bread from "@/components/ui/Bread";
import ProductItem from "@/components/profile/ProductItem";

export default {
  middleware: ["auth", "order"],
  layout: "profile",
  async fetch() {
    this.order = await this.$axios.$get(`orders/${this.$route.query.id}/`);
  },
  data: () => ({
    order: {},
    rules: {
      required: tima => !!tima || "Обязательное поле"
    },
    dialog: false,
    form: {},
    count: "",
    code: false,
    count_modal: false,

    details: {
      number: "№123456",
      status: 10
    },
    links: [
      {
        text: "Мои заказы",
        url: "/admin/Reports"
      },
      {
        text: "Заказ",
        url: "/admin/Reports/order"
      }
    ]
  }),
  components: {
    Menu,
    Bread,
    ProductItem
  },
  computed: {
    isCheck() {
      if (this.order.status == 9) return true;
      return false;
    },
    isDone() {
      if (this.order.status == 10) return true;
      return false;
    }
  },
  created() {
    this.$store.commit("changeProfileMenu", "orders");
  },
  methods: {
    getStatusName(status) {
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
      if (status) return result[`${status}`];
      return result[1];
    },
    paymentMethod(id) {
      let payment = {
        1: "Наличными",
        2: "Банковская карта",
        3: "Кредит в банке",
        4: "Расрочка у поставщика"
      };
      return payment[`${id}`];
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 25%;
}
.details-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 25% 1fr;
}
.bread {
  button {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #252626;
    text-decoration: none;
    &:hover {
      text-decoration-color: $orange-color;
      color: $orange-color;
    }
    &:last-child {
      text-decoration-color: $orange-color;
      color: $orange-color;
    }
    span {
      color: $orange-color;
    }
  }
}
.order-items {
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
}
a,
.nuxt-link,
.nuxt-link-active {
  color: $orange-color;
  text-decoration: none;
}
.orange-btn {
  max-width: 300px;
}
.my-input {
  max-width: 160px;
}
.orange-btn-outline {
  width: unset;
  height: unset;
  padding: 4px;
}
.unset-maxwidth {
  max-width: unset;
}
</style>
