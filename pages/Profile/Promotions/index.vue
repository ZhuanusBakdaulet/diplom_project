<template>
  <div class="mr-3">
    <div class="nav d-flex align-center d-sm-none mb-5">
      <div @click="goBack" class="mob pointer">
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
      </div>
      <h4 class="w100">Акции</h4>
    </div>
    <div
      class="stocks mb-5"
      v-for="(item, index) in promotions.results"
      :key="index"
    >
      <div class="heading px-6 py-4">
        <h2 class="fw600">Акция “Выиграй машину!”</h2>
      </div>
      <div class="main_content d-flex align-start px-6 py-4">
        <div class="image mr-8">
          <img v-if="item.present_image" :src="item.present_image" alt="" />
          <img v-else src="@/assets/image/photos/default.svg" alt="" />
        </div>
        <div class="">
          <h3 class="fw400">
            {{ item.present_description }}
          </h3>
          <br />
          <h3 class="mt-2 fw400">
            Акция действительна до
            {{ $moment.unix(item.to_period).format("DD.MM.YYYY") }}
          </h3>
          <div v-if="item.promotion.promotion_type.length > 0" class="">
            <h3 class="mt-2 fw500">Дополнителные условия:</h3>
            <h3 v-if="item.promotion.provider" class="mt-2 fw400">
              Провайдер:
              <nuxt-link
                :to="`/Products?provider[]=${item.promotion.provider.id}`"
              >
                {{ item.promotion.provider.individual_name }}
              </nuxt-link>
            </h3>
            <h3 v-if="item.promotion.product" class="mt-2 fw400">
              Продукт:
              <nuxt-link
                :to="`/Products?search=${item.promotion.product.name}`"
              >
                {{ item.promotion.product.name }}
              </nuxt-link>
            </h3>
            <h3 v-if="item.promotion.brand" class="mt-2 fw400">
              Бренд:
              <nuxt-link :to="`/Products?brand[]=${item.promotion.brand.id}`">
                {{ item.promotion.brand.name }}
              </nuxt-link>
            </h3>
          </div>
        </div>
      </div>
      <div class="px-6 py-4">
        <div class="stocks_date">
          <h3 class="fw400">
            Осталось купить товаров:
            <span class="fw700">
              {{ calculatePriceLeft(item, "count").leftmain }}
            </span>
          </h3>
          <h3 class="fw400">
            Осталось купить дополнительных товаров:
            <span class="fw700">{{
              calculatePriceLeft(item, "count").leftadd
            }}</span>
          </h3>
          <div class="progress_bar mt-2">
            <div
              class="green_bar"
              :style="`max-width: ${
                calculatePriceLeft(item, 'count').result_percentage
              }%`"
            >
              <p class="fw700 white-color">
                {{ calculatePriceLeft(item, "count").result_percentage }}%
              </p>
            </div>
          </div>
        </div>
        <div class="stocks_date mt-4">
          <h3 class="fw400">
            Осталось купить товаров на сумму:
            <span class="fw700">{{
              $price(calculatePriceLeft(item, "price").leftmain)
            }}</span>
          </h3>
          <h3 class="fw400">
            Осталось купить дополнительных товаров на сумму:
            <span class="fw700">{{
              $price(calculatePriceLeft(item, "price").leftadd)
            }}</span>
          </h3>
          <div class="progress_bar mt-2">
            <div
              class="green_bar"
              :style="`max-width: ${
                calculatePriceLeft(item, 'price').result_percentage
              }%`"
            >
              <p class="fw700 white-color">
                {{ calculatePriceLeft(item, "price").result_percentage }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
export default {
  layout: "profile",
  middleware: ["auth", "notclient"],
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 5,
      params = {
        "page[number]": pageNumber,
        "page[size]": pageSize,
      };
    let promotions = await $axios
      .$get(`/promotions/me/`, { params })
      .catch((err) => {
        console.log(err);
      });
    return { promotions, pageNumber, pageSize };
  },
  watch: {
    pageNumber() {
      this.fetchPromotion();
    },
  },
  computed: {
    meta() {
      if (this.promotions?.meta?.pagination)
        return this.promotions.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
  },
  created() {
    this.$store.commit("changeProfileMenu", "Promotions");
  },
  methods: {
    getPercentage(total_percentage, goal, current) {
      let calcPercentage = (total_percentage * current) / goal;
      if (total_percentage === 0) calcPercentage = 0;
      return calcPercentage;
    },
    calculatePriceLeft(item, type) {
      let leftmain = 0,
        leftadd = 0,
        price = parseInt(item.price) || 0,
        total_price = parseInt(item.total_price) || 0,
        count = parseInt(item.count) || 0,
        total_count = parseInt(item.total_count) || 0,
        additional_count = parseInt(item.additional_count) || 0,
        additional_total_count = parseInt(item.additional_total_count) || 0,
        additional_price = parseInt(item.additional_price) || 0,
        additional_total_price = parseInt(item.additional_total_price) || 0;

      let calcLeft = {
        count: {
          main: count - total_count,
          add: additional_count - additional_total_count,
        },
        price: {
          main: price - total_price,
          add: additional_price - additional_total_price,
        },
      };

      leftmain = calcLeft[type].main || 0;
      leftadd = calcLeft[type].add || 0;

      if (leftmain < 0 || leftmain === NaN) leftmain = 0;
      if (leftadd < 0 || leftadd === NaN) leftadd = 0;

      let devidePercentage = {
        count: {
          main: this.getPercentage(100, count, count - additional_count),
          add: this.getPercentage(100, count, additional_count),
        },
        price: {
          main: this.getPercentage(100, price, price - additional_price),
          add: this.getPercentage(100, price, additional_price),
        },
      };

      let calcPercentage = {
        count: {
          main: () => {
            if (total_count >= count) total_count = count;

            return this.getPercentage(
              devidePercentage[type].main,
              count - additional_count,
              total_count - additional_total_count
            );
          },
          add: () => {
            if (additional_total_count >= additional_count)
              additional_total_count = additional_count;

            return this.getPercentage(
              devidePercentage[type].add,
              additional_count,
              additional_total_count
            );
          },
        },
        price: {
          main: () => {
            if (total_price >= price) total_price = price;

            return this.getPercentage(
              devidePercentage[type].main,
              price - additional_price,
              total_price - additional_total_price
            );
          },
          add: () => {
            if (additional_total_count >= additional_count)
              additional_total_count = additional_count;

            return this.getPercentage(
              devidePercentage[type].add,
              additional_price,
              additional_total_price
            );
          },
        },
      };

      let result_percentage =
        Math.round(
          (calcPercentage[type].main() + calcPercentage[type].add()) * 10
        ) / 10;

      let result = {
        leftmain,
        leftadd,
        result_percentage,
      };
      return result;
    },
    async fetchPromotion() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
      };
      this.promotions = await this.$axios
        .$get(`/promotions/me/`, { params })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  data: () => ({
    back: "<",
  }),
};
</script>

<style lang="scss" scoped>
.stocks {
  width: 100%;
  max-width: 944px;
  background: #fff;
  border-radius: 10px;

  .heading {
    border-bottom: 1px solid #e7e7e7;
  }
  .main_content {
    .image {
      width: 100%;
      max-width: 230px;
      height: 140px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
    }
    border-bottom: 1px solid #e7e7e7;
  }
  .stocks_date {
    .progress_bar {
      width: 100%;
      background: #f3f3f3;
      border-radius: 5px;

      .green_bar {
        width: 100%;
        min-width: 10%;
        padding: 5px 0 5px 15px;
        background: #52b059;
        border-radius: 5px;
      }
    }
  }
  h3 a {
    font-size: inherit;
    color: $orange-color;
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
  .stocks_date {
    h3 {
      font-size: 11px;
      line-height: 13px;
    }
  }
  h3 {
    font-size: 15px;
    line-height: 18px;
  }
}
</style>
