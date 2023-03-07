<template>
  <div class="">
    <div class="mt-4 bg-white pb-12 pt-5">
      <div class="mt-8 mb-7 pl-8 pr-4 my-grid">
        <h3 class="blue-color mr-2">№</h3>
        <h3 class="blue-color mr-2">ФИО</h3>
        <h3 class="blue-color mr-2">% по количеству</h3>
        <h3 class="blue-color mr-2">% по цене</h3>
        <h3 class="blue-color mr-2">Победитель</h3>
        <div class=""></div>
      </div>
      <div class="" v-for="(item, index) in users.results" :key="index">
        <div
          @click="toggleIt(index)"
          class="pl-8 pr-4 py-3 my-grid pointer"
          :class="{ 'my-grid-active': index % 2 == 0 }"
        >
          <h3 class=" mr-2">{{ index + 1 }}</h3>
          <h3 class=" mr-2">{{ item.first_name }} {{ item.last_name }}</h3>
          <h3 class=" mr-2">
            {{ calculatePriceLeft(item, "count").result_percentage }}%
          </h3>
          <h3 class=" mr-2">
            {{ calculatePriceLeft(item, "price").result_percentage }}%
          </h3>
          <h3 class=" mr-2">{{ item.winner }}</h3>
          <div class="d-flex justify-end">
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
            <p class="p15 gilroy">Количество купленных товаров:</p>
            <p class="p15 gilroy">
              {{ item.total_count }} шт. / {{ item.sub_promotion_count }} шт.
            </p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Сумма купленных товаров:</p>
            <p class="p15 gilroy">
              {{ $price(item.total_price) }} /
              {{ $price(item.sub_promotion_price) }}
            </p>
          </div>
          <div v-if="item.sub_promotion_additional_count" class="d-flex mt-3">
            <p class="p15 gilroy">Количество купленных товаров “Coca-Cola”:</p>
            <p class="p15 gilroy">
              {{ item.additional_total_count }} шт. /
              {{ item.sub_promotion_additional_count }} шт.
            </p>
          </div>
          <div v-if="item.sub_promotion_additional_price" class="d-flex mt-3">
            <p class="p15 gilroy">Сумма купленных товаров “Coca-Cola”:</p>
            <p class="p15 gilroy">
              {{ $price(item.additional_total_price) }} /
              {{ $price(item.sub_promotion_additional_price) }}
            </p>
          </div>
        </div>
      </div>
      <h2 v-if="users.results < 1" class="text-center mt-8">
        Нет пользователей продвигающеяся по акции
      </h2>
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
export default {
  layout: "admin",
  data: () => ({
    pageNumber: 1,
    pageSize: 10,
    users: [],
    toggle: 0
  }),
  async fetch() {
    let params = {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize,
      sub_promotion: this.$route.params.id
    };
    try {
      this.users = await this.$axios.$get(
        `/promotions/sup-promotions/result/`,
        { params }
      );
    } catch (e) {
      console.log(e);
    }
  },
  watch: {
    pageNumber() {
      this.$fetch();
    }
  },
  computed: {
    meta() {
      if (this.users?.meta?.pagination) return this.users.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Promotions");
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
        price = parseInt(item.sub_promotion_price) || 0,
        total_price = parseInt(item.total_price) || 0,
        count = parseInt(item.sub_promotion_count) || 0,
        total_count = parseInt(item.total_count) || 0,
        additional_count = parseInt(item.sub_promotion_additional_count) || 0,
        additional_total_count = parseInt(item.additional_total_count) || 0,
        additional_price = parseInt(item.sub_promotion_additional_price) || 0,
        additional_total_price = parseInt(item.additional_total_price) || 0;

      let calcLeft = {
        count: {
          main: count - total_count,
          add: additional_count - additional_total_count
        },
        price: {
          main: price - total_price,
          add: additional_price - additional_total_price
        }
      };

      leftmain = calcLeft[type].main || 0;
      leftadd = calcLeft[type].add || 0;

      if (leftmain < 0 || leftmain === NaN) leftmain = 0;
      if (leftadd < 0 || leftadd === NaN) leftadd = 0;

      let devidePercentage = {
        count: {
          main: this.getPercentage(100, count, count - additional_count),
          add: this.getPercentage(100, count, additional_count)
        },
        price: {
          main: this.getPercentage(100, price, price - additional_price),
          add: this.getPercentage(100, price, additional_price)
        }
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
          }
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
          }
        }
      };

      let result_percentage =
        Math.round(
          (calcPercentage[type].main() + calcPercentage[type].add()) * 10
        ) / 10;

      let result = {
        leftmain,
        leftadd,
        result_percentage
      };
      return result;
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
  grid-template-columns: 10% 35% 18% 18% 10% 9%;
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
    width: 100%;
    p:first-child {
      color: #9c9c9c;
      margin-right: 10px;
    }
    p:last-child {
      font-weight: 500;
      color: #313131;
    }
  }
}
</style>
