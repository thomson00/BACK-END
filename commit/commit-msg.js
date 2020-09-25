const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs')
    .readFileSync(msgPath, 'utf-8')
    .trim();
const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|build)\((internal|[A-Z]+-[0-9]+)\): .{1,50}/;
if (/^Merge branch/.test(msg)) {
    return;
}
if (!commitRE.test(msg)) {
    console.error(
        `    ${chalk.bgRed.white('ERROR ')} ${chalk.red(`不规范的git commit格式`)}\n\n` +
            `    ${chalk.green(`feat(LBCRM-123): add 'comments' option`)}\n\n` +
            `    ${chalk.green(`fix(QA-123): handle events on blur`)}\n\n` +
            `    ${chalk.green(`fix(internal): handle events on blur`)}\n\n` +
            chalk.red(`详情请查阅standard.md`)
    );
    process.exit(1);
}
