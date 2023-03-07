<template>
  <div>
    <div class="rating_info mt-5">
      <div class="top_content">
        <div class="arrow">
          <nuxt-link to="/admin/Reports">
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 15L1.5 8L8.5 1"
                stroke="#7B8794"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </nuxt-link>
          <nuxt-link to="/admin/Reports"> Назад </nuxt-link>
        </div>
      </div>
      <div class="bottom_content mt-5 pl-4">
        <div class="left_content mr-5">
          <div class="provider">
            <p>Поставщик</p>
            <p>{{ myprovider.individual_name }}</p>
          </div>
          <div class="rating_left_content">
            <p>Рейтинг</p>
            <div class="images product-rating">
              <v-rating
                background-color="red"
                color="#df4041"
                length="5"
                readonly
                size="23"
                :value="myprovider.rating"
              ></v-rating>
            </div>
          </div>
          <div class="comments">
            <p>Количество комментариев</p>
            <p>{{ myprovider.rating_count }}</p>
          </div>
        </div>
        <div>
          <div
            class="right_content"
            v-for="item in provider.results"
            :key="item.id"
          >
            <div class="profile">
              <img v-if="item.avatar" :src="item.avatar" />
              <img v-else src="@/assets/image/photos/default.svg" />
              <div class="rating">
                <p>
                  {{ item.customer.first_name }} {{ item.customer.last_name }}
                </p>
                <div class="images product-rating">
                  <v-rating
                    background-color="red"
                    color="#df4041"
                    length="5"
                    readonly
                    size="18"
                    :value="item.rating"
                  ></v-rating>
                </div>
              </div>
              <p>Сегодня, 18:46</p>
            </div>
            <div class="profile_feedback">
              <p>
                {{ item.review }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="meta.pages > 1" class="bg-default mx-auto pt-10 pb-7">
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
  data: () => ({
    myprovider: {},
    provider: {},
    pageNumber: 1,
    pageSize: 5
  }),
  watch: {
    pageNumber() {
      this.$fetch();
    }
  },
  computed: {
    meta() {
      if (this.provider?.meta?.pagination) return this.provider.meta.pagination;
      return { count: 1, page: 1, pages: 2 };
    }
  },
  created() {
    this.fetchProvider();
  },
  async fetch() {
    let params = {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize,
      provider: this.$route.query.id
    };
    this.provider = await this.$axios.$get(`provider-rating/`, { params });
  },
  methods: {
    async fetchProvider() {
      let params = {
        provider: this.$route.query.id
      };
      this.myprovider = await this.$axios.$get(`provider/`, { params });
    }
  }
};
</script>

<style lang="scss" scoped>
.rating_info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;

  .bottom_content {
    display: grid;
    grid-template-columns: 40% 60%;
    column-gap: 20px;

    width: 100%;

    .left_content {
      width: 100%;
      height: 151px;

      display: flex;
      flex-direction: column;

      background: #fff;
      border-radius: 5px;

      div {
        p {
          font-family: "Roboto";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 18px;
          color: #252626;
        }
      }

      .provider {
        display: flex;
        justify-content: space-between;

        border-bottom: 1px solid #e4e4e4;

        padding: 16px 25px 15px 24px;
      }
      .rating_left_content {
        display: flex;
        justify-content: space-between;

        border-bottom: 1px solid #e4e4e4;

        padding: 16px 25px 15px 24px;
      }
      .comments {
        display: flex;
        justify-content: space-between;

        padding: 16px 25px 15px 24px;
      }
    }

    .right_content {
      display: flex;
      flex-direction: column;

      max-width: 100%;
      width: 100%;

      background: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 1px solid #e4e4e4;

      padding: 15px 20px;

      .profile {
        display: flex;

        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
        }

        .rating {
          margin-left: 15px;
          margin-right: 30px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;

          div {
            margin-left: -7px;
          }
          p {
            color: #ff7a29;
          }
        }
        p {
          font-family: "Roboto";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 16px;
        }
        & p:last-child {
          color: #7b8794;
        }
      }
      .profile_feedback {
        margin-left: 65px;

        p {
          font-family: "Gilroy";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 18px;
          color: #252626;
        }
      }
    }
  }

  .arrow {
    display: flex;
    max-width: 70px;
    width: 100%;
    a {
      color: #7b8794;
    }
    & a:nth-child(1) {
      margin-right: 13px;
    }
  }
}
</style>
