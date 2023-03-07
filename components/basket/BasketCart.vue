<template>
  <div class="">
    <div class="cart">
      <h2>Корзина</h2>
      <div class="products mt-8">
        <div
          class="product d-flex align-start mb-3"
          v-for="(item, index) in cartItem"
          :key="item.id"
        >
          <img
            class="check mr-4"
            src="@/assets/image/icons/done-check-done.svg"
            alt=""
          />
          <div class="order">
            <h3>Заказ {{ index + 1 }}</h3>
            <p>Товаров {{ item.order_items.length }}</p>
          </div>
          <h3 class="ml-auto price">
            {{ $price(item.total_price) }}
          </h3>
        </div>
      </div>
      <div class="line mt-5"></div>
      <div class="d-flex justify-space-between aign-center mt-5 total">
        <p class="fw600">Итого:</p>
        <h3>{{ $price(calculateTotal()) }}</h3>
      </div>
      <button
        v-if="activeStep == 1 && $store.state.order_status"
        @click="nextStep"
        class="mt-7 p fw600 d-flex align-center justify-center"
      >
        Оформить заказ
      </button>
      <button
        v-else-if="activeStep == 1"
        type="button"
        class="mt-7 p fw600 d-flex align-center justify-center disabled"
      >
        Оформить заказ
      </button>
    </div>
    <v-snackbar
      class="text-center"
      v-model="snack.is_active"
      :color="snack.color"
      :timeout="snack.timeout"
    >
      <h3 class="white-color">{{ snack.text }}</h3>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    cartItem: Array,
    activeStep: Number,
  },
  data: () => ({
    snack: {
      is_active: false,
      text: "",
      color: "success",
      timeout: 2000,
    },
  }),
  methods: {
    nextStep() {
      if (this.$auth.loggedIn) this.$emit("nextStep");
      else {
        this.snack = {
          is_active: true,
          text: "Пожалуйста, авторизуйтесь",
          color: "warning",
        };
      }
    },
    calculateTotal() {
      let result = 0;
      this.cartItem.map((e) => {
        result += parseInt(e.total_price);
      });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  min-width: 250px;
  width: 100%;
  max-width: 352px;
  padding: 24px 32px;
  background: #ffffff;
  border-radius: 5px;
}
.line {
  width: 100%;
  height: 2px;
  background: #e4e4e4;
}
button {
  color: white;
  width: 100%;
  height: 50px;
  background: #ff7a29;
  border-radius: 5px;
  &:hover {
    color: $orange-color;
    background: #fff;
    border: 1px solid $orange-color;
  }
}
.b {
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 5px;
}
@media screen and (max-width: 600px) {
  .cart {
    max-width: 100%;
    min-width: unset;

    .order {
      h3,
      p {
        font-size: 16px;
        line-height: 19px;
      }
    }
    .price {
      font-size: 16px;
      line-height: 19px;
    }
    .total {
      p,
      h3 {
        font-size: 16px;
        line-height: 19px;
      }
    }
    button {
      font-size: 17px;
      line-height: 22px;
    }
  }
}
</style>
