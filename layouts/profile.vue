<template>
  <v-app>
    <Header />
    <v-main class="main">
      <div class="grey-bg pt-sm-7 pb-16">
        <v-container class="profile-grid">
          <div class="">
            <nuxt />
          </div>
          <Menu />
        </v-container>
      </div>
    </v-main>
    <LoadingBar />
    <SnackBar />
    <Footer v-if="$route.name != 'Profile-Chats-id'" />
    <MobileFooter class="mob" />
  </v-app>
</template>

<script>
import Menu from "@/components/profile/Menu";
export default {
  layout: "default",
  data: () => ({
    activeMenu: "personalInfo",
    notifications_count: 0
  }),
  components: {
    Menu
  },
  watch: {
    "$auth.loggedIn"() {
      this.connectToWSPromotion();
      this.connectToWSOrder();
    }
  },
  mounted() {
    this.connectToWSPromotion();
    this.connectToWSOrder();
  },
  methods: {
    connectToWSPromotion() {
      if (this.$auth.loggedIn) {
        let socket = new WebSocket(`${this.$config.WS_API}ws/promotion/`);
        socket.addEventListener("message", async event => {
          await this.$auth.fetchUser();
          this.$store.commit(
            "setNotifications",
            this.$auth.user.user_notification
          );
          this.notifications_count = this.$auth.user.user_notification;
        });
      }
    },
    connectToWSOrder() {
      if (this.$auth.loggedIn) {
        let socket = new WebSocket(
          `${this.$config.WS_API}order/${this.$auth.user.id}/`
        );
        socket.addEventListener("message", async event => {
          await this.$auth.fetchUser();
          this.$store.commit(
            "setNotifications",
            this.$auth.user.user_notification
          );
          this.notifications_count = this.$auth.user.user_notification;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 25%;

  @media (max-width: 600px) {
    padding-top: 30px;
  }
}
@media only screen and (max-width: 630px) {
  .profile-grid {
    display: block;
    grid-template-columns: 1fr;
  }
}
</style>
