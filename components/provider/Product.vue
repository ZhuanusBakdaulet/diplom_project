<template>
  <div class="category pa-3 ">
    <div class="image mr-2">
      <img
        v-if="item.product && item.product.images[0]"
        :src="item.product.images[0].image"
        alt=""
      />
      <img v-else src="@/assets/image/photos/default.svg" alt="" />
    </div>
    <div class="mr-2">
      <h2 class="fw600">{{ item.product.name }}</h2>
      <h4 class="mt-1 grey-color">Количество: {{ item.amount }} шт.</h4>
      <h4 class="mt-1 grey-color">Цена: {{ $price(item.price) }}</h4>
      <h4 class="mt-1 grey-color">
        Скидка: {{ item.discount }}% (до 12.12.2021)
      </h4>
      <h4 class="mt-1 grey-color">
        Минимальная покупка:
        {{
          item.purchase == "M"
            ? $price(item.min_price)
            : `${parseInt(item.min_count)} шт.`
        }}
      </h4>
    </div>
    <div class="d-flex align-center ml-auto">
      <svg
        @click="editIt"
        class="mr-5 pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
          stroke="#313131"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
          stroke="#313131"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.1655 4.60254L19.7315 9.16854"
          stroke="#313131"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- <v-icon @click="deleteIt" class="mr-2 pointer">mdi-delete</v-icon> -->
      <svg
        @click="goToProduct"
        class="pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 5L15.5 12L8.5 19"
          stroke="#313131"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: { item: Object },
  methods: {
    editIt() {
      this.$emit("editIt", this.item);
    },
    goToProduct() {
      this.$router.push(
        `/provider/Products/${this.$translate(this.item.name)}?pid=${
          this.item.id
        }&id=${this.item.product.id}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.category {
  width: 100%;
  min-height: 130px;
  background: #ffffff;
  // box-shadow: 0px 4px 4px rgba(138, 149, 158, 0.15);
  border-radius: 4px;
  border-bottom: 2px solid #e7e7e7;
  display: grid;
  align-items: center;
  grid-template-columns: 130px 1fr 100px;
}
.image {
  width: 130px;
  height: 100%;
  max-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
</style>
