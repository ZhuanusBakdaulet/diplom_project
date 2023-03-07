<template>
  <div v-if="loading" class="loading-page">
    <div class="loading"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 200px;
  background: #fbfbfb;
  box-shadow: 0px 10px 15px rgba(138, 149, 158, 0.15);
}
.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.loading {
  display: inline-block;
  width: 70px;
  height: 70px;
  border: 10px solid #ff7a29;
  box-sizing: border-box;
  border-radius: 50%;
  border-top-color: #f1f1f1;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
