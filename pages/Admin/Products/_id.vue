<template>
  <div class="">
    <Description v-if="product" :product="product" isAdmin />
  </div>
</template>

<script>
import Description from "@/components/product/Description";
export default {
  layout: "admin",
  components: { Description },
  async asyncData({ $axios, query }) {
    const product = await $axios.$get(`products/${query.id}/`);
    return { product };
  },
  data: () => ({})
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
</style>
