import YmapPlugin from "vue-yandex-maps";
import Vue from "vue";
const settings = {
  apiKey: "60a2f55f-507c-422b-a21c-f085e410f08e",
  lang: "ru_RU",
  version: "2.1",
  coordorder: "latlong"
};
Vue.use(YmapPlugin, settings);
