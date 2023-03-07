<template>
  <div class="w100">
    <Title title="Отчеты" />

    <div class="d-flex row mx-0 align-center mt-4 type">
      <h3
        class="type-item fw600"
        @click="type = 'buyers'"
        :class="{ 'type-item-active': type == 'buyers' }"
      >
        Количество покупателей
      </h3>
      <h3
        class="type-item fw600"
        @click="type = 'orders'"
        :class="{ 'type-item-active': type == 'orders' }"
      >
        Отмененные заказы
      </h3>
      <h3
        class="type-item fw600"
        @click="type = 'sales'"
        :class="{ 'type-item-active': type == 'sales' }"
      >
        Продажи
      </h3>
    </div>

    <div class="d-flex row ma-0 align-center mt-4 filter">
      <div class="mr-5 w100  mt-4">
        <h3 class="">Выберите период</h3>
        <v-menu
          ref="menu"
          v-model="calendar"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              @click:clear="clearFilter"
              v-model="datesText"
              class="my-input-provider-new mt-1"
              solo
              label="Выберите период"
              prepend-inner-icon=""
              readonly
              hide-details="true"
              height="40px"
              v-bind="attrs"
              v-on="on"
              clearable
            >
              <template v-slot:append>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.09277 9.40445H20.9167"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.442 13.3097H16.4512"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0045 13.3097H12.0137"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.55769 13.3097H7.56695"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.442 17.1964H16.4512"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0045 17.1964H12.0137"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.55769 17.1964H7.56695"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.0438 2V5.29078"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.96564 2V5.29078"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.2383 3.5791H7.77096C4.83427 3.5791 3 5.21504 3 8.22213V17.2718C3 20.3261 4.83427 21.9999 7.77096 21.9999H16.229C19.175 21.9999 21 20.3545 21 17.3474V8.22213C21.0092 5.21504 19.1842 3.5791 16.2383 3.5791Z"
                    stroke="#CBCBCB"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </template>
            </v-text-field>
          </template>
          <v-date-picker
            range
            v-model="dates"
            no-title
            scrollable
            :max="maxdate"
            :min="mindate"
            :first-day-of-week="1"
            type="month"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="calendar = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dates)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div v-if="type == 'sales'" class="w100  mt-4">
        <h3 class="">Выберите товар</h3>
        <v-select
          @click:clear="clearFilter"
          v-model="filter.product"
          :items="products"
          item-value="id"
          item-text="name"
          placeholder="Все"
          class="my-input-provider-new mt-1"
          solo
          height="40px"
          hide-details="true"
          clearable
        >
          <template v-slot:append>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                fill="#CBCBCB"
              />
            </svg>
          </template>
        </v-select>
      </div>
      <div v-if="type == 'buyers'" class="w100  mt-4">
        <h3 class="">Выберите регион поставки {{ filter.city }}</h3>
        <v-select
          v-model="filter.city"
          :items="cities"
          item-value="id"
          item-text="name"
          class="my-input-provider-new mt-1"
          solo
          height="40px"
          hide-details="true"
          clearable
        >
          <template v-slot:append>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                fill="#CBCBCB"
              />
            </svg>
          </template>
        </v-select>
      </div>
    </div>

    <div class="d-flex row ma-0 align-start mt-8">
      <div class="charts mr-6">
        <div class="">
          <div class="my-chart">
            <client-only>
              <highcharts :options="chartOptions1"></highcharts>
            </client-only>
          </div>
          <div v-if="type == 'sales'" class="">
            <h3 class="blue-color fw600 mt-5">
              Общее количество купленных товаров за указанный период:
            </h3>
            <h2 class="mt-2 fw600">{{ total_count }}</h2>
          </div>
        </div>

        <div v-if="type == 'sales'" class="">
          <div class="my-chart mt-10">
            <client-only>
              <highcharts :options="chartOptions2"></highcharts>
            </client-only>
          </div>
          <h3 class="blue-color fw600 mt-5">
            Общая сумма заказов за указанный период:
          </h3>
          <h2 class="mt-2 fw600">
            {{ type == "sales" ? $price(total_sum) : total_sum }}
          </h2>
        </div>
      </div>

      <div v-if="type != 'sales'" class="chart-text mt-5">
        <h3 class="blue-color fw600">
          {{
            type == "buyers"
              ? `Общее количество покупателей в регионе ${getCityName(
                  filter.city
                )} на указанный период:`
              : type == "orders"
              ? `Количество отмененных покупателем заказов за указанный период:`
              : `Общая сумма заказов за указанный период: `
          }}
        </h3>
        <h2 class="mt-2 fw600">
          {{ type == "sales" ? $price(total_sum) : total_sum }}
        </h2>
        <h3 class="blue-color fw600 mt-4">
          {{
            type == "buyers"
              ? `Общее количество покупателей в регионе ${getCityName(
                  filter.city
                )}, заказавших товар у
            вас: `
              : type == "orders"
              ? `Количество отмененных вами заказов за указанный период:`
              : `Общее количество купленных товаров за указанный период:`
          }}
        </h3>
        <h2 class="mt-2 fw600">{{ total_count }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/provider/Title";
export default {
  layout: "provider",
  middleware: "provider",
  data: () => ({
    filter: {},
    report: null,
    cities: [],
    type: "buyers",
    calendar: false,
    dates: [],
    total_sum: 0,
    total_count: 0,
    products: [],
    chartOptions1: {
      chart: {
        type: "spline"
      },
      title: {
        text: ""
      },
      yAxis: {
        title: {
          text: ""
        }
      },
      xAxis: {
        title: {
          text: "Период по месяцам"
        },
        accessibility: {
          rangeDescription: "Range: 2010 to 2017"
        }
      },
      legend: {},
      series: []
    },
    chartOptions2: {
      chart: {
        type: "spline"
      },
      title: {
        text: ""
      },
      yAxis: {
        title: {
          text: ""
        }
      },
      xAxis: {
        title: {
          text: "Период по месяцам"
        }
      },
      legend: {},
      series: []
    }
  }),
  components: { Title },
  watch: {
    type() {
      this.filter = {};
      this.dates = [];
      this.$fetch();
      if (this.type == "sales") {
        this.fetchProducts();
      }
    },
    dates() {
      if (this.dates[0] && this.dates[1]) this.$fetch();
    },
    "filter.product"() {
      this.$fetch();
    },
    "filter.city"() {
      this.$fetch();
    }
  },
  async fetch() {
    let params = {};
    if (this.filter.product) params.product = this.filter.product;
    if (this.dates[0] && this.dates[1]) {
      let [from_period, to_period] = this.dates;
      params.from_period = this.$moment(from_period).unix();
      params.to_period = this.$moment(to_period).unix();
    }
    if (this.filter.city) params.city = this.filter.city;

    let api = {
      buyers: "statistic/customers/",
      orders: "statistic/cancel-order/",
      sales: "statistic/sales/"
    };

    try {
      this.report = await this.$axios.$get(`${api[this.type]}`, { params });
      this.setValues(this.report.results);
    } catch (e) {
      this.$notifier.showMessage({
        text: `Что то пошло не так`,
        color: "error"
      });
    }
  },
  computed: {
    maxdate() {
      let nextmonth = this.$moment()
        .add(1, "month")
        .format("YYYY-MM-DD");
      return nextmonth;
    },
    mindate() {
      let mindate = this.$auth.user.date_joined;
      console.log(mindate);
      let result = this.$moment
        .unix(mindate)
        .add(-1, "month")
        .format("YYYY-MM-DD");

      return result;
    },
    datesText() {
      if (this.dates[0] && this.dates[1]) {
        if (this.$moment(this.dates[0]) > this.$moment(this.dates[1])) {
          this.dates = [this.dates[1], this.dates[0]];
        }
        return this.dates.join(" ~ ");
      }
      return "";
    }
  },
  created() {
    this.$store.commit("changeProviderMenu", "Reports");
    this.fetchCities();
  },
  methods: {
    getCityName(id) {
      let findCity = city => {
        return city.id === id;
      };
      let result;
      if (this.cities.find(findCity)) result = this.cities.find(findCity).name;
      else result = "-";
      return result;
    },
    clearFilter() {
      this.dates = [];
      this.filter = {};
      // console.log(this.dates, this.filter);
      this.$fetch();
    },
    async fetchProducts() {
      let params = {
        provider: this.$auth.user.id
      };
      await this.$axios.$get(`products/`, { params }).then(res => {
        this.products = res.results;
      });
    },
    async fetchCities() {
      let { cities } = this.$auth.user;
      this.cities = cities;
    },

    setValues(arr) {
      let text = {
        buyers: {
          title: "Покупатели",
          text1: "Общее количество покупателей",
          text2: "Ваши покупатели"
        },
        orders: {
          title: "Отмененные заказы",
          text1: "Заказы отмененные покупателями",
          text2: "Заказы отмененные поставщиком"
        },
        sales: {
          title: "Продажи",
          text1: "Сумма заказов",
          text2: "Количество заказов"
        }
      };
      this.chartOptions1.title.text = text[this.type].title;
      this.chartOptions1.yAxis.title.text = text[this.type].title;

      this.total_count = 0;
      this.total_sum = 0;
      let arr_values1 = [];
      let arr_values2 = [];

      let series_res = {
        buyers: {
          field1: "registered_users",
          field2: "buyed_users"
        },
        orders: {
          field1: "customer_cancel",
          field2: "provider_cancel"
        },
        sales: { field1: "order_count", field2: "order_sale" }
      };
      arr.map(e => {
        let field1 = series_res[this.type].field1;
        let field2 = series_res[this.type].field2;

        this.total_count += parseInt(e[field1] || 0);
        this.total_sum += parseInt(e[field2] || 0);

        arr_values1.push(parseInt(e[field1]) || 0);
        arr_values2.push(parseInt(e[field2]) || 0);
      });

      if (this.type != "sales") {
        let series = [
          {
            name: text[this.type].text1,
            data: arr_values1,
            color: "#1F78B4"
          },
          {
            name: text[this.type].text2,
            data: arr_values2,
            color: "#A6CEE3"
          }
        ];
        this.chartOptions1.series = series;
      } else {
        let series1 = [
          {
            name: text[this.type].text1,
            data: arr_values1,
            color: "#1F78B4"
          }
        ];
        let series2 = [
          {
            name: text[this.type].text2,
            data: arr_values2,
            color: "#A6CEE3"
          }
        ];
        this.chartOptions1.series = series1;
        this.chartOptions2.series = series2;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";

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
h2 {
  color: #52b059;
}
p {
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #2c5282;
}
.filter {
  max-width: 715px;
  .w100 {
    max-width: 345px;
  }
}
.charts {
  width: 100%;
  max-width: 589px;
}
.my-chart {
  padding: 30px 40px;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(207, 207, 207, 0.25);
  border-radius: 5px;
}
.chart-text {
  max-width: 272px;
}
</style>
