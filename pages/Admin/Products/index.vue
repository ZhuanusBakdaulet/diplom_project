<template>
  <div class="">
    <div class="bg-white pt-4">
      <div class="d-flex align-center justify-space-between mx-8">
        <Search
          class="mr-8"
          @searchit="searchit"
          :placeholder="'Поиск по ФИО туриста, отелю, турагенту'"
          :items="all_products.results"
        />
        <button @click="addProduct" class=" mr-3 blue-btn-outline">
          <svg
            class="mr-1"
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
              fill="#6BB4FF"
            />
          </svg>

          Добавить
        </button>
        <p class="p15 grey-color">
          <v-select
            hide-details
            v-model="filter"
            :items="filters"
            item-text="text"
            item-value="value"
            class="filter"
            placeholder="Фильтровать"
            solo
            no-data-text="Ничего не найдено"
            @change="handleFilter('all')"
          >
          </v-select>
        </p>
      </div>
      <div class="">
        <div class="mt-5 mx-7 filter-drop" v-if="filter == 'category'">
          <h3 class="">Выберите категорию</h3>
          <v-select
            hide-details
            v-model="filterItem"
            :items="categories"
            item-text="name"
            item-value="id"
            class="my-input mt-2"
            placeholder="Выберите категорию"
            solo
            no-data-text="Ничего не найдено"
            @change="handleFilter('category')"
          >
          </v-select>
        </div>
        <div class="mt-5 mx-7 filter-drop" v-if="filter == 'sub_category'">
          <h3 class="">Выберите подкатегорию</h3>
          <v-select
            hide-details
            v-model="filterItem"
            :items="subcategories"
            item-text="name"
            item-value="id"
            class="my-input mt-2"
            placeholder="Выберите подкатегорию"
            solo
            no-data-text="Ничего не найдено"
            @change="handleFilter('sub_category')"
          >
          </v-select>
        </div>
        <div class="mt-5 mx-7 filter-drop" v-if="filter == 'brand'">
          <h3 class="">Выберите бренд</h3>
          <v-select
            hide-details
            v-model="filterItem"
            :items="brands"
            item-text="name"
            item-value="id"
            class="my-input mt-2"
            placeholder="Выберите бренд"
            solo
            no-data-text="Ничего не найдено"
            @change="handleFilter('brand')"
          >
          </v-select>
        </div>
      </div>

      <div class="mt-11">
        <Product
          v-for="item in products.results"
          :key="item.id"
          :item="item"
          @edit="edit"
        />
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

    <v-dialog v-model="add_modal" width="667">
      <v-card class="py-10 px-12">
        <h1 class="blue-color">
          Добавить продукт
        </h1>
        <div class="mt-6 d-flex justify-space-between">
          <div
            class="step d-flex align-center"
            :class="[
              step == 1 ? 'step-active' : '',
              step > 1 ? 'step-done' : '',
              isedit ? 'pointer' : ''
            ]"
          >
            <div class="number">1</div>
            Информация
            <div class="line"></div>
          </div>
          <div
            class="step d-flex align-center"
            :class="[
              step == 2 ? 'step-active' : '',
              step > 2 ? 'step-done' : '',
              isedit ? 'pointer' : ''
            ]"
          >
            <div class="number">2</div>
            Характеристики
            <div class="line"></div>
          </div>
          <div
            class="step d-flex align-center"
            :class="[
              step == 3 ? 'step-active' : '',
              step > 3 ? 'step-done' : '',
              isedit ? 'pointer' : ''
            ]"
          >
            <div class="number">3</div>
            Фотографии
            <div class="line"></div>
          </div>
          <div
            class="step d-flex align-center"
            :class="[
              step == 4 ? 'step-active' : '',
              step > 4 ? 'step-done' : '',
              isedit ? 'pointer' : ''
            ]"
          >
            <div class="number">4</div>
            Штрих код
            <div class="line"></div>
          </div>
        </div>
        <div v-if="step == 1" class="mt-8">
          <v-form ref="submitProduct" @submit.prevent="submitProduct">
            <h3 class="">Название продукта</h3>
            <v-text-field
              v-model="productForm.name"
              class="my-input mt-2"
              placeholder="Название продукта"
              :rules="[rules.required]"
              solo
            >
            </v-text-field>

            <h3 class="mt-2">Выберите категорию</h3>
            <v-select
              v-model="productForm.category"
              :items="categories"
              item-text="name"
              item-value="id"
              class="my-input mt-2"
              placeholder="Выберите категорию"
              :rules="[rules.required]"
              solo
              no-data-text="Ничего не найдено"
              @input="fetchSubCategory"
            >
            </v-select>

            <h3 class="mt-2">Выберите подкатегорию</h3>
            <v-select
              v-model="productForm.sub_category"
              :items="sub_categories"
              item-text="name"
              item-value="id"
              class="my-input mt-2"
              placeholder="Выберите подкатегорию"
              :rules="[rules.required]"
              solo
              no-data-text="Ничего не найдено"
            >
            </v-select>

            <h3 class="mt-2">Введите описание</h3>
            <v-textarea
              v-model="productForm.description"
              class="my-input mt-2"
              placeholder="Введите описание"
              :rules="[rules.required]"
              solo
              counter
            >
            </v-textarea>

            <div class="d-flex align-start justify-space-between">
              <div class="">
                <h3 class="">Продвигать продукт</h3>
                <v-checkbox
                  v-model="productForm.is_top"
                  class="my-input mt-2"
                  solo
                >
                </v-checkbox>
              </div>
              <div class="mx-auto">
                <h3 class="">Активировать продукт</h3>
                <v-checkbox
                  v-model="productForm.is_active"
                  class="my-input mt-2"
                  solo
                >
                </v-checkbox>
              </div>
            </div>

            <h3 class="mt-2">Выберите бренд</h3>
            <v-select
              v-model="productForm.brand"
              :items="brands"
              item-text="name"
              item-value="id"
              class="my-input mt-2"
              placeholder="Выберите бренд"
              solo
              no-data-text="Ничего не найдено"
            >
            </v-select>
            <button type="submit" class="mt-5 blue-btn dalee mx-auto">
              Далее
            </button>
          </v-form>
        </div>
        <div v-if="step == 2" class="mt-8">
          <h3 class="">Выберите характеристики</h3>
          <v-form ref="submitProperty" @submit.prevent="submitProperty">
            <div class="property mt-3 py-4 px-6">
              <v-autocomplete
                v-model="productForm.units"
                :items="units"
                class="my-input mt-2"
                placeholder="Выберите категорию"
                :rules="[rules.required]"
                solo
                no-data-text="Ничего не найдено"
                chips
                clearable
                deletable-chips
                multiple
              >
                <template v-slot:item="{ item }">
                  <div class="d-flex align-center">
                    <div class="check-box mr-3">
                      <svg
                        v-if="productForm.units.some(v => v.id == item.id)"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0)">
                          <path
                            d="M5.53974 11.4066L11.8366 2.18286C12.1279 1.75581 12.0179 1.17359 11.5911 0.88202L10.8179 0.354389C10.3911 0.0630385 9.80846 0.17279 9.51711 0.599877L4.30911 8.22859L2.02288 6.59734C1.60216 6.29713 1.01761 6.3947 0.717355 6.81568L0.173547 7.57761C-0.126666 7.99833 -0.0288754 8.58288 0.391887 8.88314L4.25013 11.636C4.67089 11.9362 5.24843 11.8334 5.53974 11.4066Z"
                            fill="#6BB4FF"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="12" height="12" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p class="gilroy p15">
                      {{ item.name }}
                    </p>
                  </div>
                </template>
                <template v-slot:selection="{ item }">
                  <div class="chips mr-2 my-2">
                    <svg
                      @click="
                        productForm.units.splice(
                          productForm.units.indexOf(item)
                        )
                      "
                      class="mr-1 pointer"
                      width="7"
                      height="7"
                      viewBox="0 0 7 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.90187 0.621477L6.41832 0.143683C6.28748 0.0128423 6.07131 0.0128423 5.93478 0.143683L3.52275 2.55564L1.06526 0.0981729C0.934364 -0.0327243 0.718191 -0.0327243 0.581718 0.0981729L0.0981737 0.581713C-0.0327246 0.712554 -0.0327246 0.928725 0.0981737 1.06525L2.55003 3.51709L0.143684 5.93479C0.0128424 6.06563 0.0128424 6.2818 0.143684 6.41833L0.627228 6.90187C0.758069 7.03271 0.974242 7.03271 1.11077 6.90187L3.52275 4.48986L5.93478 6.90187C6.06562 7.03271 6.28179 7.03271 6.41832 6.90187L6.90187 6.41833C7.03271 6.28749 7.03271 6.07132 6.90187 5.93479L4.48415 3.52278L6.89618 1.11082C7.03271 0.974177 7.03271 0.758006 6.90187 0.621477Z"
                        fill="white"
                      />
                    </svg>
                    {{ item.name }}
                  </div>
                </template>
              </v-autocomplete>

              <div v-if="productForm.units" class="">
                <div
                  class=""
                  v-for="(item, index) in productForm.units"
                  :key="index"
                >
                  <h3 class="mt-2">{{ item.name }}</h3>
                  <v-select
                    v-model="productForm.product_properties[index]"
                    :items="item.values"
                    item-text="value"
                    item-value="id"
                    class="my-input mt-2"
                    placeholder="Выберите бренд"
                    solo
                    no-data-text="Ничего не найдено"
                  >
                  </v-select>
                </div>
              </div>

              <button
                @click="addproperty_modal = true"
                type="button"
                class="blue-btn-outline btnbtn mt-auto"
              >
                Добавить характеристику
              </button>
            </div>

            <button type="submit" class="mt-5 mx-auto blue-btn dalee">
              Далее
            </button>
          </v-form>
        </div>
        <div v-if="step == 3" class="mt-8">
          <v-form ref="submitImages" @submit.prevent="submitImages">
            <div class="property mt-3 py-4 px-6">
              <h3 class="mt-3">Загрузите фотографию продукта</h3>
              <div v-for="item in imageCount" :key="item" class="">
                <v-file-input
                  v-model="productForm.images[item]"
                  class="my-input mt-2"
                  accept="image/*"
                  show-size
                  truncate-length="15"
                  placeholder="Загрузить фотографию"
                  solo
                  prepend-inner-icon=""
                  prepend-icon=""
                >
                  <template v-slot:prepend-inner>
                    <svg
                      v-if="item == imageCount"
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
                  <template v-slot:append-outer>
                    <div class="d-flex align-center">
                      <svg
                        v-if="item == imageCount"
                        @click="addImageCount"
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
                        v-if="imageCount != 1"
                        @click="removeSubCategory(item - 1)"
                        color="warning"
                        class="ml-8"
                      >
                        mdi-minus
                      </v-icon>
                    </div>
                  </template>
                </v-file-input>
              </div>
              <div v-if="isedit && uploadedImages" class="d-flex row mx-0 mt-5">
                <div
                  class="mr-3"
                  v-for="(item, index) in uploadedImages"
                  :key="index"
                >
                  <div class="product-image ma-3">
                    <img
                      class=""
                      :src="item.image"
                      width="100"
                      height="100"
                      alt=""
                    />
                    <svg
                      @click="deleteImage(item.id, index)"
                      class="close"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 3C7.47715 3 3 7.47715 3 13C3 18.5228 7.47715 23 13 23C18.5228 23 23 18.5228 23 13C23 7.47715 18.5228 3 13 3ZM0.5 13C0.5 6.09644 6.09644 0.5 13 0.5C19.9036 0.5 25.5 6.09644 25.5 13C25.5 19.9036 19.9036 25.5 13 25.5C6.09644 25.5 0.5 19.9036 0.5 13ZM7.74112 7.74112C8.22927 7.25296 9.02073 7.25296 9.50888 7.74112L13 11.2322L16.4911 7.74112C16.9793 7.25296 17.7707 7.25296 18.2589 7.74112C18.747 8.22927 18.747 9.02073 18.2589 9.50888L14.7678 13L18.2589 16.4911C18.747 16.9793 18.747 17.7707 18.2589 18.2589C17.7707 18.747 16.9793 18.747 16.4911 18.2589L13 14.7678L9.50888 18.2589C9.02073 18.747 8.22927 18.747 7.74112 18.2589C7.25296 17.7707 7.25296 16.9793 7.74112 16.4911L11.2322 13L7.74112 9.50888C7.25296 9.02073 7.25296 8.22927 7.74112 7.74112Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button class="mt-5 blue-btn dalee mx-auto">
              Далее
            </button>
          </v-form>
        </div>
        <div v-if="step == 4" class="mt-8">
          <v-form ref="submitBarcodes" @submit.prevent="submitBarcodes">
            <div class="property mt-3 py-4 px-6">
              <h3 class="mt-3">Введите штрих код</h3>

              <div v-if="isedit && uploadedBarcodes" class="">
                <v-text-field
                  v-for="(item, index) in uploadedBarcodes"
                  :key="index"
                  v-model="item.code"
                  class="my-input mt-2"
                  placeholder="213120129124"
                  solo
                  readonly
                  type="number"
                >
                  <template v-slot:append-outer>
                    <div class="d-flex align-center">
                      <v-icon
                        @click="deleteBarcodes(item - 1, item.id)"
                        color="warning"
                        class="ml-8"
                      >
                        mdi-minus
                      </v-icon>
                    </div>
                  </template>
                </v-text-field>
              </div>
              <div class="">
                <v-text-field
                  v-for="item in imageCount"
                  :key="item"
                  v-model="productForm.barcodes[item]"
                  class="my-input mt-2"
                  placeholder="213120129124"
                  solo
                  type="number"
                >
                  <template v-slot:append-outer>
                    <div class="d-flex align-center">
                      <svg
                        v-if="item == imageCount"
                        @click="addImageCount"
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
                        v-if="imageCount != 1"
                        @click="removeBarcodes(item - 1)"
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

            <button type="submit" class="mt-5 blue-btn dalee mx-auto">
              Далее
            </button>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <PropertyModal
      v-if="addproperty_modal"
      :isactive="addproperty_modal"
      @close="addproperty_modal = false"
    />
  </div>
</template>

<script>
import Search from "@/components/admin/Search";
import Product from "@/components/admin/Product";
import PropertyModal from "@/components/admin/PropertyModal";
export default {
  layout: "admin",
  components: { Product, Search, PropertyModal },
  async asyncData({ $axios, store }) {
    let pageNumber = 1;
    let pageSize = 5;
    let params = {
      "page[number]": pageNumber,
      "page[size]": pageSize
    };

    let products = await $axios.$get(`products/`, { params });
    let all_products = await $axios.$get(`products/`);
    return { pageNumber, pageSize, products, all_products };
  },
  data: () => ({
    addproperty_modal: false,
    uploadedBarcodes: false,
    uploadedImages: false,
    isedit: false,
    id: false,
    subcategories: [],
    filter: "",
    filterItem: "",
    filters: [
      {
        text: "Все",
        value: "all"
      },
      {
        text: "По категориям",
        value: "category"
      },
      {
        text: "По подкатегориям",
        value: "sub_category"
      },
      {
        text: "По  брендам",
        value: "brand"
      }
    ],
    images_post: [],
    step: 1,
    units: [],
    brands: [],
    properties: [],
    categories: [],
    sub_categories: [],
    add_modal: false,
    productForm: {
      is_active: true,
      units: [],
      product_properties: [],
      images: [],
      barcodes: []
    },
    imageCount: 1,
    rules: {
      required: v => !!v || "Обязательное поле",
      counter: v => v?.length <= 300 || "Не больше 300 символов"
    }
  }),
  watch: {
    addproperty_modal() {
      this.fetchProperties();
      this.fetchUnits();
    },
    pageNumber() {
      this.fetchProducts({});
    },
    add_modal() {
      if (!this.add_modal) this.fetchProducts({});
      this.step = 1;
    }
  },
  computed: {
    chooseCategory() {
      if (this.productForm?.category) return true;
      else return false;
    },
    meta() {
      if (this.products?.meta?.pagination) return this.products.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Products");
    this.fetchCategory();
    this.fetchProperties();
    this.fetchBrands();
    this.fetchUnits();
    this.getSubCategories();
  },
  methods: {
    async edit(value) {
      this.isedit = true;

      this.productForm = {
        is_active: true,
        units: [],
        product_properties: [],
        images: [],
        barcodes: [],
        ...value
      };
      this.uploadedImages = this.productForm.images;
      this.productForm.images = [];
      this.id = value.id;
      this.uploadedBarcodes = this.productForm.barcodes;
      this.productForm.barcodes = [];

      await this.$axios
        .$get(`sub-categories/${this.productForm.sub_category}/`)
        .then(res => {
          this.productForm.category = res.category.id;
          this.fetchSubCategory();
          this.productForm.sub_category = res.id;
          this.step = 1;
          this.add_modal = true;
        });
    },
    async getSubCategories() {
      await this.$axios.$get(`sub-categories`).then(res => {
        this.subcategories = res.results;
      });
    },
    handleFilter(type) {
      let params = {};
      if (type != "all") params[`${type}`] = this.filterItem;

      this.fetchProducts(params);
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
        reader.onerror = error => reject(error);
      });
    },
    async imagesToPost() {
      let images = [];
      for (let i = 1; i < this.productForm.images.length; i++) {
        let ob = {};
        await this.getBase64(this.productForm.images[i]).then(data => {
          ob.product = this.id;
          ob.image = data;
          images.push(ob);
        });
      }
      return images;
    },
    async submitImages() {
      if (!this.$refs.submitImages.validate()) return;
      let images = [];

      images = await this.imagesToPost();

      await this.$axios
        .$post(`product-images/`, images)
        .then(() => {
          this.step = 4;
          this.imageCount = 1;
        })
        .catch(err => {
          let error = "Проблемы сервера";
          error = Object.values(err.response.data)[0].image.join(" ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async submitBarcodes() {
      if (!this.$refs.submitBarcodes.validate()) return;
      var barcodes = [];
      for (let i = 1; i < this.productForm.barcodes.length; i++) {
        let ob = {};
        ob.product = this.id;
        ob.code = this.productForm.barcodes[i];
        barcodes.push(ob);
      }

      this.$axios
        .$post(`barcodes/`, barcodes)
        .then(response => {
          this.step = 1;
          this.add_modal = false;
          this.fetchProducts({});
          if (this.isedit) {
            this.$notifier.showMessage({
              text: `Товар успешно изменен`,
              color: "success"
            });
          } else {
            this.$notifier.showMessage({
              text: `Товар успешно добавлен`,
              color: "success"
            });
          }
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async submitProperty() {
      if (!this.$refs.submitProperty.validate()) return;
      delete this.productForm.is_active;

      await this.$axios
        .$patch(`products/${this.id}/`, {
          product_properties: this.productForm.product_properties
        })
        .then(response => {
          this.step = 3;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async deleteImage(id, index) {
      await this.$axios
        .$delete(`product-images/${id}/`)
        .then(() => {
          this.uploadedImages.splice(index, 1);
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async submitProduct() {
      if (!this.$refs.submitProduct.validate()) return;

      try {
        let request;
        if (this.isedit) {
          request = await this.$axios.$patch(
            `products/${this.productForm.id}/`,
            {
              ...this.productForm
            }
          );
        } else {
          request = await this.$axios.$post(`products/`, {
            ...this.productForm
          });
        }
        this.updateProperty(request);
        this.id = request.id;
        this.step = 2;
      } catch (err) {
        let error = Object.values(err.response.data).join(", ");
        this.$notifier.showMessage({ color: "error", text: error });
      }
    },
    async updateProperty(product) {
      for (let i = 0; i < product.product_properties.length; i++) {
        let id = product.product_properties[i].unit;
        function findUnit(unit) {
          return unit.id == id;
        }
        this.productForm.units.push(this.units.find(findUnit));
      }
    },
    removeSubCategory(index) {
      if (this.imageCount <= 1) return;
      this.imageCount--;
      this.productForm.images.splice(index, 1);
    },
    removeBarcodes(index) {
      if (this.imageCount <= 1) return;
      this.imageCount--;
      this.productForm.barcodes.splice(index, 1);
    },
    async deleteBarcodes(index, id) {
      await this.$axios
        .$delete(`barcodes/${id}/`)
        .then(res => {
          this.uploadedBarcodes.splice(index, 1);
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    addImageCount() {
      this.imageCount++;
    },

    async fetchUnits() {
      await this.$axios
        .$get(`units/`)
        .then(res => {
          this.units = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchBrands() {
      await this.$axios
        .$get(`brands/`)
        .then(res => {
          this.brands = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchProperties() {
      await this.$axios
        .$get(`properties/`)
        .then(res => {
          this.properties = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchCategory() {
      await this.$axios
        .$get(`categories/`)
        .then(res => {
          this.categories = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchSubCategory() {
      await this.$axios
        .$get(`sub-categories/`, {
          params: { category: [this.productForm.category] }
        })
        .then(res => {
          this.sub_categories = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchProducts(inparams) {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        ...inparams
      };
      await this.$axios.$get(`products/`, { params }).then(res => {
        this.products = res;
      });
    },
    searchit(value) {
      let params = {
        search: value
      };
      this.fetchProducts(params);
    },
    resetRefs() {
      if (this.$refs.submitProduct) this.$refs.submitProduct.reset();
      if (this.$refs.submitProperty) this.$refs.submitProperty.reset();
      if (this.$refs.submitImages) this.$refs.submitImages.reset();
      if (this.$refs.submitBarcodes) this.$refs.submitBarcodes.reset();
    },
    addProduct() {
      this.resetRefs();
      this.add_modal = true;
      this.isedit = false;
      this.productForm = {
        is_active: true,
        units: [],
        product_properties: [],
        images: [],
        barcodes: []
      };
      this.uploadedImages = [];
      this.uploadedBarcodes = [];
      this.imageCount = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.step {
  position: relative;
  width: 100%;
  height: 30px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #e4e4e4;

  .number {
    width: 30px;
    height: 30px;
    color: #e4e4e4;
    border: 1.5px solid #e4e4e4;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    border-radius: 50%;
  }
  .line {
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 4px;
    width: 100%;
    background: #e4e4e4;
  }
  &:first-child {
    .line {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
  &:last-child {
    .line {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }

  &-active {
    color: #313131;
    .line {
      background: $blue-color;
      color: #313131;
    }
    .number {
      color: #313131;
      border-color: #313131;
    }
  }
  &-done {
    color: $blue-color;
    .line {
      background: $blue-color;
      color: $blue-color;
    }
    .number {
      color: transparent;
      background: url("@/assets/image/icons/blue-check.svg");
    }
  }
}
.property {
  width: 100%;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 5px;
}
.dropdown {
  background: #fff;
  &-active {
    background: #e0efff;
    box-shadow: 15px 15px 25px rgba(138, 149, 158, 0.15);
  }
}
.check-box {
  width: 18px;
  height: 18px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chips {
  position: relative;
  padding: 4px 16px 5px;
  background: rgba(142, 142, 142, 0.21);
  border-radius: 4px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;

  .clear {
    position: absolute;
    top: 9px;
    left: 5px;
  }
}
.dalee {
  max-width: 260px;
  height: 50px;
}
.filter-drop {
  max-width: 537px;
}
.blue-btn-outline {
  height: 32px;
}
.product-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 83px;

  &:after {
    position: absolute;
    top: 0;
    left: 0px;
    content: "";
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.41);
  }
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    object-fit: cover;
  }
  .close {
    top: 7px;
    right: 7px;
    width: 15px;
    height: 15px;
    z-index: 11;
  }
}
.btnbtn {
  max-width: 234px;
  height: 45px;
}
</style>
