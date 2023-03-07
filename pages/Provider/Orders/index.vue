<template>
  <div class="w100">
    <Title title="Заказы" />

    <div class="d-flex align-center mt-5 sorting ml-auto">
      <v-select
        v-if="!isCourier"
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
        hide-details
      >
      </v-select>
    </div>

    <div class="mt-7">
      <OrderBox
        class="mt-4"
        :item="item"
        v-for="(item, index) in orders.results"
        :key="index"
        @fetch="fetchOrders"
      />

      <h1 class="text-center" v-if="orders.results.length < 1">
        Заказов нет
      </h1>
    </div>

    <div v-if="meta.pages > 1" class="bg-default mx-auto pt-16 pb-7">
      <v-pagination
        class=""
        v-model="pageNumber"
        :length="meta.pages"
        circle
        color="warning"
        total-visible="10"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
import Title from "@/components/provider/Title";
import Search from "@/components/provider/Search";
import OrderBox from "@/components/provider/OrderBox";
export default {
  layout: "provider",
  middleware: ["courier"],
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 5,
      params = {
        "page[number]": pageNumber,
        "page[size]": pageSize
      };
    const orders = await $axios.$get(
      `orders/?status=2&status=3&status=4&status=5&status=6&status=7&status=8&status=9&status=10`,
      { params }
    );
    return { pageNumber, pageSize, orders };
  },
  data: () => ({
    active: "all",
    sort: "",
    orders: [],
    statuses: [
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
  components: { Title, Search, OrderBox },
  watch: {
    pageNumber() {
      this.fetchOrders();
    },
    sort() {
      this.pageNumber = 1;
      this.fetchOrders();
    }
  },

  methods: {
    async fetchOrders() {
      let params = ``;
      if (this.sort)
        params = `?page[number]=${this.pageNumber}&page[size]=${this.pageSize}&status=${this.sort}`;
      else
        params = `?page[number]=${this.pageNumber}&page[size]=${this.pageSize}&status=2&status=3&status=4&status=5&status=6&status=7&status=8&status=9&status=10`;
      this.orders = await this.$axios.$get(`orders/${params}`);
    }
  },
  computed: {
    isCourier() {
      if (this.$auth.user.user_type == "C") return true;
      return false;
    },
    meta() {
      if (this.orders?.meta?.pagination) return this.orders.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    }
  },
  created() {
    this.$store.commit("changeProviderMenu", "Orders");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";
.sorting {
  max-width: 400px;
}
.type {
  &-item {
    cursor: pointer;
    margin-right: 60px;
    color: #2c5282;
    border-bottom: 2px solid transparen;
    &-active {
      border-bottom: 2px solid #2c5282;
    }
  }
}
h3 {
  color: #2c5282;
}
.filter {
  display: flex;
  align-items: center;
  width: 100%;

  &-item {
    width: 100%;
    height: 60px;
    max-width: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.15px;
    color: #7b8794;
    font-weight: 400;
    cursor: pointer;
    transition: 0.22s;
    &:first-child {
      .line {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }
    &:last-child {
      .line {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    .line {
      width: 100%;
      height: 4px;
      background: #e4e4e4;
      margin-top: 10px;
    }

    &:hover,
    &-active {
      color: $green-color;
      .line {
        border-radius: 4px;
        background: $green-color;
      }
    }
  }
}
</style>
