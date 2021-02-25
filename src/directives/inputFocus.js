import Vue from 'vue';
Vue.directive('focus', {
    // el表示原生的js对象
    bind: function(el) {
        // 当指令绑定到元素上的时候会立即执行bind函数,且只执行一次;此时元素还没有插入到DOM中,focus聚焦此时不会生效
        el.focus();
    },
    inserted: function(el) {
        // 当元素插入到DOM中的时候,会执行inserted函数;只执行一次
        el.focus();
        // 当用到element组件时:需要拿到它的子元素节点
        let target = el.firstElementChild;
        target.focus();
    },
    updated: function() {
        // 执行updated函数,可能触发多次
    }
});
