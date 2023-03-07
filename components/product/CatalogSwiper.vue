<template>
  <div v-if="catalog" class="">
    <div class="d-flex align-center h2">С этим товаром покупают</div>
    <swiper class="mt-5 gallery-swiper" :options="swiperOption">
      <swiper-slide v-for="item in catalog" :key="item.id" class="productitem">
        <ProductItem :item="item" />
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination banner-pagination mt-4"></div>
  </div>
</template>
<script>
import ProductItem from "@/components/ui/ProductItem";

import Swiper, { Pagination, Navigation, Autoplay } from "swiper";
Swiper.use([Pagination, Navigation, Autoplay]);

export default {
  data: () => ({
    swiperOption: {
      slidesPerView: 2,
      spaceBetween: 16,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {},
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        567: {
          slidesPerView: 3,
        },
        758: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 4,
        },
        1264: {
          slidesPerView: 5,
        },
      },
    },
  }),
  props: { catalog: Array },
  components: { ProductItem },
};
</script>

<style lang="scss" scoped>
.productitem {
  .catalog-item {
    min-height: 400px;
  }
}
.banner-pagination {
  position: relative !important;
}
@media screen and (max-width: 600px) {
  .productitem {
    .catalog-item {
      min-height: 360px;
    }
  }
}
</style>
