<template>
  <div class="bg-white px-4 pt-13 pb-7 relative">
    <div
      @click="$router.go(-1)"
      class="admin-back d-flex align-center justify-center"
    >
      <svg
        class="mr-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 19L8.5 12L15.5 5"
          stroke="#7B8794"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Назад
    </div>

    <div class="align-start promotion-box">
      <div class="d-flex justify-center align-center image px-10 py-5">
        <img
          v-if="promotion.present_image"
          class="ma-auto"
          :src="promotion.present_image"
          alt=""
        />
        <img
          v-else
          class="ma-auto"
          src="@/assets/image/photos/default.svg"
          alt=""
        />
      </div>
      <div class="content">
        <div class="py-2 px-4">
          <h1>{{ promotion.title }}</h1>
        </div>
        <div class="py-2 px-4">
          <h3 class="fw500">Описание:</h3>
          <p class="mt-2">{{ promotion.description }}</p>
        </div>
        <div class="py-2 px-4">
          <h3 class="fw500">
            Поставщик:
            <span class="fw400">
              {{
                promotion.provider ? promotion.provider.individual_name : `-`
              }}
            </span>
          </h3>
          <h3 class="fw500 mt-2">
            Товар:
            <span class="fw400">
              {{ promotion.product ? promotion.product.name : `-` }}
            </span>
          </h3>
          <h3 class="fw500 mt-2">
            Бренд:
            <span class="fw400">
              {{ promotion.brand ? promotion.brand.name : `-` }}
            </span>
          </h3>
          <h3 class="fw500 mt-2">
            Тип акции:
            <span v-if="promotion.promotion_type" class="fw400">
              {{ getTypeOfPromotion(promotion.promotion_type) }}
            </span>
          </h3>
        </div>
      </div>
    </div>

    <div class="mt-6 grey-border">
      <div class="d-flex align-center justify-space-between">
        <h1 class="px-7 py-4">Промежуточная акции</h1>
        <button @click="openModal" class="blue-btn-outline add-btn">
          Добавить промежуточную акцию
        </button>
      </div>
      <div
        v-if="
          sub_promotions &&
            sub_promotions.results &&
            sub_promotions.results.length < 1
        "
        class="promotion-box px-7 py-4"
      >
        <p>Промежуточная акция не добавлена</p>
      </div>
      <div
        class="align-start promotion-box mb-6"
        v-for="(item, index) in sub_promotions.results"
        :key="index"
      >
        <div class="d-flex justify-center align-start image px-10 py-5">
          <img
            v-if="item.present_image"
            class="mx-auto"
            :src="item.present_image"
            alt=""
          />
          <img
            v-else
            class="ma-auto"
            src="@/assets/image/photos/default.svg"
            alt=""
          />
        </div>
        <div class="content">
          <div class="py-2 px-4">
            <h1>{{ item.present_title }}</h1>
          </div>
          <div class="py-2 px-4">
            <h3 class="fw500">Описание:</h3>
            <p class="mt-2">{{ item.present_description }}</p>
          </div>
          <div class="py-2 px-4">
            <h3 class="fw500 mt-2">
              Количество:
              <span class="fw400">{{ item.count ? item.count : `-` }}</span>
            </h3>
            <h3 class="fw500 mt-2">
              Цена:
              <span class="fw400">
                {{ item.price ? $price(item.price) : `-` }}
              </span>
            </h3>

            <h3 class="fw500 mt-2">
              Период акции:
              <span class="fw400">
                {{ $date(item.from_period) }} -
                {{ $date(item.to_period) }}
              </span>
            </h3>
          </div>
          <div class="py-2 px-4">
            <pre>{{ item }}</pre>
            <h1>Дополнительные условия</h1>
            <h3 class="fw500 mt-2">
              Дополнительное количество:
              <span class="fw400">{{
                item.additional_count ? item.additional_count : `-`
              }}</span>
            </h3>
            <h3 class="fw500 mt-2">
              Дополнительная сумма:
              <span class="fw400">
                {{
                  item.additional_price ? $price(item.additional_price) : `-`
                }}
              </span>
            </h3>
          </div>
          <div class="py-2 px-4">
            <nuxt-link
              :to="
                `/admin/Promotions/${$route.params.sub_promotions}/${item.id}`
              "
              class="blue-color pointer"
            >
              Просмотреть продвижение учавствующих
            </nuxt-link>
          </div>
          <div class="d-flex align-end">
            <button @click="editModal(item)" class="edit-btn ma-3 ml-auto">
              <svg
                class="mr-2"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1831 1.43306C10.4271 1.18898 10.8229 1.18898 11.0669 1.43306L13.5669 3.93306C13.811 4.17714 13.811 4.57286 13.5669 4.81694L5.44194 12.9419C5.32473 13.0592 5.16576 13.125 5 13.125H2.5C2.15482 13.125 1.875 12.8452 1.875 12.5V10C1.875 9.83424 1.94085 9.67527 2.05806 9.55806L8.30793 3.30819L10.1831 1.43306ZM8.75 4.63388L3.125 10.2589V11.875H4.74112L10.3661 6.25L8.75 4.63388ZM11.25 5.36612L12.2411 4.375L10.625 2.75888L9.63388 3.75L11.25 5.36612Z"
                  fill="#E4E4E4"
                />
              </svg>
              Редактировать
            </button>
          </div>
        </div>
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
        <p class="title">
          {{
            !isEdit
              ? "Добавление промежуточной акции"
              : "Редактирование промежуточной акции"
          }}
        </p>
        <v-form
          class="d-flex w-100 mt-4"
          @submit.prevent="submitPromotion"
          ref="promotionForm"
        >
          <div class="col-12 col-md-6 pa-0 mr-2">
            <p class="text">Название акции <span>*</span></p>
            <v-text-field
              v-model="promotionForm.present_title"
              class="my-input mt-2"
              placeholder="Введите название акции"
              :rules="[rules.required]"
              solo
            >
            </v-text-field>

            <p class="text">Общая стоимость <span>*</span></p>
            <v-text-field
              v-model="promotionForm.price"
              class="my-input mt-2"
              placeholder="Введите общую стоимость"
              :rules="[rules.required]"
              solo
              type="number"
            >
            </v-text-field>

            <p class="text">Общее количество <span>*</span></p>
            <v-text-field
              v-model="promotionForm.count"
              class="my-input mt-2"
              placeholder="Введите количество товара"
              type="number"
              :rules="[rules.required]"
              solo
            >
            </v-text-field>
            <p class="text">Выберите период акции <span>*</span></p>
            <v-menu
              ref="menu"
              v-model="calendar"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datesText"
                  class="my-input mt-2"
                  solo
                  label="Выберите период"
                  prepend-inner-icon="mdi-calendar"
                  :rules="[rules.required]"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                range
                v-model="dates"
                no-title
                scrollable
                :rules="[rules.required]"
                :min="mindate"
                :first-day-of-week="1"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="calendar = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(dates)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>

            <p class="text">Загрузите изображение</p>
            <v-file-input
              v-if="isImageChanged"
              v-model="promotionForm.present_image"
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
                :src="promotionForm.present_image"
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
          </div>
          <div class="col-12 col-md-6 pa-0 ml-2">
            <p class="text">Дополнительная стоимость</p>
            <v-text-field
              v-model="promotionForm.additional_price"
              class="my-input mt-2"
              placeholder="Введите дополнительную стоимость"
              type="number"
              solo
            >
            </v-text-field>
            <p class="text">Дополнительное количество</p>
            <v-text-field
              v-model="promotionForm.additional_count"
              class="my-input mt-2"
              placeholder="Введите дополнительное количество  "
              type="number"
              solo
            >
            </v-text-field>

            <p class="text">Описание <span>*</span></p>
            <v-textarea
              v-model="promotionForm.present_description"
              class="my-input mt-2"
              placeholder="Введите описание акции"
              :rules="[rules.required]"
              solo
              height="252"
              no-resize
            >
            </v-textarea>
            <button type="submit" class="blue-btn-outline ml-auto">
              {{ !isEdit ? "Добавить" : "Изменить" }}
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
    calendar: false,
    mindate: new Date().toISOString().substr(0, 10),
    dates: [],
    promotion: {},
    sub_promotions: {},
    dialog: false,
    isImageChanged: false,
    isEdit: false,
    promotionForm: {},
    promotion_types: [
      { value: 1, text: "Количеству" },
      { value: 2, text: "Стоимости" },
      { value: 3, text: "Продукту" },
      { value: 4, text: "Брэнду" },
      { value: 5, text: "Поставщику" }
    ],
    rules: {
      required: value => !!value || "Обязательное поле"
    }
  }),
  async fetch() {
    await this.$axios
      .$get(`promotions/${this.$route.params.sub_promotions}/`)
      .then(res => {
        this.promotion = res;
      })
      .catch(err => {
        console.log(err);
      });

    await this.$axios
      .$get(`promotions/sub-promotions/`, {
        params: { promotion: this.$route.params.sub_promotions }
      })
      .then(res => {
        this.sub_promotions = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    datesText() {
      if (this.dates[0] && this.dates[1]) {
        if (this.$moment(this.dates[0]) > this.$moment(this.dates[1])) {
          this.dates = [this.dates[1], this.dates[0]];
        }
        return this.dates.join(" ~ ");
      }
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Promotions");
  },
  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
        reader.onerror = error => reject(error);
      });
    },
    async imagesToPost() {
      let image;
      await this.getBase64(this.promotionForm.present_image).then(data => {
        image = data;
      });
      return image;
    },
    async submitPromotion() {
      if (!this.$refs.promotionForm.validate()) return;

      let from_period = this.$moment(this.dates[0]).unix();
      let to_period = this.$moment(this.dates[1]).unix();

      let present_image;
      if (this.promotionForm.present_image && this.isImageChanged)
        present_image = await this.imagesToPost();

      if (this.isEdit && !this.isImageChanged)
        delete this.promotionForm.present_image;

      let body = {
        ...this.promotionForm,
        from_period,
        to_period,
        present_image,
        promotion: this.$route.params.id
      };
      if (!this.isEdit) {
        await this.$axios
          .$post(`promotions/sub-promotions/`, body)
          .then(res => {
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно создан"
            });
            this.$fetch();
            this.closeModal();
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else {
        await this.$axios
          .$patch(`promotions/sub-promotions/${this.promotionForm.id}/`, body)
          .then(res => {
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно изменено"
            });
            this.$fetch();
            this.closeModal();
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      }
    },
    editImage() {
      delete this.promotionForm.present_image;
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
      this.dates = [
        this.$moment.unix(this.promotionForm.from_period).format("YYYY/MM/DD"),
        this.$moment.unix(this.promotionForm.to_period).format("YYYY/MM/DD")
      ];
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
      let result = "";
      types.map((e, index) => {
        result = result + `${name[e]}`;
        if (index + 1 != types.length) result += ", ";
      });
      return `По ${result}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.admin-back {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #7b8794;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
}
.promotion-box {
  width: 100%;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  border-radius: 5px;

  display: grid;
  grid-template-columns: 1fr 410px;
}
.image {
  width: 100%;
  height: 100%;
  padding: 0 50px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.content {
  height: 100%;
  border-left: 1px solid #e3e3e3;

  div:not(:last-child) {
    border-bottom: 1px solid #e3e3e3;
  }
}
.grey-border {
  width: 100%;
  border: 1px solid #e3e3e3;
  border-radius: 5px;

  .promotion-box {
    border-left: none;
    border-right: none;
    border-radius: 0px;
  }
}
h1.grey-border {
  border-bottom: none;
}

.add-btn {
  max-width: 350px;
}
.edit-btn {
  height: 32px;
  padding: 0 10px;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 3px;

  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #313131;

  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;
  color: #6bb4ff;
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
</style>
