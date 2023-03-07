<template>
  <div class="">
    <div class="nav d-flex align-center d-sm-none mb-5" @click="goBack">
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
      <h4 class="w100">Заказы</h4>
    </div>
    <div class="d-flex mt-5 align-end justify-start btns w-100">
      <button
        @click="active = 'current'"
        class="h3 orange-btn-text"
        :class="{ 'orange-btn-text-active': active == 'current' }"
      >
        Текущие
      </button>
      <button
        @click="active = 'history'"
        class="h3 orange-btn-text"
        :class="{ 'orange-btn-text-active': active == 'history' }"
      >
        История
      </button>
    </div>
    <div class="sort d-flex mt-4">
      <p
        @click="sortBy = 0"
        class="s pointer mx-2 ml-0"
        :class="[sortBy == 0 ? 'orange-color sort-active' : 'grey-color']"
      >
        Все
      </p>
      <p
        @click="sortBy = 1"
        class="s pointer mx-2"
        :class="[sortBy == 1 ? 'orange-color sort-active' : 'grey-color']"
      >
        Пн
      </p>
      <p
        @click="sortBy = 2"
        class="s pointer mx-2"
        :class="[sortBy == 2 ? 'orange-color sort-active' : 'grey-color']"
      >
        Вт
      </p>
      <p
        @click="sortBy = 3"
        class="s pointer mx-2"
        :class="[sortBy == 3 ? 'orange-color sort-active' : 'grey-color']"
      >
        Ср
      </p>
      <p
        @click="sortBy = 4"
        class="s pointer mx-2"
        :class="[sortBy == 4 ? 'orange-color sort-active' : 'grey-color']"
      >
        Чт
      </p>
      <p
        @click="sortBy = 5"
        class="s pointer mx-2"
        :class="[sortBy == 5 ? 'orange-color sort-active' : 'grey-color']"
      >
        Пт
      </p>
      <p
        @click="sortBy = 6"
        class="s pointer mx-2"
        :class="[sortBy == 6 ? 'orange-color sort-active' : 'grey-color']"
      >
        Сб
      </p>
      <p
        @click="sortBy = 7"
        class="s pointer mx-2"
        :class="[sortBy == 7 ? 'orange-color sort-active' : 'grey-color']"
      >
        Вс
      </p>
    </div>
    <div v-if="active == 'current' && orders.results" class="mt-8">
      <OrderItem
        v-for="(item, index) in orders.results"
        :key="index"
        :order="item"
      />
    </div>
    <div v-if="active == 'history' && orders.results" class="mt-8">
      <OrderItem
        v-for="(item, index) in orders.results"
        :key="index"
        :order="item"
        isRepeat
      />
    </div>
    <h2 v-if="orders.results.length < 1">Заказов нет</h2>
    <div v-if="meta.pages > 1" class="my-pagination mt-10">
      <v-pagination
        class=""
        v-model="pageNumber"
        :length="meta.pages"
        total-visible="10"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
import OrderItem from "@/components/profile/OrderItem";
import Menu from "@/components/profile/Menu";
export default {
  data: () => ({
    active: "current",
    orders: {},
    sortBy: 0,
    arrow: "<",
  }),
  components: {
    Menu,
    OrderItem,
  },
  middleware: ["auth", "notclient"],
  layout: "profile",
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 5;
    const orders = await $axios.$get(`orders/?
        page[number]=${pageNumber}
        &page[size]=${pageSize}
        &status=2
        &status=3
        &status=5
        &status=6
        &status=7
        &status=8
        &status=9
        `);
    return { orders, pageNumber, pageSize };
  },
  watch: {
    sortBy() {
      this.fetchOrders();
    },
    active() {
      this.pageNumber = 1;
      this.fetchOrders();
    },
    pageNumber() {
      window.scrollTo({ top: 0 });
      this.fetchOrders();
    },
  },
  computed: {
    meta() {
      if (this.orders?.meta?.pagination) return this.orders.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
  },
  created() {
    this.$store.commit("changeProfileMenu", "orders");
  },

  methods: {
    async fetchOrders() {
      let api = "";
      if (this.active == "current")
        api = `orders/?page[number]=${this.pageNumber}&page[size]=${this.pageSize}&status=2&status=3&status=5&status=6&status=7&status=8&status=9`;
      else
        api = `orders?page[number]=${this.pageNumber}&page[size]=${this.pageSize}&status=4&status=10`;

      if (this.sortBy != 0) api = `${api}&week_day=${this.sortBy}`;

      await this.$axios
        .$get(`${api}`)
        .then((res) => {
          this.orders = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 25%;
}
.main_text {
  display: flex;
  align-items: center;

  a {
    display: none;
    color: black;
  }
}
.fw600 {
  margin: 0 auto;
}
.orange-btn-text {
  width: 116px;
  border-bottom: 3px solid transparent;
  padding-bottom: 8px;
  text-align: left;
  &:hover,
  &-active {
    border-bottom: 3px solid #ff7a29;
  }
}
.sort {
  &-active {
    border-bottom: 3px solid #ff7a29;
  }
}
@media screen and (max-width: 600px) {
  .nav {
    h4 {
      margin: 0 auto;
      font-style: normal;
      font-weight: bold;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
    }
  }
  .orange-btn-text {
    font-size: 17px;
    line-height: 22px;
  }
  h3,
  .h3 {
    font-size: 13px !important;
    line-height: 16px !important;
  }
  .main_text {
    a {
      display: block;
    }
  }
  .btns button {
    width: 100%;
    text-align: center;
  }
  .sort {
    display: none !important;
  }
}
</style>
