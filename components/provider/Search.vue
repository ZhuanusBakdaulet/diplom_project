<template>
  <div class="d-flex row mx-0 align-center justify-space-between">
    <div class="d-flex align-center ">
      <div class="search mr-2">
        <input v-model="in_search" placeholder="Поиск" />
        <svg
          class="mr-3"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 12C5.791 12 4 10.209 4 8C4 5.791 5.791 4 8 4C10.209 4 12 5.791 12 8C12 10.209 10.209 12 8 12ZM17.707 16.293L12.887 11.473C13.585 10.492 14 9.296 14 8C14 4.687 11.313 2 8 2C4.687 2 2 4.687 2 8C2 11.313 4.687 14 8 14C9.296 14 10.492 13.585 11.473 12.887L16.293 17.707C16.488 17.902 16.744 18 17 18C17.256 18 17.512 17.902 17.707 17.707C18.098 17.316 18.098 16.684 17.707 16.293Z"
            fill="#5C5F62"
          />
        </svg>
      </div>

      <button @click="searchit" class="blue-btn">
        Поиск
      </button>
    </div>
    <div class="d-flex align-center my-5">
      <button
        v-if="csv"
        @click="downloadCSV"
        class=" mx-2 csv-btn d-flex align-center"
      >
        <svg
          class="mr-3"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.75 9.78125V14.125C14.75 14.4696 14.4696 14.75 14.125 14.75H1.875C1.53038 14.75 1.25 14.4696 1.25 14.125V9.78125H0V14.125C0 15.1589 0.841125 16 1.875 16H14.125C15.1589 16 16 15.1589 16 14.125V9.78125H14.75Z"
            fill="#52B059"
          />
          <path
            d="M11.0002 7.36613L8.62521 9.74113V0H7.37521V9.74113L5.00021 7.36613L4.11633 8.25L8.00021 12.1339L11.8841 8.25L11.0002 7.36613Z"
            fill="#52B059"
          />
        </svg>

        Загрузить csv
      </button>
      <button
        v-if="add"
        @click="addbtn"
        class=" mx-2 mr-0 add-btn d-flex align-center"
      >
        <svg
          class="mr-3"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="5" width="12" height="2" fill="white" />
          <rect
            width="12"
            height="2"
            transform="matrix(0 -1 -1 0 7 12)"
            fill="white"
          />
        </svg>
        {{ addText ? addText : "Добавить категорию" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    in_search: ""
  }),
  props: {
    csv: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    addText: String
  },
  methods: {
    addbtn() {
      this.$emit("addbtn");
    },
    downloadCSV() {
      this.$emit("downloadCSV");
    },
    searchit() {
      this.$emit("searchit", this.in_search);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";
.csv-btn {
  width: 100%;
  max-width: 216px;
  height: 36px;
  border: 1px solid #52b059;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  line-height: 19px;
  color: #52b059;

  &:hover {
    background: #52b059;
    color: #fff;
    svg {
      rect,
      path {
        fill: #fff;
      }
    }
  }
}
.add-btn {
  width: 290px;
  height: 36px;
  background: #2a4365;
  border-radius: 5px;
  font-size: 16px;
  line-height: 19px;
  color: #fffcfe;
  justify-content: center;

  &:hover {
    background: rgba(42, 67, 101, 0.7);
  }
}
.search {
  position: relative;
  display: flex;
  padding: 8px;

  padding-left: 36px;
  width: 100%;
  max-width: 410px;
  height: 36px;
  background: #ffffff;
  border-radius: 4px;
  svg {
    position: absolute;
    top: 8px;
    left: 8px;
  }
}

.blue-btn {
  width: 119px;
  height: 36px;
  background: #3da6f2;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
}
input:focus {
  outline: none;
}
</style>
