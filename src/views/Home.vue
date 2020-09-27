<template>
    <div class="home"></div>
</template>

<script>
import { getLanguageList } from '@/api/request';
export default {
    name: 'Home',
    components: {},
    async created() {
        let res = await getLanguageList();
        console.log(res);
    }
};
</script>
