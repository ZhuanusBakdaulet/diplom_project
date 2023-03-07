<template>
  <div class="d-none d-sm-flex align-center">
    <nuxt-link
      :to="item.url"
      :class="{ 'ml-3': index > 0 }"
      v-for="(item, index) in links"
      :key="index"
    >
      {{ item.text }}
      <span v-if="index + 1 < links.length" class="mx-2"> > </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: { links: Array },
};
</script>

<style lang="scss" scoped>
a {
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #252626;
  text-decoration: none;
  &:hover,
  &:last-child {
    text-decoration-color: $orange-color;
    color: $orange-color;
  }
}

.nuxt-link-active {
  color: $black-color;
}
@media screen and (max-width: 1240px) {
  div {
    flex-wrap: wrap;

    div a:nth-child(2) {
      margin-left: 0 !important;
    }
    .nuxt-link-exact-active {
      margin-left: 0 !important;
    }
  }
}
</style>
