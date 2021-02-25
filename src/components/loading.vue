<template>
    <div class="loading-wrapper" :class="{ maskWrapper: maskWrapper }">
        <div :class="{ 'mini-loading-box': size === 'mini', 'loading-box': size === 'large' }">
            <div class="loading"><i></i></div>
            <div class="loading"><i></i></div>
            <div class="loading"><i></i></div>
            <p class="loading-text" v-if="showText">{{ $t(text) }}<i class="ellipsis">...</i></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        showText: Boolean,
        size: String,
        maskWrapper: Boolean,
        text: {
            type: String,
            default: 'loading'
        }
    }
};
</script>
