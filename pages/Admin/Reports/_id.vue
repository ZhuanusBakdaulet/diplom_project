<template>
  <div class="">
    <OrderId v-if="$route.params.id == 'order'" />
    <RatingId v-if="$route.params.id == 'rating'" />
  </div>
</template>

<script>
import OrderId from "@/components/admin/Reports/OrderId";
import RatingId from "@/components/admin/Reports/RatingId";
export default {
  layout: "admin",
  data: () => ({
    type: "order"
  }),
  components: {
    OrderId,
    RatingId
  }
};
</script>

<style lang="scss" scoped></style>
