### 目录
-----------------
+ 认识 node
  + node 是什么
  + 应用场景
  + node 语法使用
    + ES5、ES6
    + node 核心模块
    + 引入第三方模块
    + 用户自定义模块
  + 环境安装
  + 使用 node 执行的第一个脚本
  + 使用 node 读写文件
    + 使用 node 写入文件
    + 使用 node 读取文件

### 认识 node
----------------------

```Node``` 是一个针对网络应用开发的平台，是利用 Google 的 JavaScript 运行是引擎 V8（可以解析和执行 JavaScript）打造的一个 JavaScript 在服务端的运行环境。

#### node 是什么

 + Node不是一门语言。Node 是一个构建于 Chrome JavaScript V8解析引擎之上的一个 JavaScript 运行时（环境）。
 + Node 可以解析和执行 JavaScript 代码
   + Ecmascript ，基本的 JavaScript 语法及API
   + 没有 window、document 之类的 DOM、BOM 元素
   + Node 类似与浏览器，是一个解析执行 js 环境，虽然不处理 UI，但是在该平台中为 js 提供了一系列的编程接口
 + npm 不仅仅可以用来下载 node ，还可以用来方便管理和维护第三方包的相关的一些资源包，也可以用来下载浏览器环境相关的一些资源包（Ployfill，Hack）

#### 应用场景

 + 网站服务器
 + 网络爬虫
 + JSON API
 + 网络游戏服务器
 + 命令行工具

#### node 语法使用

#### ES5、ES6

#### node 核心模块

Node 把绝大多数的 API 都封装到了一个具名的核心模块中，每一个模块就是处理一系列功能的 API 集合，每个模块都有一个唯一表示名称进行暴露，我们使用的时候需要进行单独的加载。

例如文件操作的： ```fs```,网络操作的```http```等，如果要使用，需要先加载模块。

```
// 用户自定义变量名 = require('唯一的核心模块表示名称')
var fs = require('fs')

```

##### 引入第三方模块

第三个模块由 npm 社区提供，我们在使用的时候：

1. 使用 npm 下载指定的模块

```
npm install moment
```
2. 通过 require 进行引用

```
var moment = require('moment')
```
3. 查看第三方的 API 进行使用

[momentjs 的官方文档](https://momentjs.com/docs/)

```
console.log(moment().format())
console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
```

##### 用户自定义模块

Node 基于 CommonJS 模块规范实现了自己的一套 JavaScript 模块解决方案，其核心 API 为下面三个

+ require
+ module
+ exports

##### 环境安装

[Node 官网下载](https://nodejs.org/en/download/)

下载 --> 下一步安装 --> 完成

验证

```JavaScript
node -v
node --version
npm -v
npm --version
```

#### 使用 node 执行的第一个脚本

1、创建一个 helloworld 的js文件
2、在js里面写一行代码

```
console.log('hello nodejs');
```
3、在本文件目录下执行
```
node helloworld.js
```

#### 使用 node 读取文件

##### 使用 node 写入文件

```
// 引入node的文件操作fs核心模块
var fs = require('fs')
// 定义需要写入的字符串
var data = 'hello nodejs'
// 使用writeFile API，传入写入路径，需要写入的内容，接收回掉返回错误信息
fs.writeFile('./data/hello.text',data,function(err) {
    // 如果错误抛出错误，组止下面代码执行，
    // 这里使用 throw 抛出错误，原因是可能写入错误的原因可能有很多种
    // 可能是文件只读权限，可能是写入失败，throw 可以确定文件写入失败的原因
    if(err) {
        throw err
    }
    // 如果成功执行下面代码
    console.log('write succeed!')
})
```

##### 使用 node 读取文件

我们读取一下刚才我们写好的文件

```
// 引入 node 的文件操作fs核心模块
var fs = require('fs')
// 使用readFile API，传入读取路径，指定格式，接收回调
// 第一个参数一定是 err ，第二个参数是读取的文件内容
fs.readFile('./data/hello.text', 'utf8',function(err, data){
    // 如果有错误，抛出错误，阻止下面代码的执行，也可以使用return
    if(err) {
        throw err
    }
    console.log(data)
})
```
如果不加第二个 utf8 这个参数，那么默认是加载16进制的 Buffer 对象。我们如果想要输入字符串，需要手动对返回的data进行转换，toString()的默认参数就是 utf8。

```
// 引入 node 的文件操作fs核心模块
var fs = require('fs')
// 使用readFile API, 传入读取路径，指定格式，接收回调
// 第一个参数一定是err，第二个参数是读取的文件内容
fs.readFile('./data/hello.text',function(err,data){
    // 如果有错误，抛出错误，阻止下面代码的执行，也可以使用return
    if(err) {
        throw err
    }
    console.log(data)
    console.log(data.toString())
    console.log(data.toString('utf8'))
})
```

