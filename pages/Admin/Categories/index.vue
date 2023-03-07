<template>
  <div class="bg-white">
    <div class="d-flex align-center mb-4">
      <Search
        class="my-4 mx-8"
        @searchit="searchit"
        :placeholder="'Поиск по Категориям'"
        :items="all_categories.results"
      />
      <button @click="openModal()" class="ml-auto blue-btn-outline mr-8">
        <svg
          class="mr-2"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="5" width="12" height="2" fill="#6BB4FF" />
          <rect
            width="12"
            height="2"
            transform="matrix(0 -1 -1 0 7 12)"
            fill="#6bb4ff"
          />
        </svg>

        Добавить
      </button>
    </div>

    <div class="" v-for="(item, index) in categories.results" :key="item.id">
      <div
        @click="showSub(item, index)"
        class="categories align-center py-3 pl-11 pr-5"
        :class="{ 'categories-hovered': index % 2 == 0 }"
      >
        <img v-if="item.image" class="image" :src="item.image" alt="" />
        <img
          v-else
          class="image"
          src="@/assets/image/categories/011-fast-categories.svg"
          alt=""
        />
        <p class="p13 gilroy fw600">
          {{ item.name }}
        </p>
        <svg
          @click.stop
          @click="editItem(item.id)"
          class="mx-auto pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4922 2.78906H7.75324C4.67824 2.78906 2.75024 4.96606 2.75024 8.04806V16.3621C2.75024 19.4441 4.66924 21.6211 7.75324 21.6211H16.5772C19.6622 21.6211 21.5812 19.4441 21.5812 16.3621V12.3341"
            stroke="#313131"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.82775 10.921L16.3008 3.44799C17.2318 2.51799 18.7408 2.51799 19.6718 3.44799L20.8888 4.66499C21.8198 5.59599 21.8198 7.10599 20.8888 8.03599L13.3798 15.545C12.9728 15.952 12.4208 16.181 11.8448 16.181H8.09875L8.19275 12.401C8.20675 11.845 8.43375 11.315 8.82775 10.921Z"
            stroke="#313131"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.1652 4.60254L19.7312 9.16854"
            stroke="#313131"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          class="pointer arrow"
          :class="{ 'arrow-rotate': active == index + 1 }"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.5L12 15.5L5 8.5"
            stroke="#313131"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div v-if="active == index + 1" class="">
        <div
          class="sub-category px-12 py-3 d-flex align-center"
          v-for="itemj in item.sub_categories"
          :key="itemj.id"
        >
          <p class="p13 gilroy">
            {{ itemj.name }}
          </p>
          <svg
            @click="editSubCategory(itemj.id)"
            class="ml-auto mr-8 pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4922 2.78906H7.75324C4.67824 2.78906 2.75024 4.96606 2.75024 8.04806V16.3621C2.75024 19.4441 4.66924 21.6211 7.75324 21.6211H16.5772C19.6622 21.6211 21.5812 19.4441 21.5812 16.3621V12.3341"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.82775 10.921L16.3008 3.44799C17.2318 2.51799 18.7408 2.51799 19.6718 3.44799L20.8888 4.66499C21.8198 5.59599 21.8198 7.10599 20.8888 8.03599L13.3798 15.545C12.9728 15.952 12.4208 16.181 11.8448 16.181H8.09875L8.19275 12.401C8.20675 11.845 8.43375 11.315 8.82775 10.921Z"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.1652 4.60254L19.7312 9.16854"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="meta.pages > 1" class="bg-default mx-auto pt-10 pb-7">
      <v-pagination
        class=""
        v-model="pageNumber"
        :length="meta.pages"
        circle
        color="#6bb4ff"
        total-visible="10"
      >
      </v-pagination>
    </div>
    <v-dialog v-model="add_category_modal" width="677">
      <v-card class="my-modal py-10 px-16">
        <div @click="add_category_modal = false" class="close">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7756 1.42052L14.6703 0.328417C14.3713 0.0293538 13.8772 0.0293538 13.5651 0.328417L8.05193 5.84146L2.43487 0.224395C2.13567 -0.0747984 1.64157 -0.0747984 1.32963 0.224395L0.224395 1.32963C-0.0747984 1.62869 -0.0747984 2.1228 0.224395 2.43487L5.82859 8.03906L0.328417 13.5652C0.0293538 13.8643 0.0293538 14.3584 0.328417 14.6705L1.43365 15.7757C1.73272 16.0748 2.22682 16.0748 2.53889 15.7757L8.05193 10.2625L13.5651 15.7757C13.8642 16.0748 14.3583 16.0748 14.6703 15.7757L15.7756 14.6705C16.0746 14.3714 16.0746 13.8773 15.7756 13.5652L10.2494 8.05206L15.7626 2.53902C16.0746 2.22669 16.0746 1.73259 15.7756 1.42052Z"
              fill="#6BB4FF"
            />
          </svg>
        </div>
        <v-form @submit.prevent="submit" ref="form">
          <h1 class="blue-color">
            {{ edit ? "Редактировать категорию" : "Добавить категорию" }}
          </h1>
          <h3 class="mt-7">Название категории</h3>
          <v-text-field
            v-model="form.name"
            class="my-input mt-2"
            placeholder="Название категории"
            :rules="[rules.required]"
            solo
          ></v-text-field>

          <h3 class="mt-3">Добавьте подкатегории</h3>
          <div class="pr-1 mt-2 border">
            <div class="sub-category-add my-7">
              <div v-if="uploaded_subcategory" class="">
                <v-text-field
                  v-for="(item, index) in uploaded_subcategory"
                  :key="index"
                  v-model="item.name"
                  class="my-input mt-2"
                  hide-details
                  append-outer-icon=""
                  solo
                  readonly
                >
                  <template v-slot:append-outer>
                    <div class="d-flex align-center"></div>
                  </template>
                </v-text-field>
              </div>
              <div v-for="item in sub_categories" :key="item.id" class="">
                <v-text-field
                  v-model="form.sub_category[item - 1]"
                  class="my-input mt-2"
                  placeholder="Название подкатегории"
                  append-outer-icon=""
                  solo
                >
                  <template v-slot:append-outer>
                    <div class="d-flex align-center">
                      <svg
                        v-if="item == sub_categories"
                        @click="addSubCategory"
                        class="ml-7 pointer"
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

                      <v-icon
                        v-if="sub_categories != 1"
                        @click="removeSubCategory(item - 1)"
                        color="warning"
                        class="ml-8"
                      >
                        mdi-minus
                      </v-icon>
                    </div>
                  </template>
                </v-text-field>
              </div>
            </div>
          </div>

          <h3 class="mt-9">Загрузите иконку категории</h3>

          <v-file-input
            v-if="change_image"
            class="my-input mt-2 mr-15"
            accept="image/*"
            show-size
            truncate-length="15"
            placeholder="Загрузить иконку"
            v-model="form.image"
            solo
            prepend-inner-icon=""
            prepend-icon=""
            :rules="[rules.required, iscorrect || err_message]"
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

          <div v-else class=" mt-3">
            <img :src="form.image" width="100px" height="100px" alt="" />

            <svg
              @click="editImage"
              class="mx-auto pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4922 2.78906H7.75324C4.67824 2.78906 2.75024 4.96606 2.75024 8.04806V16.3621C2.75024 19.4441 4.66924 21.6211 7.75324 21.6211H16.5772C19.6622 21.6211 21.5812 19.4441 21.5812 16.3621V12.3341"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.82775 10.921L16.3008 3.44799C17.2318 2.51799 18.7408 2.51799 19.6718 3.44799L20.8888 4.66499C21.8198 5.59599 21.8198 7.10599 20.8888 8.03599L13.3798 15.545C12.9728 15.952 12.4208 16.181 11.8448 16.181H8.09875L8.19275 12.401C8.20675 11.845 8.43375 11.315 8.82775 10.921Z"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.1652 4.60254L19.7312 9.16854"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <button type="submit" class="mt-5 mx-auto blue-btn">
            {{ edit ? "Сохранить" : "Добавить" }}
          </button>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="sub_category_modal" width="677">
      <v-card class="my-modal py-10 px-16">
        <div @click="sub_category_modal = false" class="close">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7756 1.42052L14.6703 0.328417C14.3713 0.0293538 13.8772 0.0293538 13.5651 0.328417L8.05193 5.84146L2.43487 0.224395C2.13567 -0.0747984 1.64157 -0.0747984 1.32963 0.224395L0.224395 1.32963C-0.0747984 1.62869 -0.0747984 2.1228 0.224395 2.43487L5.82859 8.03906L0.328417 13.5652C0.0293538 13.8643 0.0293538 14.3584 0.328417 14.6705L1.43365 15.7757C1.73272 16.0748 2.22682 16.0748 2.53889 15.7757L8.05193 10.2625L13.5651 15.7757C13.8642 16.0748 14.3583 16.0748 14.6703 15.7757L15.7756 14.6705C16.0746 14.3714 16.0746 13.8773 15.7756 13.5652L10.2494 8.05206L15.7626 2.53902C16.0746 2.22669 16.0746 1.73259 15.7756 1.42052Z"
              fill="#6BB4FF"
            />
          </svg>
        </div>
        <v-form @submit.prevent="updateSubCategory" ref="formSub">
          <h1 class="blue-color">
            Редактировать подкатегорию
          </h1>
          <h3 class="mt-7">Название подкатегории</h3>
          <v-text-field
            v-model="subForm.name"
            class="my-input mt-2"
            placeholder="Название категории"
            :rules="[rules.required]"
            solo
          ></v-text-field>

          <button type="submit" class="mt-5 mx-auto blue-btn">
            Сохранить
          </button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Search from "@/components/admin/Search";
export default {
  layout: "admin",
  components: { Search },
  async asyncData({ $axios }) {
    let pageNumber = 1;
    let pageSize = 10;

    let categories = await $axios.$get("categories/", {
      params: {
        "page[number]": pageNumber,
        "page[size]": pageSize
      }
    });
    let all_categories = await $axios.$get("categories/");
    return { pageNumber, pageSize, categories, all_categories };
  },
  data: () => ({
    timeout: 2000,
    uploaded_subcategory: false,
    change_image: false,
    iscorrect: true,
    err_message: false,
    remove_sub: false,
    active: 0,
    edit: false,
    add_category_modal: false,
    sub_category_modal: false,
    form: {
      sub_category: []
    },
    subForm: {},
    sub_categories: 1,
    rules: {
      required: v => !!v || "Обязательное поле"
    }
  }),
  watch: {
    pageNumber() {
      this.fetchCategories("");
    }
  },
  computed: {
    meta() {
      if (this.categories?.meta?.pagination)
        return this.categories.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Categories");
  },

  methods: {
    openModal() {
      this.change_image = true;
      this.add_category_modal = true;
      this.edit = false;
      this.form = {};
      this.form.sub_category = [];
    },
    resetDefault() {
      this.active = 0;
      this.edit = false;
      this.form = {};
      this.form.sub_category = [];
      this.sub_categories = 1;
    },
    async fetchCategories(search) {
      await this.$axios
        .$get(`categories/`, {
          params: {
            "page[number]": this.pageNumber,
            "page[size]": this.pageSize,
            search: search
          }
        })
        .then(res => {
          this.categories = res;
        })
        .catch(() => {
          this.$notifier.showMessage({
            color: "warning",
            text: "Не удалось загрузить данные"
          });
        });
    },
    async submitSubCategory(id) {
      var arr = [];

      this.form.sub_category.map(e => {
        let ob = {};
        ob.name = e;
        ob.category = id;
        arr.push(ob);
      });

      await this.$axios
        .$post(`sub-categories/`, arr)
        .then(res => {
          this.fetchCategories("");
          this.add_category_modal = false;
          this.resetDefault();

          this.$notifier.showMessage({
            color: "success",
            text: "Подкатегория успешно добавлена"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async updateCategory() {
      let formData = new FormData();

      if (!this.change_image) {
        delete this.form.image;
      }

      Object.keys(this.form).forEach(field => {
        formData.append(field, this.form[field]);
      });

      await this.$axios
        .$patch(`categories/${this.form.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.submitSubCategory(response.id);
        })
        .catch(err => {
          this.iscorrect = false;
          if (err.response?.data?.image)
            this.err_message = err.response.data.image[0];
          else this.err_message = err.response.data;

          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async submit() {
      this.iscorrect = true;
      if (!this.$refs.form.validate()) return;
      let formData = new FormData();

      Object.keys(this.form).forEach(field => {
        formData.append(field, this.form[field]);
      });

      if (this.edit) {
        this.updateCategory();
      } else {
        await this.$axios
          .$post("categories/", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            this.submitSubCategory(response.id);
          })
          .catch(err => {
            this.iscorrect = false;
            if (err.response?.data?.image)
              this.err_message = err.response.data.image[0];
            else this.err_message = err.response.data;

            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      }
    },
    removeSubCategory(index) {
      if (this.sub_categories <= 1) return;
      this.remove_sub = index;
      this.sub_categories--;
      this.form.sub_category.splice(this.remove_sub, 1);
      this.remove_sub = false;
    },
    addSubCategory() {
      this.sub_categories++;
    },
    searchit(value) {
      this.fetchCategories(value);
    },
    editImage() {
      delete this.form.image;
      this.change_image = true;
    },
    async editItem(id) {
      this.resetDefault();
      this.edit = true;
      this.change_image = false;
      if (this.$refs.form) this.$refs.form.resetValidation();

      await this.$axios
        .$get(`categories/${id}/`)
        .then(res => {
          this.form = res;
          this.uploaded_subcategory = this.form.sub_categories;
          this.form.sub_category = [];
          this.add_category_modal = true;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    showSub(item, index) {
      index = index + 1;
      if (this.active == index || item.sub_categories.length == 0)
        this.active = 0;
      else this.active = index;
    },
    async editSubCategory(id) {
      await this.$axios
        .$get(`sub-categories/${id}/`)
        .then(response => {
          this.subForm.name = response.name;
          this.subForm.id = id;
          this.sub_category_modal = true;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async updateSubCategory() {
      if (!this.$refs.formSub.validate()) return;

      this.$axios
        .$patch(`sub-categories/${this.subForm.id}/`, { ...this.subForm })
        .then(response => {
          this.sub_category_modal = false;
          this.fetchCategories("");
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";

.categories {
  display: grid;
  grid-template-columns: 55px 1fr 40px 40px;
  background: #fff;
  cursor: pointer;
  &-hovered {
    background: #f2f6ff;
  }
}
.image {
  width: 24px;
  height: 24px;
}
.arrow {
  transition: 0.22s;
  &-rotate {
    transform: rotate(180deg);
  }
}
.sub-category {
  &:hover {
    background: #f2f6ff;
    cursor: pointer;
  }
}
.blue-btn {
  max-width: 280px;
  height: 50px;
}
.btns {
  .blue-btn,
  .red-btn-outline {
    height: 45px;
    max-width: 175px;
  }
}
.red-btn-outline {
  color: $red-color;
  &:hover {
    color: #fff;
  }
}
.border {
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 5px;
}
.sub-category-add {
  width: 100%;
  max-height: 370px;
  overflow-y: scroll;
  background: #ffffff;
  padding: 0 12px;

  &::-webkit-scrollbar {
    background: transparent;
    width: 6px;
    height: 34px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    height: 34px;
    background: #c4c4c4;
    border-radius: 3px;
  }
}
</style>
