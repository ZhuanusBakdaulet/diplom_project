import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  props: {
    spinner: "spiral"
    /* other props need to configure */
  },
  system: {
    throttleLimit: 100
    /* other settings need to configure */
  },
  slots: {
    noMore: "Нет других сообщении" // you can pass a string value
    // error: InfiniteError, // you also can pass a Vue component as a slot
  }
});
