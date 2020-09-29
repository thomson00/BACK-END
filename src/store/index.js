import Vue from 'vue';
import Vuex from 'vuex';
import moduleOne from './moduleOne/index.js';
import moduleTwo from './moduleTwo/index.js';
import { getLanguageList } from '../api/request.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        locale: window.localStorage.getItem('locale') || 'zh',
        languageList: []
    },
    mutations: {
        setLanguage: (state, params) => {
            state.languageList = params.map(item => {
                return {
                    label: item.display_name,
                    value: item.language_id
                };
            });
        },
        changeLanguage: (state, params) => {
            state.locale = params;
        }
    },
    getters: {
        getLanguage: state => {
            return state.languageList;
        }
    },
    actions: {
        getLanguageAction(context) {
            return new Promise(resolve => {
                getLanguageList().then(res => {
                    if (res) {
                        context.commit('setLanguage', res);
                        resolve(res);
                    }
                });
            });
        }
    },
    modules: {
        moduleOne,
        moduleTwo
    }
});
