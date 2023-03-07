<template>
  <div class="">
    <Description v-if="product" :product="product" isAdmin />
    <div class=" d-flex white-bg pb-10 pt-3 px-15">
      <div class="mr-5">
        <p class="mt-2 grey-color type">Количество:</p>
        <p class="mt-2 grey-color type">Цена:</p>
        <p class="mt-2 grey-color type">Цена со скидкой:</p>
        <p class="mt-2 grey-color type">Скидка:</p>
        <p class="mt-2 grey-color type">Период активности скидки:</p>
        <p class="mt-2 grey-color type">Минимальная покупка:</p>
        <p class="mt-2 grey-color type">Оценка:</p>
        <p class="mt-2 grey-color type">Штрих Коды:</p>
      </div>
      <div class="">
        <p class="mt-2 fw500 sub-type">{{ provider_product.amount }}</p>
        <p class="mt-2 fw500 sub-type">{{ $price(provider_product.price) }}</p>
        <p class="mt-2 fw500 sub-type">
          {{ $price(provider_product.discount_price) }}
        </p>
        <p class="mt-2 fw500 sub-type">{{ provider_product.discount }} %</p>
        <p class="mt-2 fw500 sub-type" v-if="provider_product.discount != 0">
          {{ provider_product.discount_active_from }} -
          {{ provider_product.discount_active_to }}
        </p>
        <p class="mt-2 fw500 sub-type" v-else>
          Скидка не активна
        </p>
        <p class="mt-2 fw500 sub-type">
          {{
            provider_product.purchase == "M"
              ? `по цене - ${$price(provider_product.min_price)}`
              : `по количеству - ${$price(provider_product.min_count)}`
          }}
        </p>
        <p class="mt-2 fw500 sub-type">
          {{ provider_product.rating || "Рейтинга нет" }}
        </p>
        <p
          class="fw500 sub-type"
          v-for="(item, index) in provider_product.product.barcodes"
          :key="index"
        >
          {{ item }}
        </p>
        <p
          class="mt-2 fw500 sub-type"
          v-if="provider_product.product.barcodes.length < 1"
        >
          Штрих код не указан
        </p>
      </div>
    </div>
    <!-- <pre>{{ provider_product }}</pre> -->
  </div>
</template>

<script>
import Description from "@/components/product/Description";
export default {
  layout: "provider",
  middleware: "provider",
  async asyncData({ $axios, query }) {
    const product = await $axios.$get(`products/${query.id}/`);
    const provider_product = await $axios.$get(
      `provider-products/${query.pid}/`
    );
    console.log(provider_product);
    return { product, provider_product };
  },
  components: {
    Description
  },
  created() {
    this.$store.commit("changeProviderMenu", "Products");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";
.type {
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: #565656;
}
.sub-type {
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #888583;
}
</style>
