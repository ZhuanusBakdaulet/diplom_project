<template>
  <div class="grey-bg pb-16">
    <v-container v-if="orders.results" class="">
      <div
        class="
          basket
          d-flex
          flex-row
          align-center
          w100
          justify-start
          mb-4
          px-6
          py-2
          d-sm-none
          mt-7 mt-sm-0
        "
      >
        <nuxt-link to="/" class="nav_link">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13.1428L1 7.14282L7 1.14282"
              stroke="#252626"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </nuxt-link>
        <p class="h2 w100 text-center">Корзина</p>
      </div>
      <Bread class="mt-4" :links="links" />
      <div class="basket-grid">
        <div class="basketsteps">
          <Steps class="my-8" :activeStep="activeStep" />
          <div v-if="activeStep == 1 && orders.results" class="">
            <BasketItems
              class="basket_item mb-3"
              :item="item"
              :index="index"
              v-for="(item, index) in orders.results"
              :key="index"
              @fetchOrders="fetchOrders"
            />
            <h2 v-if="orders.results.length == 0" class="">
              У вас в корзине ничего нет
            </h2>
          </div>

          <Step2
            v-if="activeStep == 2"
            @nextStep="endOrder"
            :orders="orders.results"
          />
        </div>
        <BasketCart
          v-if="orders.results"
          class="basketcart"
          :activeStep="activeStep"
          @nextStep="changeStep"
          :cartItem="orders.results"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import Bread from "@/components/ui/Bread";
import Steps from "@/components/ui/Steps";
import BasketItems from "@/components/basket/BasketItems";
import BasketCart from "@/components/basket/BasketCart";
import Step2 from "@/components/basket/Step2";
export default {
  data: () => ({
    orders: {},
    back: "<",
    activeStep: 1,
    links: [
      {
        text: "Главная",
        url: "/"
      },
      {
        text: "Карзина",
        url: "/Basket"
      }
    ]
  }),
  middleware: ["notclient"],
  components: {
    Bread,
    BasketItems,
    BasketCart,
    Steps,
    Step2
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.$router.push("/");
    },
    changeStep() {
      this.activeStep = 2;
    },
    endOrder() {
      this.$notifier.showMessage({
        color: "success",
        text: "Ваш заказ принят"
      });
      this.$router.push("/Profile/Order");
    },
    async fetchOrders() {
      let params = {
        status: 1,
        session_key: localStorage.session_key,
        user_type: this.$store.state.client_type
      };
      await this.$axios
        .$get(`orders/`, { params })
        .then(res => {
          this.orders = res;
          if (res.results.length == 0) this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.basket-grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .basketsteps {
    width: 100%;
    max-width: 880px;
  }
  .basketcart {
    margin-left: 56px;
    @media (max-width: 1240px) {
      width: 100%;
      margin-top: 40px;
      margin-left: 0;
    }
  }
  .basket {
    .nav_link {
      font-weight: bold;
      font-size: 24px;
      color: black;
    }
    .h2 {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 500;
      font-size: 17px !important;
      line-height: 22px !important;
    }
  }
  .basket_item {
    border-radius: 5px;
    background: #ffffff;
  }
}
</style>
