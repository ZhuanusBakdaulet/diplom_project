<template>
  <v-container
    v-if="brands.results.length > 0"
    class="mt-10 brands d-flex align-center"
  >
    <h2>Больше 150+ Брендов доступны</h2>
    <div
      class="item mx-auto"
      v-for="item in brands.results.slice(0, slice)"
      :key="item.id"
    >
      <img class="brand" :src="item.image" alt="" />
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    slice: 4,
  }),
  props: { brands: Object },
};
</script>

<style lang="scss" scoped>
h2 {
  max-width: 246px;
  font-weight: 600;
}
.brands {
  width: 100%;
  height: 180px;
}
.brand {
  width: 100%;
  max-width: 200px;
  margin: auto;
}
</style>
