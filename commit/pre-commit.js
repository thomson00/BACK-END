const path = require('path');
const codeList = require(path.resolve(__dirname, '../src/utils/codeList'));
const chalk = require('chalk');
const fs = require('fs');
(function test() {
    const readme = fs.readFileSync(path.resolve(__dirname, '../README.md')).toString();
    const errors = [];
    codeList.forEach(item => {
        if (readme.indexOf(item.code) === -1) {
            errors.push(item.code);
        }
    });
    if (errors.length) {
        console.error(chalk.red(`新增的code没有在readme文档上备注：${errors.join(',')}`));
        process.exit(1);
    }
})();
