<template>
    <div class="home">
        <el-select v-model="language" :placeholder="$t('select')">
            <el-option v-for="item in languageList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            language: '',
            languageList: []
        };
    },
    components: {},
    async created() {
        await this.$store.dispatch('getLanguageAction');
        this.languageList = this.$store.state.languageList;
    },
    methods: {
        changeLanguage(lang) {
            this.$store.commit('changeLanguage', lang);
        }
    }
};
</script>
