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
      <h4 class="w100">Полезная информация</h4>
    </div>
    <div class="">
      <div class="bread">
        <Bread :links="links" />
      </div>
      <div class="d-flex row align-start ma-0 mt-7">
        <img class="mb-8" v-if="info.image" :src="info.image" alt="" />
        <div class="content">
          <h3 class="fw600">{{ info.title }}</h3>
          <p class="s mt-4 fw400" v-html="info.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from "@/components/ui/Bread";
export default {
  async asyncData({ $axios, params }) {
    const info = await $axios.$get(`helpful-information/${params.id}/`);
    return { info };
  },
  data: () => ({
    orders: {},
    links: [
      {
        text: "Полезная информация",
        url: "/Profile/Info",
      },
      {
        text: "Полезная информация",
        url: "/Profile/Info/title-",
      },
    ],
    back: "<",
  }),
  components: {
    Bread,
  },
  layout: "profile",
  created() {
    this.$store.commit("changeProfileMenu", "helpfullinfo");
    this.initializeLinks();
  },
  methods: {
    initializeLinks() {
      if (this.info.title) {
        this.links[1].text = this.info.title;
        this.links[1].url = `/Profile/Info/${this.info.id}`;
      }
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

img {
  max-width: 288px;
  width: 100%;
  border: 1px solid rgba(228, 228, 228, 0.6);
  border-radius: 3px;
  margin-right: 64px;
}
.content {
  max-width: 480px;
  width: 100%;
}
.adaptive-bread {
  display: none;
}
@media only screen and (max-width: 600px) {
  .nav {
    h4 {
      margin: 0 auto;
      font-family: "Gliroy";
      font-style: normal;
      font-weight: bold;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
    }
  }
  .content h3 {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 500;
    font-size: 17px !important;
    line-height: 22px !important;
    text-align: center;
    color: #252626;
    text-align: left;
  }
  .content p {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: #252626;
    text-align: left;
  }
  .bread {
    display: none;
  }
  img {
    margin: 0;
    width: 100%;
    max-width: 100%;
  }
}
</style>
