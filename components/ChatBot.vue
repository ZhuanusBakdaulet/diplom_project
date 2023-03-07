<template>
  <div class="chat-bot " :class="{ 'chat-btn-fullscreen': active }">
    <button
      v-if="!active"
      @click="active = true"
      class="chat-btn white-text pointer d-flex align-center justify-center"
    >
      <svg
        class="mr-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19 6H18V5C18 3.34315 16.6569 2 15 2H5C3.34315 2 2 3.34315 2 5V12C2 13.6569 3.34315 15 5 15V17C5.00114 17.3766 5.21372 17.7206 5.55 17.89C5.688 17.9649 5.84302 18.0028 6 18C6.21637 18 6.4269 17.9298 6.6 17.8C7.16656 18.5554 8.05573 19 9 19H13.67L17.4 21.8C17.5731 21.9298 17.7836 22 18 22C18.157 22.0028 18.312 21.9649 18.45 21.89C18.7863 21.7205 18.9989 21.3766 19 21V19C20.6569 19 22 17.6569 22 16V9C22 7.34315 20.6569 6 19 6ZM7 15V14C7 13.4477 6.55228 13 6 13H5C4.44772 13 4 12.5523 4 12V5C4 4.44772 4.44772 4 5 4H15C15.5523 4 16 4.44772 16 5V12C16 12.5523 15.5523 13 15 13H10C9.78363 13 9.5731 13.0702 9.4 13.2L7 15ZM19 17C19.5523 17 20 16.5523 20 16V9C20 8.44772 19.5523 8 19 8H18V12C18 13.6569 16.6569 15 15 15H10.33L8.22003 16.59C8.40255 16.84 8.69058 16.9914 9.00003 17H14C14.2164 17 14.4269 17.0702 14.6 17.2L17 19V18C17 17.4477 17.4477 17 18 17H19Z"
          fill="white"
        />
      </svg>
      Возникли проблемы? Мы поможем!
      <div
        v-if="count > 0"
        class="chat-btn-count white-text d-flex align-center justify-center text-center"
      >
        {{ count }}
      </div>
    </button>
    <div v-show="active" class="chat-container">
      <div class="header white-text d-flex align-center pa-3 px-5">
        Задайте вопрос
        <svg
          @click="active = false"
          class="ml-auto pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.4107 4.41076C4.73614 4.08533 5.26378 4.08533 5.58922 4.41076L9.99996 8.82151L14.4107 4.41076C14.7361 4.08533 15.2638 4.08533 15.5892 4.41076C15.9147 4.7362 15.9147 5.26384 15.5892 5.58928L11.1785 10L15.5892 14.4108C15.9147 14.7362 15.9147 15.2638 15.5892 15.5893C15.2638 15.9147 14.7361 15.9147 14.4107 15.5893L9.99996 11.1785L5.58922 15.5893C5.26378 15.9147 4.73614 15.9147 4.4107 15.5893C4.08527 15.2638 4.08527 14.7362 4.4107 14.4108L8.82145 10L4.4107 5.58928C4.08527 5.26384 4.08527 4.7362 4.4107 4.41076Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="chat-scroll-container">
        <div class="chat" id="chat">
          <div class="chat-item" v-for="(item, index) in chat" :key="index">
            <p class="grey-color text-center my-7">
              {{
                !item.hide_date ? formatTime(item.updated_at, "DD MMMM") : ""
              }}
            </p>
            <div
              class="message pa-2 my-6"
              :class="{ 'ml-auto message-own': item.created_by == 2 }"
            >
              <p
                class="p fw500 name"
                :class="{ 'name-own': item.created_by == 2 }"
              >
                {{ item.created_by == 2 ? "Я" : "Менеджер" }}
              </p>
              <p
                class="p text"
                :class="[item.created_by == 2 ? 'text-own mt-0' : '']"
              >
                {{ item.text }}
              </p>
              <p
                class="time text s fw400"
                :class="[item.created_by == 2 ? 'text-own' : '']"
              >
                {{ formatTime(item.updated_at, "hh:mm") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <v-form @submit.prevent="sendMessage" ref="chatRef" class="white-bg">
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
  </div>
</template>

<script>
import chat from "@/mixins/chat";
export default {
  mixins: [chat],
  data: () => ({
    active: false,
    count: 0,
    chat_id: null
  }),
  watch: {
    chat_id() {
      if (this.chat_id) {
        this.fetchChat();
        this.connectToWS();
      }
    },
    active() {
      if (this.active == true) {
        this.count = 0;
        this.getChat();
      }
    }
  },
  mounted() {
    this.setChatId();
    this.connectToWSChatDeleted();
  },
  methods: {
    setChatId() {
      let chat_id = localStorage.getItem("chat_id") || null;
      if (chat_id) {
        chat_id = parseInt(chat_id);
        this.chat_id = chat_id;
      }
    },
    getChat() {
      this.scrollDown();
      let chat = document.getElementById("chat");
      chat.addEventListener("scroll", this.checkIsTop);
    },
    async fetchChat() {
      if (!this.chat_id) return;
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize,
        chat: this.chat_id
      };
      await this.$axios
        .$get(`manager-chat/messages/`, {
          params
        })
        .then(res => {
          this.chatresult = res;
          this.addToChat(res.results.reverse());
        })
        .catch(err => {
          this.$notifier.showMessage({
            color: "warning",
            text: "Не удалось загрузить данные"
          });
        });
    },
    async sendMessage() {
      if (this.message == "") return;

      let post = {
        chat: this.chat_id,
        text: this.message,
        created_by: 2
      };
      await this.$axios
        .$post(`manager-chat/messages/`, post)
        .then(res => {
          this.chat_id = res.chat;
          localStorage.setItem("chat_id", this.chat_id);
          this.message = "";
          this.isScrolled = false;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    connectToWSChatDeleted() {
      let socket = new WebSocket(
        `${this.$config.WS_API}manager-chat/finished_chats/`
      );

      socket.addEventListener("message", event => {
        let data = JSON.parse(event.data);
        if (this.chat_id == data.message) {
          this.chat_id = null;
          this.chatresult = {};
          this.chat = [];
          this.active = false;
          this.count = 0;
          localStorage.removeItem("chat_id");
        }
      });
    },
    connectToWS() {
      if (!this.chat_id) return;

      this.socket = new WebSocket(
        `${this.$config.WS_API}manager-chat/chats_${this.chat_id}/`
      );
      this.socket.addEventListener("message", event => {
        if (this.active) this.count = 0;
        else this.count++;

        this.isScrolled = false;
        this.pageNumber = 1;
        this.pageSize = 1;
        if (this.active) this.fetchChat();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-bot {
  position: fixed;
  right: 20px;
  bottom: 30px;
  z-index: 100;
  @media (max-width: 600px) {
    right: 10px;
    bottom: 70px;
  }
}
.white-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
}
.chat-btn {
  width: 325px;
  height: 45px;
  background: #ff7a29;
  box-shadow: 0px 10px 15px rgba(138, 149, 158, 0.15);
  border-radius: 5px 5px 0px 0px;
  position: relative;

  &-count {
    position: absolute;
    left: 0;
    top: 50%;
    height: 22px;
    transform: translate(-120%, -50%);
    background: $orange-color;
    padding: 0 8px;
    border-radius: 20px;
  }
}
.chat-container {
  width: 325px;
  .header {
    width: 100%;
    height: 45px;
    background: #ff7a29;
    box-shadow: 0px 10px 15px rgba(138, 149, 158, 0.15);
    border-radius: 5px 5px 0px 0px;
  }
  .chat-scroll-container {
    padding: 20px 7px 20px 15px;
    background: #ffffff;
    box-shadow: 0px 10px 15px rgba(138, 149, 158, 0.15);
    .chat {
      height: 290px;
      overflow-y: scroll;
      padding-right: 7px;
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
    max-width: 259px;
    background: #eaf4ff;
    border-radius: 5px;
    border-bottom-left-radius: 0px;
    word-break: break-all;

    &-own {
      background: #4cb3fc;
      border-radius: 5px;
      border-bottom-right-radius: 0px;
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
}
@media (max-width: 600px) {
  .chat-btn {
    width: 335px;
  }
  .chat-btn-fullscreen {
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 170px);

    .chat-container {
      width: 100%;
      height: 100%;

      .chat-scroll-container {
        height: 100%;
      }
      .chat {
        height: 100%;
      }
    }
  }
}
</style>
