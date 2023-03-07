<template>
  <v-app>
    <Header />
    <v-main class="main">
      <nuxt />
    </v-main>
    <LoadingBar />
    <SnackBar />
    <Footer />
    <MobileFooter class="mob" />
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  color: #252626;
}
p {
  margin: 0;
}
.v-application p {
  margin: 0;
}
.container {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
.main {
  margin-top: 120px;

  @media (max-width: 1240px) {
    margin-top: 168px;
  }
  @media (max-width: 1185px) {
    margin-top: 180px;
  }
  @media (max-width: 750px) {
    margin-top: 220px;
  }
  @media (max-width: 600px) {
    margin-top: 90px;
  }
}

.banner-pagination {
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    color: #c4c4c4;
    margin: 0 4px;
    cursor: pointer;
  }
  .swiper-pagination-bullet-active {
    background: $orange-color;
  }
}
.product-rating {
  .v-rating .v-icon {
    padding: 0;
    @media (max-width: 600px) {
      font-size: 12px !important;
    }
  }
}
.my-pagination {
  .theme--light.v-pagination .v-pagination__item {
    background: transparent;
    border-radius: 0px;
    font-weight: 500;
    width: 22px;
    padding: 8px 0px;
    font-size: 18px;
    line-height: 23px;
    color: #888583;
    margin: 4px 15px;
    min-width: unset;
    min-height: unset;
    height: unset;
    box-shadow: unset;
    border-bottom: 2px solid transparent;
  }
  .theme--light.v-pagination .v-pagination__item--active {
    font-weight: 600;
    color: #252626;
    background: unset !important;
    // border: unset !important;
    border-bottom: 2px solid #252626 !important;
  }
  .v-pagination__navigation {
    background: transparent;
    box-shadow: unset;
    border-radius: unset;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 16px;
    width: 9px;
    margin: 0 14px;
  }
  .mdi-chevron-left::before {
    color: #ff7a29;
    font-size: 32px;
  }
  .mdi-chevron-right::before {
    color: #ff7a29;
    font-size: 32px;
  }
  .v-pagination__navigation--disabled {
    opacity: 1;
    .mdi-chevron-left::before {
      color: #7b8794;
    }
    .mdi-chevron-right::before {
      color: #7b8794;
    }
  }
}
.v-chip.v-size--default {
  height: 25px;
  border-radius: 4px;
}
.theme--light.v-chip:not(.v-chip--active) {
  background: rgba(142, 142, 142, 0.21);
}
.v-chip .v-chip__content {
  color: #fff;
}

@media (min-width: 960px) {
  .container {
    max-width: 900px;
  }
}
@media (min-width: 1240px) {
  .container {
    max-width: 1240px;
  }
}
@media (min-width: 1904px) {
  .container {
    max-width: 1785px;
  }
}
</style>
