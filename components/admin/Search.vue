<template>
  <v-autocomplete
    v-model="search"
    :search-input.sync="search_m"
    class="my-input"
    :items="items"
    :item-text="itemText"
    solo
    clearable
    color="#6bb4ff"
    prepend-inner-icon=""
    @keydown.enter="searchIt"
    @input="searchIt"
    @change="searchIt"
    :placeholder="placeholder"
    no-data-text="Ничего не найдено"
  >
    <template v-slot:prepend-inner>
      <svg
        class="mx-2"
        width="22"
        height="20"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.1746 21.8602L18.2582 15.9194C19.7794 14.1735 20.6129 11.9768 20.6129 9.68999C20.6129 4.34701 16.1104 0 10.5762 0C5.0421 0 0.539551 4.34701 0.539551 9.68999C0.539551 15.033 5.0421 19.38 10.5762 19.38C12.6538 19.38 14.6337 18.775 16.3264 17.6265L22.2877 23.6124C22.5369 23.8622 22.8721 24 23.2312 24C23.5711 24 23.8936 23.8749 24.1384 23.6474C24.6586 23.1641 24.6752 22.3628 24.1746 21.8602ZM10.5762 2.52782C14.6668 2.52782 17.9947 5.74069 17.9947 9.68999C17.9947 13.6393 14.6668 16.8522 10.5762 16.8522C6.48564 16.8522 3.15782 13.6393 3.15782 9.68999C3.15782 5.74069 6.48564 2.52782 10.5762 2.52782Z"
          fill="#52B1BA"
        />
      </svg>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    search: null,
    search_m: ""
  }),
  props: {
    placeholder: String,
    items: Array,
    itemText: {
      type: String,
      default: "name"
    }
  },
  methods: {
    searchIt() {
      if (this.search) this.search_m = this.search;
      this.$emit("searchit", this.search_m);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-input {
  width: 100%;
  height: 48px;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(138, 149, 158, 0.05);
  border-radius: 5px;
}
</style>
