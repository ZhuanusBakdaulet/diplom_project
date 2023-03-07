<template>
  <v-container class="">
    <swiper v-if="banners2 && banners2.length > 0" :options="swiperOption">
      <swiper-slide v-for="(item, index) in banners2" :key="index">
        <div class="item pointer" :class="[index % 2 == 0 ? `bg-color2` : '']">
          <div class="item-content">
            <div class="back-image">
              <img v-if="item.image" :src="item.image" alt="" />
              <img v-else src="@/assets/image/photos/default.svg" alt="" />
            </div>

            <h4 class="title">{{ item.title }}</h4>
            <a
              v-if="item.url != 'null'"
              :href="item.url"
              target="_blank"
              class="my-btn mt-6 d-flex justify-center align-center"
            >
              Перейти
            </a>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination banner-pagination mt-4"></div>

    <v-row v-if="banners3 && banners3.length > 0">
      <v-col cols="12" md="6" v-for="(item, index) in banners3" :key="item.id">
        <div
          class="item2"
          v-if="index < 4"
          :class="[index % 2 == 0 ? `bg-color2` : '']"
        >
          <div class="item-content2">
            <div>
              <h4 class="">{{ item.title }}</h4>
              <a
                v-if="item.url != 'null'"
                :href="item.url"
                target="_blank"
                class="my-btn mt-6 d-flex justify-center align-center"
              >
                Перейти
              </a>
            </div>
            <div class="back-image">
              <img v-if="item.image" :src="item.image" alt="" />
              <img v-else src="@/assets/image/photos/default.svg" alt="" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swiper, { Pagination, Navigation, Autoplay } from "swiper";
Swiper.use([Pagination, Navigation, Autoplay]);

export default {
  data: () => ({
    swiperOption: {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 16
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 16
        }
      }
    }
  }),
  props: { banners2: Array, banners3: Array },
  methods: {},
  components: { Pagination, Navigation }
};
</script>

<style lang="scss" scoped>
.title {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 120%;
}
h4 {
  font-weight: 600;
  font-size: 30px;
  line-height: 39px;
  max-width: 321px;
}
.item {
  width: 100%;
  max-width: 100%;
  height: 250px;
  border-radius: 5px;
  background: #d2eef9;
  position: relative;
  z-index: 10;
  display: flex;
  word-break: break-all;

  .item-content {
    margin-top: auto;
    padding: 20px 27px;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
  .back-image {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    justify-content: start;
    align-items: start;
    height: 165px;
    z-index: -1;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
}

.item2 {
  width: 100%;
  height: 300px;
  border-radius: 5px;
  background: #d2eef9;
  position: relative;
  z-index: 20;

  .item-content2 {
    display: flex;
    padding: 56px 40px;
    height: 100%;
    align-items: flex-start;
  }

  .back-image {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -10;
    img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
      object-fit: cover;
    }
  }
}
.bg-color1 {
  background: #d2eef9;
}
.bg-color2 {
  background: #fdec89;
}
.my-btn {
  width: 200px;
  height: 40px;
  background: #52b059;
  border-radius: 3px;
  color: white;
  text-decoration: none;
  display: block;

  font-size: 18px;
  line-height: 23px;
  font-weight: 600;
}
.swiper-pagination {
  position: static;
  margin: 0 auto;
  height: 40px;
}
</style>
