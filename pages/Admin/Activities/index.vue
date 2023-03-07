<template>
  <div class="">
    <div class="mt-4 bg-white pb-12 pt-5">
      <div class="d-flex align-center justify-end px-7">
        <v-select
          class="my-input"
          v-model="user"
          :items="users.results"
          item-value="id"
          placeholder="Выберите пользователя"
          solo
        >
          <template v-slot:item="{ item }">
            <div class="d-flex align-center">
              <p class="gilroy p15">
                {{ item.first_name }} {{ item.last_name }}
              </p>
            </div>
          </template>
          <template v-slot:selection="{ item }">
            <div class="d-flex align-center">
              <p class="gilroy p15">
                {{ item.first_name }} {{ item.last_name }}
              </p>
            </div>
          </template>
        </v-select>
      </div>
      <div class="mt-8 mb-7 pl-8 pr-4 my-grid">
        <h3 class="blue-color mr-2">Действие</h3>
        <h3 class="blue-color mr-2">Пользователь</h3>
        <h3 class="blue-color mr-2">Модель</h3>
        <h3 class="blue-color mr-2">Изменение в</h3>
        <h3 class="blue-color mr-2">Время</h3>
      </div>
      <div class="" v-for="(item, index) in activities.results" :key="item.id">
        <div
          class="pl-8 pr-4 py-3 my-grid pointer"
          :class="{ 'my-grid-active': index % 2 == 0 }"
        >
          <h3
            class="mr-2"
            :style="`color:${actionType(item.action_flag).color}`"
          >
            {{ actionType(item.action_flag).text }}
          </h3>
          <h3 class=" mr-2">
            {{ item.user.first_name }} - {{ item.user.last_name }}
          </h3>
          <h3 class=" mr-2">{{ item.content_type.model }}</h3>
          <h3 class=" mr-2">
            {{
              item.change_message[0] &&
              item.change_message[0].changed &&
              item.change_message[0].changed.fields
                ? item.change_message[0].changed.fields[0]
                : item.change_message[0]
                ? "Создано"
                : item.change_message
            }}
          </h3>
          <h3 class=" mr-2">{{ $moment(item.action_time).format("LLL") }}</h3>
        </div>
      </div>
      <div class="bg-default mx-auto pt-10 pb-7 ">
        <v-pagination
          class="px-16"
          v-model="pageNumber"
          :length="meta.pages"
          circle
          color="#6bb4ff"
          total-visible="10"
        >
        </v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: "admin",
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 10,
      params = {
        "page[number]": pageNumber,
        "page[size]": pageSize
      };
    const activities = await $axios.$get(`action-logs/`, { params });
    const users = await $axios.$get(`auth/users/`, {
      params: { user_type: "M" }
    });
    return { pageNumber, pageSize, activities, users };
  },
  data: () => ({
    user: null
  }),
  created() {
    this.$store.commit("changeAdminMenu", "Activities");
  },
  watch: {
    user() {
      this.fetchActivities();
    },
    pageNumber() {
      this.fetchActivities();
    }
  },
  computed: {
    meta() {
      if (this.activities?.meta?.pagination)
        return this.activities.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  methods: {
    async fetchActivities() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        user: this.user
      };
      this.activities = await this.$axios
        .$get(`action-logs`, { params })
        .catch(err => {
          console.log(err);
        });
    },
    actionType(type) {
      let result = {
        1: { text: "Создание", color: "#52B059" },
        2: { text: "Изменение", color: "#ff7a29" },
        3: { text: "Удаление", color: "#DF4041" }
      };
      return result[`${type}`];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";

.my-input {
  max-width: 400px;
}
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
  grid-template-columns: 15% 20% 20% 20% 1fr;
  &-active {
    background: #f2f6ff;
  }
  h3:last-child {
    word-break: break-all;
  }
}
.btns {
  button {
    width: 138px;
    height: 35px;
  }
}
.red-btn-outline {
  color: $red-color;
  &:hover {
    color: #fff;
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
  background: #ffffff;
  box-shadow: 15px 15px 25px rgba(138, 149, 158, 0.15);
}
.image {
  width: 250px;
  height: 250px;
}
.infos {
  max-width: 50%;
}
.gallery {
  position: relative;
  display: flex;
  justify-content: center;
}
.swiper-pagination {
  bottom: 20px;
  margin: 0 auto;
}
.image-slide {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}
.blue-btn {
  max-width: 175px;
  height: 45px;
  margin: 0 auto;
}
</style>
