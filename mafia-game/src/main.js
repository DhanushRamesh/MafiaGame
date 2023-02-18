import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import router from "./router/router";
import "@mdi/font/css/materialdesignicons.css";
import "@/main.css";

Vue.use(Buefy);

Vue.config.productionTip = false;

Vue.prototype.$convertJsonStrToObj = function (jsonStr) {
  return JSON.parse(jsonStr);
};

Vue.prototype.$convertObjToJSONStr = function (jsonObj) {
  return JSON.stringify(jsonObj);
};

Vue.prototype.$setDataToStorage = function (key, value) {
  localStorage.setItem(key, value);
};

Vue.prototype.$getDataFromStorage = function (key) {
  return localStorage.getItem(key);
};

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
