<template>
  <div class="mt-4 bg-white">
    <div class="d-flex align-center py-4">
      <button @click="openModal('country')" class="ml-auto blue-btn-outline">
        <svg
          class="mr-2"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="5" width="12" height="2" fill="#6BB4FF" />
          <rect
            width="12"
            height="2"
            transform="matrix(0 -1 -1 0 7 12)"
            fill="#6BB4FF"
          />
        </svg>
        Добавить страну
      </button>
      <button @click="openModal('city')" class="ml-5 blue-btn-outline mr-8">
        <svg
          class="mr-2"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="5" width="12" height="2" fill="#6BB4FF" />
          <rect
            width="12"
            height="2"
            transform="matrix(0 -1 -1 0 7 12)"
            fill="#6BB4FF"
          />
        </svg>
        Добавить город
      </button>
    </div>
    <div class="mt-8 mb-7 pl-8 pr-4 my-grid">
      <h3 class="blue-color mr-2">Страна</h3>
      <h3 class="blue-color mr-2">Код страны</h3>
      <div class=""></div>
    </div>
    <div class="" v-for="(item, index) in countries.results" :key="item.id">
      <div
        @click="toggleIt(index, item.id)"
        class="pl-8 pr-4 py-3 my-grid pointer"
        :class="{ 'my-grid-active': index % 2 == 0 }"
      >
        <h3 class="mr-2">{{ item.name }}</h3>
        <h3 class="mr-2">{{ item.code }}</h3>
        <div class="ml-auto">
          <svg
            @click.stop="toggleIt"
            @click="edit('country', item.id)"
            class="mx-auto pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4922 2.78906H7.75324C4.67824 2.78906 2.75024 4.96606 2.75024 8.04806V16.3621C2.75024 19.4441 4.66924 21.6211 7.75324 21.6211H16.5772C19.6622 21.6211 21.5812 19.4441 21.5812 16.3621V12.3341"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.82775 10.921L16.3008 3.44799C17.2318 2.51799 18.7408 2.51799 19.6718 3.44799L20.8888 4.66499C21.8198 5.59599 21.8198 7.10599 20.8888 8.03599L13.3798 15.545C12.9728 15.952 12.4208 16.181 11.8448 16.181H8.09875L8.19275 12.401C8.20675 11.845 8.43375 11.315 8.82775 10.921Z"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.1652 4.60254L19.7312 9.16854"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
      <div v-if="toggle == index + 1 && cities" class="">
        <div
          class="sub-category px-12 py-3 d-flex align-center"
          v-for="itemj in cities"
          :key="itemj.id"
        >
          <p class="p13 gilroy">
            {{ itemj.name }}
          </p>
          <svg
            @click="edit('city', itemj.id)"
            class="ml-auto mr-8 pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4922 2.78906H7.75324C4.67824 2.78906 2.75024 4.96606 2.75024 8.04806V16.3621C2.75024 19.4441 4.66924 21.6211 7.75324 21.6211H16.5772C19.6622 21.6211 21.5812 19.4441 21.5812 16.3621V12.3341"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.82775 10.921L16.3008 3.44799C17.2318 2.51799 18.7408 2.51799 19.6718 3.44799L20.8888 4.66499C21.8198 5.59599 21.8198 7.10599 20.8888 8.03599L13.3798 15.545C12.9728 15.952 12.4208 16.181 11.8448 16.181H8.09875L8.19275 12.401C8.20675 11.845 8.43375 11.315 8.82775 10.921Z"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.1652 4.60254L19.7312 9.16854"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="pb-12"></div>
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
    <v-dialog v-model="modal" width="677">
      <v-card class="pa-10">
        <div @click="modal = false" class="close">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7756 1.42052L14.6703 0.328417C14.3713 0.0293538 13.8772 0.0293538 13.5651 0.328417L8.05193 5.84146L2.43487 0.224395C2.13567 -0.0747984 1.64157 -0.0747984 1.32963 0.224395L0.224395 1.32963C-0.0747984 1.62869 -0.0747984 2.1228 0.224395 2.43487L5.82859 8.03906L0.328417 13.5652C0.0293538 13.8643 0.0293538 14.3584 0.328417 14.6705L1.43365 15.7757C1.73272 16.0748 2.22682 16.0748 2.53889 15.7757L8.05193 10.2625L13.5651 15.7757C13.8642 16.0748 14.3583 16.0748 14.6703 15.7757L15.7756 14.6705C16.0746 14.3714 16.0746 13.8773 15.7756 13.5652L10.2494 8.05206L15.7626 2.53902C16.0746 2.22669 16.0746 1.73259 15.7756 1.42052Z"
              fill="#6BB4FF"
            />
          </svg>
        </div>
        <h1 class="blue-color fw500">
          {{ isedit ? "Редактировать" : "Добавить" }}
          {{ active == "country" ? "страну" : "город" }}
        </h1>
        <v-form
          v-if="active == 'country'"
          ref="geoForm"
          @submit.prevent="submit"
          class="mt-7"
        >
          <p class="p15 gilroy mt-3">Название страны</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.name"
            placeholder="Название страны"
            solo
            :rules="[rules.required]"
          ></v-text-field>

          <p class="p15 gilroy mt-3">Код страны</p>
          <v-text-field
            class="my-input mt-2 text-uppercase"
            v-model="form.code"
            placeholder="Код страны (Пример: KZ)"
            solo
            :rules="[rules.required, rules.counter, rules.uppercase]"
            maxlength="2"
          ></v-text-field>
          <button type="submit" class="blue-btn mt-4">
            {{ isedit ? "Изменить" : "Добавить" }}
          </button>
        </v-form>
        <v-form v-else ref="geoForm" @submit.prevent="submit" class="mt-7">
          <p class="p15 gilroy mt-3">Выберите страну</p>
          <v-select
            :items="countries.results"
            item-text="name"
            item-value="id"
            class="my-input mt-2"
            v-model="form.country"
            placeholder="Выбрать страну"
            solo
            :rules="[rules.required]"
            no-data-text="Ничего не найдено"
          ></v-select>

          <p class="p15 gilroy mt-3">Название города</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.name"
            placeholder="Название города"
            solo
            :rules="[rules.required]"
          ></v-text-field>
          <button type="submit" class="blue-btn mt-4">
            {{ isedit ? "Изменить" : "Добавить" }}
          </button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Search from "@/components/admin/Search";
export default {
  layout: "admin",
  components: { Search },
  async asyncData({ $axios }) {
    let pageNumber = 1;
    let pageSize = 10;
    let countries = await $axios.$get(`geo/countries/`, {
      params: {
        "page[number]": pageNumber,
        "page[size]": pageSize
      }
    });

    return { pageNumber, pageSize, countries };
  },
  data: () => ({
    isedit: false,
    cities: [],
    toggle: 0,
    id: false,
    active: "country",
    form: {},
    modal: false,
    rules: {
      required: v => !!v || "Обязательное поле",
      counter: v => v?.length == 2 || "Год Страны не правильный",
      uppercase: v => v == v?.toUpperCase() || v?.toUpperCase()
    }
  }),
  created() {
    this.$store.commit("changeAdminMenu", "Geo");
  },
  watch: {
    pageNumber() {
      this.fetchCountries();
    }
  },
  computed: {
    meta() {
      if (this.countries?.meta?.pagination)
        return this.countries.meta.pagination;
      return { count: 30, page: 1, pages: 3 };
    },
    samePasswords() {
      if (this.form.password1 && this.form.password2) {
        if (this.form.password1 !== this.form.password2) return false;
      }
      return true;
    }
  },
  methods: {
    async submit() {
      let api = `countries`;
      if (this.active == "city") api = `cities`;

      if (!this.$refs.geoForm.validate()) return;
      if (this.isedit) {
        await this.$axios
          .$patch(`geo/${api}/${this.id}/`, {
            ...this.form
          })
          .then(res => {
            this.fetchCountries();
            this.modal = false;
            this.toggle = 0;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        await this.$axios
          .$post(`geo/${api}/`, {
            ...this.form
          })
          .then(res => {
            this.fetchCountries();
            this.modal = false;
            this.toggle = 0;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    openModal(type) {
      this.isedit = false;
      if (this.$refs.geoForm) this.$refs.geoForm.reset();
      this.form = {};
      this.active = type;
      this.modal = true;
    },
    edit(type, id) {
      this.isedit = true;
      this.active = type;
      this.id = id;

      let api = `countries`;
      if (type == "city") api = `cities`;

      this.$axios
        .$get(`geo/${api}/${id}/`)
        .then(res => {
          this.form = res;
          this.modal = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchCountries() {
      await this.$axios
        .$get(`geo/countries/`, {
          params: {
            "page[number]": this.pageNumber,
            "page[size]": this.pageSize
          }
        })
        .then(res => {
          this.countries = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchCities(id) {
      await this.$axios
        .$get(`geo/cities/`, {
          params: {
            country: [id]
          }
        })
        .then(res => {
          this.cities = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleIt(index, id) {
      this.cities = [];
      this.fetchCities(id);
      index = index + 1;
      if (this.toggle == index) this.toggle = 0;
      else this.toggle = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.blue-btn-outline {
  max-width: 200px;
}
.blue,
.my-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.sub-category {
  &:hover {
    background: #f2f6ff;
    cursor: pointer;
  }
}
</style>
