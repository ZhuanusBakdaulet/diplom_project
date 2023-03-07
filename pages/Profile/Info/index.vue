<template>
  <div class="">
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
      <h4 class="w100">Полезная информация</h4>
    </div>
    <div v-if="infos" class="gallery mt-8">
      <div class="item" v-for="(item, index) in infos.results" :key="index">
        <nuxt-link :to="`/Profile/Info/${item.id}`">
          <img v-if="item.image" class="image" :src="item.image" alt="" />
        </nuxt-link>
        <nuxt-link :to="`/Profile/Info/${item.id}`">
          <div
            class="
            info
            py-5
            px-3
            pb-14
            d-flex
            flex-column
            justify-space-between
            align-start
          "
            style="height: 90%;"
          >
            <p class="s">{{ item.title }}</p>
            <p class="mt-2 content">{{ item.content }}</p>
            <div class="mt-2 date">{{ $date(item.created_at) }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div
      class="
        my-pagination
        mt-10
        d-flex
        align-center
        justify-center justify-sm-space-between
      "
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
</template>

<script>
export default {
  data: () => ({
    orders: {},
    back: "<",
  }),
  layout: "profile",
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 6,
      params = {
        "page[number]": pageNumber,
        "page[size]": pageSize,
      };

    const infos = await $axios.$get(`helpful-information/`, { params });
    return { infos, pageNumber, pageSize };
  },
  watch: {
    pageNumber() {
      window.scrollTo({ top: 0 });
      this.fetchInfos();
    },
  },
  computed: {
    meta() {
      if (this.infos?.meta?.pagination) return this.infos.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
  },
  created() {
    this.$store.commit("changeProfileMenu", "helpfullinfo");
  },
  methods: {
    async fetchInfos() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
      };
      await this.$axios
        .$get(`helpful-information/`, { params })
        .then((res) => {
          this.infos = res;
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
  grid-gap: 20px;
  grid-template-columns: 1fr 25%;
}

a {
  text-decoration: none;
}
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.gallery {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
.info {
  background-color: #fff !important;
  border-color: #fff !important;
}
.image {
  border: none !important;
  box-shadow: 0 4px 8px 0 rgba(50, 50, 71, 0.08);
}
.item {
  position: relative;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 5px;
}
.image {
  width: 100%;
  height: 144px;
  object-fit: cover;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid rgba(228, 228, 228, 0.6);
}
.date {
  position: absolute;
  bottom: 18px;
  right: 12px;
}
p:first-child {
  cursor: pointer;
  transition: 0.22s;
  &:hover {
    color: $orange-color;
  }
}
@media only screen and (max-width: 630px) {
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
  p.s {
    font-size: 15px !important;
    line-height: 19px !important;
  }
  .content {
    display: none;
  }
  .main {
    margin-top: 80px;
  }
  h3 {
    text-align: center;
  }
  .gallery {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0;
  }
  .item {
    display: flex;
    border: none;
    border-top: 1px solid rgba(228, 228, 228, 0.6);
    border-radius: 0%;

    padding: 20px 20px 15px 25px;
  }
  .info {
    margin-left: 15px;
    padding: 0 !important;
  }
  .image {
    width: 85px;
    height: 85px;
    // height: 100%;
    object-fit: cover;
  }
  .date {
    position: static;
    font-family: Gilroy;
    bottom: 15px;
    right: 140px;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #999999;
    margin-top: 10px;
  }
}
</style>
