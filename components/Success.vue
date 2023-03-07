<template>
  <v-dialog
    v-model="dialog"
    width="427"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <div
        class="my-modal d-flex flex-column align-center justify-center text-center pa-7"
      >
        <img src="@/assets/image/icons/check-green.svg" alt="" />
        <h3 v-if="text" class="fw600 mt-5">{{ text }}</h3>
        <p v-if="subtext" class="m mt-4">Ваш заказ принят!</p>
        <img
          @click="closeModal"
          class="close"
          src="@/assets/image/icons/close-orange.svg"
          alt=""
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    text: String,
    dialog: {
      type: Boolean,
      default: false
    },
    subtext: {
      type: [String, Boolean],
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.closeModal();
    }, 1500);
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped></style>
