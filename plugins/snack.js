export default ({ app, store }, inject) => {
  inject("notifier", {
    showMessage(snack) {
      store.commit("showSnack", snack);
    }
  });
};
