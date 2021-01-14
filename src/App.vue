<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'App',
    watch: {
        '$store.state.locale': {
            handler() {
                this.getCompanyInfo();
            },
            immediate: true
        }
    },
    computed: {
        ...mapState({
            locale: 'locale'
        })
    },
    methods: {
        saveState() {
            sessionStorage.setItem('state', JSON.stringify(this.$store.state));
        },
        async getCompanyInfo() {
            await this.$store.dispatch('getCompanyAction', this.locale);
        }
    },
    created() {
        window.addEventListener('unload', this.saveState);
    }
};
</script>

<style lang="less">
#app {
    font-size: 14px;
    height: 100%;
}
</style>
