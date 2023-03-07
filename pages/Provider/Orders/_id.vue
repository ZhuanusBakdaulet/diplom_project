<template>
  <div v-if="order" class="">
    <Title :title="`Заказы`" linktitle />
    <div class="mt-4">
      <h2 class="grey-color fw500">Заказ № {{ $route.params.id }}</h2>
      <div v-if="!edit" class="d-flex mt-4">
        <div class="left-box">
          <v-form ref="courierRef" @submit.prevent="toWay">
            <div
              v-if="order.status == 3 || order.status > 5"
              class="d-flex align-center justify-space-between pa-7"
            >
              <h4 class="grey-color mr-5">Заказчик</h4>
              <h4 class="fw500 text-right">
                {{
                  `${order.customer.first_name} ${order.customer.last_name} email: ${order.customer.email}`
                }}
              </h4>
            </div>
            <div
              v-if="order.status == 3 || order.status > 5"
              class="line"
            ></div>
            <div
              v-if="order.status == 3 || order.status > 5"
              class="d-flex align-center justify-space-between pa-7"
            >
              <h4 class="grey-color mr-5">Адрес доставки</h4>
              <h4 class="fw500 text-right">
                {{ order.address }}
              </h4>
            </div>
            <div
              v-if="order.status == 3 || order.status > 5"
              class="line"
            ></div>
            <div class="d-flex align-center justify-space-between pa-7">
              <h4 class="grey-color mr-5">Оплата</h4>
              <h4 class="fw500 text-right">
                {{ paymentMethod(order.payment_method) }}
              </h4>
            </div>
            <div class="line"></div>
            <div v-if="order.status == 6" class="pa-7">
              <h4 class="grey-color mr-5">Курьер</h4>
              <v-select
                class="mt-4 my-input"
                :items="couriers"
                item-value="id"
                v-model="courier"
                solo
                :rules="[v => !!v || 'Обязательное поле']"
              >
                <template slot="selection" slot-scope="data">
                  {{ data.item.first_name }} {{ data.item.last_name }}
                </template>
                <template slot="item" slot-scope="data">
                  {{ data.item.first_name }} {{ data.item.last_name }}
                </template>
              </v-select>
            </div>

            <div v-else class="d-flex align-center justify-space-between pa-7">
              <h4 class="grey-color mr-5">Курьер</h4>
              <h4 class="fw500 text-right">
                {{
                  `${order.courier.first_name} ${order.courier.last_name}` ||
                    "Курьер не выбран"
                }}
              </h4>
            </div>

            <div class="line"></div>
            <div class="d-flex align-center justify-space-between pa-7">
              <h4 class="grey-color mr-5">Статус</h4>
              <h4
                class="fw500 text-right"
                :style="`color:#${checkStatus(order.status).color}`"
              >
                {{ checkStatus(order.status).text }}
              </h4>
            </div>

            <div
              v-if="order.status < 3"
              class="btns d-flex align-center justify-end pa-7"
            >
              <button
                type="button"
                @click="cancel"
                class="red-btn-outline mx-3"
              >
                Отклонить
              </button>
              <button type="button" @click="accept" class="orange-btn mx-3">
                Принять
              </button>
            </div>

            <div
              v-if="order.status == 3"
              class="btns d-flex align-center justify-end pa-7"
            >
              <button type="button" @click="collected" class="orange-btn mx-3">
                Заказ собран
              </button>
            </div>
            <div
              v-if="order.status == 6"
              class="btns d-flex align-center justify-end pa-7"
            >
              <button type="submit" class="orange-btn mx-3">В путь</button>
            </div>
            <div
              v-if="order.status == 7"
              class="btns d-flex align-center justify-end pa-7"
            >
              <button
                v-if="$isCourier()"
                type="button"
                @click="deliver"
                class="orange-btn mx-3"
              >
                Доставлено
              </button>
            </div>
          </v-form>
          <v-form
            v-if="order.status == 9 && $isCourier()"
            ref="completeForm"
            @submit.prevent="complete"
          >
            <div class="btns d-flex align-start justify-space-between pa-7">
              <v-text-field
                class="my-input"
                solo
                v-model="secret_code"
                :rules="[v => !!v || 'Обязательное поле']"
              >
              </v-text-field>
              <button type="submit" class="orange-btn mx-3">Завершить</button>
            </div>
          </v-form>
        </div>

        <div class="right-box">
          <div
            v-if="order.status < 3"
            @click="edit = true"
            class="d-flex justify-end pointer ml-auto pt-6 px-7 pb-7"
          >
            <svg
              class="mr-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.57699 2.32422H6.46116C3.89866 2.32422 2.29199 4.13839 2.29199 6.70672V13.6351C2.29199 16.2034 3.89116 18.0176 6.46116 18.0176H13.8145C16.3853 18.0176 17.9845 16.2034 17.9845 13.6351V10.2784"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.35652 9.10074L13.584 2.87324C14.3599 2.09824 15.6174 2.09824 16.3932 2.87324L17.4074 3.88741C18.1832 4.66324 18.1832 5.92158 17.4074 6.69658L11.1499 12.9541C10.8107 13.2932 10.3507 13.4841 9.87069 13.4841H6.74902L6.82736 10.3341C6.83902 9.87074 7.02819 9.42908 7.35652 9.10074Z"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6377 3.83545L16.4427 7.64045"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Изменить
          </div>

          <div
            class="d-flex align-start product-box"
            v-for="(item, index) in order.order_items"
            :key="index"
          >
            <ProductItem :item="item" />
          </div>
          <div class="line"></div>
          <div class="pa-7 d-flex align-center justify-space-between">
            <p>Сумма</p>
            <p>
              {{ $price(order.total_price) }}
            </p>
          </div>
          <div class="line"></div>
          <div class="pa-7 d-flex align-center justify-space-between">
            <p class="fw700">Итого</p>
            <p class="fw700">
              {{ $price(order.total_price) }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="mt-4 d-flex align-end jusitfy-space-between">
        <div class="edit">
          <div
            class="d-flex align-start product-box"
            v-for="(item, index) in order.order_items"
            :key="index"
          >
            <ProductItem @changeArray="changeArray" :item="item" isEdit />
          </div>
          <div class="deliver pa-7">
            <p>Доставка</p>
            <p>Бесплатно</p>
          </div>
          <div class="deliver pa-7">
            <p>Сумма</p>
            <p>
              {{ $price(order.total_price) }}
            </p>
          </div>
          <div class="deliver pa-7">
            <p class="fw700">Итого</p>
            <p class="fw700">
              {{ $price(order.total_price) }}
            </p>
          </div>
        </div>
        <div class="edit-btns ml-5">
          <button @click="edit = false" class="red-btn-outline">Отмена</button>
          <button @click="changeOrder" class="mt-5 orange-btn">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/provider/Title";
import ProductItem from "@/components/provider/ProductItem";
export default {
  layout: "provider",
  middleware: ["courier"],
  components: { Title, ProductItem },
  data: () => ({
    courier: "",
    couriers: [],
    edit: false,
    order_items: [],
    secret_code: null
  }),
  async asyncData({ $axios, params }) {
    const order = await $axios.$get(`orders/${params.id}/`);
    return { order };
  },
  async fetch() {
    if (this.$auth.user.user_type != "C") {
      await this.$axios.$get(`couriers/`).then(res => {
        this.couriers = res.results;
      });
    }
    this.order = await this.$axios.$get(`orders/${this.order.id}`);
  },
  methods: {
    async complete() {
      if (!this.$refs.completeForm.validate()) return;
      await this.$axios
        .patch(`order/complete/${this.order.id}/`, {
          secret_code: this.secret_code
        })
        .then(res => {
          this.$fetch();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            text: `${error}`,
            color: "error"
          });
        });
    },
    changeArray(value) {
      let findOderItem = order_item => {
        return order_item.order_item == value.order_item;
      };
      let isfound = this.order_items.find(findOderItem);
      if (isfound) {
        let index = this.order_items.indexOf(isfound);
        if (index > -1) this.order_items[index] = value;
      } else this.order_items.push(value);
    },
    async collected() {
      await this.$axios
        .$patch(`order/collect/${this.order.id}/`, { courier: this.courier })
        .then(() => {
          this.$fetch();
        });
    },
    async toWay() {
      if (!this.$refs.courierRef.validate()) return;
      let form = {
        courier: this.courier
      };
      await this.$axios
        .$patch(`order/transit/${this.order.id}/`, form)
        .then(() => {
          this.$fetch();
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
    async deliver() {
      await this.$axios.$patch(`order/deliver/${this.order.id}/`).then(() => {
        this.$fetch();
      });
    },
    async accept() {
      await this.$axios.$patch(`order/confirm/${this.order.id}/`).then(() => {
        this.$fetch();
      });
    },
    async cancel() {
      await this.$axios.$patch(`order/cancel/${this.order.id}/`).then(() => {
        this.$fetch();
      });
    },
    async changeOrder() {
      await this.$axios
        .$post(`order/provider-change/`, { order_items: this.order_items })
        .then(() => {
          this.edit = false;
          this.$fetch();
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkStatus(status) {
      let result = {
        1: { text: `Новый заказ`, color: "FFC700" },
        2: { text: `Новый заказ`, color: "FFA800" },
        3: { text: `Принят`, color: "FF6B00" },
        4: { text: `Отменен`, color: "DF4041" },
        5: { text: `В заказ внесли изменения`, color: "FF3232" },
        6: { text: `Заказ собирают`, color: "7FE200" },
        7: { text: `Заказ в пути`, color: "72CA03" },
        8: { text: `Заказ Доставлен`, color: "0FBA00" },
        9: { text: `Проверка заказа`, color: "FFD029" },
        10: { text: `Завершен`, color: "52B059" }
      };
      return result[`${status}`];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";

.grey-color {
  color: #7b8794;
}
.left-box {
  width: 100%;
  max-width: 541px;
  background: #ffffff;
  border-radius: 4px;
  margin-right: 25px;
}

.line {
  width: 100%;
  height: 2px;
  opacity: 0.5;
  background: #e4e4e4;
}
.btns {
  button {
    max-width: 180px;
    height: 30px;
  }
}
.red-btn-outline {
  color: $red-color;
  &:hover {
    color: #ffffff;
  }
}
.right-box {
  max-width: 500px;
  width: 100%;
  background: #fff;
}

.edit {
  width: 100%;
  max-width: 780px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(138, 149, 158, 0.15);
  border-radius: 4px;
}
.edit-btns {
  width: 100%;
  max-width: 180px;
  button {
    height: 36px;
  }
}
.deliver {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 350px;
}
</style>
