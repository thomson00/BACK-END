<template>
    <div class="demo">
        <Loading :size="'mini'" v-if="loading" :showText="true" :maskWrapper="true"></Loading>
        <el-button type="primary">{{ setGlobal('全局方法') }}</el-button>
        <el-button type="primary">{{ '2021' | setFilter('01', '01') }}</el-button>
        <el-button type="primary">{{ '过滤器' | filterDemo }}</el-button>
        <el-input type="text" v-focus></el-input>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false
        };
    },
    methods: {},
    filters: {
        setFilter(value, value1, value2) {
            return `${value} - ${value1} - ${value2}`;
        }
    }
};
</script>
<style scoped lang="less"></style>
