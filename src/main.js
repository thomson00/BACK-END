import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n/index.js';
import { Select, Option } from 'element-ui';

Vue.config.productionTip = false;
Vue.use(Select).use(Option);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
