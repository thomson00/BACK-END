<template>
    <div>
        <input type="button" value="按钮" @click="login" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            food: {
                name: '冰激凌',
                time: ''
            }
        };
    },
    computed: {
        addPrice() {
            let food = this.food;
            food.price = 10;
            return food;
        }
    },
    watch: {
        food: {
            handler(newVal) {
                return newVal;
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        change() {
            this.food.name = '棒棒糖';
        },

        login() {
            this.$emit('toLogin', this.time);
        }
    },
    created() {
        this.time = new Date().getTime();
    }
};
</script>
<style lang="less" scoped></style>
