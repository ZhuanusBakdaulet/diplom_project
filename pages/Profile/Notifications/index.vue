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
      <h4 class="w100">Уведомления</h4>
    </div>
    <div
      class="
        mt-5
        d-flex
        justify-space-between
        mx-auto
        mr-sm-auto
        ml-sm-0
        align-center
        btns
      "
    >
      <button
        @click="active = 'order'"
        class="p green-btn-text text-center text-xs-left"
        :class="{ 'green-btn-text-active': active == 'order' }"
      >
        <div class="text">Заказы</div>
      </button>
      <button
        @click="active = 'promotion'"
        class="p green-btn-text text-center text-xs-left"
        :class="{ 'green-btn-text-active': active == 'promotion' }"
      >
        <div class="text">Акции</div>
      </button>
    </div>

    <div class="mt-7">
      <div
        v-for="(item, index) in notifications.results"
        :key="index"
        class="pa-3 mt-2 message"
        :class="[index % 2 == 0 ? 'white-bg' : 'blue-bg']"
      >
        <h3>
          {{
            active == "order"
              ? `Статус заказа №${item.order} был изменен - ${item.title}`
              : `У нас новая акция - ${item.title}`
          }}
        </h3>
        <nuxt-link
          :to="
            active == 'order'
              ? `/Profile/Order/${item.order}`
              : `/Profile/Promotions`
          "
        >
          <p class="mt-2">
            Перейти в {{ active == "order" ? "заказ" : "акции" }}
          </p>
        </nuxt-link>
      </div>
    </div>

    <div v-if="meta.count < 1" class="mt-7 d-flex flex-column">
      <svg
        class="mx-auto mt-12"
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M33.9138 16.0156L28.1328 11.0191C27.2255 10.2326 25.878 10.2326 24.9707 11.0191L1.2552 31.5001C0.907583 31.8056 0.62093 32.1742 0.410371 32.5863C0.365259 32.6684 0.324961 32.753 0.289682 32.8398C0.0967925 33.2812 -0.00186172 33.758 2.66041e-05 34.2398V67.5863C0.00246199 68.2518 0.282419 68.8861 0.77244 69.3363C1.20864 69.7684 1.79989 70.0075 2.41382 70.0001H50.6897C51.301 70.0058 51.8902 69.7719 52.3311 69.3484C52.8194 68.8919 53.0987 68.2548 53.1035 67.5863V36.1587L33.9138 16.0156Z"
            fill="#2980BA"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M70 18.1039C69.9958 27.6306 62.609 35.524 53.1035 36.1591C52.7052 36.1953 52.3069 36.2074 51.8966 36.2074C41.8983 36.2074 33.7931 28.1022 33.7931 18.1039C33.7902 17.4061 33.8305 16.7088 33.9138 16.016C35.0196 6.48751 43.3658 -0.524378 52.9423 0.0297096C62.5187 0.583798 70.0006 8.51149 70 18.1039Z"
            fill="#E64C3C"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M53.104 27.7584C52.4375 27.7584 51.8972 27.2181 51.8972 26.5515V10.9596L47.8239 14.2183C47.4871 14.4877 47.0322 14.5571 46.6304 14.4002C46.2287 14.2433 45.9411 13.884 45.8761 13.4576C45.8111 13.0312 45.9785 12.6026 46.3153 12.3331L52.3497 7.5055C52.712 7.21543 53.2086 7.15881 53.6269 7.35985C54.0452 7.56089 54.3111 7.98398 54.3109 8.44808V26.5515C54.3109 27.2181 53.7706 27.7584 53.104 27.7584Z"
            fill="#ECF0F1"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M53.1031 36.1587V67.5863C53.0984 68.2548 52.8191 68.8919 52.3307 69.3484L45.8618 63.8691L31.0049 51.2932L45.8618 38.7173L49.0842 35.9897C50.0144 36.1354 50.9547 36.2081 51.8962 36.207C52.3066 36.207 52.7049 36.1949 53.1031 36.1587Z"
            fill="#3B97D3"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M49.0849 35.9899L45.8624 38.7175L31.0056 51.2933L28.1331 53.7192C27.2258 54.5056 25.8784 54.5056 24.9711 53.7192L22.0987 51.2933L7.24176 38.7175L0.290039 32.8399C0.325318 32.7531 0.365616 32.6685 0.410729 32.5864H41.0349C43.3992 34.3626 46.1634 35.5313 49.0849 35.9899Z"
            fill="#ECF0F1"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.0983 51.2933L7.24141 63.8692L0.77244 69.3364C0.282419 68.8861 0.00246199 68.2519 2.66041e-05 67.5864V34.2398C-0.00186172 33.7581 0.0967925 33.2813 0.289682 32.8398L7.24141 38.7174L22.0983 51.2933Z"
            fill="#3B97D3"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="70" height="70" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p class="mt-10 text-center">Здесь будут ваши уведомления</p>
    </div>

    <div v-if="meta.pages > 1" class="my-pagination mt-10">
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
  middleware: ["auth"],
  layout: "profile",
  data: () => ({
    active: "order",
    pageNumber: 1,
    pageSize: 7,
    notifications: {},
    back: "<",
  }),
  async fetch() {
    try {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
      };
      let api = {
        order: "notifications/orders/",
        promotion: "notifications/promotions/",
      };

      this.notifications = await this.$axios.$get(`${api[this.active]}`, {
        params,
      });
    } catch (err) {
      this.$notifier.showMessage({
        color: "error",
        text: "Не удалось загрузить",
      });
    }
  },
  watch: {
    pageNumber() {
      window.scrollTo({ top: 0 });
      this.$fetch();
    },
    active() {
      this.pageNumber = 1;
      this.$fetch();
    },
  },
  computed: {
    meta() {
      if (this.notifications?.meta?.pagination)
        return this.notifications.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
  },
  created() {
    this.$store.commit("changeProfileMenu", "notification");
    this.$store.dispatch("resetNotifications");
  },
  methods: {
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
.btns {
  width: 100%;
  max-width: 520px;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
}
.green-btn-text {
  position: relative;
  width: 100%;
  border-bottom: 3px solid #e4e4e4;
  padding-bottom: 8px;
  text-align: left;
  &:hover,
  &-active {
    border-bottom: 3px solid $green-color;
  }
}

.text {
  position: relative;
  display: inline;
  font-size: 18px;
}
.message {
  width: 100%;
  border-radius: 10px;
  h3 {
    font-size: 16px !important;
    line-height: 18px !important;
  }
  p {
    color: rgba(123, 135, 148, 1);
    font-size: 15px;
    line-height: 19px;
  }
}
.blue-bg {
  background: rgba(172, 204, 248, 0.2);
}
@media screen and (max-width: 600px) {
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
  .green-btn-text {
    text-align: center;
  }
  .message {
    h3 {
      font-size: 17px;
      line-height: 22px;
    }
  }
}
</style>
