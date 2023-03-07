<template>
  <div class="mt-4 bg-white">
    <div class="d-flex align-center mt-4 mx-8">
      <Search
        class="mr-8"
        @searchit="searchit"
        :placeholder="'Поиск по Категориям'"
        :items="all_users.results"
        :itemText="'first_name'"
      />
      <button @click="openModal()" class="ml-auto blue-btn-outline">
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
        Добавить
      </button>
    </div>
    <div class="mt-8 mb-7 pl-8 pr-4 my-grid">
      <h3 class="blue-color mr-2">№</h3>
      <h3 class="blue-color mr-2">ФИО</h3>
      <h3 class="blue-color mr-2">Контакты</h3>
      <h3 class="blue-color mr-2">Тип пользователя</h3>
      <h3 class="blue-color mr-2">Почта</h3>
      <div class=""></div>
    </div>
    <div class="" v-for="(item, index) in users.results" :key="item.id">
      <div
        @click="toggleIt(index)"
        class="pl-8 pr-4 py-3 my-grid pointer"
        :class="{ 'my-grid-active': index % 2 == 0 }"
      >
        <h3 class="mr-2">{{ index + 1 }}</h3>
        <h3 class="mr-2">{{ item.first_name }} {{ item.last_name }}</h3>
        <h3 class="mr-2">{{ item.phone_number }}</h3>
        <h3 class="mr-2">Менеджер</h3>
        <h3 class="mr-2">{{ item.email }}</h3>
        <div class="">
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
          <p class="p15 gilroy">ФИО:</p>
          <p class="p15 gilroy">{{ item.first_name }} {{ item.last_name }}</p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy">Контакты:</p>
          <p class="p15 gilroy">{{ item.phone_number }}</p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy">Тип пользователя:</p>
          <p class="p15 gilroy">Менеджер</p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy">Почта:</p>
          <p class="p15 gilroy">{{ item.email }}</p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy">Страна:</p>
          <p class="p15 gilroy">
            {{ item.city ? item.city.country.name : "" }}
          </p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy">Город:</p>
          <p class="p15 gilroy">
            {{ item.city ? item.city.name : "" }}
          </p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy">Адрес:</p>
          <p class="p15 gilroy">{{ item.address }}</p>
        </div>
        <div class="d-flex mt-3">
          <p class="p15 gilroy">Регион доставки:</p>
          <p class="p15 gilroy">
            <span v-for="(city, cityid) in item.cities" :key="cityid">
              {{ city.name }} {{ city.country.name }} {{ city.country.code }}
              <br />
            </span>
          </p>
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
    <v-dialog v-model="sure_modal" width="467">
      <v-card class="px-11 py-12">
        <div @click="sure_modal = false" class="close">
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
        <h2 class="blue-color text-center mt-5">
          Вы уверены, что хотите деактивировать этот аккаунт?
        </h2>
        <div class="btns mt-6 d-flex align-center justify-space-between">
          <button @click="cancel" class="red-btn-outline">
            Отменить
          </button>
          <button @click="accept" class="blue-btn">
            Деактивировать
          </button>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="user_modal" width="677">
      <v-card class="pa-10">
        <div @click="user_modal = false" class="close">
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
        <h1 class="blue-color fw500">Добавить Менеджера</h1>
        <v-form ref="userform" @submit.prevent="submitUser" class="mt-7">
          <div class="d-flex">
            <div class="col-6 py-0">
              <p class="p15 gilroy mt-3">Имя</p>
              <v-text-field
                class="my-input mt-2"
                v-model="form.first_name"
                placeholder="Имя"
                solo
                :rules="[rules.required]"
              ></v-text-field>
            </div>

            <div class="col-6 py-0">
              <p class="p15 gilroy mt-3">Фамилия</p>
              <v-text-field
                class="my-input mt-2"
                v-model="form.last_name"
                placeholder="Фамилия"
                solo
                :rules="[rules.required]"
              ></v-text-field>
            </div>
          </div>

          <div class="d-flex">
            <div class="col-6 py-0">
              <p class="p15 gilroy mt-3">Мобильный телефон</p>
              <v-text-field
                class="my-input mt-2"
                v-model="form.phone_number"
                placeholder="+"
                solo
                :rules="[rules.required]"
              ></v-text-field>
            </div>

            <div class="col-6 py-0">
              <p class="p15 gilroy mt-3">Пароль</p>
              <v-text-field
                class="my-input mt-2"
                v-model="form.password"
                placeholder="Пароль"
                solo
                :rules="[rules.required, rules.password]"
                type="password"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-6 py-0">
              <p class="p15 gilroy mt-3">Почта</p>
              <v-text-field
                class="my-input mt-2"
                v-model="form.email"
                placeholder="email"
                solo
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </div>
            <div class="col-6 py-0">
              <p class="p15 gilroy mt-3">Подтвердите пароль</p>
              <v-text-field
                class="my-input mt-2"
                v-model="form.password2"
                placeholder="Подтвердите пароль"
                solo
                :rules="[
                  rules.required,
                  rules.password,
                  v => samePasswords || 'Пароли не совпадают'
                ]"
                type="password"
              ></v-text-field>
            </div>
          </div>

          <button type="submit" class="blue-btn mt-4">Далее</button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Search from "@/components/admin/Search";
export default {
  layout: "admin",
  middleware: "admin",
  components: { Search },
  async asyncData({ $axios }) {
    let pageNumber = 1;
    let pageSize = 10;
    let params = {
      "page[number]": pageNumber,
      "page[size]": pageSize,
      user_type: "M"
    };
    const users = await $axios.$get(`auth/users/`, { params });
    const all_users = await $axios.$get(`auth/users/`);

    return { pageNumber, pageSize, users, all_users };
  },
  data: () => ({
    form: {},
    cities: [],
    countries: [],
    user_modal: false,
    sure_modal: false,
    toggle: 0,
    rules: {
      required: v => !!v || "Обязательное поле",
      email: v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || "Неверный email";
      },
      phone: v => (v && v.length == 16) || "Неверный телефон",
      password: v => (v && v.length >= 8) || "Минимум 8 символов"
    }
  }),
  created() {
    this.$store.commit("changeAdminMenu", "Managers");
  },
  computed: {
    meta() {
      if (this.users?.meta?.pagintaion) return this.users.meta.pagintaion;
      return { count: 1, page: 1, pages: 1 };
    },
    samePasswords() {
      if (this.form.password && this.form.password2) {
        if (this.form.password !== this.form.password2) return false;
      }
      return true;
    }
  },
  methods: {
    async submitUser() {
      if (!this.$refs.userform.validate()) return;
      let post = {
        ...this.form,
        user_type: "I"
      };
      await this.$axios
        .$post(`auth/users/manager/`, post)
        .then(res => {
          this.user_modal = false;
          this.fetchUsers();
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchUsers() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        user_type: "M"
      };
      await this.$axios
        .$get(`auth/users/`, { params })
        .then(res => {
          this.users = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openModal() {
      this.user_modal = true;
    },
    cancel() {
      console.log("cancel");
    },
    accept() {
      console.log("accept");
    },
    searchit(value) {
      console.log(value);
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
  grid-template-columns: 5% 30% 15% 17% 23% 10%;
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
.btns {
  .blue-btn,
  .red-btn-outline {
    height: 45px;
    max-width: 175px;
  }
}
.red-btn-outline {
  color: $red-color;
  &:hover {
    color: #fff;
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
    p:first-child {
      width: 160px;
      color: #9c9c9c;
    }
    p:last-child {
      width: 100%;
      color: #313131;
    }
  }
}
</style>
