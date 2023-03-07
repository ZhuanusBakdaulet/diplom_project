<template>
  <div class="">
    <div class="mob-filter__header">
      <div class="mob-filter__header__parts filter-view">
        <svg
          @click="changeProductView('block')"
          class="pointer filter-view__svg mr-4"
          :class="{ 'filter-view__svg-active': active_view == 'block' }"
          width="19"
          height="17"
          viewBox="0 0 19 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7V1H8V7H1ZM1 16V10H8V16H1ZM11 7V1H18V7H11ZM11 16V10H18V16H11Z"
            stroke="#7B8794"
            stroke-width="2"
          />
        </svg>

        <svg
          @click="changeProductView('line')"
          class="pointer filter-view__svg mr-4"
          :class="{ 'filter-view__svg-active': active_view == 'line' }"
          width="20"
          height="17"
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4V1H19V4H1ZM1 10V7H19V10H1ZM1 16V13H19V16H1Z"
            stroke="#7B8794"
            stroke-width="2"
          />
        </svg>
      </div>
      <div class="mob-filter__header__line"></div>
      <div class="mob-filter__header__parts filter-sort">
        <v-select
          :items="ordering"
          class="my-input-ordering"
          solo
          hide-details
          placeholder="По популярности"
          @change="handleOrderingChange"
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
                d="M11.622 15.5636C11.8214 15.7938 12.1786 15.7938 12.378 15.5636L16.4797 10.8273C16.7601 10.5035 16.5301 10 16.1017 10H7.8983C7.46992 10 7.2399 10.5035 7.52033 10.8273L11.622 15.5636Z"
                fill="#FF7A29"
              />
            </svg>
          </template>
        </v-select>
      </div>
      <div class="mob-filter__header__line"></div>
      <div
        @click="openFilter"
        class="mob-filter__header__parts filter-filters pointer"
      >
        Фильтры
      </div>
    </div>
    <div class="filters">
      <div class="py-5 px-4 white-bg mb-5">
        <h3>Категории</h3>
        <v-checkbox
          v-for="item in categories.slice(0, slice1)"
          :key="item.id"
          v-model="category"
          hide-details
          :label="item.name"
          color="#FF7A29"
          :value="item.id"
          @change="handleCategoryChange"
        ></v-checkbox>
        <p
          v-if="categories.length > 5 && slice1 == 5"
          @click="slice1 = categories.length"
          class="mt-4 show-more orange-color"
        >
          Показать все
        </p>
        <p
          v-else-if="categories.length > 5"
          @click="slice1 = 5"
          class="mt-4 show-more orange-color"
        >
          Скрыть все
        </p>
      </div>
      <div class="py-5 px-4 white-bg mb-5">
        <h3>Подкатегории</h3>
        <v-checkbox
          v-for="item in sub_categories.slice(0, slice2)"
          :key="item.id"
          v-model="sub_category"
          hide-details
          :label="item.name"
          color="#FF7A29"
          :value="item.id"
          @change="handleSubCategoryChange"
        ></v-checkbox>
        <p
          v-if="sub_categories.length > 5 && slice2 == 5"
          @click="slice2 = sub_categories.length"
          class="mt-4 show-more orange-color"
        >
          Показать все
        </p>
        <p
          v-else-if="sub_categories.length > 5"
          @click="slice2 = 5"
          class="mt-4 show-more orange-color"
        >
          Скрыть все
        </p>
      </div>

      <div class="py-5 px-4 white-bg mb-5">
        <h3>Город</h3>
        <v-checkbox
          v-for="item in cities.slice(0, slice3)"
          :key="item.id"
          v-model="city"
          hide-details
          :label="item.name"
          color="#FF7A29"
          :value="item.id"
          @change="handleCityChange"
        ></v-checkbox>
        <p
          v-if="cities.length > 5 && slice3 == 5"
          @click="slice3 = cities.length"
          class="mt-4 show-more orange-color"
        >
          Показать все
        </p>
        <p
          v-else-if="cities.length > 5"
          @click="slice3 = 5"
          class="mt-4 show-more orange-color"
        >
          Скрыть все
        </p>
      </div>

      <div class="py-5 px-4 white-bg mb-5">
        <button class="d-flex align-center" @click="clearFilter">
          <img
            class="mr-3"
            src="@/assets/image/icons/orange-cancel.svg"
            alt=""
          />
          Сбросить фильтр
        </button>
      </div>
    </div>
    <v-dialog v-model="show_filter" fullscreen persistent>
      <v-card class="filter-modal">
        <div class="filter-modal__header">
          <h3
            v-if="!filter_type"
            @click="closeFilter"
            class="filter-modal__header__btns pointer"
          >
            Отмена
          </h3>
          <svg
            v-else
            class="pointer"
            @click="goBackToAllFilters"
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 20.1428L11 14.1428L17 8.14282"
              stroke="#252626"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h2 class="filter-modal__header__title">Фильтр</h2>

          <h3 class="filter-modal__header__btns pointer" @click="clearFilter">
            Сбросить
          </h3>
        </div>

        <div v-if="!filter_type" class="filter-modal__filters">
          <div
            v-for="(item, index) in filters"
            :key="index"
            @click="changeFilterType(item.type)"
            class="filter-modal__filters__item"
          >
            {{ item.text }}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.7459 19.7589C7.44784 19.4667 7.42074 19.0095 7.66461 18.6873L7.7459 18.595L14.4734 12L7.7459 5.40503C7.44784 5.11283 7.42074 4.65558 7.66461 4.33338L7.7459 4.24106C8.04396 3.94887 8.51037 3.9223 8.83904 4.16137L8.93321 4.24106L16.2541 11.418C16.5522 11.7102 16.5793 12.1675 16.3354 12.4897L16.2541 12.582L8.93321 19.7589C8.60534 20.0804 8.07376 20.0804 7.7459 19.7589Z"
                fill="#7B8794"
              />
            </svg>
          </div>
        </div>
        <div v-else class="filter-modal__filters">
          <div
            v-for="(item, index) in filter_array"
            :key="index"
            class="filter-modal__filters__item"
          >
            <div class="checkbox removedefaultcheckbox">
              <v-checkbox
                :on-icon="``"
                :off-icon="``"
                v-model="chosen_arr"
                hide-details
                color="#FF7A29"
                :value="item.id"
                @change="handleFilterChange"
              >
                <template v-slot:label>
                  {{ item.name ? item.name : item.individual_name }}

                  <svg
                    class="checkbox-svg"
                    :class="{
                      'checkbox-svg-active': chosen_arr.includes(item.id)
                    }"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="#fff"
                      stroke="#E4E4E4"
                    />
                    <path
                      d="M9.62128 12.6923C9.25857 13.055 8.67005 13.055 8.30752 12.6923L6.27203 10.6568C5.90932 10.2943 5.90932 9.70576 6.27203 9.34323C6.63456 8.98053 7.22308 8.98053 7.58579 9.34323L8.79854 10.5558C8.89009 10.6472 9.03871 10.6472 9.13043 10.5558L12.4142 7.27203C12.7767 6.90932 13.3653 6.90932 13.728 7.27203C13.9021 7.4462 14 7.68252 14 7.92882C14 8.17512 13.9021 8.41144 13.728 8.58561L9.62128 12.6923Z"
                      fill="white"
                    />
                  </svg>
                </template>
              </v-checkbox>
            </div>
          </div>
          <h2 v-if="filter_array.length < 1">Ничего не найдено</h2>
        </div>
        <div class="filter-modal__checkboxes"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    show_filter: false,
    filter_array: [],
    filter_type: false,

    category: [],
    sub_category: [],
    city: [],
    chosen_arr: [],

    filter: {},
    slice1: 5,
    slice2: 5,
    slice3: 5,
    filters: [
      {
        type: "brand",
        text: "Бренд"
      },
      {
        type: "provider",
        text: "Поставщик"
      },
      {
        type: "category",
        text: "Категория"
      },
      {
        type: "sub_category",
        text: "Подкатегория"
      },
      {
        type: "city",
        text: "Город"
      }
    ],
    ordering: [
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
    ]
  }),
  props: {
    cities: { type: Array, default: [] },
    categories: { type: Array, default: [] },
    sub_categories: { type: Array, default: [] },
    providers: { type: Array, default: [] },
    brands: { type: Array, default: [] },
    active_view: { type: String, default: "block" },
    close_modal: Boolean
  },
  watch: {
    "$route.query"() {
      this.getQuery();
    },
    close_modal() {
      this.show_filter = false;
    }
  },
  created() {
    this.getQuery();
  },
  methods: {
    goBackToAllFilters() {
      this.filter_type = false;
    },
    changeFilterType(type) {
      let filter_arrays = {
        brand: this.brands,
        provider: this.providers,
        category: this.categories,
        sub_category: this.sub_categories,
        city: this.cities
      };

      this.filter_type = type;
      this.filter_array = filter_arrays[type];
    },
    changeProductView(type) {
      this.$emit("changeProductView", type);
    },
    openFilter() {
      this.show_filter = true;
    },
    closeFilter() {
      this.show_filter = false;
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
      this.category = [];
      this.sub_category = [];
      this.city = [];
      this.chosen_arr = [];
      this.filter = {};
      this.$emit("clearFilter");
    },
    handleFilterChange(item) {
      this.filter[this.filter_type] = item;
      this.$emit("filterChanged", this.filter);
    },
    handleOrderingChange(value) {
      this.filter.ordering = value;
      this.$emit("filterChanged", this.filter);
    },
    handleCategoryChange(value) {
      this.filter.category = value;
      this.$emit("filterChanged", this.filter);
    },
    handleSubCategoryChange(value) {
      this.filter.sub_category = value;
      this.$emit("filterChanged", this.filter);
    },
    handleCityChange(value) {
      this.filter.city = value;
      this.$emit("filterChanged", this.filter);
    }
  }
};
</script>

<style lang="scss" scoped>
.white-bg {
  background: #fff;
  border-radius: 3px;
}
.show-more {
  cursor: pointer;
  &:hover {
    color: $grey-color;
  }
}
@media (min-width: 769px) {
  .mob-filter__header {
    display: none;
  }
}
@media (max-width: 768px) {
  .filters {
    display: none;
  }
  .mob-filter__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 15px;

    &__line {
      width: 1px;
      height: 32px;
      border-right: 1px solid #e4e4e4;
    }
  }
  .filter-view {
    &__svg {
      transition: 0.22s;
      &:hover,
      &-active {
        path {
          stroke: $orange-color;
        }
      }
    }
  }
  .filter-sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;
  }
  .filter-filters {
    font-size: 14px;
    &:hover {
      color: $orange-color;
    }
  }
  .filter-modal {
    &__header {
      display: flex;
      justify-content: space-between;

      padding: 12px 15px;
      border-bottom: 1px solid #e4e4e4;
      &__title {
        font-weight: 500;
        font-size: 17px;
        line-height: 22px;
      }
      &__btns {
        font-weight: normal;
        font-size: 15px;
        line-height: 19px;
        color: $orange-color;
      }
    }
    &__filters {
      margin-top: 15px;
      padding: 0 15px;
      &__item {
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: normal;
        font-size: 15px;
        line-height: 19px;
        color: #252626;
        cursor: pointer;
      }
    }
  }
}
.checkbox {
  &-svg {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    transition: 0.22s;

    &:hover,
    &-active {
      circle {
        fill: #52b059;
      }
    }
  }
}
</style>
