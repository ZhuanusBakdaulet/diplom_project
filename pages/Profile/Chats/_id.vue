<template>
  <div class="white-bg chat-container py-4">
    <div class="d-flex justify-space-between align-center px-7 pb-3">
      <nuxt-link class="d-flex align-center" to="/Profile/Chats">
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

      <h3 v-if="room" class="fw500">{{ room.name }}</h3>

      <svg
        class=""
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.7719 13.6626L11.0742 9.94962C12.0249 8.85844 12.5459 7.48552 12.5459 6.05624C12.5459 2.71688 9.73177 0 6.27293 0C2.81409 0 0 2.71688 0 6.05624C0 9.39561 2.81409 12.1125 6.27293 12.1125C7.57143 12.1125 8.80883 11.7344 9.86678 11.0166L13.5926 14.7578C13.7484 14.9139 13.9578 15 14.1823 15C14.3947 15 14.5963 14.9218 14.7493 14.7796C15.0744 14.4776 15.0848 13.9768 14.7719 13.6626ZM6.27293 1.57989C8.82956 1.57989 10.9094 3.58793 10.9094 6.05624C10.9094 8.52456 8.82956 10.5326 6.27293 10.5326C3.7163 10.5326 1.63642 8.52456 1.63642 6.05624C1.63642 3.58793 3.7163 1.57989 6.27293 1.57989Z"
          fill="none"
        />
      </svg>
    </div>
    <div class="line"></div>
    <div class="chat-scroll-container">
      <div class="chat" id="chat">
        <div class="chat-item" v-for="item in chat" :key="item.id">
          <p class="grey-color text-center my-7">
            {{ !item.hide_date ? formatTime(item.updated_at, "DD MMMM") : "" }}
          </p>

          <div
            class="message pa-2 my-6"
            :class="{ 'ml-auto message-own': item.user.id == userID }"
          >
            <p
              class="p fw500 name"
              :class="{ 'name-own': item.user.id == userID }"
            >
              {{ item.user.first_name }} {{ item.user.last_name }}
            </p>
            <p
              class="p text"
              :class="[item.user.id == userID ? 'text-own mt-0' : 'mt-2']"
            >
              {{ item.message }}
            </p>
            <p
              class="time text s fw400"
              :class="[item.user.id == userID ? 'text-own' : '']"
            >
              {{ formatTime(item.updated_at, "hh:mm") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <v-form @submit.prevent="sendMessage" ref="chatRef" class="">
      <div class="input-message d-flex align-center px-7 py-3">
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
  middleware: ["auth"],
  layout: "profile",
  data: () => ({}),
  computed: {
    userID() {
      if (this.$auth?.user?.id) return this.$auth.user.id;
      return 0;
    }
  },
  created() {
    this.$store.commit("changeProfileMenu", "chats");
  },
  mounted() {
    this.fetchRoom();
    this.getChat();
  }
};
</script>

<style lang="scss" scoped>
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
    // height: 450px;
    height: 60vh;

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
.time {
  margin-top: 2px;
  text-align: right;
  &-own {
    color: #fff;
  }
}
.pointer {
  -webkit-appearance: none;
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
@media screen and (max-width: 600px) {
  .fw500 {
    font-size: 17px;
    line-height: 22px;
    font-weight: bold !important;
  }
}
</style>
