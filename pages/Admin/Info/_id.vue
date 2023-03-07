<template>
  <div class="infos py-10 px-7 bg-white">
    <div @click="goBack" class="admin-back d-flex align-center">
      <svg
        class="mr-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 19L8.5 12L15.5 5"
          stroke="#7B8794"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Назад
    </div>
    <div class="information mt-6">
      <img v-if="info.image" :src="info.image" />
      <img v-else src="@/assets/image/photos/default.svg" />
      <div class="text">
        <h3 class="fw600">{{ info.title }}</h3>
        <p class="p" v-html="info.content"></p>
      </div>
    </div>
    <div class="edit mt-6 mr-7">
      <!-- <button class="blue-btn-outline" @click="dialog = true">
        <svg
          class="mr-2"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.18306 0.433058C9.42714 0.188981 9.82286 0.188981 10.0669 0.433058L12.5669 2.93306C12.811 3.17714 12.811 3.57286 12.5669 3.81694L4.44194 11.9419C4.32473 12.0592 4.16576 12.125 4 12.125H1.5C1.15482 12.125 0.875 11.8452 0.875 11.5V9C0.875 8.83424 0.940848 8.67527 1.05806 8.55806L7.30793 2.30819L9.18306 0.433058ZM7.75 3.63388L2.125 9.25888V10.875H3.74112L9.36612 5.25L7.75 3.63388ZM10.25 4.36612L11.2411 3.375L9.625 1.75888L8.63388 2.75L10.25 4.36612Z"
            fill="#E4E4E4"
          />
        </svg>
        Редактировать
      </button> -->
      <!-- <v-dialog v-model="dialog" width="631">
        <v-card class="v_card px-11 py-6">
          <svg
            class="circle"
            @click="dialog = false"
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

          <p class="title">Редактировать полезную информацию</p>

          <p class="text mb-1">Редактировать тему</p>
          <v-text-field
            class="my-input"
            v-model="info.title"
            solo
          ></v-text-field>
          <p class="text mb-1">Редактировать текст</p>
          <v-textarea class="my-input" v-model="info.content" solo>
          </v-textarea>
          <p class="text mt-5 mb-1">Редактировать фотографию</p>
          <v-file-input
            class="my-input"
            prepend-inner-icon=""
            prepend-icon=""
            solo
          >
            <template v-slot:append>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0001 7.32812V14.6545"
                  stroke="#E9E9E9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.6666 10.9914H7.33325"
                  stroke="#E9E9E9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                  stroke="#E9E9E9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
          </v-file-input>
          <div class="button_div">
            <button class="button mt-7" @click="dialog = false">
              Добавить
            </button>
          </div>
        </v-card>
      </v-dialog> -->
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data: () => ({
    info: {},
    dialog: false,
    rules: {
      required: v => !!v || "Обязательное поле"
    }
  }),
  async fetch() {
    await this.$axios
      .$get(`helpful-information/${this.$route.query.id}/`)
      .then(res => {
        this.info = res;
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.infos {
  display: flex;
  flex-direction: column;
  max-width: 1020px;
  width: 100%;
  justify-content: flex-start;
  border-radius: 5px;

  .information {
    display: flex;
    img {
      width: 100%;
      max-width: 288px;
      object-fit: cover;
    }
  }

  .text {
    max-width: 480px;
    width: 100%;
    display: flex;
    flex-direction: column;

    margin-left: 50px;
    h3 {
      margin-bottom: 22px;
    }
    p {
      margin-bottom: 15px;
      font-family: "Gilroy";
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #252626;
    }
    &:nth-child(6) {
      margin-bottom: 0;
    }
  }
}
.blue-btn-outline {
  border-color: #e4e4e4;
  max-width: 160px;
  color: #313131;
}
.edit {
  margin-right: 30px;
  display: flex;
  justify-content: flex-end;

  .btn {
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    padding: 9px 10px 8px 10px;
    max-width: 141px;
    width: 100%;
    display: flex;
    align-items: center;

    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #313131;

    svg {
      margin-right: 5px;
    }
  }
}
.v_card {
  position: relative;
}
.title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;
  color: #6bb4ff;
}
.text {
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

  width: 100%;
}
.button {
  max-width: 260px;
  width: 100%;
  height: 50px;

  background: #6bb4ff;
  border: 1px solid #6bb4ff;
  box-sizing: border-box;
  box-shadow: 0px 20px 20px rgba(82, 177, 186, 0.15);

  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  border-radius: 5px;
}
.circle {
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
}
.admin-back {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #7b8794;
  cursor: pointer;
}
</style>
