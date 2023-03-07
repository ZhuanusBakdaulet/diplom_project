<template>
  <div class="">
    <Title title="Категории" />
    <Bread v-if="isSub" class="mt-5" :links="links" />
    <Search
      class="mt-5"
      @searchit="searchit"
      :addText="'Добавить'"
      @addbtn="add_category_modal = true"
      add
    />
    <div v-if="isSub" class="mt-4">
      <nuxt-link
        v-for="(item, index) in sub_categories"
        :key="index"
        :to="{
          path: `/provider/Categories`,
          query: {
            ...$route.query
          }
        }"
        class="sub-w d-flex align-center pa-3"
      >
        <p class="mr-5">{{ item.name }}</p>
      </nuxt-link>
      <h2 v-if="sub_categories.length < 1" class="mt-10 text-center">
        Нет подкатегории, вы можете отправить запрос на добавление
      </h2>
    </div>

    <div v-else-if="categories.results" class="mt-10 category-grid">
      <Category
        v-for="(item, index) in categories.results"
        :key="index"
        :item="item"
      />
    </div>
    <h2 v-else class="mt-10 text-center">
      Нет категории, пвы можете отправить запрос на добавление
    </h2>

    <div v-if="meta.pages > 1" class="bg-default mx-auto pt-16 pb-7">
      <v-pagination
        class=""
        v-model="pageNumber"
        :length="meta.pages"
        circle
        color="warning"
        total-visible="10"
      >
      </v-pagination>
    </div>
    <v-dialog v-model="add_category_modal" width="647">
      <v-card class="my-modal py-7 px-16">
        <svg
          @click="add_category_modal = false"
          class="close"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7756 1.42052L14.6703 0.328417C14.3713 0.0293538 13.8772 0.0293538 13.5651 0.328417L8.05193 5.84146L2.43487 0.224395C2.13567 -0.0747984 1.64157 -0.0747984 1.32963 0.224395L0.224395 1.32963C-0.0747984 1.62869 -0.0747984 2.1228 0.224395 2.43487L5.82859 8.03906L0.328417 13.5652C0.0293538 13.8643 0.0293538 14.3584 0.328417 14.6705L1.43365 15.7757C1.73272 16.0748 2.22682 16.0748 2.53889 15.7757L8.05193 10.2625L13.5651 15.7757C13.8642 16.0748 14.3583 16.0748 14.6703 15.7757L15.7756 14.6705C16.0746 14.3714 16.0746 13.8773 15.7756 13.5652L10.2494 8.05206L15.7626 2.53902C16.0746 2.22669 16.0746 1.73259 15.7756 1.42052Z"
            fill="#52B059"
          />
        </svg>
        <p class="fw500 text-center title-title pointer">
          Заявка на добавление
        </p>
        <div class="d-flex justify-space-between mt-6 type mx-auto">
          <h3
            @click="active = 'category'"
            class="fw500 text-center title pointer"
            :class="{ 'title-active': active == 'category' }"
          >
            Добавить категорию
          </h3>
          <h3
            @click="active = 'sub_category'"
            class="fw500 text-center title pointer"
            :class="{ 'title-active': active != 'category' }"
          >
            Добавить подкатегорию
          </h3>
        </div>
        <v-form @submit.prevent="submit" ref="form">
          <div v-if="active == 'category'" class="">
            <h3 class="mt-7">Название категории</h3>
            <v-text-field
              v-model="form.name"
              class="my-input mt-2"
              placeholder="Название категории"
              :rules="[rules.required]"
              solo
            ></v-text-field>

            <h3 class="mt-1">Загрузите иконку категории</h3>
            <v-file-input
              class="my-input mt-2"
              accept="image/*"
              show-size
              truncate-length="15"
              placeholder="Загрузить иконку"
              v-model="form.image"
              solo
              prepend-inner-icon=""
              prepend-icon=""
              :rules="[rules.required]"
            >
              <template v-slot:prepend-inner>
                <svg
                  class="mx-2 pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0001 8.32715V15.6535"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.6666 11.9904H8.33325"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </template>
            </v-file-input>
          </div>
          <div v-else class="">
            <h3 class="mt-7">Выберите категорию</h3>
            <v-select
              class="my-input mt-2"
              :items="categories.results"
              item-text="name"
              item-value="id"
              v-model="form.category"
              placeholder="Название подкатегории"
              :rules="[rules.required]"
              solo
            ></v-select>

            <h3 class="mt-1">Название подкатегории</h3>
            <v-text-field
              class="my-input mt-2"
              v-model="form.name"
              placeholder="Название подкатегории"
              :rules="[rules.required]"
              solo
            ></v-text-field>
          </div>

          <button type="submit" class="mt-3 green-btn mx-auto">
            Отправить
          </button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Title from "@/components/provider/Title";
import Category from "@/components/ui/Category";
import Search from "@/components/provider/Search";
import Bread from "@/components/provider/Bread";

export default {
  layout: "provider",
  middleware: "provider",
  components: { Title, Category, Search, Bread },
  async asyncData({ $axios }) {
    let pageNumber = 1;
    let pageSize = 15;
    let params = {
      "page[number]": pageNumber,
      "page[size]": pageSize
    };
    const categories = await $axios.$get(`categories`, { params });
    return { categories, pageNumber, pageSize };
  },
  data: () => ({
    sub_categories: [],
    search: "",
    links: [
      {
        text: "Категории",
        url: "/provider/Categories"
      },
      {
        text: "Под-категории",
        url: "/provider/Categories?t=default"
      }
    ],
    active: "category",
    add_category_modal: false,
    form: {},
    rules: {
      required: v => !!v || "Обязательное поле"
    }
  }),
  watch: {
    pageNumber() {
      this.fetchCategories();
    },
    active() {
      this.resetDefault();
    },
    add_category_modal() {
      this.resetDefault();
    }
  },
  computed: {
    meta() {
      if (this.categories?.meta?.pagination)
        return this.categories.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
    isSub() {
      this.links[1].url = {
        path: `/provider/Categories`,
        query: { ...this.$route.query }
      };
      if (this.$route.query.cid) this.fetchSubCategories(this.$route.query.cid);
      if (this.$route.query.category) {
        this.links[1].text =
          this.$route.query.category.charAt(0).toUpperCase() +
          this.$route.query.category.slice(1);
        return true;
      }
      return false;
    }
  },
  created() {
    this.$store.commit("changeProviderMenu", "Categories");
  },
  methods: {
    resetDefault() {
      if (this.$refs.form) this.$refs.form.reset();
      this.form = {};
    },
    async fetchCategories() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize
      };
      await this.$axios
        .$get(`categories/`, { params })
        .then(res => {
          this.categories = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchSubCategories(id) {
      await this.$axios
        .$get(`categories/${id}/`)
        .then(res => {
          if (res.sub_categories) this.sub_categories = res.sub_categories;
          else this.sub_categories = [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchit(value) {
      console.log("search", value);
    },
    async submit() {
      if (!this.$refs.form.validate()) return;

      let formData = new FormData();

      Object.keys(this.form).forEach(field => {
        formData.append(field, this.form[field]);
      });

      if (this.active == "category") {
        await this.$axios
          .$post("categories/", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this.add_category_modal = false;
            this.resetDefault();
            this.$notifier.showMessage({
              text: `Ваша заявка принята`,
              color: "success"
            });
          })
          .catch(err => {
            this.$notifier.showMessage({
              text: `Ваша заявка не удалась`,
              color: "error"
            });
          });
      } else {
        await this.$axios
          .$post("sub-categories/", this.form)
          .then(res => {
            this.add_category_modal = false;
            this.resetDefault();
            this.$notifier.showMessage({
              text: `Ваша заявка принята`,
              color: "success"
            });
          })
          .catch(err => {
            this.$notifier.showMessage({
              text: `Ваша заявка не удалась`,
              color: "error"
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";
.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.close {
  position: absolute;
  top: 12px;
  right: 20px;
}
.green-btn {
  max-width: 200px;
}
.title-title {
  font-size: 20px;
  color: #52b059;
}
.title {
  width: 100%;
  font-size: 1.04rem !important;
  border-bottom: 3px solid #e7e7e7;
  &-active {
    color: #52b059;
    border-bottom: 3px solid #52b059;
  }
}
.sub-title {
  font-size: 18px;
}
.sub-category {
  width: 100%;
  background: #fbfbfb;
  border-bottom: 1px solid #e7e7e7;
  padding: 14px 22px 14px 52px;
}
.sub-w {
  background: #fbfbfb;
  border-bottom: 2px solid #e7e7e7;
  &:last-child {
    border: none;
  }
}
a {
  text-decoration: none;
}
</style>
