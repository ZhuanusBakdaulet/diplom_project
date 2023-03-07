<template>
  <div class=""></div>
</template>

<script>
export default {
  middleware: ["auth"],
  layout: "profile",
  created() {
    this.$router.push("/Profile/Person/");
  }
};
</script>
