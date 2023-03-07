<template>
  <div class="grey-bg">
    <v-container class="">
      <Bread class="mt-5" :links="links" />
      <Description :product="product" :isLike="isLike" @liked="liked" />

      <div id="shops" class="mt-sm-10 white-bg">
        <h2 class="fw600 px-5 py-3 py-sm-10">Поставщики и цены</h2>
        <Shop
          v-for="item in provider_products.results"
          :key="item.id"
          :item="item"
        />
        <h3
          v-if="
            provider_products.results && provider_products.results.length < 1
          "
          class="fw600 px-5 py-3 pb-10"
        >
          Товара нет в наличии
        </h3>
        <div
          v-if="
            provider_products.results && provider_products.results.length > 1
          "
          class="my-pagination mt-10 d-flex align-center justify-space-between"
        >
          <v-pagination
            class="mx-auto"
            v-model="pageNumber"
            :length="meta.pages"
            total-visible="10"
          >
          </v-pagination>
        </div>
      </div>
      <CatalogSwiper
        v-if="products.results"
        class="mt-10 mb-10"
        :catalog="products.results"
      />
    </v-container>
  </div>
</template>

<script>
import Bread from "@/components/ui/Bread";
import Shop from "@/components/ui/Shop";
import Description from "@/components/product/Description";
import CatalogSwiper from "@/components/product/CatalogSwiper";

export default {
  components: { Bread, Shop, Description, CatalogSwiper },
  async asyncData({ $axios, params, store }) {
    let pageNumber = 1;
    let pageSize = 10;
    let queryparams = {
      "page[number]": pageNumber,
      "page[size]": pageSize,
      is_top: true,
      product: params.id
    };

    if (!store.state.auth.loggedIn) {
      queryparams.user_type = store.state.client_type;
    }

    const product = await $axios.$get(`products/${params.id}/`, {
      params: queryparams
    });
    const products = await $axios.$get(`products/`, { params: queryparams });

    queryparams.product = params.id;
    queryparams.session_key = store.state.client_type;
    const provider_products = await $axios.$get(`provider-products/`, {
      params: queryparams
    });
    return { pageSize, pageNumber, product, products, provider_products };
  },
  data: () => ({
    isLike: false,
    links: [
      {
        text: "Главная",
        url: "/"
      },
      {
        text: "Каталог",
        url: "/Products"
      },
      {
        text: "Product",
        url: "/Products/1"
      }
    ],
    product: {}
  }),

  computed: {
    meta() {
      if (this.provider_products?.meta?.pagination)
        return this.provider_products.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  watch: {
    "$auth.loggedIn"() {
      this.fetchProviderProducts();
      this.fetchProduct();
    },
    "$store.state.client_type"() {
      this.fetchProviderProducts();
      this.fetchProduct();
    },
    pageNumber() {
      this.fetchProviderProducts();
    }
  },
  created() {
    this.changeLinks();
    this.initializeFavorites();
  },
  methods: {
    async fetchProduct() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        is_top: true,
        product: params.id
      };
      if (!this.$auth.loggedIn) {
        params.user_type = this.$store.state.client_type;
      }
      try {
        this.product = await this.$axios.$get(
          `products/${this.$route.params.id}/`
        );
        this.products = await this.$axios.$get(`products/`, { params });
        params.product = this.$route.params.id;
        this.provider_products = await this.$axios.$get(`provider-products/`, {
          params
        });
      } catch (err) {
        this.$notifier.showMessage({
          color: "error",
          text: "Не удалось загрузить данные"
        });
      }
    },
    async fetchProviderProducts() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        product: this.$route.params.id,
        user_type: this.$store.state.client_type
      };
      await this.$axios
        .$get(`provider-products/`, { params })
        .then(res => {
          this.provider_products = res;
        })
        .catch(() => {
          this.$notifier.showMessage({
            color: "error",
            text: "Не удалось загрузить данные"
          });
        });
    },
    changeLinks() {
      this.links[2].url = `${this.$route.fullPath}`;
      this.links[2].text = `${this.product.name}` || "Продукт";
    },
    checkIsLiked() {
      let find = favorite => {
        return favorite == this.product.id;
      };
      if (this.favorites.find(find)) this.isLike = true;
      else this.isLike = false;
    },
    initializeFavorites() {
      let results = this.$store.state.liked;
      this.favorites = [...results];
      this.checkIsLiked();
    },
    async liked() {
      if (this.$auth.loggedIn) {
        let liked_arr = this.$store.state.liked;
        if (liked_arr.includes(this.product.id)) {
          this.$store.commit("removeFromLiked", this.product.id);
        } else {
          this.$store.commit("addToLiked", this.product.id);
        }

        let body = {
          favorite_products: liked_arr
        };
        await this.$axios
          .patch(`auth/users/me/`, body)
          .then(() => {
            this.$store.dispatch("fetchFavoriteProducts");
            this.initializeFavorites();
            this.fetchProduct();
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else this.isLike = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .content {
  }
}
</style>
