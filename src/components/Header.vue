<template>
    <div class="header">
        <div class="header-logo">
            <img :src="companyInfo.logo" alt="" />
        </div>
        <div class="header-menu">
            <router-link class="header-menu-item" to="login" v-for="item in menuList" :key="item.key">
                <div class="header-menu-text" v-html="$t(item.text)"></div>
            </router-link>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getHeaderMenu } from '../utils/menu.js';
export default {
    name: 'Header',
    data() {
        return {
            menuList: []
        };
    },
    computed: {
        ...mapState({
            companyInfo: 'companyInfo'
        })
    },
    methods: {},
    created() {
        this.menuList = getHeaderMenu();
    }
};
</script>
<style scoped lang="less">
.header {
    height: 70px;
    display: flex;
    &-logo {
        height: 70px;
        width: 210px;
        position: relative;
        img {
            height: 60px;
            width: 180px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
    &-menu {
        height: 70px;
        display: flex;
        &-item {
            text-decoration: none;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: @black;
            font-size: 16px;
            font-weight: bold;
            &:hover {
                background-color: @box-background-color;
                color: @white;
            }
        }
        &-text {
            padding: 0 10px;
            box-sizing: border-box;
            border-right: 1px solid @border-line-color;
            &:hover {
                border-right: 1px solid @box-background-color;
            }
        }
    }
}
</style>
