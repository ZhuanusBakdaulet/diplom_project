<template>
  <div class="py-8 px-10 white-bg my-grid">
    <div class="">
      <div class="avatar-image mx-auto">
        <img src="" alt="" />
      </div>
      <div
        @mouseover="hover = true"
        @mouseleave="hover = false"
        class="image-change"
      >
        <h3 class="mt-5 text-center pointer">
          Изменить
        </h3>
        <div v-if="hover" class="change p15">
          <div class="">
            Изменить фотографию
          </div>
          <div class="red-color">
            Удалить фотографию
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data: () => ({
    hover: true
  })
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";

.my-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  div:first-child {
    width: 211px;
  }
}
.avatar-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.image-change {
  position: relative;

  .change {
    position: absolute;
    top: 100%;
    left: 0;
    padding-top: 12px;
    width: 211px;
    height: 80px;
    background: #ffffff;
    border-radius: 12px;
    div {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    div:first-child {
      background: rgba(146, 146, 146, 0.36);
      border-radius: 12px 12px 0px 0px;
    }
  }
}
</style>
