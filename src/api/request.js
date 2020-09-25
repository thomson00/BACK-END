import { reqJsonData } from './axios';
function request(params) {
    return reqJsonData(Object.assign({ suffix: false }, params));
}

export const getLanguageList = params => {
    return request({ url: '/languages/index', params, method: 'get' });
};
