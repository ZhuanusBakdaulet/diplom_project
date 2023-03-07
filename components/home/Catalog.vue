<template>
  <v-container v-if="catalog.results.length > 0" class="">
    <div class="title d-flex align-center justify-space-between">
      <h2>Лучшее предложение</h2>
      <nuxt-link to="/Products" class="showall h3 orange-color">
        Посмотреть все
      </nuxt-link>
    </div>
    <div class="catalog mt-5">
      <ProductItem
        v-for="item in catalog.results"
        :key="item.id"
        :item="item"
      />
    </div>
  </v-container>
</template>

<script>
import ProductItem from "@/components/ui/ProductItem";
export default {
  props: {
    catalog: Object
  },
  data: () => ({}),
  methods: {},
  components: { ProductItem }
};
</script>

<style lang="scss" scoped>
.showall {
  text-decoration: none;
  color: $orange-color;
  &:hover {
    text-decoration: underline;
  }
}
.catalog {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;

  @media (max-width: 1240px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    &-item:last-child {
      display: none !important;
    }
  }
}
@media screen and (max-width: 600px) {
  .catalog {
    grid-gap: 8px;
    width: 100%;
  }
  .showall {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
