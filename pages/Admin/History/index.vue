<template>
  <div class="mt-4 bg-white pb-12">
    <div class="d-flex align-center mt-4 mx-8">
      <v-select
        v-model="sort"
        class="my-input"
        :items="statuses"
        item-text="text"
        item-value="value"
        solo
        clearable
        color="#6bb4ff"
        prepend-inner-icon=""
        placeholder="По статусам"
        no-data-text="Ничего не найдено"
      >
      </v-select>
    </div>
    <div class="mt-8 mb-7 pl-8 pr-4 my-grid">
      <h3 class="blue-color mr-2">№</h3>
      <h3 class="blue-color mr-2">Поставщик</h3>
      <h3 class="blue-color mr-2">Покупатель</h3>
      <h3 class="blue-color mr-2">Цена</h3>
      <h3 class="blue-color mr-2">Статус</h3>
      <div class=""></div>
    </div>
    <div class="" v-for="(item, index) in orders.results" :key="item.id">
      <div
        @click="toggleIt(index)"
        class="pl-8 pr-4 py-3 my-grid pointer"
        :class="{ 'my-grid-active': index % 2 == 0 }"
      >
        <h3 class=" mr-2">{{ item.id }}</h3>
        <h3 class=" mr-2">{{ item.provider.individual_name }}</h3>
        <h3 class=" mr-2">
          {{ item.customer.first_name }} {{ item.customer.last_name }}
        </h3>
        <h3 class=" mr-2">
          {{ $price(item.total_price) }}
        </h3>
        <h3 class=" mr-2">{{ statusSet(item.status) }}</h3>
        <div class="">
          <svg
            class="pointer arrow"
            :class="{ 'arrow-rotate': toggle == index + 1 }"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.5L12 15.5L5 8.5"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div v-if="toggle == index + 1" class="box pl-8 pr-4 py-3">
        <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Поставщик:</p>
          <p class="p15 gilroy right-child">
            {{ item.provider.first_name }} {{ item.provider.last_name }} (
            {{ item.provider.individual_name }} )
          </p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Заказчик:</p>
          <p class="p15 gilroy right-child">
            {{ item.customer.first_name }} {{ item.customer.last_name }}
          </p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Товар:</p>
          <div class="pl-0 right-child">
            <p
              class="p15 gilroy"
              v-for="(product, indexj) in item.order_items"
              :key="product.id"
            >
              {{ product.provider_product.product.name }}
              {{ item.order_items.length - 1 > indexj ? ", " : "" }}
            </p>
          </div>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Общяя цена:</p>
          <p class="p15 gilroy right-child">{{ $price(item.total_price) }}</p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Способ оплаты:</p>
          <p class="p15 gilroy right-child">
            {{ paymentMethod(item.payment_method) }}
          </p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Оплата:</p>
          <p class="p15 gilroy right-child">
            {{ item.is_paid ? "оплачено " : "не оплачено" }}
          </p>
        </div>
        <!-- <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Город:</p>
          <p class="p15 gilroy right-child">Алматы</p>
        </div> -->
        <div class="d-flex mt-3">
          <p class="p15 gilroy left-child">Адрес:</p>
          <p class="p15 gilroy right-child">{{ item.address }}</p>
        </div>
      </div>
    </div>
    <div v-if="meta.pages > 1" class="bg-default mx-auto pt-10 pb-7">
      <v-pagination
        class=""
        v-model="pageNumber"
        :length="meta.pages"
        circle
        color="#6bb4ff"
        total-visible="10"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
import Search from "@/components/admin/Search";
export default {
  layout: "admin",
  components: { Search },
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 15,
      params = {
        "?page[number]": pageNumber,
        "page[size]": pageSize
      };

    const orders = await $axios.$get(`orders/`, { params });
    const all_history = await $axios.$get(`orders/`);
    return { pageNumber, pageSize, orders, all_history };
  },

  data: () => ({
    sort: "",
    toggle: 0,
    statuses: [
      {
        text: "Заказ создан",
        value: 1
      },
      {
        text: "Заказ оформлен",
        value: 2
      },
      {
        text: "Подтвержден поставщиком",
        value: 3
      },
      {
        text: "Заказ отменен",
        value: 4
      },
      {
        text: "Заказ изменен",
        value: 5
      },
      {
        text: "Заказ собирают",
        value: 6
      },
      {
        text: "Заказ в пути",
        value: 7
      },
      {
        text: "Доставлен",
        value: 8
      },
      {
        text: "Проверка заказа",
        value: 9
      },
      {
        text: "Заказ завершен",
        value: 10
      }
    ]
  }),
  created() {
    this.$store.commit("changeAdminMenu", "History");
  },
  watch: {
    sort() {
      this.fetchOrders();
    },
    pageNumber() {
      this.fetchOrders();
    }
  },
  computed: {
    meta() {
      if (this.orders?.meta?.pagination) return this.orders.meta.pagination;
      return { count: 30, page: 1, pages: 3 };
    }
  },
  methods: {
    async fetchOrders() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize
      };
      if (this.sort != "") params.status = this.sort;
      this.orders = await this.$axios.$get(`orders/`, { params });
      window.scrollTo({ top: 0 });
    },
    statusSet(status) {
      let result = {
        1: "Заказ создан",
        2: "Заказ оформлен",
        3: "Подтвержден поставщиком",
        4: "Заказ отменен",
        5: "Заказ изменен",
        6: "Заказ собирают",
        7: "Заказ в пути",
        8: "Доставлен",
        9: "Проверка заказа",
        10: "Заказ завершен"
      };
      return result[`${status}`];
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
    toggleIt(index) {
      index = index + 1;
      if (this.toggle == index) this.toggle = 0;
      else this.toggle = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";

.my-grid {
  display: grid;
  grid-template-columns: 7% 27% 27% 15% 20% 4%;
  &-active {
    background: #f2f6ff;
  }
  h3:last-child {
    word-break: break-all;
  }
}
.arrow {
  transition: 0.22s;
  &-rotate {
    transform: rotate(180deg);
  }
}

.box {
  width: 100%;
  border: 1px solid #f2f6ff;
  box-sizing: border-box;

  filter: drop-shadow(15px 15px 25px rgba(138, 149, 158, 0.15));
  border-radius: 5px;

  div {
    padding-left: 5%;
    .left-child {
      width: 160px;
      color: #9c9c9c;
    }
    .right-child {
      width: 100%;
      color: #313131;
    }
  }
}
</style>
