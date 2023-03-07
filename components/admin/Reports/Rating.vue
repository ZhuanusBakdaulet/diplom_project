<template>
  <div>
    <div class="rating mt-4">
      <div class="rating_enum mb-4">
        <p>№</p>
        <p>Поставщик</p>
        <p>Рейтинг поставщика</p>
        <p>Количество комментариев</p>
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8397 17.1642V3.54639"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.9173 13.0684L14.8395 17.165L10.7617 13.0684"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.91102 0.833008V14.4508"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.833496 4.92919L4.91127 0.83252L8.98905 4.92919"
            stroke="#E4E4E4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="rating_divs">
        <div
          class="rating_content"
          v-for="(item, index) in ratings.results"
          :key="item.id"
        >
          <p>{{ index + 1 }}</p>
          <p>{{ item.individual_name }}</p>
          <div class="images product-rating">
            <v-rating
              background-color="red"
              color="#df4041"
              length="5"
              readonly
              size="23"
              :value="item.rating"
            ></v-rating>
          </div>
          <p>{{ item.rating_count }}</p>
          <svg
            @click="goRating(item.id)"
            class="arrow"
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1L8.5 8L1.5 15"
              stroke="#313131"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div v-if="meta.pages > 1" class="bg-default mx-auto w100 pt-10 pb-7">
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
export default {
  layout: "admin",
  data: () => ({
    pageNumber: 1,
    pageSize: 10,
    ratings: {}
  }),
  async fetch() {
    let params = {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize
    };
    this.ratings = await this.$axios.$get(`providers/`, { params });
    this.$notifier.showMessage({
      color: "warning",
      text: "Не удалось загрузить данные"
    });
  },
  watch: {
    pageNumber() {
      this.$fetch();
    }
  },
  computed: {
    meta() {
      if (this.ratings?.meta?.pagination) return this.ratings.meta.pagination;
      return { count: 1, page: 1, pages: 1 };
    }
  },
  created() {
    this.$store.commit("changeAdminMenu", "Reports");
  },
  methods: {
    goRating(id) {
      this.$router.push({
        path: `/admin/Reports/rating?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";

.rating {
  display: flex;
  flex-direction: column;

  width: 100%;

  background: #fff;
  border-radius: 5px;

  padding-top: 15px;
  padding-bottom: 40px;

  .rating_enum {
    display: grid;
    align-items: center;
    grid-template-columns: 10% 20% 29% 20% 21%;

    padding-left: 30px;

    p {
      font-family: "Gilroy";
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #52b1ba;
    }
  }

  .rating_divs {
    width: 100%;

    display: flex;
    flex-direction: column;

    .rating_content {
      display: grid;
      align-items: center;
      grid-template-columns: 10% 20% 30% 20% 19%;

      padding-top: 11px;
      padding-bottom: 13px;
      padding-left: 30px;

      p {
        font-family: "Gilroy";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #313131;
      }

      &:nth-child(odd) {
        background: #f2f6ff;
      }
      &:nth-child(even) {
        background: #fff;
      }

      .arrow {
        cursor: pointer;
      }
    }
  }
}
</style>
