<template>
  <div class="mobile-app">
    <img
      class="mockup mockup1"
      src="@/assets/image/icons/Phone Mockup 2.png"
      alt=""
    />
    <img
      class="mockup mockup2"
      src="@/assets/image/icons/Phone Mockup 1.png"
      alt=""
    />
    <v-container>
      <h1 class="title">Покупайте через мобильное приложение</h1>
      <div class="d-flex align-center links">
        <a href="">
          <img
            class="mx-2"
            width="208"
            height="60"
            src="@/assets/image/icons/apple-store.png"
            alt=""
          />
        </a>
        <a href="">
          <img
            class="mx-2"
            width="208"
            height="60"
            src="@/assets/image/icons/android-store.png"
            alt=""
          />
        </a>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mobile-app {
  background: #52b059;
  position: relative;
  height: 491px;
  overflow-y: hidden;
  z-index: 2;
  .title {
    font-weight: 800;
    font-size: 48px !important;
    line-height: 64px;
    margin-top: 121px;
    color: white;
    max-width: 565px;
    z-index: 5;
  }
  .links {
    margin-top: 92px;
    z-index: 5;
  }
  .mockup {
    position: absolute;
    width: 322px;
    height: 464px;
    z-index: -1;
  }
  .mockup1 {
    right: 109px;
    bottom: 0;
  }
  .mockup2 {
    right: 373px;
    top: 0;
  }
}
@media screen and (max-width: 1250px) {
  .mockup1 {
    right: 0 !important;
  }
  .mockup2 {
    display: none;
  }
}
@media only screen and (max-width: 600px) {
  .mobile-app {
    height: auto;
    padding: 33px 21px 13px 10px;

    .mockup1 {
      display: none;
    }
    .mockup2 {
      display: block;
      height: 180px;
      width: 100px;
      height: 125px;
      width: 90px;
      right: 5px;
      top: -5px;
    }
    .container {
      max-width: 229px;
      width: 100%;
      padding: 0;
      margin: 0;
      .title {
        font-size: 18px !important;
        line-height: 22px;
        margin-top: 0;
      }
      .links {
        margin-top: 10px;
        img {
          width: 112px;
          height: 32px;
          margin-right: 5px !important;
          margin-left: 0px !important;
        }
      }
    }
  }
}
</style>
