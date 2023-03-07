<template>
  <div>
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
      <h4 class="w100">Избранные</h4>
    </div>
    <div class="w100 white-bg py-3 px-4 py-sm-6">
      <div class="ml-auto filter">
        <v-select
          class="filter"
          hide-details
          v-model="sort"
          :items="sortby"
          item-text="text"
          item-value="value"
          placeholder="Продукты"
          solo
        >
        </v-select>
      </div>

      <p v-if="meta" class="found">
        Найдено
        {{ find(meta.count) }}
      </p>
      <div v-if="sort == 'products'" class="mt-5">
        <StaredItems
          :item="item"
          v-for="(item, index) in products.results"
          :key="index"
          @fetchFavorites="fetchFavorites"
        />
      </div>
      <div v-else class="mt-5">
        <StaredItemsProvider
          :item="item"
          v-for="(item, index) in products.results"
          :key="index"
          @fetchFavorites="fetchFavorites"
        />
      </div>
      <h3
        v-if="products.results && products.results.length == 0"
        class="f600 my-5 text-center"
      >
        В избранных ничего не найдено
      </h3>
      <div v-if="meta && meta.pages > 1" class="my-pagination mt-10">
        <v-pagination
          class=""
          v-model="pageNumber"
          :length="meta.pages"
          total-visible="10"
        >
        </v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import StaredItems from "@/components/profile/StaredItems";
import StaredItemsProvider from "@/components/profile/StaredItemsProvider";
export default {
  middleware: ["auth"],
  layout: "profile",
  data: () => ({
    pageNumber: 1,
    pageSize: 4,
    products: {},
    sort: "products",
    sortby: [
      { text: "Поставщики", value: "providers" },
      { text: "Продукты", value: "products" },
    ],
  }),
  components: { StaredItems, StaredItemsProvider },
  computed: {
    meta() {
      if (this.products?.meta?.pagination) return this.products.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
  },
  watch: {
    sort() {
      this.pageNumber = 1;
      this.fetchFavorites();
    },
    pageNumber() {
      this.fetchFavorites();
    },
  },
  created() {
    this.$store.commit("changeProfileMenu", "stared");
    this.fetchFavorites();
  },
  methods: {
    find(count) {
      if (count == 1)
        return ` ${count} ${this.sort == "products" ? "товар" : "поставщик"}`;
      else if (count >= 2 && count <= 4)
        return ` ${count} ${this.sort == "products" ? "товара" : "поставщика"}`;
      else
        return ` ${count} ${
          this.sort == "products" ? "товаров" : "поставщиков"
        }`;
    },
    async fetchFavorites() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
      };

      if (this.sort == "products") {
        await this.$axios
          .$get(`favorites/products/`, { params })
          .then((res) => {
            this.products = res;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await this.$axios
          .$get(`favorites/providers/`, { params })
          .then((res) => {
            this.products = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  width: 160px;
}
.found {
  font-size: 13px;
  line-height: 16px;
  color: #7b8794;
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
}
</style>
