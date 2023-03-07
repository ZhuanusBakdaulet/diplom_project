<template>
  <div class="grey-bg">
    <v-container class="">
      <div class="components">
        <Bread :links="links" />
        <Categories v-if="categories" :categories="categories" />
      </div>
    </v-container>
  </div>
</template>

<script>
import Bread from "@/components/ui/Bread";
import Categories from "@/components/Categories";

export default {
  async asyncData({ $axios }) {
    let categories = await $axios.$get("categories/");
    return { categories };
  },
  data: () => ({
    links: [
      {
        text: "Главная",
        url: "/"
      },
      {
        text: "Категории",
        url: "/Categories"
      }
    ]
  }),
  components: { Bread, Categories }
};
</script>

<style lang="scss" scoped>
.search {
  display: none;
}
@media only screen and (max-width: 550px) {
  .search {
    display: block;

    background: rgba(242, 243, 242, 1);
    border-radius: 10px;
    padding: 10px 0 10px 12px;
    margin: 15px;
  }
  form {
    display: flex;
    align-items: center;
    svg {
      width: 16px;
      height: 16px;

      margin-right: 10px;
    }
  }
}
</style>
