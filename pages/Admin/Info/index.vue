<template>
  <div>
    <div class="mt-4 bg-white pt-4">
      <div class="d-flex align-center mt-4 mx-7">
        <button @click="openModal" class="ml-auto blue-btn-outline">
          <svg
            class="mr-2 pointer"
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
    </div>
    <div class="information_div py-5 px-6" v-for="item in infos" :key="item.id">
      <div class="image">
        <img v-if="item.image" :src="item.image" />
        <img v-else src="@/assets/image/photos/default.svg" />
      </div>
      <div class="ml-10 pr-5">
        <h3 class="">{{ item.title }}</h3>
        <p class="my-clamp">{{ item.content }}</p>
      </div>
      <div class="edit bg-white">
        <svg
          @click="editModal(item)"
          class="mr-2 pointer"
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
          @click="
            $router.push(`/admin/Info/${$translate(item.title)}?id=${item.id}`)
          "
          class="pointer"
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

    <v-dialog v-model="dialog" width="631">
      <v-card class="pa-10">
        <div @click="closeModal" class="close">
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
          {{
            state == "edit"
              ? "Редактировать полезную информацию"
              : "Добавить полезную информацию"
          }}
        </h1>
        <v-form ref="form" @submit.prevent="submit" class="mt-7">
          <p class="p15 gilroy mt-3">Введите тему</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.title"
            placeholder="Введите тему"
            solo
            :rules="[rules.required]"
          ></v-text-field>

          <p class="p15 gilroy mt-3">Загрузите фотографию</p>

          <v-file-input
            v-if="isImageChanged"
            class="my-input mt-2"
            accept="image/*"
            show-size
            truncate-length="15"
            placeholder="Загрузите фотографию"
            v-model="form.image"
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

          <p class="p15 gilroy mt-3">Введите текст</p>
          <v-textarea
            v-model="form.content"
            class="my-input mt-2"
            placeholder="Введите текст..."
            :rules="[rules.required]"
            no-resize
            height="230px"
            solo
          >
          </v-textarea>

          <button type="submit" class="blue-btn mt-4">
            {{ state == "edit" ? "Изменить" : "Добавить" }}
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
  data: () => ({
    dialog: false,
    state: "add",
    form: {},
    isImageChanged: false,

    ip: null,
    infos: [],
    pageNumber: 1,
    pageSize: 5,

    rules: {
      required: v => !!v || "Обязательное поле"
    }
  }),
  async fetch() {
    let params = {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize
    };
    await this.$axios.$get(`helpful-information/`, { params }).then(res => {
      this.ip = res;
      this.infos = res.results;
    });
  },
  components: { Search },
  watch: {
    pageNumber() {
      this.$fetch();
    }
  },
  computed: {
    meta() {
      if (this.ip?.meta?.pagination) return this.ip.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Info");
  },
  methods: {
    editImage() {
      delete this.form.image;
      this.isImageChanged = true;
    },
    resetDefault() {
      if (this.$refs.form) this.$refs.form.reset();
      this.form = {};
      this.dialog = false;
      this.state = "add";
      this.isImageChanged = false;
    },
    closeModal() {
      if (this.state == "edit") this.resetDefault();
      this.dialog = false;
    },
    editModal(item) {
      this.resetDefault();
      this.dialog = true;
      this.form = { ...item };
      this.state = "edit";
    },
    openModal() {
      this.resetDefault();
      this.isImageChanged = true;
      this.dialog = true;
    },
    async submit() {
      if (!this.$refs.form.validate()) return;

      let formData = new FormData();
      Object.keys(this.form).forEach(field => {
        formData.append(field, this.form[field]);
      });
      let headers = {
        "Content-Type": "multipart/form-data"
      };

      if (this.state == "edit") {
        if (!this.isImageChanged) delete this.form.image;

        await this.$axios
          .$patch(`helpful-information/${this.form.id}/`, formData, {
            headers
          })
          .then(res => {
            this.resetDefault();
            this.$fetch();
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно изменено"
            });
          })
          .catch(err => {
            this.$notifier.showMessage({
              color: "error",
              text: "Не удалось изменить"
            });
          });
      } else {
        await this.$axios
          .$post(`helpful-information/`, formData, { headers })
          .then(res => {
            this.resetDefault();
            this.$fetch();
            this.$notifier.showMessage({
              color: "success",
              text: "успешно добавлено"
            });
          })
          .catch(err => {
            this.$notifier.showMessage({
              color: "error",
              text: err.response.data
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";

.my-grid {
  display: grid;
  grid-template-columns: 5% 30% 15% 17% 23% 10%;
  &-active {
    background: #f2f6ff;
  }
  h3:last-child {
    word-break: break-all;
  }
}
.arrow {
  transition: 0.22s;
  &-rotate {
    transform: rotate(180deg);
  }
}
.bread_crumb {
  max-width: 256px;
  widows: 100%;
  display: flex;
  justify-content: space-between;
}
.bread_crumb a {
  text-decoration: none;
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #52b1ba;
}
.information_div {
  width: 100%;

  display: grid;
  grid-template-columns: 180px 1fr 60px;
  align-items: flex-start;

  border-bottom: 2px solid #e7e7e7;
  background: #fff;
  border-radius: 5px;

  .image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
      object-fit: cover;
    }
  }
  h3 {
    font-family: "Gilroy";
    color: #252626;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
  }
  .edit {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
