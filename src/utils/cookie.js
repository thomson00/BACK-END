import Cookie from 'js-cookie';
import dayjs from '../plugins/day';
import store from '../store/index';
import { refreshToken } from '../api/request';
const key = 'admin';
const continuedLoginKey = `${key}_continued_login`;
const tokenKey = `${key}_token`;
const loginUserKey = `${key}_login_user`;
const langKey = `${key}_locale`;
const refreshTokenKey = `${key}_refresh_token`;
const refreshTimeKey = `${key}_refresh_time`;

function getExpiresTime(minute) {
    return dayjs().add(minute / 24 / 60 / 60, 'day').$d;
}

export function setCookie(name, value, minute) {
    let expires = {};
    if (minute) {
        expires = { expires: getExpiresTime(minute) };
    } else {
        expires = { expires: new Date('2099-01-01') };
    }
    if (process.env.NODE_ENV !== 'development') {
        return Cookie.set(name, value, Object.assign({ secure: true }, expires));
    } else {
        return Cookie.set(name, value, expires);
    }
}

export function getLang() {
    try {
        return Cookie.get(langKey);
    } catch (error) {
        return Cookie.get('admin_locale');
    }
}

export function setLang(value) {
    return setCookie(langKey, value);
}

export function getCookie(name) {
    return Cookie.get(name);
}

export function removeCookie(name) {
    const extra = {};
    return Cookie.remove(name, extra);
}

export function setLoginUserInfo(params) {
    const time = new Date().getTime();
    const res = params.res;
    setCookie(refreshTimeKey, time);
    setCookie(continuedLoginKey, params.continuedLogin || false);
    setCookie(loginUserKey, params.loginUser);
    setCookie(tokenKey, res.access_token, res.expires_in);
    setCookie(refreshTokenKey, res.refresh_token, res.expires_in);
    store.commit('setToken', res.access_token);
    store.commit('setLoginUser', params.loginUser);
}

export function removeLoginInfo() {
    removeCookie(refreshTimeKey);
    removeCookie(continuedLoginKey);
    removeCookie(loginUserKey);
    removeCookie(tokenKey);
    removeCookie(refreshTokenKey);
    window.sessionStorage.clear();
    store.commit('setToken', '');
    store.commit('setLoginUser', '');
}

const refreshAndSaveToken = async () => {
    try {
        const refresh_token = getCookie(refreshTokenKey);
        if (!refresh_token) {
            return false;
        }
        const res = await refreshToken({ refresh_token });
        if (res) {
            setLoginUserInfo({
                res,
                loginUser: getCookie(loginUserKey),
                continuedLogin: getCookie(continuedLoginKey)
            });
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const isTokenEnable = async () => {
    const refreshTokenTime = Number(getCookie(refreshTimeKey));
    const continuedLogin = getCookie(continuedLoginKey) || false;
    const currentTime = new Date().getTime();
    if (continuedLogin && currentTime - refreshTokenTime > 1000 * 60 * 60 * 24) {
        const refreshResult = await refreshAndSaveToken();
        return refreshResult;
    } else {
        return getCookie(tokenKey);
    }
};
