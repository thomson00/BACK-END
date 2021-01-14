<template>
    <div class="header">
        <div class="header-logo">
            <img :src="companyInfo.logo" alt="" />
        </div>
        <div class="header-menu">
            <router-link class="header-menu-item" :to="item.key" v-for="item in menuList" :key="item.key">
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
<style scoped lang="less"></style>
