<template>
  <div class="">
    <div v-for="(item, index) in formArray" :key="index" class=""></div>
  </div>
</template>

<script>
export default {
  props: {
    formArray: Array
  }
};
</script>

<style lang="scss" scoped></style>
