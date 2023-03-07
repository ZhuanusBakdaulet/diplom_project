<template>
  <div>
    <div class="nav d-flex align-center d-sm-none mb-5" @click="goBack">
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13.1428L1 7.14282L7 1.14282"
          stroke="#252626"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h4 class="w100">Вопросы и ответы</h4>
    </div>
    <div class="pb-4">
      <div
        class="about_service mb-6 white-bg pt-4"
        v-for="(item, m) in faq.results"
        :key="m"
      >
        <p class="heading pl-5 pb-3">{{ item.title }}</p>
        <div
          class="questions"
          v-for="(question, index) in item.faqs"
          :key="index"
        >
          <div
            @click="
              [
                active == `${m}_${index}`
                  ? (active = 0)
                  : (active = `${m}_${index}`),
              ]
            "
            class="
              question_content
              d-flex
              align-center
              justify-space-between
              pt-4
              pointer
            "
          >
            <p class="p pb-4 pl-5">{{ index + 1 }}. {{ question.question }}</p>
            <div
              class="arrow mr-5 mb-6"
              :class="{
                arrow_active: `${m}_${index}` == active,
              }"
            ></div>
          </div>

          <div
            class="sub_questions pl-10 pb-4"
            v-if="`${m}_${index}` == active"
          >
            <p class="answer_p">
              {{ question.answer }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="meta.pages > 1" class="my-pagination mt-10">
        <v-pagination
          class=""
          v-model="pageNumber"
          :length="meta.pages"
          total-visible="10"
        >
        </v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let pageNumber = 1,
      pageSize = 10,
      params = {
        "page[number]": pageNumber,
        "page[size]": pageSize,
      };

    const faq = await $axios.$get("questions/topics/", { params });
    return {
      pageNumber,
      pageSize,
      faq,
    };
  },
  layout: "profile",
  data: () => ({
    question: [],
    active: 0,
  }),
  watch: {
    pageNumber() {
      this.fetchFAQ();
    },
  },
  computed: {
    meta() {
      if (this.faq?.meta?.pagination) return this.faq.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    },
  },
  created() {
    this.$store.commit("changeProfileMenu", "faq");
  },
  methods: {
    async fetchFAQ() {
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
      };
      await this.$axios
        .$get(`questions/topics/`, {
          params,
        })
        .then((res) => {
          this.faq = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
.profile-grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 25%;
}

.about_service {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 5px;

  margin-bottom: 15px;
}

.heading {
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;

  border-bottom: 1px solid #e7e7e7;
}

.p {
  cursor: pointer;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 22px;
}
.sub_questions {
  transition: 0.3s;
}
.answer_p {
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
}
.questions {
  border-bottom: 1px solid #e7e7e7;

  .question_content {
    display: flex !important;
    justify-content: space-between !important;

    align-items: center !important;
  }
}
.arrow {
  width: 10px;
  height: 10px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  transition: 0.3s;
  transform: rotate(130deg);
}
.arrow_active {
  transform: rotate(313deg);
}
.question_content {
  p {
    max-width: 90%;
  }
}
@media screen and (max-width: 600px) {
  .nav {
    h4 {
      margin: 0 auto;
      font-style: normal;
      font-weight: bold;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
    }
  }
}
</style>
