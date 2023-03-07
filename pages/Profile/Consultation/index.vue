<template>
  <div class="white-bg pt-5 pb-7">
    <div class="px-5 pb-4 d-flex align-center w100">
      <div class="d-flex align-center">
        <h3
          @click="isMyChats = false"
          class="grey-color pointer"
          :class="{ 'green-color': !isMyChats }"
        >
          Общий
        </h3>
        <div class="line mx-4"></div>
        <h3
          @click="isMyChats = true"
          class="grey-color pointer"
          :class="{ 'green-color': isMyChats }"
        >
          Мои
        </h3>
      </div>
      <h3 class="mx-auto">Чаты</h3>
      <div v-if="isMyChats" class="filter  my-chat-input">
        <v-select
          class="my-input"
          v-model="sortBy"
          :items="sortByFinished"
          @input="$fetch"
          solo
          hide-details
          height="24"
        >
          <template v-slot:append>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.62204 5.56356C4.82142 5.7938 5.17858 5.7938 5.37796 5.56356L9.47967 0.827327C9.7601 0.503505 9.53008 0 9.1017 0H0.898298C0.469922 0 0.239896 0.503505 0.520334 0.827327L4.62204 5.56356Z"
                fill="#FF7A29"
              />
            </svg>
          </template>
        </v-select>
      </div>
    </div>

    <div class="chats">
      <div
        class="chats-item align-center px-5 py-2"
        v-for="(chat, index) in chats"
        :key="chat.id"
      >
        <div
          class="chats-item__image"
          :class="[index ? `color-${index % 8}` : '']"
        ></div>

        <div class="mr-3">
          <p class="s orange-color">Новое сообщение</p>
          <p class="s my-clamp1 mt-1">{{ chat.newest_message }}</p>
        </div>

        <nuxt-link
          class="d-flex justify-end"
          :to="`/Profile/Consultation/${chat.id}`"
        >
          <div v-if="!isMyChats" class="green-btn chats-item__button">
            Ответить
          </div>
          <svg
            v-else
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.7459 19.7589C7.44784 19.4667 7.42074 19.0095 7.66461 18.6873L7.7459 18.595L14.4734 12L7.7459 5.40503C7.44784 5.11283 7.42074 4.65558 7.66461 4.33338L7.7459 4.24106C8.04396 3.94887 8.51037 3.9223 8.83904 4.16137L8.93321 4.24106L16.2541 11.418C16.5522 11.7102 16.5793 12.1675 16.3354 12.4897L16.2541 12.582L8.93321 19.7589C8.60534 20.0804 8.07376 20.0804 7.7459 19.7589Z"
              fill="#7B8794"
            />
          </svg>
        </nuxt-link>
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
  </div>
</template>

<script>
export default {
  middleware: ["auth", "manager"],
  layout: "profile",
  data: () => ({
    sortBy: false,
    sortByFinished: [
      {
        text: "Незавершенные чаты",
        value: false
      },
      {
        text: "Завершенные чаты",
        value: true
      }
    ],
    chats: [],
    fetchedChats: {},
    pageNumber: 1,
    pageSize: 10,
    isMyChats: false
  }),
  async fetch() {
    let params = {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize,
      is_finished: false
    };

    if (this.sortBy === true) params.is_finished = true;

    let api = this.isMyChats ? `/manager-chat/` : `manager-chat/free/`;
    try {
      this.fetchedChats = await this.$axios.$get(api, { params });
      this.getChats(this.fetchedChats.results);
    } catch (err) {
      this.$notifier.showMessage({
        color: "warning",
        text: "Не удалось загрузить данные"
      });
    }
  },
  watch: {
    isMyChats() {
      this.sortBy = false;
      this.$fetch();
    },
    pageNumber() {
      this.$fetch();
    }
  },
  computed: {
    meta() {
      if (this.fetchedChats?.meta?.pagination)
        return this.fetchedChats.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    }
  },
  created() {
    this.$store.commit("changeProfileMenu", "Consultation");
  },
  mounted() {
    this.connectToChatWS("manager");
    this.connectToChatWS("total");
    this.connectToWSChatDeleted();
  },
  methods: {
    connectToChatWS(type) {
      let api = `${this.$config.WS_API}manager-chat/chats/`;
      if (type == "manager")
        api = `${this.$config.WS_API}manager-chat/managers_${this.$auth.user.id}/`;
      let socket = new WebSocket(api);

      socket.addEventListener("message", event => {
        this.$fetch();
        this.chatToTop(event);
      });
    },
    connectToWSChatDeleted() {
      let socket = new WebSocket(
        `${this.$config.WS_API}manager-chat/delete_chats/`
      );

      socket.addEventListener("message", event => {
        this.$fetch();
      });
    },
    getChats(arr) {
      this.chats = arr;
    },
    chatToTop(item) {
      item = JSON.parse(item.data);
      let { message } = item;

      let chat_index = this.chats.findIndex(e => e.id == message.chat);
      if (chat_index) {
        let splice = this.chats.splice(chat_index, 1);
        splice.newest_message = message.text;
        this.chats.unshift(splice);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  width: 1px;
  height: 34px;
  background: #e7e7e7;
  transform: matrix(-1, 0, 0, 1, 0, 0);
}
.chats {
  &-item {
    display: grid;
    grid-template-columns: 50px 1fr 130px;
    border-top: 1px solid #e7e7e7;
    &:last-child {
      border-bottom: 1px solid #e7e7e7;
    }
    &__image {
      width: 40px;
      height: 40px;
      background: #f5f5f5;
      border-radius: 50%;
      object-fit: cover;
    }
    &__button {
      max-width: 130px;
      height: 32px;
    }
  }
}
.filter {
  max-width: 240px;
}
.color-1 {
  background: #ffe9e9;
}
.color-2 {
  background: #fffadd;
}
.color-3 {
  background: #e3fdff;
}
.color-4 {
  background: #ffe4fc;
}
.color-5 {
  background: #e9ffeb;
}
.color-6 {
  background: #ffebdd;
}
.color-7 {
  background: #e2eeff;
}
.color-8 {
  background: #ffe9e9;
}
</style>
