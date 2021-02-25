import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n/index.js';
import _ from './utils/lodash.js';
import './plugins/day.js';
import './directives/inputLimit.js';
import './directives/inputFocus.js';
import './utils/element.js';
import './style/common.less';
import { setGlobal } from './utils/index.js';
import { filterDemo } from './filters/index.js';
import Loading from './components/loading.vue';

Vue.config.productionTip = false;
window._ = _;
Vue.prototype.setGlobal = setGlobal;
Vue.component('Loading', Loading);
Vue.filter('filterDemo', filterDemo);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
