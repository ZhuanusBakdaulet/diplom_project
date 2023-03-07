<template>
  <div class="">
    <div class="d-flex">
      <h3
        @click="active = 'users'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': active == 'users' }"
      >
        Пользователи
      </h3>
      <h3
        @click="active = 'P'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': active == 'P' }"
      >
        Поставщики
      </h3>
      <h3
        @click="active = 'C'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': active == 'C' }"
      >
        Курьеры
      </h3>
      <h3
        @click="active = 'S'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': active == 'S' }"
      >
        Магазины
      </h3>
      <h3
        @click="active = 'I'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': active == 'I' }"
      >
        Физ. лица
      </h3>
      <h3
        @click="active = 'E'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': active == 'E' }"
      >
        Юр. лица
      </h3>
    </div>
    <div class="mt-4 bg-white pb-12 pt-5">
      <div class="mx-8">
        <Search
          @searchit="searchit"
          :placeholder="'Поиск по менеджерам'"
          :items="all_users.results"
          :itemText="'first_name'"
        />
      </div>
      <div class="mt-8 mb-7 pl-8 pr-4 my-grid">
        <h3 class="blue-color mr-2">№</h3>
        <h3 class="blue-color mr-2">ФИО</h3>
        <h3 class="blue-color mr-2">Контакты</h3>
        <h3 class="blue-color mr-2">Тип пользователя</h3>
        <h3 class="blue-color mr-2">Почта</h3>
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
          <h3 class=" mr-2">{{ item.phone_number }}</h3>
          <h3 class=" mr-2">{{ userType(item.user_type) }}</h3>
          <h3 class=" mr-2">{{ item.email }}</h3>
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
            <p class="p15 gilroy">ФИО:</p>
            <p class="p15 gilroy">{{ item.first_name }} {{ item.last_name }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Контакты:</p>
            <p class="p15 gilroy">{{ item.phone_number }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Тип пользователя:</p>
            <p class="p15 gilroy">{{ userType(item.user_type) }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Компания:</p>
            <p class="p15 gilroy">{{ item.individual_name }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Почта:</p>
            <p class="p15 gilroy">{{ item.email }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Страна:</p>
            <p v-if="item.city" class="p15 gilroy">
              {{ item.city.country ? item.city.country.name : "" }}
            </p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Город:</p>
            <p v-if="item.city" class="p15 gilroy">{{ item.city.name }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Адрес:</p>
            <p class="p15 gilroy">{{ item.address }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="p15 gilroy">Регион доставки:</p>
            <p class="p15 gilroy">-</p>
          </div>
        </div>
      </div>
      <h2 v-if="users.results < 1" class="text-center mt-8">
        Пользователей такого типа нет
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
import Search from "@/components/admin/Search";
export default {
  layout: "admin",
  components: { Search },
  async asyncData({ $axios }) {
    let pageNumber = 1;
    let pageSize = 10;
    let params = {
      "page[number]": pageNumber,
      "page[size]": pageSize
    };
    const users = await $axios.$get(`auth/users/`, { params });
    const all_users = await $axios.$get(`auth/users/`);
    return { pageNumber, pageSize, users, all_users };
  },
  data: () => ({
    sure_modal: false,
    active: "users",
    toggle: 0,
    params: {}
  }),
  created() {
    this.$store.commit("changeAdminMenu", "Users");
  },
  computed: {
    meta() {
      if (this.users?.meta?.pagination) return this.users.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  watch: {
    active() {
      this.pageNumber = 1;
      this.params = {};
      this.params.user_type = this.active;
      this.fetchUsers();
    },
    pageNumber() {
      this.fetchUsers();
    }
  },
  methods: {
    userType(user_type) {
      let users = {
        P: "Поставщик",
        S: "Магазин",
        E: "Юр. лицо",
        I: "Физ. лицо",
        C: "Курьер",
        M: "Менеджеры"
      };
      return users[`${user_type}`];
    },
    async fetchUsers() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        ...this.params
      };
      if (this.params.user_type == "users") delete params.user_type;
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
    searchit(value) {
      this.active = "users";
      this.pageNumber = 1;
      this.params = {};
      this.params.search = value;
      this.fetchUsers();
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

.type {
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  &:hover,
  &-active {
    border-bottom: 1px solid #6bb4ff;
  }
}
.my-grid {
  display: grid;
  grid-template-columns: 5% 30% 14% 18% 22% 10%;
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
.blue-btn {
  height: 50px;
  max-width: 260px;
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
