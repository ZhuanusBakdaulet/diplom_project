<template>
  <div>
    <div class="nav d-flex align-center d-sm-none mb-5" @click="goBack">
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
      <h4 class="w100">Чаты</h4>
    </div>
    <div class="white-bg py-5">
      <h3 class="px-7 fw500">Выберите чат</h3>
      <div class="">
        <nuxt-link
          :to="`/Profile/Chats/${$translate(item.name)}?id=${item.id}`"
          v-for="(item, index) in chats.results"
          :key="index"
        >
          <div class="item py-4 px-7 d-flex align-center justify-space-between">
            <p class="s fw400">{{ item.name }}</p>
            <svg
              class="ml-auto pointer"
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
        </nuxt-link>
      </div>

      <div
        v-if="meta.pages > 1"
        class="my-pagination mt-10 d-flex align-center justify-space-between"
      >
        <v-pagination
          class=""
          v-model="pageNumber"
          :length="meta.pages"
          total-visible="10"
        >
        </v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  middleware: ["auth"],
  layout: "profile",
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 10,
      params = {
        "page[number]": pageNumber,
        "page[size]": pageSize,
      };
    const chats = await $axios.$get(`group-chats/rooms/`, params);
    return { pageNumber, pageSize, chats };
  },
  watch: {
    pageNumber() {
      window.scrollTo({ top: 0 });
      this.fetchChats();
    },
  },
  computed: {
    meta() {
      if (this.chats?.meta?.pagination) return this.chats.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
  },
  created() {
    this.$store.commit("changeProfileMenu", "chats");
  },
  methods: {
    async fetchChats() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
      };
      await this.$axios
        .$get(`group-chats/rooms/`, { params })
        .then((res) => {
          this.chats = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-grid {
  display: grid;
  // grid-gap: 20px;
  grid-template-columns: 1fr 25%;
}
.fw500 {
  border-bottom: 2px solid #e7e7e7 !important;
  padding-bottom: 20px;
}
.item {
  border-bottom: 2px solid #e7e7e7 !important;
  &:last-child {
    border: none;
  }
}
@media screen and (max-width: 600px) {
  .fw500 {
    font-size: 17px;
    line-height: 22px;
  }
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
  .item {
    p.s.fw400 {
      font-size: 15px !important;
      line-height: 19px;
    }
  }
}
</style>
