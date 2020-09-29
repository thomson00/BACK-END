import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n/index.js';
import _ from './utils/lodash.js';
import './plugins/day.js';
import './directives/inputLimit.js';
import './utils/element.js';

Vue.config.productionTip = false;
window._ = _;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
