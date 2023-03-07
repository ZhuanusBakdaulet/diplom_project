<template>
  <v-container
    class="
      d-flex
      flex-column-reverse flex-sm-row
      justify-space-between
      align-center
    "
  >
    <div class="main-text">
      <p class="fortype orange-color">Для бизнеса</p>
      <h1 class="mt-2">Хотите закупаться <span>дешевле?</span></h1>
      <h2 class="mt-3">
        {{
          banner
            ? banner.title
            : "Сравнивайте цены поставщиков и выбирайте выгодные предложения"
        }}
      </h2>

      <nuxt-link to="/Products" class="btn h3 mt-10" color="">
        Перейти в каталог
      </nuxt-link>
    </div>
    <img
      v-if="banner.image"
      class="mt-4 mt-sm-10"
      :src="banner.image"
      alt="banner"
    />
    <img
      v-else
      class="mt-4 mt-sm-10"
      src="@/assets/image/icons/cart-picture.svg"
      alt="banner"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  props: { banners: Array },
  computed: {
    banner() {
      if (this.banners[0]) return this.banners[0];
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.orange-color {
  color: $orange-color;
}
.fortype {
  font-size: 24px;
  line-height: 29px;
}

.main-text {
  margin-top: 20px;
  margin-bottom: 60px;
  width: 100%;
  max-width: 550px;
}

.btn {
  width: 240px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  background: #52b059;
  border-radius: 5px;
  text-decoration: none;
}

h1 {
  span {
    font-size: inherit;
    font-weight: inherit;
    color: $green-color;
  }
}

h2 {
  max-width: 417px;
}

@media only screen and (max-width: 600px) {
  .main-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .orange-color {
      font-size: 18px;
      line-height: 22px;
    }
    h1 {
      margin-top: 10px !important;
    }
    h2 {
      font-size: 15px;
      line-height: 18px;
      margin-top: 10px !important;
    }
    .btn {
      max-width: 345px;
      width: 100%;
      height: 45px;
      background: #52b059;
      margin-top: 15px !important;
      font-size: 18px;
      line-height: 23px;
    }
  }
  img {
    margin-left: 10%;
  }
}
</style>
