<template>
  <div class="grey-bg">
    <v-container class="pb-16">
      <div class="mt-4 mb-5 d-flex align-center justify-space-between">
        <Bread :links="links" />
      </div>
      <div class="d-flex align-end mb-5 header-filters">
        <div class="d-flex">
          <div class="top-filter mr-7">
            <p class="ps">Выберите поставщика</p>
            <v-select
              v-model="provider"
              class="my-input-filter mt-1"
              :items="f_providers"
              item-text="individual_name"
              item-value="id"
              color="#FF7A29"
              solo
              hide-details
              no-data-text="ничего не найдено"
              clearable
              @change="handleProviderChange"
            ></v-select>
          </div>
          <div class="top-filter">
            <p class="ps">Выберите бренд</p>
            <v-select
              v-model="brand"
              class="my-input-filter mt-1"
              :items="f_brands"
              item-text="name"
              item-value="id"
              color="#FF7A29"
              solo
              hide-details
              no-data-text="ничего не найдено"
              clearable
              @change="handleBrandChange"
            ></v-select>
          </div>
        </div>

        <div class="sortby ml-auto mb-3">
          <div
            @click="selectClicked = !selectClicked"
            class="select d-flex align-center justify-space-between"
          >
            <p class="m">{{ ordering.text || "Сортировать по" }}</p>
            <img
              class="arrow"
              :class="[selectClicked ? 'arrow-active' : '']"
              src="@/assets/image/icons/down-arrow.svg"
              width="12"
              height="8"
              alt=""
            />
          </div>
          <div v-if="selectClicked" class="options">
            <p
              class=""
              v-for="(item, index) in sortby"
              :key="index"
              @click="sortBy(item)"
            >
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>

      <div class="content">
        <SideFilter
          @changeProductView="changeProductView"
          @filterChanged="filterChanged"
          @clearFilter="clearFilter"
          :categories="f_categories"
          :sub_categories="f_sub_categories"
          :cities="f_cities"
          :providers="f_providers"
          :brands="f_brands"
          :active_view="active_view"
          :close_modal="close_modal"
        />
        <div class="catalog">
          <p class="grey-color">Найдено {{ productCount(meta.count) }}</p>
          <div
            class="catalog-items mt-5"
            :class="{ 'catalog-items-line': active_view == 'line' }"
          >
            <ProductItem
              v-for="item in products.results"
              :key="item.id"
              :item="item"
              :active_view="active_view"
            />
          </div>
          <div
            class="my-pagination mt-10 d-flex align-center justify-space-between"
          >
            <v-pagination
              v-if="meta.pages > 1"
              class="mx-auto mx-sm-0"
              v-model="pageNumber"
              :length="meta.pages"
              total-visible="10"
              @input="handlePaginationChange"
            >
            </v-pagination>
            <div class="d-none d-sm-flex align-center">
              <p class="mx-2 mx-md-5 ">Показывать по:</p>
              <p
                @click="changePageSize(12)"
                class="mx-2 mx-md-5 pm paginate"
                :class="{ 'paginate-active': pageSize == 12 }"
              >
                12
              </p>
              <p
                @click="changePageSize(24)"
                class="mx-2 mx-md-5 pm paginate"
                :class="{ 'paginate-active': pageSize == 24 }"
              >
                24
              </p>
              <p
                @click="changePageSize(48)"
                class="mx-2 mx-md-5 pm paginate"
                :class="{ 'paginate-active': pageSize == 48 }"
              >
                48
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Bread from "@/components/ui/Bread";
import SideFilter from "@/components/ui/SideFilter";
import ProductItem from "@/components/ui/ProductItem";
export default {
  async asyncData({ $axios, query, store }) {
    let pageNumber = 1;
    let pageSize = 12;
    let params = {
      "page[number]": pageNumber,
      "page[size]": pageSize,
      ...query
    };
    if (!store.state.auth.loggedIn) {
      params.user_type = store.state.client_type;
    }

    let city = store.state.my_city.id;
    if (city) params.city = city;

    const products = await $axios.$get("products/", { params });
    return { products, pageNumber, pageSize };
  },
  data: () => ({
    close_modal: false,
    active_view: "block",
    selectClicked: false,
    links: [
      {
        text: "Главная",
        url: "/"
      },
      {
        text: "Каталог",
        url: "/Products"
      }
    ],
    sortby: [
      {
        text: "По популярности",
        value: "popularity"
      },
      {
        text: "По рейтингу",
        value: "rating"
      },
      {
        text: "По цене",
        value: "price"
      }
    ],
    provider: [],
    brand: [],
    ordering: {},
    filter: {},
    f_providers: [],
    f_brands: [],
    f_categories: [],
    f_sub_categories: [],
    f_cities: []
  }),

  components: { Bread, SideFilter, ProductItem },
  computed: {
    meta() {
      if (this.products?.meta?.pagination) return this.products.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  watch: {
    "$route.query"() {
      this.pageNumber = 1;
      this.filter = { ...this.$route.query };
      this.fetchFilters();
      this.fetchProducts();
    },
    "$store.state.my_city"() {
      this.pageNumber = 1;
      this.fetchFilters();
      this.fetchProducts();
    },
    "$store.state.client_type"() {
      this.pageNumber = 1;
      this.fetchFilters();
      this.fetchProducts();
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeListener);
  },
  created() {
    this.fetchFilters();
    this.getQuery();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeListener);
  },
  methods: {
    resizeListener() {
      let width = window.innerWidth;
      if (width > 749) {
        this.close_modal = true;
        this.active_view = "block";
      }
    },
    changeProductView(value) {
      this.active_view = value;
    },
    getQuery() {
      this.filter = {
        ...this.$route.query
      };
      this.turnFilterToInt();
    },
    turnFilterToInt() {
      Object.keys(this.filter).map(e => {
        if (Number(this.filter[e])) this.filter[e] = Number(this.filter[e]);
      });
    },
    clearFilter() {
      if (Object.keys(this.$route.query).length != 0)
        this.$router.replace({ query: null });
      this.ordering = {};
      this.filter = {};
      this.fetchProducts();
      this.fetchFilters();
    },
    filterChanged(value) {
      this.filter = {
        ...this.filter,
        ...value
      };
      if (!value.category) this.filter.category = null;
      if (!value.sub_category) this.filter.sub_category = null;
      if (!value.city) this.filter.city = null;
      if (!value.ordering) this.filter.ordering = null;
      this.pageNumber = 1;
      this.fetchFilters();
      this.fetchProducts();
    },
    sortBy(item) {
      this.ordering = item;
      this.selectClicked = false;
      this.fetchProducts();
    },
    async fetchFilters() {
      try {
        let params = {
          ...this.filter,
          user_type: this.$store.state.client_type
        };

        const providers = await this.$axios.$get(`auth/users/`, {
          params
        });
        const brands = await this.$axios.$get(`brands/`, { params });
        const categories = await this.$axios.$get(`categories/`, { params });
        const sub_categories = await this.$axios.$get(`sub-categories/`, {
          params
        });
        const cities = await this.$axios.$get(`geo/cities/`, { params });

        this.f_brands = brands.results;
        this.f_providers = providers.results;
        this.f_categories = categories.results;
        this.f_sub_categories = sub_categories.results;
        this.f_cities = cities.results;
      } catch (err) {
        this.$notifier.showMessage({
          color: "warning",
          text: "Не удалось загрузить данные"
        });
      }
    },
    async fetchProducts() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        ordering: this.ordering.value,
        ...this.filter
      };

      let city = this.$store.state.my_city.id;
      if (!params.city && city) params.city = city;

      if (!this.$auth.loggedIn)
        params.user_type = this.$store.state.client_type;

      await this.$axios
        .$get("products/", {
          params
        })
        .then(res => {
          this.products = res;
        })
        .catch(err => {
          this.$notifier.showMessage({
            color: "warning",
            text: "Не удалось загрузить данные"
          });
        });
    },
    productCount(count) {
      return count + " товаров";
    },
    handlePaginationChange(value) {
      window.scrollTo(0, 0);
      this.fetchProducts();
    },
    handleProviderChange(value) {
      this.filter.provider = [value];
      this.pageNumber = 1;
      this.fetchFilters();
      this.fetchProducts();
    },
    handleBrandChange(value) {
      this.filter.brand = [value];
      this.pageNumber = 1;
      this.fetchFilters();
      this.fetchProducts();
    },
    changePageSize(value) {
      window.scrollTo(0, 0);
      this.pageSize = value;
      this.pageNumber = 1;
      this.fetchProducts();
    }
  }
};
</script>

<style lang="scss" scoped>
.top-filter {
  width: 100%;
  max-width: 300px;
}
.sortby {
  width: 240px;
  position: relative;
  .select {
    width: 240px;
    height: 32px;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 0px 20px;
    cursor: pointer;
  }
  .options {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    padding: 12px 20px;
    z-index: 100;
    background: #fff;

    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    border-radius: 3px;
    cursor: pointer;
    p {
      width: 100%;
      margin-bottom: 17px;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: $orange-color;
      }
    }
  }
}
.arrow {
  transition: 0.2s;
  &-active {
    transform: rotate(180deg);
  }
}
.content {
  display: grid;
  grid-template-columns: 236px 1fr;
  grid-gap: 20px;
}

.catalog {
  &-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
    @media (max-width: 1240px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    &-line {
      display: block;
    }
  }
}
.paginate {
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;
  &-active,
  &:hover {
    font-weight: 600;
    border-bottom: 2px solid $black-color;
  }
}
@media (max-width: 768px) {
  .content {
    display: block;
  }
  .header-filters {
    display: none !important;
  }
}
</style>
