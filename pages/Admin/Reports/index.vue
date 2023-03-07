<template>
  <div>
    <div class="reports_title mb-4">
      <p
        @click="switchContent('order')"
        :class="{ active: type == 'order' }"
        class="border-bottom first mr-7"
      >
        Отмененные/Измененные Заказы
      </p>
      <p
        @click="switchContent('rating')"
        :class="{ active: type == 'rating' }"
        class="border-bottom second"
      >
        Рейтинг Поставщиков
      </p>
    </div>
    <Order v-if="type == 'order'" />
    <Rating v-if="type == 'rating'" />
  </div>
</template>

<script>
import Order from "@/components/admin/Reports/Order";
import Rating from "@/components/admin/Reports/Rating";
export default {
  layout: "admin",
  data: () => ({
    type: "order",
    order: false,
    rating: true
  }),
  methods: {
    switchContent(orderType) {
      this.type = orderType;
    }
  },
  components: {
    Order,
    Rating
  },
  created() {
    this.$store.commit("changeAdminMenu", "Infos");
  },
  computed: {
    meta() {
      if (this.users?.meta?.pagintaion) return this.users.meta.pagintaion;
      return { count: 1, page: 1, pages: 1 };
    }
  }
};
</script>

<style lang="scss" scoped>
.reports_title {
  display: flex;

  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 22px;
    color: #6bb4ff;
    display: block;
    text-align: center;

    border-bottom: 1px solid transparent;
  }
  .active {
    border-color: #6bb4ff;
  }
  .first {
    cursor: pointer;
  }
  .second {
    cursor: pointer;
  }
}
</style>
