<template>
    <div class="login">
        <header class="login-header">
            <div class="login-header-box">
                <div class="login-header-logo">
                    <img :src="companyInfo.logo" alt="" />
                </div>
                <Language></Language>
            </div>
        </header>
        <main class="login-main">
            <div class="login-main-text">{{ $t('welcome_to') }}</div>
            <div class="login-main-text">{{ companyInfo.crm_name }}</div>
            <div class="login-main-account">{{ $t('login_to') }}</div>
            <div class="login-main-form">
                <el-form :model="loginForm" ref="loginForm" :rules="loginRule" @submit.native.prevent>
                    <el-form-item prop="account">
                        <el-input v-model="loginForm.account" prefix-icon="el-icon-user" :placeholder="$t('login_name')" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" prefix-icon="el-icon-key" :placeholder="$t('password')" :type="isPassword" clearable>
                            <i slot="suffix" class="iconfont" :class="isPassword === 'password' ? 'icon-eye-close' : 'icon-eye'" @click="changeIcon()"></i>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <div class="login-btn-top">
                            <el-checkbox v-model="isRemember">{{ $t('remember_me') }}</el-checkbox>
                            <router-link to="/forget-password" class="forget-password">{{ $t('forget_password') }}</router-link>
                        </div>
                        <button type="submit" class="button dark" @click="submitLogin">{{ $t('login') }}</button>
                    </div>
                </el-form>
            </div>
        </main>
    </div>
</template>

<script>
import Language from '@/components/Language.vue';
import { userLogin } from '../api/request';
import { setLoginUserInfo } from '@/utils/cookie';
export default {
    name: 'Login',
    data() {
        const validateAccount = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error(this.$t('tips.enter_account')));
            }
            return callback();
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error(this.$t('tips.enter_password')));
            }
            return callback();
        };
        return {
            isPassword: 'password',
            isRemember: false,
            loginForm: {
                account: '',
                password: ''
            },
            loginRule: {
                account: {
                    validator: validateAccount,
                    trigger: 'blur'
                },
                password: {
                    validator: validatePass,
                    trigger: 'blur'
                }
            }
        };
    },
    components: {
        Language
    },
    computed: {
        companyInfo() {
            return this.$store.state.companyInfo;
        }
    },
    methods: {
        changeIcon() {
            if (this.isPassword === 'password') {
                this.isPassword = 'text';
            } else {
                this.isPassword = 'password';
            }
        },
        async submitLogin() {
            let result;
            this.$refs['loginForm'].validate(valid => {
                result = valid;
            });
            if (result) {
                const res = await userLogin({
                    username: this.loginForm.account,
                    password: this.loginForm.password,
                    language: 'en',
                    platform: 'web',
                    url: window.location.origin
                });
                this.loading = false;
                if (res) {
                    setLoginUserInfo({
                        res,
                        loginUser: this.loginForm.account,
                        continuedLogin: this.continuedLogin
                    });
                    this.$router.push('/');
                }
            }
        }
    },
    created() {}
};
</script>
<style scoped lang="less">
.login {
    &-header {
        width: 100%;
        height: 70px;
        background: linear-gradient(to right, @login-start-color, @login-end-color);
        &-box {
            height: 100%;
            margin: 0 10px;
            display: flex;
            justify-content: space-between;
        }
        &-logo {
            width: 200px;
            height: 100%;
            display: flex;
            align-items: center;
            img {
                width: 200px;
                height: 68px;
            }
        }
    }
    &-main {
        margin-top: 80px;
        &-text {
            font-size: 20px;
            line-height: 30px;
            font-weight: bold;
            text-align: center;
        }
        &-account {
            font-size: 16px;
            line-height: 30px;
            text-align: center;
            margin-bottom: 22px;
        }
        &-form {
            width: 280px;
            margin: 0 auto;
            .login-btn {
                &-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 22px;
                }
                .button {
                    width: 280px;
                }
            }
        }
    }
}
</style>
