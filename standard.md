# 代码开发规范
### 代码完成后执行npm run lint,解决eslint报错后再提交代码

### i18n国际化使用

### lodash工具库使用

### mock使用
* 使用方法:api调用时多传递一个参数`mock:true`

### 判定用户操作权限
* 详细的权限代码在permission.js文件中

### 代码工具及风格
* 代码工具统一使用vscode
* 缩进风格为4个空格

### 深度样式作用器
* 注意:使用::v-deep时先确认该组件样式有使用scoped

### 自定义指令
* 在directives文件夹中
* v-input-limit需要配合v-model一起使用