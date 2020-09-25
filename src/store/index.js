import Vue from 'vue';
import Vuex from 'vuex';
import moduleOne from './moduleOne/index.js';
import moduleTwo from './moduleTwo/index.js';
import { getLanguageList } from '../api/request.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        locale: window.localStorage.getItem('locale') || 'zh'
    },
    mutations: {
        setLanguage: (state, params) => {
            state.locale = params;
        }
    },
    getters: {
        getLanguage: state => {
            return state.locale;
        }
    },
    actions: {
        // axios请求数据存储在vuex中
        getLanguageAction(context) {
            getLanguageList()
                .then(res => {
                    if (res) {
                        context.commit('setLanguages', res);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    modules: {
        moduleOne,
        moduleTwo
    }
});
