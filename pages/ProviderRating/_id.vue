<template>
  <div class="grey-bg mt-4">
    <v-container>
      <div class="provider py-5 px-4 mb-7">
        <div class="name mb-2">
          <h3 class="fw500">Поставщик {{ provider.individual_name }}</h3>
        </div>
        <div class="grade mb-2">
          <p class="m">
            В Baital с
            {{ $moment.unix(provider.date_joined).format("DD.MM.YYYY") }}
            г.
          </p>
          <div class="images product-rating mt-1 mb-2">
            <v-rating
              background-color="red"
              color="#df4041"
              length="5"
              readonly
              size="23"
              :value="3"
            >
            </v-rating>
          </div>
          <p class="p">
            Рейтинг рассчитан на основе оценок покупателей и качества работы
            продавца
          </p>
        </div>
      </div>
      <div
        class="rating"
        v-for="(item, index) in provider_rating.results"
        :key="item.id"
      >
        <div class="d-flex flex-row">
          <div class="profile mr-7">
            <img
              v-if="item.customer && item.customer.avatar"
              class="avatar mr-2"
              :src="item.customer.avatar"
              alt=""
            />
            <img
              v-else
              class="avatar mr-2"
              src="../../assets/image/photos/default.svg"
              alt=""
            />
            <div class="ml-1">
              <div class="images product-rating">
                <v-rating
                  background-color="red"
                  color="#df4041"
                  length="5"
                  readonly
                  size="15"
                  :value="parseInt(item.rating)"
                >
                </v-rating>
              </div>
              <p class="product-rating mt-2">
                {{ item.customer.first_name }} {{ item.customer.last_name }}
              </p>
            </div>
          </div>
          <div class="time">
            <p>{{ $moment.unix(item.created_at).calendar() }}</p>
          </div>
        </div>
        <div class="d-flex flex-row">
          <div class="feedback">
            <p>{{ item.review }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="meta.pages > 1"
        class="my-pagination mt-10 d-flex align-center justify-center"
      >
        <v-pagination
          class=""
          v-model="pageNumber"
          :length="meta.pages"
          total-visible="10"
        >
        </v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let pageNumber = 1,
      pageSize = 5,
      fetchparams = {
        "page[number]": pageNumber,
        "page[size]": pageSize,
        provider: params.id
      };

    const provider = await $axios.$get(`auth/users/${params.id}`).catch(err => {
      console.log(err);
    });

    const provider_rating = await $axios
      .$get("provider-rating/", {
        params: fetchparams
      })
      .catch(err => {
        console.log(err);
      });

    return {
      pageNumber,
      pageSize,
      provider_rating,
      provider
    };
  },
  watch: {
    pageNumber() {
      this.fetchProviderRationg();
    }
  },
  computed: {
    meta() {
      if (this.provider_rating?.meta?.pagination)
        return this.provider_rating.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    }
  },
  methods: {
    async fetchProviderRationg() {
      let fetchparams = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        provider: this.$route.params.id
      };

      this.provider_rating = await this.$axios
        .$get("provider-rating/", {
          params: fetchparams
        })
        .catch(err => {
          this.$notifier.showMessage({
            color: "warning",
            text: "Не удалось загрузить данные"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.provider {
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.name p {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #252626;
}

.grade {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.grade svg:nth-child(2) {
  margin-top: 5px;
  margin-bottom: 7px;
}
.phone {
  display: flex;
  align-items: center;
}
.phone svg:nth-child(1) {
  margin-right: 8px;
}
.phone p {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #252626;
}
.rating {
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #ffffff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #e4e4e4;
  padding: 28px 20px;
}
.profile {
  display: flex;
  width: 220px;
}
.profile p {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #ff7a29;
  line-height: 18px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.time {
  margin-right: 80px;
  max-width: 57px;
  width: 100%;
}
.time p {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #7b8794;
}
.feedback {
  width: 100%;
}
.feedback p {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #252626;
}
@media only screen and (max-width: 600px) {
  .provider {
    .grade {
      padding-left: 16px;

      .m {
        font-size: 14px;
        line-height: 18px;
      }
      .p {
        font-size: 14px;
        line-height: 20px;
      }
    }
    .name h3 {
      font-size: 18px;
      line-height: 22px;
    }
    .call {
      display: flex;
      align-items: center;

      padding-left: 16px;
      margin-top: 10px;

      p {
        font-family: Gilroy;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #252626;
        margin-left: 10px;
      }
    }
  }
  .rating {
    flex-direction: column !important;
    padding: 16px 24px 10px;

    .profile {
      max-width: 100%;
    }
    .time {
      margin: 0;
      p {
        text-align: right;
      }
    }
    .feedback {
      margin-top: 15px;
    }
  }
}
@media screen and (max-width: 330px) {
  .grey-bg {
    margin-top: 36px !important;
  }
}
</style>
