<template>
  <div
    v-if="product"
    class="info-section white-bg mt-7 align-start justify-space-between"
  >
    <div class="images w100">
      <div class="main-image">
        <img
          class="desk pt-8"
          v-if="product.images[0]"
          @click="activateGallery(0)"
          :src="product.images[0].image"
          alt=""
        />
        <div v-if="product.images[0]" class="mob slide-container">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in product.images" :key="index">
              <div class="image-slide">
                <img class="img" :src="item.image" alt="" />
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination mt-4"></div>
        </div>

        <img v-else src="@/assets/image/photos/default.svg" alt="" />

        <div
          v-if="!isAdmin && $auth.loggedIn && !$isProvider() && !$isAdmin()"
          @click="liked"
          class="heart desk"
          :class="{ 'heart-active': isLike }"
        ></div>

        <div
          v-if="!isAdmin && product.discount"
          class="discount d-flex align-center justify-center"
        >
          -{{ product.discount }}%
        </div>

        <div
          @click="goBack"
          v-else
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
      </div>
      <p class="d-none d-sm-none grey-color text-center mt-4">
        Чтобы увеличить, нажмите на картинку
      </p>
      <div v-if="product.images.length > 1" class="sub-images w100 mt-4">
        <div
          v-for="(item, index) in product.images.slice(0, 4)"
          :key="item.id"
          @click="activateGallery(index)"
          class="sub-images-image pa-2"
        >
          <img v-if="item.image" :src="item.image" alt="" />
        </div>
      </div>
    </div>

    <div v-if="isAdmin" class="infos w100">
      <h1 class="admin-title">
        {{ product.name }}
      </h1>
      <p class="mt-2 admin-grey">{{ product.description }}</p>
      <p
        v-if="product.sub_category && product.sub_category.category"
        class="mt-2 admin-grey"
      >
        Категория: {{ product.sub_category.category.name }}
      </p>
      <p v-if="product.sub_category" class="mt-2 admin-grey">
        Подкатегория: {{ product.sub_category.name }}
      </p>
      <p class="mt-2 admin-grey">
        Штрих код:
        <span class="" v-for="(item, index) in product.barcodes" :key="item.id">
          {{ item.code }} {{ index + 1 == product.barcodes.length ? "" : "," }}
        </span>
      </p>
    </div>

    <div v-else class="infos w100">
      <div class="relative">
        <h2 class="fw600">
          {{ product.name }}
        </h2>
        <div
          v-if="!isAdmin && $auth.loggedIn && !$isProvider() && !$isAdmin()"
          @click="liked"
          class="heart mob ml-3"
          :class="{ 'heart-active': isLike }"
        ></div>
      </div>
      <h3 class="grey-color mt-3">{{ product.description }}</h3>
      <p class="mp grey-color mt-4">
        Купили: {{ product.purchase_count || "0" }}
      </p>
      <div class="mt-3 product-rating d-flex align-center p grey-color">
        <v-rating
          class="mr-2"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          half-increments
          length="5"
          readonly
          size="20"
          color="#DF4041"
          :value="parseInt(product.rating)"
        >
        </v-rating>
      </div>
      <div class="line mt-7 desk"></div>
      <div
        v-if="product.provider_count > 0"
        class="d-none d-sm-flex align-center mt-10 grey-color p"
      >
        Цена:
        <h2 class="fw600 ml-3 mr-14">
          {{ $price(product.price) }}
        </h2>
        Поставщиков:
        <h2 class="fw600 ml-3">{{ product.provider_count }}</h2>
      </div>
      <h2 v-else class="mt-10">Товара нет в наличии</h2>

      <button
        v-if="product.price && !$isProvider() && !$isAdmin()"
        v-scroll-to="'#shops'"
        class="mt-15 success-btn desk"
      >
        В корзину за {{ $price(product.price) }}
      </button>
    </div>
    <div class="line mob"></div>
    <v-dialog v-model="gallery" width="80%">
      <v-card class="my-modal gallery">
        <swiper class="gallery-swiper" :options="swiperOption">
          <swiper-slide v-for="item in product.images" :key="item.id">
            <div class="image-slide">
              <img class="img" :src="item.image" alt="" />
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination  mt-4"></div>
        <img
          @click="gallery = false"
          src="@/assets/image/icons/close-orange.svg"
          alt=""
          class="close"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swiper, { Pagination, Navigation, Autoplay } from "swiper";
Swiper.use([Pagination, Navigation, Autoplay]);

export default {
  data: () => ({
    gallery: false,
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
  props: {
    product: Object,
    isAdmin: {
      type: Boolean,
      default: false
    },
    isLike: Boolean
  },
  methods: {
    liked() {
      this.$emit("liked", this.isLike);
    },
    activateGallery(index) {
      this.gallery = true;

      const swiper = document.querySelector(".gallery-swiper");
      if (swiper?.swiper) {
        swiper.swiper.slideTo(index);
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.heart {
  position: absolute;
  top: 16px;
  right: 12px;
  width: 20px;
  height: 20px;
  background: url("@/assets/image/icons/heart.svg") no-repeat center center;
  cursor: pointer;
  &-active {
    background: url("@/assets/image/icons/heart-red.svg") no-repeat center
      center;
  }
}
.infos {
  .heart {
    top: 0;
    right: 0;
  }
}
.info-section {
  padding: 40px 60px;
  display: grid;
  grid-template-columns: 60% 40%;

  @media (max-width: 1200px) {
    grid-template-columns: 50% 50%;
  }
}
.images {
  position: relative;
  padding-right: 33px;

  border-right: 2px solid #e4e4e4;

  img {
    cursor: pointer;
  }
}
.infos {
  padding-left: 33px;
}
.line {
  width: 100%;
  height: 2px;
  background: #e4e4e4;
}
.main-image {
  position: relative;
  width: 100%;
  height: 368px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.discount {
  position: absolute;
  height: 48px;
  padding: 0 28px;
  top: 0;
  left: 0;
  transform: translateY(-40px);
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  background: #ff7a29;
  border-radius: 10px 0 10px 0;
}
.sub-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 600px) {
    display: none;
  }
  &-image {
    width: 100%;
    height: 128px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.gallery {
  position: relative;
  height: 70vh;
  display: flex;
  justify-content: center;
}
.slide-container {
  width: 100%;
  max-width: 600px;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  @media (min-width: 599px) {
    display: none;
  }
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
.close {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 100;
}
.admin-back {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #7b8794;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .info-section {
    grid-template-columns: 1fr;
    padding: 0 !important;

    .admin-back {
      display: none !important;
    }
    .images {
      border-right: none;
      border-bottom: 2px solid #e4e4e4;
      padding: 0 0 12px 0 !important;
    }
    .infos {
      padding: 21px 20px 20px 24px !important;
    }
    .p {
      margin-top: 15px !important;
    }
    .success-btn {
      margin-top: 15px !important;
    }
  }
  .discount {
    height: 34px;
    padding: 0 18px;
    font-size: 13px;
    line-height: 16px;
    transform: translate(10px, 10px);
  }
  .slide-container {
    width: 400px;
  }
  .main-image {
    height: unset;
  }
}
@media (max-width: 430px) {
  .slide-container {
    width: 300px;
  }
}
@media (max-width: 400px) {
  .slide-container {
    width: 300px;
  }
}
</style>
