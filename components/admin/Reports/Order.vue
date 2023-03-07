<template>
  <div class="mt-4 bg-white">
    <div class="reports">
      <div class="reports_enum">
        <p>№</p>
        <p>Поставщик</p>
        <p>Клиент</p>
        <p>Номер Заказа</p>
        <p>Статус</p>
        <p>Дата</p>
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8395 17.1642V3.54639"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.9173 13.0684L14.8395 17.165L10.7617 13.0684"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.91127 0.833008V14.4508"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.833496 4.92919L4.91127 0.83252L8.98905 4.92919"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="reports_div">
        <div
          class="reports_content"
          v-for="(item, index) in orders.results"
          :key="item.id"
        >
          <p>{{ index + 1 }}</p>
          <p>{{ item.provider.individual_name }}</p>
          <p>{{ item.customer.first_name }} {{ item.customer.last_name }}</p>
          <p>{{ `№ ${item.id}` }}</p>
          <p>{{ getStatusName(item.status).name }}</p>
          <p>{{ $moment.unix(item.updated_at).format("DD.MM.YYYY") }}</p>
          <svg
            @click="goPage(item)"
            class="arrow"
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1L8.5 8L1.5 15"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
export default {
  layout: "admin",
  data: () => ({
    pageNumber: 1,
    pageSize: 10,
    orders: {}
  }),
  async fetch() {
    let params = `?page[number]=${this.pageNumber}&page[size]=${this.pageSize}&status=4&status=3`;
    this.orders = await this.$axios.$get(`orders/${params}`);
  },
  watch: {
    pageNumber() {
      this.$fetch();
    }
  },
  computed: {
    meta() {
      if (this.orders?.meta?.pagination) return this.orders.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Reports");
  },
  methods: {
    getStatusName(status) {
      let result = {
        1: {
          name: "Заказ создан",
          color: "#FFC700",
          colormain: "#FFC700"
        },
        2: {
          name: "В обработке",
          color: "#FFA800",
          colormain: "#FFA800"
        },
        3: {
          name: "Подтвержден поставщиком",
          color: "#FF6B00",
          colormain: "#FF6B00"
        },
        4: {
          name: "Отменён",
          color: "#DF4041",
          colormain: "#DF4041"
        },
        5: {
          name: "В ваш заказ внесли изменения",
          color: "#FF3232",
          colormain: "#FF3232"
        },
        6: {
          name: "Ваш заказ собирают",
          color: "#7FE200",
          colormain: "#7FE200"
        },
        7: {
          name: "Ваш заказ в пути",
          color: "#72CA03",
          colormain: "#72CA03"
        },
        8: {
          name: "Доставлен",
          color: "#0FBA00",
          colormain: "#0FBA00"
        },
        9: {
          name: "Проверка заказа",
          color: "#FFD029",
          colormain: "#FFD029"
        },
        10: {
          name: "Заказ завершен",
          color: "#52B059",
          colormain: "#52B059"
        }
      };
      if (status) return result[`${status}`];
      return result[1];
    },
    goPage(item) {
      this.$router.push({
        path: `/admin/Reports/order?id=${item.id}`
      });
    },

    active() {
      if (this.order == false) {
        this.rating == true;
      } else {
        this.rating == false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.reports {
  background: #fff;
  border-radius: 5px;

  padding-top: 15px;
}
.reports_title {
  display: flex;

  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 22px;
    color: #6bb4ff;
    display: block;
    text-align: center;
  }
  .first {
    width: 301px;
    display: block;
    content: "";
    border-bottom: 1px solid #6bb4ff;
  }
}
.reports_enum {
  display: grid;
  grid-template-columns: 1fr 3fr 4fr 3fr 2fr 2fr 1fr;
  width: 100%;

  padding-left: 30px;
  padding-right: 33px;

  p {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #52b1ba;
  }
}
.reports_div {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding-bottom: 40px;
}
.reports_content {
  display: grid;
  align-items: center;
  grid-template-columns: 6% 18% 25% 18% 12% 14% 7%;
  height: 43px;

  padding-left: 30px;

  &:nth-child(odd) {
    background: #f2f6ff;
  }
  &:nth-child(even) {
    background: #fff;
  }

  p {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #313131;
  }
  & p:nth-child(5) {
    color: #ff6b00;
  }

  .arrow {
    cursor: pointer;
  }
}
</style>
