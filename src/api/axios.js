import axios from 'axios';
import qs from 'qs';
import store from '../store/index.js';
import ACCEPT from '../utils/accept.js';
axios.defaults.baseURL = process.env.VUE_APP_API;

/**
 * @param {*} url 请求url
 * @param {*} [params={}] 请求参数
 * @param {string} [method='post'] 请求方法
 */
export const reqJsonData = async ({ url, params = {}, method = 'post', isformData = false, accept = 'prs-v2' }) => {
    const config = {
        url,
        params,
        method,
        headers: {
            'Content-Type': !isformData ? 'application/x-www-form-urlencoded' : 'multipart/form-data',
            Accept: ACCEPT[accept]
        }
    };
    if (method === 'get' || method === 'GET') {
        config.params = params;
    } else {
        config.data = qs.stringify(params);
    }
    return new Promise(resolve => {
        try {
            const newAxios = axios(config);
            newAxios
                .then(res => {
                    resolve(res.data || {});
                })
                .catch(err => {
                    console.log(err);
                    resolve();
                });
        } catch (err) {
            console.log(err);
            resolve();
        }
    });
};

axios.interceptors.request.use(config => {
    const token = store.state.admin_token;
    if (token) {
        let getToken = `Bearer ${token}`;
        config.headers.common['Authorization'] = getToken;
    }
    return config;
});
