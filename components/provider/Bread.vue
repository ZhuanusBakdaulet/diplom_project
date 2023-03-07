<template>
  <div class="d-flex align-center">
    <nuxt-link
      :to="item.url"
      :class="{ 'ml-3': index > 0 }"
      v-for="(item, index) in links"
      :key="item.id"
    >
      {{ item.text }}
      <span v-if="index + 1 < links.length" class="ml-2"> > </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: { links: Array }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: #7b8794;

  &:hover,
  &:last-child {
    text-decoration-color: #3da6f2;
    color: #3da6f2;
  }
}

.nuxt-link-active {
  color: #7b8794;
}
</style>
