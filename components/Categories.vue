<template>
  <v-container v-if="categories.results.length > 0" class="mt-4">
    <div class="d-flex align-center justify-space-between">
      <h2 v-if="!isProvider" class="d-none d-sm-block">Категории</h2>
      <h2 v-else>Поставщик {Pro store}</h2>
      <nuxt-link v-if="isHome" to="/Categories" class="showall h3 orange-color">
        Посмотреть все
      </nuxt-link>
    </div>
    <div v-if="isHome" class="categories d-flex mt-5">
      <div
        class="item d-flex align-center flex-column text-center"
        v-for="(item, index) in categories.results.slice(0, slice)"
        :key="item.id"
        :class="[index ? `color-${index % 8}` : '']"
      >
        <nuxt-link :to="`/Products?category[]=${item.id}`">
          <img class="icon" :src="item.image" alt="" />
          <p class="m mt-6">
            {{ item.name }}
          </p>
        </nuxt-link>
      </div>
    </div>
    <div v-else class="categories mt-5 d-none d-sm-inline">
      <div class="category-page">
        <nuxt-link
          :to="`/Products?category[]=${item.id}`"
          class="item d-flex align-center flex-column text-center"
          v-for="(item, index) in categories.results"
          :key="item.id"
          :class="[index ? `color-${index % 8}` : '']"
        >
          <img v-if="item.image" class="icon" :src="item.image" alt="" />
          <p class="m mt-6">{{ item.name }}</p>
        </nuxt-link>
      </div>
    </div>
    <div v-if="!isHome" class="d-sm-none">
      <div class="mobile_categories d-flex ">
        <div
          @click="goToSub(item)"
          class="item d-flex align-center justify-flex-start"
          v-for="item in categories_arr"
          :key="item.id"
        >
          <img v-if="item.image" class="icon" :src="item.image" alt="" />
          <p class="m mt-6">{{ item.name }}</p>
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.745899 15.7589C0.44784 15.4667 0.420743 15.0095 0.66461 14.6873L0.745899 14.595L7.47342 8L0.745899 1.40503C0.44784 1.11283 0.420743 0.655583 0.66461 0.333375L0.745899 0.241064C1.04396 -0.0511349 1.51037 -0.0776984 1.83904 0.161374L1.93321 0.241064L9.2541 7.41802C9.55216 7.71022 9.57926 8.16746 9.33539 8.48967L9.2541 8.58198L1.93321 15.7589C1.60534 16.0804 1.07376 16.0804 0.745899 15.7589Z"
              fill="#7B8794"
            />
          </svg>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    windowWidth: 0,
    slice: 8,
    categories_arr: [],
    step: 1,
    filter: {}
  }),
  props: { categories: Object },
  created() {},
  computed: {
    isHome() {
      if (this.$route.path == "/") return true;
      return false;
    },
    isProvider() {
      if (this.isHome) return false;
      else if (this.$route.query.provider) return true;
      else false;
    }
  },
  mounted() {
    this.initializeCategories();
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    initializeCategories() {
      this.categories_arr = this.categories.results;
    },
    goToSub(category) {
      if (category.sub_categories) {
        this.filter = {
          category: [category.id]
        };
        this.categories_arr = [
          {
            id: "all",
            name: "Все товары"
          },
          ...category.sub_categories
        ];
      } else {
        if (category.id != "all") {
          this.filter = {
            sub_category: [category.id]
          };
        }
        this.$router.push({ path: "/Products", query: this.filter });
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 450) this.slice = 2;
      else if (this.windowWidth <= 576) this.slice = 3;
      else if (this.windowWidth <= 768) this.slice = 4;
      else if (this.windowWidth <= 1240) this.slice = 6;
      else this.slice = 8;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  align-items: center;
}
.category-page {
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: 1264px) {
    grid-template-columns: repeat(8, 1fr);
  }
}
.color-1 {
  background: #ffe9e9;
}
.color-2 {
  background: #fffadd;
}
.color-3 {
  background: #e3fdff;
}
.color-4 {
  background: #ffe4fc;
}
.color-5 {
  background: #e9ffeb;
}
.color-6 {
  background: #ffebdd;
}
.color-7 {
  background: #e2eeff;
}
.color-8 {
  background: #ffe9e9;
}

.item {
  width: 100%;
  max-width: 100%;
  height: 160px;
  padding: 24px 6px 14px;
  box-shadow: 0px 5px 15px rgba(138, 149, 158, 0.1);
  border-radius: 5px;
  cursor: pointer;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
}
.icon {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}
.showall {
  text-decoration: none;
  color: $orange-color;
  &:hover {
    text-decoration: underline;
  }
}
a {
  text-decoration: none;
}
@media screen and (max-width: 600px) {
  .mobile_categories {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      max-width: 100%;
      width: 100%;
      align-items: center;
      height: auto;
      padding: 14px 24px;
      background: transparent;
      box-shadow: none;
      p {
        margin: 0 !important;
      }
      .icon {
        width: 24px;
        height: 24px;
        margin: 0 20px 0 0 !important;
      }
      svg {
        margin-left: auto;
      }
    }
  }
  .m {
    font-size: 14px;
    line-height: 17px;
  }
  .showall {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
