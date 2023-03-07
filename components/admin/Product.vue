<template>
  <div class="box py-6 px-6 align-center">
    <div class="image mr-3">
      <img v-if="item.images[0]" :src="item.images[0].image" alt="" />
      <img v-else src="@/assets/image/photos/default.svg" alt="" />
    </div>
    <div class="px-6">
      <h2 class="fw600">
        {{ item.name }}
      </h2>
      <p class="p15 mt-2 -cologreyr my-clamp">{{ item.description }}</p>
    </div>
    <div class="ml-auto d-flex align-center">
      <svg
        @click="edit"
        class="mr-6 pointer"
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
      <svg
        @click="goDetails()"
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
</template>

<script>
export default {
  props: { item: Object },
  methods: {
    goDetails() {
      this.$router.push({
        path: `/admin/Products/${this.$translate(this.item.name)}`,
        query: { id: this.item.id }
      });
    },
    edit() {
      this.$emit("edit", this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
* {
  color: #313131;
}
.image {
  width: 80px;
  height: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
.box {
  display: grid;
  grid-template-columns: 80px 1fr 72px;
  border-bottom: 2px solid #e7e7e7;
}
</style>
