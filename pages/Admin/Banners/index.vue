<template>
  <div class="mt-4 bg-white">
    <div class="d-flex align-center py-4">
      <button @click="openModal()" class="ml-auto mr-8 blue-btn-outline">
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
    </div>
    <div class="" v-for="(item, index) in banners.results" :key="index">
      <div
        class="pl-8 pr-4 py-3 my-grid "
        :class="{ 'my-grid-active': index % 2 == 0 }"
      >
        <div class="brand-image">
          <img v-if="item.image" class="" :src="item.image" alt="" />
        </div>
        <h3 class="mr-2">{{ item.title }}</h3>
        <div class="ml-auto">
          <svg
            @click="edit(item.id)"
            class="mx-auto mr-8 pointer"
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
    <div class="pb-12"></div>
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
    <v-dialog v-model="modal" width="677">
      <v-card class="pa-10">
        <div @click="modal = false" class="close">
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
        <h1 class="blue-color fw500">
          {{ isedit ? "Редактировать" : "Добавить" }} бренд
        </h1>
        <v-form ref="brandForm" @submit.prevent="submit" class="mt-7">
          <p class="p15 gilroy mt-3">Название бренда</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.title"
            placeholder="Название бренда"
            solo
            :rules="[rules.required]"
          ></v-text-field>

          <p class="p15 gilroy mt-3">Ссылка</p>
          <v-text-field
            class="my-input mt-2"
            type="url"
            v-model="form.url"
            placeholder="https://"
            solo
          ></v-text-field>

          <p class="p15 gilroy mt-3">Загрузить логотип бренда</p>
          <v-file-input
            v-if="change_image"
            class="my-input mt-2"
            accept="image/*"
            show-size
            truncate-length="15"
            placeholder="Загрузить  логотип"
            v-model="form.image"
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

          <p class="p15 gilroy mt-3">Тип баннера</p>
          <v-select
            class="my-input mt-2"
            :items="[
              { text: 'Главный баннер', id: 1 },
              { text: 'Слайдер', id: 2 },
              { text: 'Реклама', id: 3 }
            ]"
            item-text="text"
            item-value="id"
            v-model="form.banner_type"
            placeholder="Название бренда"
            solo
            :rules="[rules.required]"
          ></v-select>

          <p class="p15 gilroy mt-3">Выберите период показа</p>
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

          <p class="p15 gilroy mt-3">Показывать на сайте</p>
          <v-checkbox
            class="my-input mt-2"
            v-model="form.is_active"
            solo
          ></v-checkbox>

          <button type="submit" class="blue-btn mt-4">
            {{ isedit ? "Изменить" : "Добавить" }}
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
    let banners = await $axios.$get(`banners/`, {
      params: {
        "page[number]": pageNumber,
        "page[size]": pageSize
      }
    });
    return { pageNumber, pageSize, banners };
  },
  data: () => ({
    calendar: false,
    mindate: new Date().toISOString().substr(0, 10),
    dates: [],

    change_image: true,
    isedit: false,
    form: {},
    modal: false,
    id: false,
    rules: {
      required: v => !!v || "Обязательное поле"
    }
  }),
  created() {
    this.$store.commit("changeAdminMenu", "Banners");
  },
  watch: {
    pageNumber() {
      this.fetchBanners();
    }
  },
  computed: {
    meta() {
      if (this.banners?.meta?.pagination) return this.banners.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    },
    datesText() {
      if (this.dates[0] && this.dates[1]) {
        if (this.$moment(this.dates[0]) > this.$moment(this.dates[1])) {
          this.dates = [this.dates[1], this.dates[0]];
        }
        return this.dates.join(" ~ ");
      }
    }
  },
  methods: {
    editImage() {
      delete this.form.image;
      this.change_image = true;
    },
    async submit() {
      if (!this.$refs.brandForm.validate()) return;

      let formData = new FormData();

      if (!this.change_image) {
        delete this.form.image;
      }

      let from_period = this.$moment(this.dates[0]).unix();
      let to_period = this.$moment(this.dates[1]).unix();

      Object.keys(this.form).forEach(field => {
        formData.append(field, this.form[field]);
      });

      formData.append("from_period", from_period);
      formData.append("to_period", to_period);

      if (this.isedit) {
        await this.$axios
          .$patch(`banners/${this.id}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this.fetchBanners();
            this.modal = false;
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно изменен"
            });
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      } else {
        await this.$axios
          .$post(`banners/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this.fetchBanners();
            this.modal = false;
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно добавлен"
            });
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          });
      }
    },
    openModal() {
      this.change_image = true;
      this.isedit = false;
      if (this.$refs.brandForm) this.$refs.brandForm.reset();
      this.form = {};
      this.modal = true;
    },
    edit(id) {
      this.isedit = true;
      this.change_image = false;
      this.id = id;
      this.$axios
        .$get(`banners/${id}/`)
        .then(res => {
          this.form = res;
          if (res.from_period && res.to_period) {
            this.dates[0] = this.$moment
              .unix(res.from_period)
              .format("YYYY-MM-DD");
            this.dates[1] = this.$moment
              .unix(res.to_period)
              .format("YYYY-MM-DD");
          } else this.dates = [];
          this.modal = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchBanners() {
      await this.$axios
        .$get(`banners/`, {
          params: {
            "page[number]": this.pageNumber,
            "page[size]": this.pageSize
          }
        })
        .then(res => {
          this.banners = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.blue-btn-outline {
  max-width: 200px;
}
.my-grid {
  display: grid;
  align-items: center;
  grid-template-columns: 25% 1fr 15%;
  &-active {
    background: #f2f6ff;
  }
  h3:last-child {
    word-break: break-all;
  }
}
.brand-image {
  width: 100%;
  max-width: 200px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
</style>
