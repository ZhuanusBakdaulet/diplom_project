<template>
  <div class="">
    <div class="nav d-flex align-center justify-start" @click="goBack">
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
      <h2 class="fw600">Налоги отчетности</h2>
    </div>
    <h3 class="grey-color mt-2">Форма 910</h3>
    <v-form @submit.prevent="submitAddress">
      <div class="address-grid mt-7">
        <div class="">
          <p class="fw600 mt-1">Телефон</p>
          <v-text-field
            placeholder="+7 ___ ___ __ __"
            v-mask="'+7 ### ### ## ##'"
            class="mt-3 my-input"
            v-model="form.phone"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">Юр форма</p>
          <v-text-field
            placeholder="ИП/ТОО"
            class="mt-3 my-input"
            v-model="form.compony"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">Ваш ИИН/БИН</p>
          <v-text-field
            placeholder="ИП/ТОО"
            class="mt-3 my-input"
            v-model="form.iin"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">Название организации</p>
          <v-text-field
            placeholder="Название органазации"
            class="mt-3 my-input"
            v-model="form.name"
            solo
          >
          </v-text-field>
        </div>

        <div>
          <p class="fw600 mt-1">Доход, с безналичных расчетов</p>
          <v-text-field
            placeholder="Доход, с безналичных расчетов"
            class="mt-3 my-input"
            v-model="form.cashless"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">Доход, с наличных расчетов</p>
          <v-text-field
            placeholder="Доход, с наличных расчетов"
            class="mt-3 my-input"
            v-model="form.cash"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">Зарплата ИП</p>
          <v-text-field
            placeholder="Зарплата ИП"
            class="mt-3 my-input"
            v-model="form.salary"
            solo
          >
          </v-text-field>
        </div>
      </div>
      <button type="submit" class="ml-auto orange-btn mt-4">
        Создать отчет
      </button>
    </v-form>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  layout: "profile",
  data: () => ({
    form: {},
    back: "<",
  }),
  created() {
    this.$store.commit("changeProfileMenu", "taxes");
  },
  methods: {
    async submitAddress() {
      console.log(this.form);
    },
    addPost() {
      axios.post("addPost", {
        title: this.title,
        content: this.content,
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.address-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
}
.my-input,
.orange-btn {
  width: 100%;
  max-width: 400px;
}
.nav a {
  display: none !important;
}
@media screen and (max-width: 600px) {
  .nav a {
    display: block !important;
    color: black;
    font-weight: bold;
    cursor: pointer;
  }
  h2.fw600 {
    font-size: 20px;
    line-height: 26px;
    max-width: 100%;
    width: 100%;
    text-align: center;
  }
  h3 {
    font-size: 18px;
    line-height: 22px;
  }
  .address-grid {
    grid-template-columns: 1fr;

    margin: 0 auto;
  }
  .address-grid div .fw600 {
    font-size: 13px;
    line-height: 16px;
  }
  .my-input {
    max-width: 100%;
  }
  .orange-btn {
    max-width: 100%;

    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
  }
}
</style>
