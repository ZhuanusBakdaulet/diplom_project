<template>
  <v-app class="bg-provider">
    <v-main class="">
      <div :class="{ 'my-grid': isprovider }">
        <div class="">
          <SideNavigation v-if="isprovider" />
        </div>
        <nuxt class="py-7 px-12 w100 pages" />
      </div>
    </v-main>
    <LoadingBar />
    <SnackBar />
  </v-app>
</template>

<script>
import SideNavigation from "@/components/provider/SideNavigation";
export default {
  components: { SideNavigation },
  computed: {
    isprovider() {
      if (
        this.$auth?.user?.user_type == "P" ||
        this.$auth?.user?.user_type == "S" ||
        this.$auth?.user?.user_type == "C"
      )
        return true;
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~/assets/css/provider";
.my-grid {
  display: grid;
  grid-template-columns: 271px 1fr;
}
.pages {
  width: 100%;
}
</style>
