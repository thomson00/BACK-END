<template>
    <div class="language">
        <el-popover placement="bottom" trigger="hover" v-model="showLanguage">
            <div class="language-select" v-for="(item, index) in languageList" :key="index" @click="chooseLanguage(item)">{{ item.label }}</div>
            <div class="language-on" slot="reference">
                <span>{{ activeLanguage === 'en' ? 'English' : '中文' }}</span>
                <i class="el-icon-arrow-down"></i>
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'Language',
    data() {
        return {
            showLanguage: false,
            activeLanguage: '',
            languageList: []
        };
    },
    methods: {
        async getLanguageList() {
            const res = await this.$store.dispatch('getLanguageAction');
            if (res) {
                let languageList = this.$store.state.languageList;
                this.languageList = languageList.filter(item => {
                    return item.value === 'en' || item.value === 'zh';
                });
            }
        },
        chooseLanguage(item) {
            this.showLanguage = false;
            this.activeLanguage = item.value;
            switch (this.activeLanguage) {
                case 'en':
                    this.$i18n.locale = 'en';
                    this.$store.commit('setLocale', 'en');
                    break;
                case 'zh':
                    this.$i18n.locale = 'zh';
                    this.$store.commit('setLocale', 'zh');
                    break;
            }
        }
    },
    created() {
        this.activeLanguage = this.$store.state.locale;
        this.$i18n.locale = this.activeLanguage;
        this.getLanguageList();
    }
};
</script>
<style scoped lang="less">
.language {
    width: 80px;
    color: @white;
    font-weight: bold;
    display: flex;
    align-items: center;
    &-select {
        text-align: center;
        cursor: pointer;
    }
    &-select:hover {
        background-color: @table;
        color: @white;
    }
    &-on {
        & span {
            display: inline-block;
            width: 60px;
            text-align: center;
        }
    }
}
</style>
<style lang="less">
.el-popover {
    min-width: 60px !important;
    color: @table !important;
    font-weight: bold !important;
}
</style>
