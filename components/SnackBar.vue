<template>
  <div class="" style="z-index: 100000">
    <v-snackbar
      class="text-center"
      v-model="show"
      :color="color"
      :timeout="timeout"
    >
      <h3 class="white-color text-center">{{ message }}</h3>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      color: "",
      timeout: 2000
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showSnack") {
        this.message = state.snack.text || "Успешно";
        this.color = state.snack.color || "success";
        if (state.snack.timeout) this.timeout = state.snack.timeout;
        this.show = true;
      }
    });
  }
};
</script>
