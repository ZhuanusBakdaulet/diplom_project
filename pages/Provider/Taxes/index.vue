<template>
  <div class="">
    <Title title="Налоги отчетности" />
    <h2 class="mt-15">Форма 910</h2>
    <v-form @submit.prevent="submitAddress">
      <div class="address-grid mt-7">
        <div class="">
          <p class="fw600 mt-1">
            Телефон
          </p>
          <v-text-field
            placeholder="+7 ___ ___ __ __"
            v-mask="'+7 ### ### ## ##'"
            class="mt-3 my-input"
            v-model="form.phone"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">
            Юр форма
          </p>
          <v-text-field
            placeholder="ИП/ТОО"
            class="mt-3 my-input"
            v-model="form.compony"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">
            Ваш ИИН/БИН
          </p>
          <v-text-field
            placeholder="ИП/ТОО"
            class="mt-3 my-input"
            v-model="form.iin"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">
            Название организации
          </p>
          <v-text-field
            placeholder="Название органазации"
            class="mt-3 my-input"
            v-model="form.name"
            solo
          >
          </v-text-field>
        </div>

        <div>
          <p class="fw600 mt-1">
            Доход, с безналичных расчетов
          </p>
          <v-text-field
            placeholder="Доход, с безналичных расчетов"
            class="mt-3 my-input"
            v-model="form.cashless"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">
            Доход, с наличных расчетов
          </p>
          <v-text-field
            placeholder="Доход, с наличных расчетов"
            class="mt-3 my-input"
            v-model="form.cash"
            solo
          >
          </v-text-field>

          <p class="fw600 mt-1">
            Зарплата ИП
          </p>
          <v-text-field
            placeholder="Зарплата ИП"
            class="mt-3 my-input"
            v-model="form.salary"
            solo
          >
          </v-text-field>
        </div>
      </div>
      <button type="submit" class="ml-auto green-btn mt-4">
        Создать отчет
      </button>
    </v-form>
  </div>
</template>

<script>
import Title from "@/components/provider/Title";
export default {
  layout: "provider",
  middleware: "provider",
  data: () => ({
    form: {}
  }),
  components: { Title },
  created() {
    this.$store.commit("changeProviderMenu", 4);
  },
  methods: {
    async submitAddress() {
      console.log(this.form);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/provider.scss";

.address-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
}
.my-input,
.green-btn {
  width: 100%;
  max-width: 400px;
}
</style>
