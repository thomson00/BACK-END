<template>
    <div class="home">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
    name: 'Home',
    data() {
        return {};
    },
    components: {
        Header
    },
    methods: {},
    async created() {}
};
</script>
<style scoped lang="less">
.home {
    height: 100%;
}
</style>
