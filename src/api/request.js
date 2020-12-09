import { reqJsonData } from './axios';
function request(params) {
    return reqJsonData(Object.assign({ suffix: false }, params));
}

export const userLogin = params => {
    return request({ url: 'authorizations/admin', params, method: 'post' });
};

export function getCompanyInfo(params) {
    return request({ url: '/companies/defaultShow', params, method: 'get' });
}

export const getLanguageList = params => {
    return request({ url: '/languages/index', params, method: 'get' });
};

export const refreshToken = params => {
    return request({ url: '/authorizations/currentAdmin', params, method: 'put' });
};

export const getUserPermission = params => {
    return request({ url: 'authorizations/info', params, method: 'get' });
};
