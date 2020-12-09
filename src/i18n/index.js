import Vue from 'vue';
import zh from './config/zh.js';
import en from './config/en.js';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        zh,
        en
    }
});

export default i18n;
