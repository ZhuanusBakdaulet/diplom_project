<template>
  <nuxt-link
    class="ma-2"
    :to="{
      path: `/provider/Categories`,
      query: { category: $translate(item.name), cid: item.id }
    }"
  >
    <div
      class="category pointer pt-7 px-4 pb-6 d-flex flex-column justify-center align-space-between text-center"
    >
      <img class="image" :src="item.image" alt="" />
      <p class="mt-6">{{ item.name }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: { item: Object }
};
</script>

<style lang="scss" scoped>
.category {
  width: 100%;
  min-height: 180px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(138, 149, 158, 0.15);
  border-radius: 4px;
}
.image {
  width: 60px;
  height: 60px;
  margin: auto;
}
* {
  text-decoration: none;
}
</style>
