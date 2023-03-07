<template>
  <div class="white-bg chat-container py-4">
    <div class="d-flex justify-space-between align-center px-7 pb-3">
      <nuxt-link class="d-flex align-center" to="/Profile/Consultation">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5716 17.1426L9.42871 11.9998L14.5716 6.85693"
            stroke="#888583"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="s fw400 grey-color ml-2">Назад</p>
      </nuxt-link>

      <h3 class="fw500 mx-auto">Сообщения</h3>
      <button v-if="isCanCloseChat" @click="endChat" class="green-btn">
        Завершить диалог
      </button>
    </div>
    <div class="line"></div>
    <div class="chat-scroll-container">
      <div class="chat" id="chat">
        <div class="chat-item" v-for="(item, index) in chat" :key="index">
          <p class="grey-color text-center my-7">
            {{ !item.hide_date ? formatTime(item.updated_at, "DD MMMM") : "" }}
          </p>
          <div
            class="message pa-2 my-6"
            :class="{ 'ml-auto message-own': item.created_by == 1 }"
          >
            <p
              class="p fw500 name"
              :class="{ 'name-own': item.created_by == 1 }"
            >
              {{ item.created_by == 1 ? "Я" : "Клиент" }}
            </p>
            <p
              class="p text"
              :class="[item.created_by == 1 ? 'text-own mt-0' : 'mt-2']"
            >
              {{ item.text }}
            </p>
            <p
              class="time text s fw400"
              :class="[item.created_by == 1 ? 'text-own' : '']"
            >
              {{ formatTime(item.updated_at, "hh:mm") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <v-form @submit.prevent="sendMessage" ref="chatRef" class="">
      <div class="input-message  d-flex align-center px-7 py-3">
        <v-text-field
          v-model="message"
          class="chat-input"
          placeholder="Введите сообщение..."
          solo
          rounded
          hide-details
        >
          <template v-slot:append>
            <svg
              @click="sendMessage"
              type="submit"
              class="pointer"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6686 6.97559L0.811792 0.0520208C0.575226 -0.0564484 0.292947 0.00817158 0.12838 0.213571C-0.0373304 0.41897 -0.0430446 0.710913 0.114666 0.922082L5.00026 7.49947L0.114666 14.0769C-0.0430446 14.288 -0.0373304 14.5811 0.127237 14.7854C0.238092 14.925 0.403802 15 0.571798 15C0.652939 15 0.73408 14.9827 0.810649 14.9469L15.6674 8.02335C15.8709 7.92873 16 7.72449 16 7.49947C16 7.27445 15.8709 7.07021 15.6686 6.97559Z"
                fill="#A7AABA"
              />
            </svg>
          </template>
        </v-text-field>
      </div>
    </v-form>
  </div>
</template>

<script>
import chat from "@/mixins/chat";
export default {
  mixins: [chat],
  middleware: ["auth", "manager"],
  layout: "profile",
  data: () => ({}),
  created() {
    this.$store.commit("changeProfileMenu", "Consultation");
  },
  mounted() {
    this.type = "consultation";
    this.getChat();
    this.fetchManagerChat();
  },
  methods: {
    async fetchManagerChat() {
      try {
        let chat = await this.$axios.$get(
          `/manager-chat/${this.$route.params.id}/`
        );
        if (chat.manager && chat.is_finished == false)
          this.isCanCloseChat = true;
      } catch (err) {
        this.$notifier.showMessage({
          color: "warning",
          text: "Не удалось загрузить данные"
        });
      }
    },
    async endChat() {
      let chat_id = this.$route.params.id || null;

      await this.$axios
        .$patch(`/manager-chat/${chat_id}/`, { is_finished: true })
        .then(() => {
          this.$router.push(`/Profile/Consultation`);
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.green-btn {
  max-width: 143px;
  height: 31px;
}
.profile-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 25%;
}
.line {
  width: 100%;
  border-bottom: 2px solid #e7e7e7;
}
.chat-container {
  border-radius: 5px;
}
.chat-scroll-container {
  padding: 20px 15px 40px 30px;
  .chat {
    height: 450px;
    overflow-y: scroll;
    padding-right: 15px;
    &::-webkit-scrollbar {
      background: transparent;
      width: 6px;
      height: 34px;
      margin-right: 10px;
    }
    &::-webkit-scrollbar-thumb {
      width: 6px;
      height: 34px;
      background: $orange-color;
      border-radius: 3px;
    }
  }
}
.message {
  width: 100%;
  max-width: 376px;
  background: #eaf4ff;
  border-radius: 5px;
      word-break: break-all;


  &-own {
    background: #4cb3fc;
  }
}
.name {
  color: #4cb3fc;
  &-own {
    display: none;
  }
}
.text {
  color: #4a5258;
  &-own {
    color: #fff;
  }
}
.time {
  margin-top: 2px;
  text-align: right;
  &-own {
    color: #fff;
  }
}
</style>
