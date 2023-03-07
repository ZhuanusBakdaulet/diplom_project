<template>
  <nuxt-link :to="`/Products/?provider[]=${item.id}`" v-if="item" class="box">
    <p class="mr-5">
      {{ item.individual_name }}
    </p>
    <p class="mr-5 d-none d-sm-block">
      {{ item.phone_number }}
    </p>
    <p class="mr-5 d-none d-sm-block">
      {{ item.email }}
    </p>
    <svg
      class="ml-auto"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.7459 19.7589C7.44784 19.4667 7.42074 19.0095 7.66461 18.6873L7.7459 18.595L14.4734 12L7.7459 5.40503C7.44784 5.11283 7.42074 4.65558 7.66461 4.33338L7.7459 4.24106C8.04396 3.94887 8.51037 3.9223 8.83904 4.16137L8.93321 4.24106L16.2541 11.418C16.5522 11.7102 16.5793 12.1675 16.3354 12.4897L16.2541 12.582L8.93321 19.7589C8.60534 20.0804 8.07376 20.0804 7.7459 19.7589Z"
        fill="#7B8794"
      />
    </svg>
  </nuxt-link>
</template>

<script>
export default {
  data: () => ({}),
  props: { item: Object },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  padding: 14px 30px;
  background: #ffffff;
  display: grid;
  grid-template-columns: 30% 30% 30% 10%;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
}
a {
  text-decoration: none;
}
@media screen and (max-width: 600px) {
  .box {
    padding: 15px 0;
    display: flex !important;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 1);
  }
}
</style>
