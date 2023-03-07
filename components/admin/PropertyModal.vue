<template>
  <div class="">
    <v-dialog v-model="isactive" persistent width="442" class="">
      <v-card class="pa-7">
        <div class="close">
          <v-btn class="" @click="$emit('close')" color="accent" icon>
            <v-icon class="ml-auto">mdi-close</v-icon>
          </v-btn>
        </div>
        <h1 class="blue-color">Добавить характеристику</h1>
        <v-form ref="propertyForm" @submit.prevent="submit">
          <h3 class="mt-5">Введите название характеристики</h3>
          <v-text-field
            v-model="form.name"
            class="my-input mt-2"
            placeholder="Введите название характеристики"
            :rules="[rules.required]"
            solo
          >
          </v-text-field>

          <h3 class="">Введите значения</h3>
          <v-text-field
            v-for="item in field"
            :key="item"
            v-model="form.properties[item]"
            class="my-input mt-2"
            placeholder="Введите значения"
            :rules="[rules.required]"
            solo
          >
            <template v-slot:append-outer>
              <div class="d-flex align-center">
                <svg
                  v-if="item == field"
                  @click="addField"
                  class="ml-7 pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0001 8.32715V15.6535"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.6666 11.9904H8.33325"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <v-icon
                  v-if="field != 1"
                  @click="removeField(item)"
                  color="warning"
                  class="ml-8"
                >
                  mdi-minus
                </v-icon>
              </div>
            </template>
          </v-text-field>

          <h3 class="">Тип фильтрации</h3>
          <v-select
            v-model="form.filtering"
            :items="filteringItems"
            item-text="value"
            item-value="id"
            class="my-input mt-2"
            placeholder="Выберите тип фильтрации"
            :rules="[rules.required]"
            solo
          >
          </v-select>

          <button type="submit" class="blue-btn mt-5 mx-auto">
            Далее
          </button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    filteringItems: [
      { id: 1, value: "Выбор" },
      { id: 2, value: "Диапазон" }
    ],
    field: 1,
    form: {
      properties: []
    },
    rules: {
      required: v => !!v || "Обязательное поле",
      counter: v => v?.length <= 300 || "Не больше 300 символов"
    }
  }),
  props: { isactive: Boolean },
  methods: {
    async submit() {
      if (!this.$refs.propertyForm.validate()) return;

      await this.$axios
        .$post(`units/`, this.form)
        .then(res => {
          this.submitProperty(res.id);
          this.$notifier.showMessage({
            color: "success",
            text: "Успешно добавлена"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async submitProperty(unit_id) {
      let arr = [];
      this.form.properties.map(e => {
        let ob = {
          value: e,
          unit: unit_id
        };
        arr.push(ob);
      });

      await this.$axios
        .$post(`properties/`, arr)
        .then(res => {
          this.$emit("close");
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    addField() {
      this.field++;
    },
    removeField(index) {
      if (this.field <= 1) return;
      this.field--;
      this.form.properties.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.blue-btn {
  max-width: 260px;
  height: 50px;
}
</style>
