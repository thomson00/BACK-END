<template>
    <div class="crm-settings">
        <component :is="isDemo"></component>
    </div>
</template>

<script>
import demo from '@/components/demo.vue';
export default {
    name: 'CRMSettings',
    data() {
        return {};
    },
    components: {
        demo
    },
    computed: {
        isDemo() {
            return 'demo';
        }
    },
    methods: {},
    async created() {}
};
</script>
