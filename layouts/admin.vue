<template>
  <v-app class="bg-admin">
    <Header />
    <v-main class="">
      <div class="d-flex">
        <Menu />
        <nuxt class="my-5 mx-13 w100" />
      </div>
    </v-main>
    <LoadingBar />
    <SnackBar />
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/admin/Header";
import Menu from "@/components/admin/Menu";
import Footer from "@/components/admin/Footer";
export default {
  middleware: "adminPanel",
  data: () => ({}),
  components: { Header, Footer, Menu }
};
</script>

<style scoped lang="scss">
@import "~/assets/css/admin";
.bg-admin {
  background: #f9fafc;
}
</style>
