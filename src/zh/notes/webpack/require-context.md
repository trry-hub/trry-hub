## 带表达式的 require 语句

> 如果你的require参数含有表达式(expressions), 会创建一个上下文（context），因为在编译时（compile time）并不清楚具体是哪一个模块被导入

```js
require("./template/" + name + ".ejs")
```

webpack 解析 require() 的调用，提取出来如下这些信息：

```
Directory: ./template
Regular expression: /^.*\.ejs$/
```

则会返回template目录下的所有后缀为.ejs模板的引用，包含子目录。

## require.context

可以使用 require.context()方法来创建自己的（模块）上下文，这个方法有3个参：

- 要搜索的文件夹目录
- 是否还应该搜索它的子目录
- 以及一个匹配文件的正则表达式

```js

require.context(directory,useSubdirectories = false,regExp = /^\.\//)

require.context("./test", false, /\.test\.js$/);
// （创建了）一个包含了 test 文件夹（不包含子目录）下面的、所有文件名以`.test.js` 结尾的、能被require 请求到的文件的上下文。


require.context("../", true, /\.stories\.js$/);
// (创建了)一个包含了父级文件夹（包含子目录）下面，所有文件名以 `.stories.js` 结尾的文件的上下文。
```

> require.context 模块导出（返回）一个（require）函数，这个函数可以接收一个参数：request 函数-这里的 request 应该是指在 require() 语句中的表达式

导出的方法有 3 个属性：resolve,keys,id

- resolve 是一个函数，它返回请求被解析后得到的模块id。
- keys 也是一个函数，他返回一个数组，由所有可能被上下文模块处理的请求组成。
- id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到

-

 Vue 全局组件：

```js
module.exports.install = function (Vue) {
 /*
   所有在./components目录下的.vue组件自动注册为全局组件
   以<mv-***></mv-***>为组件标签名，***是组件的.name，没有name的时候是组件的文件名
  */

 const requireAll = context => context.keys().map(context);

 const component = require.context('./components', false, /\.vue$/);
 // const directive = require.context('./directives', false, /\.js$/);

 requireAll(component).forEach((item) => {
   const name = (item.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
   Vue.component(`mv-${name}`, item);
 });

};
```

## 首字母大写

```js
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/,(v) => v.toUpperVase()) // 首字母大写
    Vue.component(`v${name}`, components[key])
})
```

## 利用require.context遍历目录所有图片

```
 G:\Code\Vue\vue-global-component\src\assets>tree /f卷 其它 的文件夹 PATH 列表
 卷序列号为 10081-0973
 G:.
 |  logo.png
 |_ kittens
        kitten1.jpg
        kitten2.jpg
        kitten3.jpg
        kitten4.jpg
```
