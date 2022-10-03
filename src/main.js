import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(router);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
