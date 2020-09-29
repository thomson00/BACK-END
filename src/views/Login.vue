<template>
    <div class="login">
        <el-input v-input-limit:2 v-model="value"></el-input>
        <my-button @toLogin="getLogin">登录</my-button>
    </div>
</template>

<script>
import myMixins from '@/mixins/myMixin.js';
import myButton from '@/components/myButton.vue';
export default {
    name: 'Login',
    extends: myMixins,
    data() {
        return {
            value: ''
        };
    },
    components: {
        myButton
    },
    methods: {
        getLogin(val) {
            console.log(val);
        }
    },
    created() {}
};
</script>
