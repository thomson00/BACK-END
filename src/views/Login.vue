<template>
    <div class="login">
        <el-input v-input-limit:2 v-model="value"></el-input>
    </div>
</template>

<script>
import myMixins from '@/mixins/myMixin.js';
export default {
    name: 'Login',
    extends: myMixins,
    data() {
        return {
            value: ''
        };
    },
    components: {}
};
</script>
