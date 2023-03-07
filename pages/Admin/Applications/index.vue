<template>
  <div class="">
    <div class="d-flex mt-5">
      <h3
        @click="report_type = 'products'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': report_type == 'products' }"
      >
        Продукты
      </h3>
      <h3
        @click="report_type = 'categories'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': report_type == 'categories' }"
      >
        Категории
      </h3>
      <h3
        @click="report_type = 'sub_categories'"
        class="type text-center pointer blue-color px-4 mx-5"
        :class="{ 'type-active': report_type == 'sub_categories' }"
      >
        Подкатегории
      </h3>
    </div>

    <div class="mt-4 bg-white pb-12 pt-5">
      <div
        class="mt-4 mb-7 pl-8 pr-4"
        :class="[report_type != 'categories' ? 'my-grid' : 'my-grid2']"
      >
        <h3 v-if="report_type == 'categories'" class="blue-color mr-2">Фото</h3>
        <h3 class="blue-color mr-2">№</h3>
        <h3 class="blue-color mr-2">Название</h3>
        <h3 class="blue-color mr-2">Отправитель</h3>
        <div class=""></div>
      </div>

      <div class="" v-for="(item, index) in requests.results" :key="item.id">
        <div
          @click="toggleIt(index)"
          class="pl-8 pr-4 py-3  pointer"
          :class="[
            report_type != 'categories' ? 'my-grid' : 'my-grid2',
            index % 2 == 0 ? 'my-grid-active' : ''
          ]"
        >
          <div v-if="report_type == 'categories'" class="mr-2 category-image">
            <img v-if="item.image" :src="item.image" alt="" />
            <img v-else src="@/assets/image/photos/default.svg" alt="" />
          </div>
          <h3 class=" mr-2">{{ item.id }}</h3>
          <h3 class=" mr-2">{{ item.name }}</h3>
          <h3 class=" mr-2">
            {{ item.created_by.first_name }} {{ item.created_by.last_name }}
          </h3>
          <div class="d-flex justify-end align-center">
            <div class="btns d-flex align-center">
              <button
                @click.stop
                @click="accept(item)"
                class="green-btn-outline mx-2"
              >
                Подтвердить
              </button>
              <button
                @click.stop
                @click="decline(item)"
                class="red-btn-outline mx-2"
              >
                Отменить
              </button>
            </div>

            <svg
              v-if="report_type == 'products'"
              class="pointer arrow"
              :class="{ 'arrow-rotate': toggle == index + 1 }"
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
        </div>

        <div
          v-if="toggle == index + 1 && dropItem"
          class="d-flex align-start box pa-10"
        >
          <div class="image gallery">
            <swiper class="gallery-swiper mx-auto" :options="swiperOption">
              <swiper-slide
                v-for="(item, index) in dropItem.images"
                :key="index"
              >
                <div class="image-slide">
                  <img v-if="item.image" class="img" :src="item.image" alt="" />
                  <img
                    v-else
                    class="img"
                    src="@/assets/image/photos/default.svg"
                    alt=""
                  />
                </div>
              </swiper-slide>
              <swiper-slide v-if="dropItem.images.length == 0">
                <div class="image-slide">
                  <img
                    class="img"
                    src="@/assets/image/photos/default.svg"
                    alt=""
                  />
                </div>
              </swiper-slide>
            </swiper>
            <div
              v-if="dropItem.images.length > 1"
              class="swiper-pagination banner-pagination mt-4"
            ></div>
          </div>
          <div class="infos ml-10">
            <h2 class="gilroy fw600">
              {{ dropItem.name }}
            </h2>
            <h3 class="gilroy grey-color mt-6">
              {{ dropItem.description }}
            </h3>
          </div>
        </div>
      </div>
      <h2 class="text-center mt-10" v-if="meta.count < 1">Заявок нет</h2>
      <div v-if="meta.pages < 1" class="bg-default mx-auto pt-10 pb-7">
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
  </div>
</template>

<script>
import Search from "@/components/admin/Search";
import Swiper, { Pagination, Navigation, Autoplay } from "swiper";
Swiper.use([Pagination, Navigation, Autoplay]);

export default {
  layout: "admin",
  components: { Search },
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 10,
      params = {
        "page[number]": pageNumber,
        "page[size]": pageSize,
        is_verified: false
      };
    const requests = await $axios.$get(`products/`, { params });
    return { pageNumber, pageSize, requests };
  },
  data: () => ({
    toggle: 0,
    dropItem: false,
    report_type: "products",
    swiperOption: {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      navigation: {},
      autoplay: {
        delay: 5000
      }
    }
  }),
  watch: {
    pageNumber() {
      this.fetchRequests();
    },
    report_type() {
      this.pageNumber = 1;
      this.fetchRequests();
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Applications");
  },
  computed: {
    meta() {
      if (this.requests?.meta?.pagination) return this.requests.meta.pagination;
      return { count: 30, page: 1, pages: 3 };
    }
  },
  methods: {
    async fetchRequests() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        is_verified: false
      };

      let api = {
        products: "products/",
        categories: "categories/",
        sub_categories: "sub-categories/"
      };

      this.requests = await this.$axios
        .$get(`${api[this.report_type]}`, { params })
        .catch(err => {
          console.log(err);
        });
      window.scrollTo({ top: 0 });
      this.resetDefault();
    },
    resetDefault() {
      this.toggle = 0;
      this.dropdown = false;
    },
    async accept(item) {
      let api = {
        products: `products/${item.id}/`,
        categories: `categories/${item.id}/`,
        sub_categories: `sub-categories/${item.id}/`
      };

      let body = {
        ...item
      };
      body.is_verified = true;
      delete body.image;
      if (body.created_by) body.created_by = body.created_by.id;

      let headers = {};

      if (this.report_type == "categories") {
        let formData = new FormData();
        Object.keys(body).forEach(field => {
          formData.append(field, body[field]);
        });
        body = formData;
        headers = {
          "Content-Type": "multipart/form-data"
        };
      }
      await this.$axios
        .$patch(`${api[this.report_type]}`, body, { headers })
        .then(res => {
          this.$notifier.showMessage({
            text: `Заявка подтверждена`,
            color: "success"
          });
          this.fetchRequests();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async decline(item) {
      let api = {
        products: `products/${item.id}/`,
        categories: `categories/${item.id}/`,
        sub_categories: `sub-categories/${item.id}/`
      };

      await this.$axios
        .$delete(`${api[this.report_type]}`)
        .then(res => {
          this.$notifier.showMessage({
            text: `Удалено`,
            color: "success"
          });
          this.fetchRequests();
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    toggleIt(index) {
      if (this.report_type !== "products") return;
      if (this.toggle == index + 1) {
        this.toggle = 0;
        this.dropItem = false;
      } else {
        this.toggle = index + 1;
        this.dropItem = this.requests.results[index];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";

.type {
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  &:hover,
  &-active {
    border-bottom: 1px solid #6bb4ff;
  }
}
.my-grid {
  display: grid;
  grid-template-columns: 10% 29% 29% 33%;
  align-items: center;
  &-active {
    background: #f2f6ff;
  }
  h3:last-child {
    word-break: break-all;
  }
}
.my-grid2 {
  display: grid;
  grid-template-columns: 10% 10% 23% 24% 33%;
  align-items: center;
  &-active {
    background: #f2f6ff;
  }
  h3:last-child {
    word-break: break-all;
  }
}
.btns {
  button {
    width: 138px;
    height: 35px;
  }
}
.red-btn-outline {
  color: $red-color;
  &:hover {
    color: #fff;
  }
}
.arrow {
  transition: 0.22s;
  &-rotate {
    transform: rotate(180deg);
  }
}
.box {
  width: 100%;
  background: #ffffff;
}
.image {
  width: 250px;
  height: 250px;
}
.infos {
  max-width: 50%;
}
.gallery {
  position: relative;
  display: flex;
  justify-content: center;
}
.swiper-pagination {
  bottom: 20px;
  margin: 0 auto;
}
.image-slide {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}
.blue-btn {
  max-width: 175px;
  height: 45px;
  margin: 0 auto;
}
.green-btn-outline {
  background: transparent;
}
.category-image {
  width: 80%;
  height: 55px;
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
</style>
