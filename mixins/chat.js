export default {
  data: () => ({
    pageNumber: 1,
    pageSize: 20,
    chat: [],
    chatresult: {},
    room: {},
    message: "",
    socket: null,
    isScrolled: false,
    dates: [],
    type: "chat",
    isCanCloseChat: false
  }),
  computed: {
    meta() {
      if (this.chatresult?.meta?.pagination)
        return this.chatresult.meta.pagination;
      return { page: 1, pages: 1, count: 1 };
    }
  },
  methods: {
    getChat() {
      this.fetchChat();
      this.scrollDown();
      let chat = document.getElementById("chat");
      chat.addEventListener("scroll", this.checkIsTop);
      this.connectToWS();
    },
    async fetchRoom() {
      try {
        this.room = await this.$axios.$get(
          `group-chats/rooms/${this.$route.query.id}/`
        );
      } catch (err) {
        this.$notifier.showMessage({
          color: "warning",
          text: "Не удалось получить данные"
        });
      }
    },
    async sendMessage() {
      if (this.message == "") return;
      let api = "";
      let post = {};
      if (this.type == "chat") {
        api = "group-chats/messages/";
        post = {
          room: this.room.id,
          message: this.message
        };
      } else if (this.type == "consultation") {
        api = "manager-chat/messages/";
        let chat_id = parseInt(this.$route.params.id) || null;
        post = {
          chat: chat_id,
          text: this.message,
          created_by: 1
        };
      }
      await this.$axios
        .$post(api, post)
        .then(() => {
          this.message = "";
          if (this.type == "consultation") this.isCanCloseChat = true;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async fetchChat() {
      let api = "";
      let params = {
        "page[number]": this.pageNumber,
        "page[size]": this.pageSize
      };

      if (this.type == "chat") {
        params.room = this.$route.query.id;
        api = "group-chats/messages/";
      } else if (this.type == "consultation") {
        params.chat = this.$route.params.id;
        api = "manager-chat/messages/";
      }

      if (this.pageNumber > this.meta.pages) return;
      await this.$axios
        .$get(api, { params })
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
    connectToWS() {
      let socketapi = ``;

      if (this.type == "chat") {
        socketapi = `${this.$config.WS_API}chat/${this.$route.query.id}/`;
      } else if (this.type == "consultation") {
        let chat_id = parseInt(this.$route.params.id) || null;
        socketapi = `${this.$config.WS_API}manager-chat/chats_${chat_id}/`;
      }
      this.socket = new WebSocket(socketapi);

      let vm = this;
      this.socket.addEventListener("message", function(event) {
        vm.isScrolled = false;
        vm.pageNumber = 1;
        vm.pageSize = 1;
        vm.fetchChat();
      });
    },
    formatTime(date, format) {
      return this.$moment.unix(date).format(format);
    },
    checkIsTop() {
      let chat = document.getElementById("chat");
      if (chat.scrollTop == 0 && this.pageNumber < this.meta.pages) {
        this.pageSize = 20;
        this.pageNumber = parseInt(this.chat.length / this.pageSize);
        this.pageSize = 20 - (this.chat.length % this.pageSize);
        this.isScrolled = true;
        this.pageNumber++;
        this.fetchChat();
        this.scrollLittleDown();
      }
    },
    scrollLittleDown() {
      let chat = document.getElementById(`chat`);
      if (chat.firstElementChild) {
        let go = chat.firstElementChild.offsetHeight * 20;
        chat.scrollTop = go;
      }
    },
    scrollDown() {
      let chat = document.getElementById(`chat`);
      if (chat.lastElementChild) {
        let last =
          chat.lastElementChild.offsetTop + chat.lastElementChild.offsetHeight;
        chat.scrollTop = last;
      }
    },
    hideDateDuplicates(arr) {
      let arr1 = [];
      arr.forEach(e => {
        let today = this.$moment().format("DD MMMM");
        let item_date = this.$moment.unix(e.updated_at).format("DD MMMM");
        if (!arr1.includes(item_date) && item_date !== today)
          arr1.push(item_date);
        else e.hide_date = true;
      });
    },
    addToChat(arr) {
      this.hideDateDuplicates(arr);
      if (this.isScrolled) {
        this.chat = [...arr, ...this.chat];
      } else {
        this.chat = [...this.chat, ...arr];
        setTimeout(() => {
          this.scrollDown();
        }, 100);
      }
    }
  }
};
