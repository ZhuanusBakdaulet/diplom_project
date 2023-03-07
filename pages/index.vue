<template>
  <div class="">
    <Hero v-if="banners1" :banners="banners1.results" />
    <Categories v-if="categories" :categories="categories" />
    <Banners
      v-if="banners2 && banners3"
      :banners2="banners2.results"
      :banners3="banners3.results"
    />
    <Catalog v-if="products.results" :catalog="products" />
    <Brands v-if="brands.results" :brands="brands" />
    <MobileApp />
    <ChatBot v-if="!$isCallCenter()" />
  </div>
</template>

<script>
import Hero from "@/components/home/Hero";
import Categories from "@/components/Categories";
import Banners from "@/components/home/Banners";
import Catalog from "@/components/home/Catalog";
import MobileApp from "@/components/home/MobileApp";
import Brands from "@/components/ui/Brands";
export default {
  components: { Hero, Categories, Banners, Catalog, Brands, MobileApp },
  async asyncData({ $axios, store }) {
    const categories = await $axios.$get("categories/", {
      params: {
        "page[number]": 1,
        "page[size]": 12
      }
    });

    // const brands = await $axios.$get("brands/", {
    //   params: {
    //     "page[number]": 1,
    //     "page[size]": 5
    //   }
    // });

    const banners1 = await $axios.$get("banners/", {
      params: {
        "page[number]": 1,
        "page[size]": 1,
        banner_type: 1
      }
    });
    const banners2 = await $axios.$get("banners/", {
      params: {
        "page[number]": 1,
        "page[size]": 12,
        banner_type: 2
      }
    });
    const banners3 = await $axios.$get("banners/", {
      params: {
        "page[number]": 1,
        "page[size]": 4,
        banner_type: 3
      }
    });
    // if ((store.state.client_type == "I")) user_type = "S";
    let pageNumber = 1;
    let pageSize = 15;
    let params = {
      "page[number]": pageNumber,
      "page[size]": pageSize
    };

    let city = store.state.my_city.id;
    if (city) params.city = city;

    if (!store.state.auth.loggedIn) params.user_type = store.state.client_type;
    params.is_top = true;
    const products = await $axios.$get("products/", {
      params
    });
    return {
      categories,
      products,
      banners1,
      banners2,
      banners3,
      pageNumber,
      pageSize
    };
  },
  data: () => ({
    city_modal: false,
    brands: {
      results: [
        {
          image: require("@/assets/image/Brands/Heinz-logo logo.svg")
        },
        {
          image: require("@/assets/image/Brands/Logo_Nutella logo.svg")
        },
        {
          image: require("@/assets/image/Brands/Starbucks logo.svg")
        },
        {
          image: require("@/assets/image/Brands/coca-cola logo.svg")
        },
        {
          image: require("@/assets/image/Brands/Heinz-logo logo.svg")
        },
        {
          image: require("@/assets/image/Brands/Logo_Nutella logo.svg")
        }
      ]
    }
  }),
  computed: {
    clientType() {
      return this.$store.state.client_type;
    }
  },
  watch: {
    "$store.state.my_city"() {
      this.fetchProducts();
    },
    clientType() {
      this.fetchProducts();
    },
    "$auth.loggedIn"() {
      this.fetchProducts();
    }
  },
  methods: {
    async fetchProducts() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize
      };

      let city = this.$store.state.my_city.id;
      if (city) params.city = city;

      if (!this.$auth.loggedIn)
        params.user_type = this.$store.state.client_type;

      this.$axios
        .$get(`products/`, { params })
        .then(res => {
          this.products = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
