const myMixin = {
    created: function() {
        this.hello();
    },
    methods: {
        hello: function() {
            return 'hello from mixin!';
        }
    }
};
export default myMixin;
