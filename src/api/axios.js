import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '../store/index.js';
import ACCEPT from '../utils/accept.js';
axios.defaults.baseURL = process.env.VUE_APP_API;
const CancelToken = axios.CancelToken;
let source = CancelToken.source();
function cancelRequest() {
    source.cancel('Request Cancelled');
    source = CancelToken.source();
}
Vue.prototype.cancelRequest = cancelRequest;
const mockUrl = 'https://dev-mock.tm-nonprod.com/mock/5f5a09c5d39fdf2dd922d150';

/**
 * @param {*} url 请求url
 * @param {*} [params={}] 请求参数
 * @param {string} [method='post'] 请求方法
 * @param {boolean} [mock=false] 是否使用mock
 * @param {string} [accept='prs-v2'] 请求的api版本
 * @param {boolean} [isformData=false] 参数是否附带文件
 * @param {boolean} [showProgressBar=false] 是否显示进度条
 * @param {*} responseType 定义接口返回值的类型
 * @param {boolean} [showError=true] 在接口报错时，是否提示错误
 * @param {string} [suffix=true] 是否允许添加接口后缀
 * @param {string} [checkValue=false] 是否在请求api前去除空值，以及去除string类型参数的前后空格
 * @param {string} [isLanguages=false] 参数是否是多语言相关功能参数（非多语言上传多个文件时需判断）
 * @param {string} [trim=false] 是否只去除string类型参数的前后空格，类似checkValue
 */
export const reqJsonData = async ({
    url,
    params = {},
    method = 'post',
    mock = false,
    accept = 'prs-v2',
    isformData = false,
    showProgressBar = false,
    responseType,
    showError = true,
    suffix = true,
    checkValue = false,
    isLanguages = true,
    trim = false
}) => {
    const config = {
        method,
        url,
        cancelToken: source.token,
        headers: {
            'Content-Type': !isformData ? 'application/x-www-form-urlencoded' : 'multipart/form-data', // 带有表单数据时的Content-Type
            Accept: ACCEPT[accept],
            'If-Modified-Since': '0' // 防止ie浏览器对ie的axios的缓存
        }
    };
    if (store.state.role === 'sale' && suffix) {
        config.url = `/sale/${url}`.replace('//', '/');
    }
    if (checkValue) {
        params = Vue.prototype.removeEmptyValue(params);
    }
    if (trim) {
        params = Vue.prototype.removeEmptyValue(params, true);
    }
    if (responseType) {
        config.responseType = responseType;
    }
    if (mock) {
        config.baseURL = mockUrl;
    }
    if (method === 'get' || method === 'GET') {
        config.params = params;
        config.paramsSerializer = params => {
            return qs.stringify(params, { arrayFormat: 'indices' });
        };
    } else {
        config.data = qs.stringify(params);
    }
    // 带有表单数据并且有文件时的请求格式
    const transformRequest = new FormData();
    const setUploadProgress = value => {
        store.commit('setUploadProgress', value);
    };
    if (showProgressBar) {
        config.onUploadProgress = event => {
            let rateNumber = ((event.loaded / event.total) * 100) | 0;
            if (rateNumber === 100) {
                rateNumber = 99;
            }
            setUploadProgress(rateNumber);
        };
    }
    if (isformData) {
        for (let key in params) {
            if (Array.isArray(params[key])) {
                params[key].forEach((element, index) => {
                    if (isLanguages) {
                        for (let k in element) {
                            if (Array.isArray(element[k])) {
                                element[k].forEach((el, i) => {
                                    transformRequest.append(`${key}[` + index + `][${k}][` + i + `]`, el);
                                });
                            } else {
                                transformRequest.append(`${key}[` + index + `][${k}]`, element[k]);
                            }
                        }
                    } else {
                        transformRequest.append(`${key}[${index}]`, element);
                    }
                });
            } else {
                transformRequest.append(key, params[key]);
            }
        }
    }
    return new Promise(resolve => {
        try {
            const newAxios = !isformData ? axios(config) : axios.post(config.url, transformRequest, config);
            newAxios
                .then(res => {
                    if (showProgressBar) {
                        setUploadProgress(100);
                        setTimeout(() => {
                            return setUploadProgress(false);
                        }, 2000);
                    }
                    let code = res.data.code;
                    if ((code || res.data.debug) && showError) {
                        code = Number(code); // 后台可能返回字符串code
                    }
                    /*
                    一般来说，后台不做任何返回值，默认的后台返回值会为空object。即使后台自定义了空值返回，
                    在这里添加个默认返回值{}，因此在调用api时，只需对res进行if判断即可证明api是否正确调用成功(空object在if判断中是为true的)
                */
                    resolve(res.data || {});
                })
                .catch(err => {
                    // 如果后台报错，则不需要显示100%。直接让进度条消失
                    showProgressBar &&
                        setTimeout(() => {
                            return setUploadProgress(false);
                        }, 2000);
                    Vue.config.errorHandler(err, Vue);
                    resolve();
                });
        } catch (error) {
            resolve();
            Vue.config.errorHandler(error, Vue);
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
