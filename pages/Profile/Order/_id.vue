<template>
  <div class="">
    <!-- <Bread :links="links" /> -->
    <div class="mt-8 details-grid">
      <div class="">
        <h2 v-if="isCheck" class="d-none d-sm-block">Проверка заказа</h2>

        <h2 class="text-center text-sm-left">Заказ{{ `№ ${order.id}` }}</h2>
        <p class="m mt-1 grey-color d-none d-sm-block">
          Дата доставки: {{ $moment.unix(order.arrival_time).format("LL") }}
        </p>
        <Status
          :status="order.status"
          :statuses="order.statuses"
          :order_items="order.order_items"
          :orderID="order.id"
          @reFetchOrder="fetchOrder"
        />
      </div>
      <div class="">
        <div class="order-items">
          <div class="pt-5 px-6 pb-4 grey-color">Ваш заказ</div>
          <ProductItem
            :isCheck="isCheck"
            :isDelivered="isDelivered"
            :isDone="isDone"
            v-for="(item, index) in order.order_items"
            :key="index"
            :item="item"
            @refresh="refreshOrder"
            @addMissingItems="addMissingItems"
            :showCheck="showCheck"
          />

          <div
            v-if="!isCheck"
            class="py-5 pb-0 px-14 d-flex align-center justify-space-between"
          >
            <p class="m">Сумма</p>
            <h3 class="" style="font-weight: normal">
              {{ $price(order.total_price) }}
            </h3>
          </div>
          <div
            v-if="!isCheck"
            class="py-5 px-14 d-flex align-center justify-space-between"
          >
            <p class="m green-color">Итого</p>
            <h3 class="green-color" style="font-weight: normal">
              {{ $price(order.total_price) }}
            </h3>
          </div>
        </div>
        <div v-if="!isCheck" class="order-items mt-5">
          <div
            class="
              order_items_divs
              d-flex
              pa-5
              flex-column flex-sm-row
              align-start align-sm-center
              justify-space-between
            "
          >
            <p class="m mb-3">Поставщик</p>
            <button
              v-if="isDone && order.rating == null"
              class="orange-btn-outline p"
              @click="dialog = true"
            >
              Оценить поставщика
            </button>
            <nuxt-link
              :to="`/Products?provider[]=${order.provider.id}`"
              class="
                orange-color
                h3
                d-flex
                justify-space-between justify-sm-end
                w100
              "
              style="font-weight: normal"
            >
              {{ order.provider.individual_name }}
              <v-icon class="ml-10" color="warning"> mdi-chevron-right </v-icon>
            </nuxt-link>
          </div>
          <div
            class="
              d-flex
              order_items_divs
              pa-5
              flex-column flex-sm-row
              align-start align-sm-center
              justify-space-between
            "
          >
            <p class="m mb-3">Адрес доставки</p>
            <h3
              class=""
              style="font-weight: normal, font-size: 15px, line-height: 19px"
            >
              {{ order.address }}
            </h3>
          </div>
          <div
            class="
              pa-5
              d-flex
              flex-column flex-sm-row
              align-start align-sm-center
              justify-space-between
            "
          >
            <p class="m mb-3">Оплата</p>
            <h3
              class=""
              style="font-weight: normal; font-size: 15px; line-height: 19px"
            >
              {{ paymentMethod(order.payment_method) }}
            </h3>
          </div>
        </div>
        <button
          v-if="isDelivered"
          @click="goToCheck"
          class="ml-auto orange-btn mt-8 h3 fw600"
        >
          Проверить заказ
        </button>
        <button
          v-if="isCheck && showCheck && !isMissingAmount"
          @click="goToConfirm"
          class="ml-auto orange-btn mt-8 h3 fw600"
        >
          Готово
        </button>
      </div>
    </div>
    <v-dialog
      v-model="code"
      width="345"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <div class="px-6 py-5 text-center">
          <img
            @click="code = false"
            src="@/assets/image/icons/close-orange.svg"
            alt=""
            class="close"
          />
          <h2 class="mt-16">Отправили СМС код</h2>
          <p class="mt-3 mb-16">
            Код отправлен на номер +7 708 990 90 90, сообщите код доставщику !
          </p>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="count_modal"
      width="345"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <div class="px-6 py-5 text-center">
          <img
            @click="count_modal = false"
            src="@/assets/image/icons/close-orange.svg"
            alt=""
            class="close"
          />
          <h2>Не полный заказ</h2>
          <p class="grey-color mt-5">Введите в каком количестве доставили</p>
          <v-form @submit.prevent="submitCount">
            <v-text-field
              class="mx-auto mt-6 my-input"
              v-model="count"
              placeholder="12 шт"
              solo
              type="number"
            >
            </v-text-field>
            <button type="submit" class="green-btn">Отправить</button>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      width="422"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card class="px-11 py-10 pb-13 text-center">
        <v-form ref="ratingForm" @submit.prevent="submitRate">
          <svg
            @click="closeModal()"
            class="close"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5ZM2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15ZM9.74112 9.74112C10.2293 9.25296 11.0207 9.25296 11.5089 9.74112L15 13.2322L18.4911 9.74112C18.9793 9.25296 19.7707 9.25296 20.2589 9.74112C20.747 10.2293 20.747 11.0207 20.2589 11.5089L16.7678 15L20.2589 18.4911C20.747 18.9793 20.747 19.7707 20.2589 20.2589C19.7707 20.747 18.9793 20.747 18.4911 20.2589L15 16.7678L11.5089 20.2589C11.0207 20.747 10.2293 20.747 9.74112 20.2589C9.25296 19.7707 9.25296 18.9793 9.74112 18.4911L13.2322 15L9.74112 11.5089C9.25296 11.0207 9.25296 10.2293 9.74112 9.74112Z"
              fill="#888583"
            />
          </svg>
          <p class="text-center">Пожалуйста, оставьте свой отзыв</p>
          <div class="product-rating mt-4">
            <v-rating
              hover
              length="5"
              size="30"
              :value="0"
              background-color="warning"
              color="warning"
              v-model="form.rating"
            ></v-rating>
          </div>
          <p class="mt-4">Оставить Комментарий</p>
          <v-textarea
            v-model="form.review"
            class="my-input unset-maxwidth mt-1"
            placeholder="Введите описание"
            solo
            no-resize
            height="226"
            :rules="[rules.required]"
          >
          </v-textarea>
          <button type="submit" class="green-btn mx-auto">Подтвердить</button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Menu from "@/components/profile/Menu";
import Bread from "@/components/ui/Bread";
import Status from "@/components/profile/Status";
import ProductItem from "@/components/profile/ProductItem";

export default {
  async asyncData({ $axios, params }) {
    const order = await $axios.$get(`orders/${params.id}/`);
    return { order };
  },
  data: () => ({
    showCheck: true,
    missings: [],
    checkForm: {},
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
        url: "/Profile/Order"
      },
      {
        text: "Заказ",
        url: "/Profile/Order/Orders"
      }
    ]
  }),
  middleware: ["auth", "notclient"],
  layout: "profile",
  components: {
    Menu,
    Bread,
    Status,
    ProductItem
  },
  computed: {
    isDelivered() {
      if (this.order.status == 8) return true;
      return false;
    },
    isMissingAmount() {
      if (this.order.status == 9) {
        let isChecked = true;
        this.order.order_items.forEach(e => {
          console.log(e.missing_amount);
          if (e.missing_amount == 0) {
            isChecked = false;
          }
        });
        return isChecked;
      }
      return false;
    },
    isCheck() {
      if (this.order.status == 9) {
        return true;
      }
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
    addMissingItems(value) {
      let index = this.missings.findIndex(e => e.id === value.id);
      if (index === -1) this.missings.push(value);
      else this.missings[index] = value;
    },
    async goToConfirm() {
      let promises = [];
      for (let item of this.missings) {
        await this.$axios.$patch(`order-items/${item.id}/check/`, item);
      }

      Promise.all(promises)
        .then(res => {
          this.fetchOrder();
          this.showCheck = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    refreshOrder() {
      this.fetchOrder();
    },
    async goToCheck() {
      await this.$axios
        .$patch(`order/check/${this.$route.params.id}/`)
        .then(res => {
          this.fetchOrder();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            color: "error",
            text: `${error}`
          });
          this.closeModal();
        });
    },
    async submitRate() {
      if (!this.$refs.ratingForm.validate()) return;
      await this.$axios
        .$patch(`order/rating/${this.order.id}/`, this.form)
        .then(res => {
          this.$notifier.showMessage({
            color: "success",
            text: "Ваш отзыв принят"
          });
          this.refreshOrder();
          this.closeModal();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            color: "error",
            text: `${error}`
          });
          this.closeModal();
        });
    },
    closeModal() {
      this.form = {};
      this.dialog = false;
    },
    async fetchOrder() {
      this.$axios
        .$get(`orders/${this.order.id}/`)
        .then(res => {
          this.order = res;
        })
        .then(err => {
          console.log(err);
        });
    },
    paymentMethod(id) {
      let payment = {
        1: "Наличными",
        2: "Банковская карта",
        3: "Кредит в банке",
        4: "Расрочка у поставщика"
      };
      return payment[`${id}`];
    },
    submitCount() {
      console.log(1123);
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
  max-width: 688px;
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
@media screen and (max-width: 600px) {
  .details-grid {
    display: flex;
    flex-direction: column !important;
  }
  .order_items_divs {
    border-bottom: 1px solid rgba(228, 228, 228, 1);
  }
  .orange-btn {
    max-width: 100%;
    font-size: 17px;
    line-height: 22px;
  }
  .orange-btn-outline {
    font-size: 13px !important;
    line-height: 16px !important;
  }
  h3 {
    font-size: 15px !important;
    line-height: 19px;
  }
  .m {
    font-size: 17px;
    line-height: 22px;
    font-weight: bold;
  }
  .orange-color {
    font-size: 15px;
    line-height: 19px;
  }
  .grey-color {
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
  }
}
</style>
