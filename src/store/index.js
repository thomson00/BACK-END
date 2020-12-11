import Vue from 'vue';
import Vuex from 'vuex';
import moduleOne from './moduleOne/one_index.js';
import moduleTwo from './moduleTwo/two_index.js';
import { getCookie } from '@/utils/cookie';
import { getCompanyInfo, getLanguageList } from '../api/request.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        moduleOne,
        moduleTwo
    },
    state: sessionStorage.getItem('state')
        ? JSON.parse(sessionStorage.getItem('state'))
        : {
              token: getCookie('admin_token'),
              loginUser: '',
              locale: 'en',
              companyInfo: {},
              languageList: [],
              permissionList: [],
              role: ''
          },
    mutations: {
        setToken: (state, params) => {
            state.token = params;
        },
        setLoginUser: (state, params) => {
            state.loginUser = params;
        },
        setLocale: (state, params) => {
            state.locale = params;
        },
        setCompany: (state, params) => {
            state.companyInfo = params;
        },
        setLanguage: (state, params) => {
            state.languageList = params.map(item => {
                return {
                    label: item.display_name,
                    value: item.language
                };
            });
        },
        changeLanguage: (state, params) => {
            state.locale = params;
        },
        setPermission: (state, params) => {
            state.permissionList = params.permissionList;
            state.role = params.role;
        }
    },
    getters: {
        getLanguage: state => {
            return state.languageList;
        }
    },
    actions: {
        getCompanyAction(context, locale) {
            return new Promise(resolve => {
                getCompanyInfo({ lang: locale }).then(res => {
                    if (res) {
                        context.commit('setCompany', res);
                        resolve(res);
                    }
                });
            });
        },
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
    }
});
