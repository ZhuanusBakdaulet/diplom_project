<template>
  <div class="bg-white">
    <div class="mt-4 bg-white">
      <div class="d-flex align-center mt-4 mx-8 bg-white">
        <button @click="openModal" class="ml-auto blue-btn-outline">
          <svg
            class="mr-2"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="5" width="12" height="2" fill="#6BB4FF" />
            <rect
              width="12"
              height="2"
              transform="matrix(0 -1 -1 0 7 12)"
              fill="#6BB4FF"
            />
          </svg>
          Добавить
        </button>
      </div>
      <div class="faq">
        <div class="question_answer">
          <p>Вопрос</p>
          <p>Тема</p>
        </div>
        <div class="faqs">
          <div
            class="faq_content pointer"
            v-for="(item, index) in faq.results"
            :key="item.id"
            @click="toggleIt(index)"
          >
            <p>
              {{ item.question }}
            </p>
            <p class="heading">{{ item.topic }}</p>
            <svg
              @click="editModal(item)"
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
                d="M8.82775 10.9205L16.3008 3.4475C17.2318 2.5175 18.7408 2.5175 19.6718 3.4475L20.8888 4.6645C21.8198 5.5955 21.8198 7.1055 20.8888 8.0355L13.3798 15.5445C12.9728 15.9515 12.4208 16.1805 11.8448 16.1805H8.09875L8.19275 12.4005C8.20675 11.8445 8.43375 11.3145 8.82775 10.9205Z"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.1652 4.60156L19.7312 9.16756"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              class="pointer arrow"
              :class="{ 'arrow-rotate': toggle == index + 1 }"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.5L12 15.5L5 8.5"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div
              class="sub_questions mt-3"
              id="sub_questions1"
              v-if="toggle == index + 1"
            >
              <p class="answer_p">
                {{ item.answer }}
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

    <v-dialog v-model="dialog" width="631">
      <v-card class="px-11 py-9">
        <div @click="closeModal" class="close">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7756 1.42052L14.6703 0.328417C14.3713 0.0293538 13.8772 0.0293538 13.5651 0.328417L8.05193 5.84146L2.43487 0.224395C2.13567 -0.0747984 1.64157 -0.0747984 1.32963 0.224395L0.224395 1.32963C-0.0747984 1.62869 -0.0747984 2.1228 0.224395 2.43487L5.82859 8.03906L0.328417 13.5652C0.0293538 13.8643 0.0293538 14.3584 0.328417 14.6705L1.43365 15.7757C1.73272 16.0748 2.22682 16.0748 2.53889 15.7757L8.05193 10.2625L13.5651 15.7757C13.8642 16.0748 14.3583 16.0748 14.6703 15.7757L15.7756 14.6705C16.0746 14.3714 16.0746 13.8773 15.7756 13.5652L10.2494 8.05206L15.7626 2.53902C16.0746 2.22669 16.0746 1.73259 15.7756 1.42052Z"
              fill="#6BB4FF"
            />
          </svg>
        </div>
        <h1 class="blue-color fw500">
          {{ state == "edit" ? "Редактировать вопрос" : "Добавить вопрос" }}
        </h1>
        <v-form ref="form" @submit.prevent="submit" class="mt-7">
          <div class="d-flex justify-space-between mt-2">
            <p class="p15 gilroy ">
              Выберите тему вопроса
            </p>
            <p
              @click="openTopicModal"
              class="p15 gilroy ml-auto orange-color pointer"
            >
              Добавить тему
            </p>
          </div>
          <v-select
            :items="topics"
            item-value="id"
            item-text="title"
            class="my-input mt-2"
            v-model="form.topic"
            placeholder="Выберите тему вопроса"
            solo
            :rules="[rules.required]"
          ></v-select>

          <p class="p15 gilroy mt-2">Введите вопрос</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.question"
            placeholder="Введите вопрос"
            solo
            :rules="[rules.required]"
          ></v-text-field>

          <p class="p15 gilroy mt-2">Напишите ответ на вопрос</p>
          <v-textarea
            v-model="form.answer"
            class="my-input mt-2"
            placeholder="Напишите ответ на вопрос..."
            :rules="[rules.required]"
            no-resize
            height="230px"
            solo
          >
          </v-textarea>

          <button type="submit" class="blue-btn mt-4 mx-auto">
            {{ state == "edit" ? "Изменить" : "Добавить" }}
          </button>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="topicModal" width="431">
      <v-card class="px-11 py-9">
        <div @click="closeTopicModal" class="close">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7756 1.42052L14.6703 0.328417C14.3713 0.0293538 13.8772 0.0293538 13.5651 0.328417L8.05193 5.84146L2.43487 0.224395C2.13567 -0.0747984 1.64157 -0.0747984 1.32963 0.224395L0.224395 1.32963C-0.0747984 1.62869 -0.0747984 2.1228 0.224395 2.43487L5.82859 8.03906L0.328417 13.5652C0.0293538 13.8643 0.0293538 14.3584 0.328417 14.6705L1.43365 15.7757C1.73272 16.0748 2.22682 16.0748 2.53889 15.7757L8.05193 10.2625L13.5651 15.7757C13.8642 16.0748 14.3583 16.0748 14.6703 15.7757L15.7756 14.6705C16.0746 14.3714 16.0746 13.8773 15.7756 13.5652L10.2494 8.05206L15.7626 2.53902C16.0746 2.22669 16.0746 1.73259 15.7756 1.42052Z"
              fill="#6BB4FF"
            />
          </svg>
        </div>
        <h1 class="blue-color fw500">
          {{ state == "edit" ? "Редактировать тему" : "Добавить тему" }}
        </h1>
        <v-form ref="formTopic" @submit.prevent="submitTopic" class="mt-7">
          <p class="p15 mt-2 gilroy">
            Название темы
          </p>
          <v-text-field
            class="my-input mt-2"
            v-model="topicForm.title"
            placeholder="Введите вопрос"
            solo
            :rules="[rules.required]"
          ></v-text-field>

          <button type="submit" class="blue-btn mt-4 mx-auto">
            {{ state == "edit" ? "Изменить" : "Добавить" }}
          </button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Search from "@/components/admin/Search";
export default {
  layout: "admin",
  data: () => ({
    topicModal: false,

    dialog: false,
    pageNumber: 1,
    pageSize: 5,
    toggle: 0,
    faq: {},
    form: {},
    state: "add",
    topics: [],

    topicForm: {},
    rules: {
      required: v => !!v || "Обязательное поле"
    }
  }),
  async fetch() {
    let params = {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize
    };
    await this.$axios
      .$get(`questions/faqs/`, {
        params
      })
      .then(res => {
        this.faq = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    Search
  },
  watch: {
    pageNumber() {
      this.$fetch();
    }
  },
  computed: {
    meta() {
      if (this.faq?.meta?.pagination) return this.faq.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    }
  },
  created() {
    this.$store.commit("changeProfileMenu", "FAQ");
    this.fetchTopics();
  },

  methods: {
    async submitTopic() {
      if (!this.$refs.formTopic.validate()) return;

      this.$axios
        .$post(`questions/topics/`, this.topicForm)
        .then(res => {
          this.closeTopicModal();
          this.fetchTopics();
        })
        .catch(err => {
          this.closeTopicModal();
          this.fetchTopics();
        });
    },
    closeTopicModal() {
      this.topicModal = false;
    },
    openTopicModal() {
      this.topicModal = true;
    },
    async fetchTopics() {
      await this.$axios
        .$get(`questions/topics/`)
        .then(res => {
          this.topics = res.results;
        })
        .catch(err => {
          this.$notifier.showMessage({
            color: "error",
            text: "Не удалось добавить"
          });
        });
    },
    resetDefault() {
      if (this.$refs.form) this.$refs.form.reset();
      this.form = {};
      this.dialog = false;
      this.state = "add";
    },
    closeModal() {
      if (this.state == "edit") this.resetDefault();
      this.dialog = false;
    },
    editModal(item) {
      this.resetDefault();
      this.dialog = true;
      this.form = { ...item };
      this.state = "edit";
    },
    openModal() {
      this.resetDefault();
      this.dialog = true;
    },
    toggleIt(index) {
      index = index + 1;
      if (this.toggle == index) this.toggle = 0;
      else this.toggle = index;
    },
    async submit() {
      if (!this.$refs.form.validate()) return;

      if (this.state == "edit") {
        await this.$axios
          .$patch(`questions/faqs/${this.form.id}/`, this.form)
          .then(res => {
            this.resetDefault();
            this.$fetch();
            this.$notifier.showMessage({
              color: "success",
              text: "Успешно изменено"
            });
          })
          .catch(err => {
            this.$notifier.showMessage({
              color: "error",
              text: "Не удалось изменить"
            });
          });
      } else {
        await this.$axios
          .$post(`questions/faqs/`, this.form)
          .then(res => {
            this.resetDefault();
            this.$fetch();
            this.$notifier.showMessage({
              color: "success",
              text: "успешно добавлено"
            });
          })
          .catch(err => {
            console.log();
            this.$notifier.showMessage({
              color: "error",
              text: err.response.data
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.faq {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #fff;
}
.question_answer {
  padding-left: 60px;
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: 51% 49%;
  width: 100%;
  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #52b1ba;
  }
}
.faqs {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.faq_content {
  display: grid;
  grid-template-columns: 4fr 3fr 0.3fr 0.5fr;
  align-items: center;
  padding: 20px 0 20px 60px;
  border-bottom: 1px solid #e7e7e7;

  & p:nth-child(1) {
    max-width: 341px;
    width: 100%;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #313131;
    text-align: left;
  }
  & p:nth-child(2) {
    max-width: 430px;
    width: 100%;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #313131;
    text-align: left;
  }

  svg {
    cursor: pointer;
  }

  .sub_questions {
    width: 100%;

    .answer_p {
      max-width: 600px;
      width: 100%;

      font-family: "SF Pro Text", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
    }
  }
}
.edit_svg {
  cursor: pointer;
}
.v_dialog {
  display: flex;
  position: relative;
  max-width: 631px;
  p {
    width: 100%;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: #313131;
    text-align: left;
  }
  & p:nth-child(2) {
    max-width: 442px;
    width: 100%;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #313131;
    text-align: left;

    margin-right: 25px;
  }
}
.image1 {
  margin-right: 25px;
}
.edit_svg {
  cursor: pointer;
}
.v_dialog {
  display: flex;
  position: relative;
  max-width: 631px;
  width: 100%;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  color: #313131;
  text-align: left;
}
.image1 {
  margin-right: 25px;
}
.v_dialog {
  display: flex;
  position: relative;
  max-width: 631px;
  width: 100%;
}
.circle {
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 25px;
}
.title {
  max-width: 283px;
  width: 100%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;
  color: #6bb4ff;
}
.text {
  margin-left: 19px;
  padding-bottom: 0;
  margin-bottom: 0;
  width: 100%;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #313131;
}
.button_div {
  display: flex;
  justify-content: center;

  .btn {
    max-width: 260px;
    width: 100%;
    height: 50px;

    background: #6bb4ff;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
    border-radius: 5px;
  }
}
.arrow {
  transition: 0.22s;
  &-rotate {
    transform: rotate(180deg);
  }
}
.add-topic {
  color: #ff7a29;
}
</style>
