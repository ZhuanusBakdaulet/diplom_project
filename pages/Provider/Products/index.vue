<template>
  <div class="">
    <Title title="Товары" />
    <Bread v-if="isSub" class="mt-5" :links="links" />
    <Search
      class="mt-5"
      :addText="'Добавить продукт'"
      @addbtn="addbtn"
      @searchit="searchit"
      @downloadCSV="downloadCSV"
      add
    />
    <div
      v-if="provider_products && provider_products.results.length > 0"
      class="mt-10 category-grid"
    >
      <Product
        v-for="(item, index) in provider_products.results"
        :key="index"
        :item="item"
        @editIt="editIt"
      />
    </div>
    <h2 v-else class="mt-10 text-center">Нет продуктов, пожалуйста добавьте</h2>

    <div v-if="meta.pages > 1" class="bg-default mx-auto pt-16 pb-7">
      <v-pagination
        class="mt-3"
        v-model="pageNumber"
        :length="meta.pages"
        circle
        color="warning"
        total-visible="10"
      >
      </v-pagination>
    </div>

    <v-dialog v-model="add_modal" width="1147">
      <v-card class="py-5 px-7">
        <svg
          @click="add_modal = false"
          class="close"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#252626"
          />
        </svg>

        <h2 class="fw500 text-left green-color">
          Добавление продукта
        </h2>
        <p class="application-text mt-2">
          Желаемого продукта нет в списке?
          <span @click="openRequestModal" class="pointer">
            Оставьте запрос на добавление продукта</span
          >
        </p>
        <v-form ref="productsForm" @submit.prevent="submit">
          <div class="d-flex mt-6">
            <div class="col-12 col-md-6 pa-0 pr-7">
              <h3 class="">Выберите продукт</h3>
              <v-select
                :items="products.results"
                item-text="name"
                item-value="id"
                class="my-input mt-2"
                solo
                v-model="form.product"
                placeholder="Продукты"
                no-data-text="Ничего не найдено"
              >
              </v-select>

              <h3 class="mt-3">Цена</h3>
              <v-text-field
                class="my-input mt-2"
                placeholder="Цена"
                type="number"
                solo
                v-model="form.price"
                :rules="[rules.required]"
                no-data-text="Ничего не найдено"
              >
              </v-text-field>

              <h3 class="mt-3">Закупка по</h3>
              <v-select
                class="my-input mt-2"
                placeholder="Закупка по"
                :items="[
                  { text: 'Мин. цене', value: 'M' },
                  { text: 'Мин. количество', value: 'C' }
                ]"
                item-text="text"
                item-value="value"
                solo
                v-model="form.purchase"
                :rules="[rules.required]"
              >
              </v-select>
              <div v-if="purchaseRule" class="">
                <h3 class="mt-3">
                  {{ form.purchase == "M" ? "Мин. цена" : "Мин. количество" }}
                </h3>
                <v-text-field
                  v-if="form.purchase == 'M'"
                  class="my-input mt-2"
                  placeholder="количество"
                  solo
                  type="number"
                  v-model="form.min_price"
                  :rules="[rules.required]"
                >
                </v-text-field>
                <v-text-field
                  v-if="form.purchase == 'C'"
                  class="my-input mt-2"
                  placeholder="цена"
                  solo
                  type="number"
                  v-model="form.min_count"
                  :rules="[rules.required]"
                >
                </v-text-field>
              </div>
            </div>
            <div class="col-12 col-md-6 pa-0">
              <h3 class="">Количество</h3>
              <v-text-field
                class="my-input mt-2"
                placeholder="Количество"
                type="number"
                solo
                v-model="form.amount"
                :rules="[rules.required]"
              >
              </v-text-field>

              <h3 class="mt-3">Скидка</h3>
              <v-text-field
                class="my-input mt-2"
                placeholder="Скидка 0%-100%"
                type="number"
                solo
                v-model="form.discount"
                max="100"
                min="0"
                :rules="[]"
              >
              </v-text-field>

              <h3 class="mt-3">Период скидки</h3>
              <div class="d-flex mt-2">
                <v-menu
                  ref="date1"
                  v-model="date1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :nudge-top="22"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="my-input pr-2"
                      v-model="form.discount_active_from"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      solo
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :first-day-of-week="1"
                    v-model="form.discount_active_from"
                    :min="$moment(new Date()).format('YYYY-MM-DD')"
                    no-title
                  >
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="date2"
                  v-model="date2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :nudge-top="22"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="my-input pl-2"
                      v-model="form.discount_active_to"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      solo
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :first-day-of-week="1"
                    v-model="form.discount_active_to"
                    :min="
                      $moment(form.discount_active_from).format('YYYY-MM-DD')
                    "
                    no-title
                  >
                  </v-date-picker>
                </v-menu>
              </div>

              <h3 class="mt-3">Активировать</h3>
              <v-checkbox class="my-input mt-2" solo v-model="form.is_active">
              </v-checkbox>
            </div>
          </div>

          <button type="submit" class="mt-1 green-btn mx-auto">
            Добавить
          </button>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="csv_modal" width="447">
      <v-card class="py-9 px-5">
        <svg
          @click="csv_modal = false"
          class="close"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#252626"
          />
        </svg>

        <p class="fw500 text-left green-color">
          Загрузить файл CSV
        </p>
        <v-form ref="csvForm" @submit.prevent="submitCSV">
          <v-file-input
            class="my-input mt-8"
            accept="text/csv"
            show-size
            truncate-length="15"
            placeholder="Загрузить  файл CSV"
            v-model="csv"
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

          <button type="submit" class="mt-8 green-btn mx-auto">
            Отправить
          </button>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="request_modal" width="667" persistent>
      <v-card class="py-10 px-12">
        <svg
          @click="request_modal = false"
          class="close"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#52B059"
          />
        </svg>
        <h1 class="blue-color">
          Добавить продукт
        </h1>
        <div class="mt-6 d-flex justify-space-between">
          <div
            class="step d-flex align-center"
            :class="[
              step == 1 ? 'step-active' : '',
              step > 1 ? 'step-done' : ''
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
              step > 2 ? 'step-done' : ''
            ]"
          >
            <div class="number">2</div>
            Фотографии
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
            <button type="submit" class="mt-5 green-btn dalee mx-auto">
              Далее
            </button>
          </v-form>
        </div>
        <div v-if="step == 2" class="mt-8">
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
            </div>

            <button class="mt-5 green-btn dalee mx-auto">
              Далее
            </button>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Title from "@/components/provider/Title";
import Bread from "@/components/provider/Bread";
import Product from "@/components/provider/Product";
import Search from "@/components/provider/Search";

export default {
  layout: "provider",
  middleware: "provider",
  async asyncData({ $axios }) {
    let pageNumber = 1;
    let pageSize = 5;
    let params = {
      "page[number]": pageNumber,
      "page[size]": pageSize
    };
    const provider_products = await $axios.$get(`provider-products/`, {
      params
    });
    const products = await $axios.$get(`products/`);
    return { pageNumber, pageSize, provider_products, products };
  },
  data: () => ({
    // product request
    request_modal: false,
    step: 1,
    productForm: {
      is_active: true,
      images: []
    },

    categories: [],
    sub_categories: [],
    brands: [],
    id: false,
    imageCount: 1,
    // product request

    // CSV request
    csv: "",
    csv_modal: false,
    // CSV request

    // Add Madal request
    isedit: false,
    form: {},
    date1: false,
    date2: false,
    add_modal: false,
    // Add Madal request

    search: "",
    rules: {
      required: v => !!v || "Обязательное поле",
      discount: v => (v && v >= 0 && v <= 100) || "Должно быть межу 0-100%",
      counter: v => v?.length <= 300 || "Не больше 300 символов"
    },
    links: [
      {
        text: "Товары",
        url: "/provider/Products"
      },
      {
        text: "Категории",
        url: "/provider/Products"
      }
    ]
  }),
  components: { Title, Product, Search, Bread },
  created() {
    this.$store.commit("changeProviderMenu", "Products");
    this.fetchCategory();
    this.fetchBrands();
    this.getSubCategories();
  },
  watch: {
    pageNumber() {
      this.fetchProducts();
    }
  },
  computed: {
    startDateRule() {
      if (this.form.discount_active_from) return true;
      return false;
    },
    discountRule() {
      if (
        !this.form.discount &&
        (this.form.discount_active_from || this.form.discount_active_to)
      )
        return true;
      return false;
    },
    purchaseRule() {
      if (this.form.purchase) return true;
      return false;
    },
    meta() {
      if (this.provider_products?.meta?.pagination)
        return this.provider_products.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
    isSub() {
      if ((this.$route.query.t, this.$route.query.a)) {
        let a = this.$route.query.a;
        let t = this.$route.query.t;

        this.links[1].text = t;
        this.links[1].url = `/provider/Categories?t=${t}`;
        this.links.push({
          text: a,
          url: `/provider/Products?t=${t}&a=${a}`
        });
        return true;
      }
    }
  },
  methods: {
    openRequestModal() {
      if (this.$refs.submitProduct) this.$refs.submitProduct.reset();
      if (this.$refs.submitImages) this.$refs.submitImages.reset();
      this.productForm = {
        is_active: true,
        images: []
      };
      this.imageCount = 1;
      this.request_modal = true;
    },
    closeModal() {
      this.request_modal = false;
    },

    // Fetches
    async getSubCategories() {
      await this.$axios.$get(`sub-categories`).then(res => {
        this.subcategories = res.results;
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
    // Fetches

    // Imeage
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
        .then(response => {
          this.$notifier.showMessage({
            text: `Картинки успешно добавлены`,
            color: "success"
          });
          this.closeModal();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    addImageCount() {
      this.imageCount++;
    },
    removeSubCategory(index) {
      if (this.imageCount <= 1) return;
      this.imageCount--;
      this.productForm.images.splice(index, 1);
    },
    // Imeage

    // Product submit
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
          request = await this.$axios.$post(`products/`, this.productForm);
        }
        this.id = request.id;
        this.step = 2;
        this.$notifier.showMessage({
          text: `Запрос на товар успешно отправлен`,
          color: "success"
        });
      } catch (err) {
        console.log(err.response.data);
        let error = Object.values(err.response.data).join(", ");
        this.$notifier.showMessage({ color: "error", text: error });
      }
    },
    // Product submit

    editIt(value) {
      this.form = value;
      this.add_modal = true;
      this.isedit = true;
    },
    async fetchProducts() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize
      };
      await this.$axios
        .$get(`provider-products/`, { params })
        .then(res => {
          this.provider_products = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async submit() {
      if (!this.$refs.productsForm.validate()) return;

      let form = { ...this.form };

      if (form.discount_active_from && form.discount_active_to) {
        form.discount_active_from =
          new Date(form.discount_active_from).getTime() / 1000;
        form.discount_active_to =
          new Date(form.discount_active_to).getTime() / 1000;
      }
      console.log(this.isedit);
      if (this.isedit) {
        form.product = form.product.id;
        await this.$axios
          .$patch(`provider-products/${form.id}/`, form)
          .then(res => {
            this.fetchProducts();
            this.add_modal = false;
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно изменен"
            });
          })
          .catch(err => {
            console.log(err.response);
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else
        await this.$axios
          .$post(`provider-products/`, form)
          .then(res => {
            this.fetchProducts();
            this.add_modal = false;
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно добавлен"
            });
          })
          .catch(err => {
            console.log(err.response);
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
    },
    async submitCSV() {
      if (!this.$refs.csvForm.validate()) return;

      let product = new FormData();

      product.append("csv", this.csv);

      await this.$axios
        .$post(`provider-products/csv_create/`, product, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.fetchProducts();
          this.csv_modal = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addbtn() {
      this.isedit = false;
      this.add_modal = true;
    },
    searchit(value) {
      console.log("search", value);
    },
    downloadCSV() {
      this.csv_modal = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";
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
  cursor: default;

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
      background: $green-color;
      color: #313131;
    }
    .number {
      color: #313131;
      border-color: #313131;
    }
  }
  &-done {
    color: $green-color;
    .line {
      background: $green-color;
      color: $green-color;
    }
    .number {
      color: transparent;
      background: url("@/assets/image/icons/green-check.svg");
    }
  }
}
.category-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
.close {
  position: absolute;
  top: 12px;
  right: 20px;
}
.green-btn {
  max-width: 200px;
}
.application-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  color: #cecece;

  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    color: #52b059;
  }
}
</style>
