<template>
  <div>
    <div class="mt-4 bg-white py-4">
      <div class="d-flex align-center mt-4 mx-8">
        <button @click="openModal" class="ml-auto blue-btn-outline">
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
              fill="#6BB4FF"
            />
          </svg>
          Добавить
        </button>
        <div v-if="false" class="matched" @click="shw = !shw">
          <p class="mathced_p">{{ sortby.text }}</p>
          <div class="sub_matched" v-if="shw == true">
            <p @click="sortby = { value: 'all', text: 'Все' }" class="dp_p">
              Все
            </p>
            <p
              @click="sortby = { value: 'ended', text: 'Завершенные' }"
              class="dp_p"
            >
              Завершенные
            </p>
            <p
              @click="sortby = { value: 'current', text: 'Действующие' }"
              class="dp_p"
            >
              Действующие
            </p>
          </div>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.62204 5.56356C4.82142 5.7938 5.17858 5.7938 5.37796 5.56356L9.47967 0.827327C9.7601 0.503505 9.53008 0 9.1017 0H0.898298C0.469922 0 0.239896 0.503505 0.520334 0.827327L4.62204 5.56356Z"
              fill="#6BB4FF"
            />
          </svg>
        </div>
      </div>
      <div class="stocks bg-white mt-4">
        <div class="stocks_enum mb-5 px-7 bg-white">
          <p>№</p>
          <p>Название акции</p>
          <p>Описние</p>
          <p>Тип акции</p>
        </div>
        <div class="parity bg-white">
          <div
            class="stocks_div"
            v-for="(item, index) in promotions"
            :key="index"
          >
            <div class="stocks_content px-7 py-3">
              <p>{{ item.id }}</p>
              <p>{{ item.title }}</p>
              <p class="my-clamp">{{ item.description }}</p>
              <p>{{ getTypeOfPromotion(item.promotion_type) }}</p>
              <div class="d-flex align-center justify-space-around">
                <svg
                  @click="editModal(item)"
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
                    d="M8.82775 10.9205L16.3008 3.4475C17.2318 2.5175 18.7408 2.5175 19.6718 3.4475L20.8888 4.6645C21.8198 5.5955 21.8198 7.1055 20.8888 8.0355L13.3798 15.5445C12.9728 15.9515 12.4208 16.1805 11.8448 16.1805H8.09875L8.19275 12.4005C8.20675 11.8445 8.43375 11.3145 8.82775 10.9205Z"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.1652 4.60156L19.7312 9.16756"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <svg
                  @click="$router.push(`/admin/Promotions/${item.id}`)"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 5L15.5 12L8.5 19"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
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
    </div>

    <v-dialog v-model="dialog" width="797">
      <v-card class="v_card py-7 px-10">
        <svg
          @click="closeModal"
          class="close"
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
        <p class="title">{{ isEdit ? "Измение" : "Добавление" }} акции</p>
        <v-form
          class="d-flex w-100 mt-4"
          @submit.prevent="submitPromotion"
          ref="promotionForm"
        >
          <div class="col-12 col-md-6 pa-0 mr-2">
            <p class="text">Название акции<span>*</span></p>
            <v-text-field
              v-model="promotionForm.title"
              class="my-input mt-2"
              placeholder="Введите название акции"
              :rules="[rules.required]"
              solo
            >
            </v-text-field>

            <p class="text">Загрузите изображение</p>
            <v-file-input
              v-if="isImageChanged"
              v-model="promotionForm.image"
              class="my-input mt-2"
              placeholder="Загрузите изображение"
              accept="image/*"
              show-size
              truncate-length="15"
              :rules="[rules.required]"
              solo
              prepend-inner-icon=""
              prepend-icon=""
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
            <div v-else class="mt-3">
              <img
                :src="promotionForm.image"
                width="100px"
                height="100px"
                alt=""
              />

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

            <p class="text">Выберите тип акции</p>
            <v-select
              :items="promotion_types"
              v-model="promotionForm.promotion_type"
              class="my-input mt-2"
              placeholder="Выберите тип акции"
              :rules="[rules.required]"
              multiple
              solo
            >
            </v-select>

            <div v-if="isBrand" class="">
              <p class="text">Название бренда</p>
              <v-autocomplete
                clearable
                :items="brands"
                item-text="name"
                item-value="id"
                v-model="promotionForm.brand"
                class="my-input mt-2"
                placeholder="Выберите название бренда"
                solo
                :rules="[rules.required]"
                @change="fetchFilter"
              >
              </v-autocomplete>
            </div>

            <div v-if="isProduct" class="">
              <p class="text">Поставщик</p>
              <v-autocomplete
                clearable
                :items="providers"
                item-text="individual_name"
                item-value="id"
                v-model="promotionForm.provider"
                class="my-input mt-2"
                placeholder="Выберите поставщика"
                solo
                :rules="[rules.required]"
                @change="fetchFilter"
              >
              </v-autocomplete>
            </div>

            <div v-if="isProduct" class="">
              <p class="text">Название продукта</p>
              <v-autocomplete
                clearable
                :items="products"
                item-text="name"
                item-value="id"
                v-model="promotionForm.product"
                class="my-input mt-2"
                placeholder="Выберите продукт"
                solo
                :rules="[rules.required]"
                @change="fetchFilter"
              >
              </v-autocomplete>
            </div>
          </div>
          <div class="col-12 col-md-6 pa-0 ml-2">
            <p class="text">Описание</p>
            <v-textarea
              v-model="promotionForm.description"
              class="my-input mt-2"
              placeholder="Введите описание акции"
              :rules="[rules.required]"
              solo
              height="252"
              no-resize
            >
            </v-textarea>

            <button type="submit" class="blue-btn-outline ml-auto">
              {{ isEdit ? "Изменить" : "Добавить" }}
            </button>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data: () => ({
    sortby: { value: "all", text: "Все" },
    pageNumber: 1,
    pageSize: 5,
    promotions: [],
    sub_promotions: [],
    ip: null,
    shw: false,
    dialog: false,
    isImageChanged: false,
    isEdit: false,
    promotionForm: {
      promotion_type: []
    },
    promotion_types: [
      { value: 1, text: "Количеству" },
      { value: 2, text: "Стоимости" },
      { value: 3, text: "Продукту" },
      { value: 4, text: "Брэнду" },
      { value: 5, text: "Поставщику" }
    ],
    rules: {
      required: value => !!value || "Это обязательное поле!"
    },

    providers: [],
    products: [],
    brands: [],
    provider_products: []
  }),
  async fetch() {
    let params = {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize
    };
    this.ip = await this.$axios
      .$get(`promotions/`, { params })
      .then(res => {
        this.promotions = res.results;
      })
      .catch(err => {
        this.$notifier.showMessage({
          text: "Не удалось загрузить",
          color: "error"
        });
      });
  },
  created() {
    this.$store.commit("changeAdminMenu", "Stocks");

    this.fetchFilter();
  },
  computed: {
    isProduct() {
      if (this.promotionForm?.promotion_type) {
        let res = false;
        for (let e of this.promotionForm.promotion_type) {
          if (e !== 4) {
            res = true;
            break;
          }
        }
        return res;
      }
      return false;
    },
    isBrand() {
      if (this.promotionForm?.promotion_type) {
        let res = false;
        this.promotionForm.promotion_type.map(e => {
          if (e === 4) res = true;
        });
        return res;
      }
      return false;
    },
    meta() {
      if (this.ip?.meta?.pagintaion) return this.ip.meta.pagintaion;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  methods: {
    async fetchFilter() {
      try {
        let params = {
          user_type: "P"
        };

        if (this.promotionForm.provider)
          params.provider = this.promotionForm.provider;
        if (this.promotionForm.brand) params.brand = this.promotionForm.brand;

        const providers = await this.$axios.$get(`auth/users/`, { params });
        const stores = await this.$axios.$get(`auth/users/`, {
          params: { user_type: "S" }
        });
        const products = await this.$axios.$get(`products/`, { params });
        const provider_products = await this.$axios.$get(`provider-products/`, {
          params
        });
        const brands = await this.$axios.$get(`brands/`, { params });

        this.providers = [...providers.results, ...stores.results];
        this.products = products.results;
        this.provider_products = provider_products.results;
        this.brands = brands.results;
      } catch (err) {
        this.$notifier.showMessage({
          color: "warning",
          text: `${err}`
        });
      }
    },
    async submitPromotion() {
      if (!this.$refs.promotionForm.validate()) return;

      if (this.isEdit && !this.isImageChanged) delete this.promotionForm.image;

      // if (!this.isImageChanged) delete this.promotionForm.image;
      let formData = new FormData();
      Object.keys(this.promotionForm).forEach(field => {
        if (this.promotionForm[field]) {
          if (field == "promotion_type") {
            this.promotionForm.promotion_type.forEach(e => {
              formData.append("promotion_type", parseInt(e));
            });
          } else formData.append(field, this.promotionForm[field]);
        }
      });

      let headers = {
        "Content-Type": "multipart/form-data"
      };

      if (!this.isEdit) {
        await this.$axios
          .$post(`promotions/`, formData, { headers })
          .then(res => {
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно добавлено"
            });
            this.$fetch();
            this.closeModal();
          })
          .catch(err => {
            let error = Object.entries(err.response.data).join(": ");
            this.$notifier.showMessage({
              color: "warning",
              text: `${error}`
            });
          });
      } else {
        await this.$axios
          .$patch(`promotions/${this.promotionForm.id}/`, formData, { headers })
          .then(res => {
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно изменено"
            });
            this.$fetch();
            this.closeModal();
          })
          .catch(err => {
            let error = Object.entries(err.response.data).join(": ");
            this.$notifier.showMessage({
              color: "warning",
              text: `${error}`
            });
          });
      }
    },
    editImage() {
      delete this.promotionForm.image;
      this.isImageChanged = true;
    },
    openModal() {
      this.dialog = true;
      this.isImageChanged = true;
    },
    editModal(item) {
      if (this.$refs.promotionForm) this.$refs.promotionForm.reset();
      this.promotionForm = { ...item };
      this.dialog = true;
      this.isEdit = true;
      this.isImageChanged = false;
    },
    closeModal() {
      this.dialog = false;
      if (this.$refs.promotionForm) this.$refs.promotionForm.reset();
      this.promotionForm = {};
      this.isEdit = false;
      this.isImageChanged = false;
    },
    getTypeOfPromotion(types) {
      let name = {
        1: "Количеству",
        2: "Стоимости",
        3: "Продукту",
        4: "Брэнду",
        5: "Поставщику"
      };
      let text = "";
      types.map((e, i) => {
        text = text + `${name[e]}`;
        if (i !== types.length - 1) text = text + ", ";
      });

      let result = "";
      if (types.length == 0) result = "-";
      else {
        result = `По ${text}`;
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.matched {
  z-index: 1;
  cursor: pointer;

  position: relative;
  display: flex;
  align-items: center;

  margin-left: 10px;
  padding-left: 15px;

  max-width: 160px;
  width: 100%;
  height: 35px;

  border: 1px solid #6bb4ff;
  background: #ffffff;
  border-radius: 4px;

  p {
    margin-right: 88px;

    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #6bb4ff;
  }

  .sub_matched {
    z-index: -1;
    position: absolute;
    left: -1px;
    top: 31px;

    flex-direction: column;
    justify-content: center;

    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 16px;

    max-width: 160px;
    width: 101.5%;
    height: 112px;
    border: 1px solid #6bb4ff;
    border-top: none;
    background: #ffffff;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    p {
      font-family: "Gilroy";
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #6bb4ff;

      &:nth-child(2) {
        margin: 17px 0;
      }
    }
  }
}
.stocks {
  width: 100%;
}
.parity {
  width: 100%;
  padding-bottom: 50px;
}
.stocks_enum {
  display: grid;
  width: 100%;
  grid-template-columns: 4% 22% 1fr 25% 8%;

  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #52b1ba;
  }
}

.stocks_div {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:nth-child(odd) {
    background: #f2f6ff;
  }
  &:nth-child(even) {
    background: #fff;
  }
  .stocks_content {
    display: grid !important;
    align-items: center;
    width: 100%;
    grid-template-columns: 4% 22% 1fr 25% 8%;

    p {
      font-family: "Gilroy";
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #313131;
      &:nth-child(4) {
        color: #06b04a;
      }
    }
    .arrow {
      cursor: pointer;
      transition: 0.22s;
      &-rotate {
        transform: rotate(180deg);
      }
    }
    svg {
      &:nth-child(5) {
        margin-right: 26px;
      }
    }
  }
  .sub_content {
    .hide_div {
      width: 100%;

      display: flex;
      flex-direction: row !important;

      padding: 10px 0 32px 114px;

      .left_side {
        display: flex;
        flex-direction: column;

        p {
          margin-bottom: 15px;
          margin-right: 15px;

          font-family: "Gilroy";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 16px;
          color: #9c9c9c;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .right_side {
        display: flex;
        flex-direction: column;

        p {
          margin-bottom: 15px;

          font-family: "Gilroy";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 16px;
          color: #313131;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;
  color: #6bb4ff;
}
.inputs {
  width: 100%;
  display: flex;

  .left_side {
    display: flex;
    flex-direction: column;

    width: 100%;

    margin-right: 30px;
  }
  .right_side {
    display: flex;
    flex-direction: column;

    width: 100%;
  }
  svg {
    &:nth-child(5) {
      margin-right: 26px;
    }
  }
}
.my-input {
  width: 100%;
}

.text {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #313131;
  margin-bottom: 5px;

  span {
    margin-left: 8px;
    color: #ff475d;
    line-height: 16px;
  }
}
.button_div {
  width: 100%;
  display: flex;
  justify-content: center;
}
.btn {
  max-width: 260px;
  width: 100%;
  height: 50px;

  background: #6bb4ff;
  border: 1px solid #6bb4ff;
  box-sizing: border-box;
  box-shadow: 0px 20px 20px rgba(82, 177, 186, 0.15);
  border-radius: 5px;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  color: #ffffff;
}
.circle {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
