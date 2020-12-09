const cdn = require('./cdn.json');
const path = require('path');
module.exports = {
    outputDir: 'back-end',
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].cdn = cdn;
            return args;
        });
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/style/variable.less')]
        }
    }
};
