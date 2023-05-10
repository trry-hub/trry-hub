## plop js 模板工具

- 概述

[plop](https://github.com/SawyerSven/sea-admin/blob/master/plopfile.js) 模板配置生成 cli

- 安装

```js
// 全局安装
npm install -g plop

// 本地安装
npm install --save-dev plop
```

- 配置文件

```js
// 跟目录创建文件 plopfile.js  plop 将该文件作为执行入口

// 导出执行函数
module.exports = function (plop) {
    plop.getGenerator("模板名称", {
        description: "操作描述",
        prompts: [], // 交互提示
        actions: [], // 执行操作
    });
};
```

- 基础使用

- 注册

```js
// plopfile.js
module.exports = function (plop) {
    plop.getGenerator("vue基础模板", {
        description: "创建vue文件",
        prompts: [
            {
                type: "input", // 交互类型
                name: "name", //参数名称
                message: "请输入文件名称", // 交互提示
            },
            {
                type: "input",
                name: "path",
                message: "请输入文件创建目录",
            },
        ],
        actions: [
            {
                type: "add", // 动作类型
                path: "{{path}}/{{name}}.vue", // '{{  }}' 双大括号内设置动态参数
                templateFile: "plop-templates/views/vue.hbs", // 模板文件地址, 使用hbs文件
            },
        ],
    });
};
```

plop-templates/views/vue.hbs

```vue
<template>
    <div class="{{ kebabCase name }}"></div>
</template>
<script>
export default {
    name: "{{ properCase name}}",
};
</script>
<style>
.{{ kebabCase name }} {
      // {{ kebabCase name }}
  }
</style>
```

- 执行命令:
    `plop` ... 请输入文件名称 tmp 请输入文件名称 templage/cmp
- 执行结果:

```vue
<template>
    <div class="cmp-tmp"></div>
</template>
<script>
export default {
    name: "Tmp",
};
</script>
<style></style>
```

plop 命令参数

```js
// 执行指定配置
plop 配置名称

// 执行指定配置并设置参数
plop 配置名称 输入参数

// 执行plopfile文件
--plopfile 文件路径

// 设置工作路径
--cwd

// 帮住
-h, --help

// 全局初始化
-i, --init

// 显示版本
-v, --version
```

generator 生成器 API

> 生成器，用来生成执行文件模板或向文件中加入模板信息

- description 描述生成器行为
- prompts 提示配置 [详情](https://github.com/SBoudrias/Inquirer.js#inquirerregisterpromptname-prompt)

| 参数    |         解释         |                          参考值 |
| ------- | :------------------: | ------------------------------: |
| type    |       交互类型       | `input` `number` `checkbox` ... |
| name    | 参数使用存储的属性名 |                                 |
| message |       提示信息       |                                 |
| default |      参数默认值      |                                 |
| ...     |         ...          |                             ... |

- actions 提示配置 [详情](https://plopjs.com/documentation/#interface-actionconfig)

| 参数        |                     解释                     |                             参考值 |
| ----------- | :------------------------------------------: | ---------------------------------: |
| type        |                   交互类型                   | `add` `modify` `addMany` `etc` ... |
| force       |                                              |                                    |
| data        |               返回给模板的数据               |                                    |
| abortOnFail | 当有 action 执行失败时， 是否终止其他 action |                                    |
| ...         |                     ...                      |                                ... |

默认 action API

- addA 创建文件

| 参数     |                  解释                  |                 参考值 |
| -------- | :------------------------------------: | ---------------------: |
| path     |              文件生成目录              |                        |
| template | 模板字符串, 使用字符串模板生成文件内容 | `<h1>{{ title }} <h1>` |

- templateFile 模板文件地址，使用模板文件生成文件
- skipifExists 如果文件已存在，将跳过
- force
- data 模板参数
- abortOnFail 当有 action 执行失败时，是否终止其他 action
- addMany 创建多个文件

| 参数        |      解释      | 参考值 |
| ----------- | :------------: | -----: |
| destination |                |        |
| base        | 替换的基础目录 |        |

例：

```json
{
   destination：'target',
   base: 'root/sub',
   templateFiles: 'root/sub/*.hbs'
}
// 生成的文件目录： target/file.hbs
```

- templateFiles 模板文件匹配规则 [参考]

```js
{
    templateFiles: "plop-templates/view/*.hbs";
}
```

- globOptions 更改匹配方式
- stripEctensions
- verbose 是否打印所有文件目录
- skiplfExists
- force
- data
- abortOnFail
- modify 修改

| 参数         |   解释   | 参考值 |
| ------------ | :------: | -----: |
| path         |          |        |
| pattern      | 替换规则 |   正则 |
| template     |          |        |
| templateFile |          |        |
| data         |          |        |
| abortOnFail  |          |        |

- append 添加

| 参数         |   解释   | 参考值 |
| ------------ | :------: | -----: |
| path         |          |        |
| pattern      | 插入规则 |   正则 |
| unique       |          |        |
| separator    |          |        |
| template     |          |        |
| templateFile |          |        |
| data         |          |        |
| abortOnFail  |          |        |

模块分组

> 我们可以将多个配置分配到多个文件中单独管理

```js
// module/view/prompt.js 页面模板
const config1 = {
   description: 'view template',
   prompts: [
       {
           type: 'input',
           name: 'name',
           message: 'file name',
       }
   ],
   actions: data => {
       const name = '{{ name }}',
       return [
           {
               type: 'add',
               path: `template/${ name }.vue`,
               templateFile: 'plop-templates/view/index.hbs',
           }
       ]
   }
}

module.exports = function (plop) {
   plop.setGeneerator('view', config1)
}
```

```js
// module/components/prompt.js 组件模板
const config2 = {
    description: "cmp template",
    prompts: [
        {
            type: "input",
            name: "name",
            message: "file name",
        },
    ],
    actions: (data) => {
        const name = "{{ name }}";
        return [
            {
                type: "add",
                path: `template/${name}.vue`,
                templateFile: "plop-templates/cmp/index.hbs",
            },
        ];
    },
};

module.exports = function (plop) {
    plop.setGenerator("view", config2);
};
```

# 最优的解决方案,以下可以完全实现自动创建模板功能

1.安装插件

```js
npm install --save-dev plop
```

```js
// plopfile.js 中的配置
module.exports = function (plop) {
    // 普通vue模板页面
    plop.setGenerator("page", require("./plop-templates/page/prompt"));
    // 组件模板
    plop.setGenerator(
        "component",
        require("./plop-templates/component/prompt")
    );
    // store 模板
    plop.setGenerator("store", require("./plop-templates/store/prompt"));
    // 本项目特定的页面内结构模板
    plop.setGenerator(
        "page-module",
        require("./plop-templates/page-module/prompt")
    );
};
```

#### 目录结构

- plop-templates
- component
  - index.hbs
  - js.hbs
  - prompt.js
- page
  - index.hbs
  - prompt.js
- page-module
  - index.hbs
  - list.hbs
  - prompt.js
- store
  - index.hbs
  - prompt.js

##### page---prompt.js 代码如下

```js
module.exports = {
    description: "创建页面",
    prompts: [
        {
            type: "list",
            name: "type",
            message: "请选择页面类型",
            choices: ["view", "layout"],
            default: "view",
        },
        {
            type: "input",
            name: "viewPath",
            message: "请输入页面存放路径(./views/???)",
            when: (answers) => {
                return answers.type == "view";
            },
        },
        {
            type: "input",
            name: "name",
            message: "请输入页面名称",
            default: "index",
            validate: (v) => {
                if (!v || v.trim === "") {
                    return "页面名称不能为空";
                } else {
                    return true;
                }
            },
        },
    ],
    actions: (data) => {
        const path = data.type == "view" ? `views/${data.viewPath}` : "layout";
        const actions = [
            {
                type: "add",
                path: `src/${path}/${data.name}.vue`,
                templateFile: "plop-templates/page/index.hbs",
                data: {
                    name: data.name,
                    isLayout: data.type == "layout",
                },
            },
        ];
        return actions;
    },
};
```

##### page--index.hbs 代码如下

```hbs
<template>
    <div class="{{kebabCase componentName}}">
        <!-- {{kebabCase componentName}} 组件-->
    </div>
</template>

<script>
    export default { name: '{{properCase componentName}}', props: { }, data() {
    return { } }, mounted() { }, methods: { }, }
</script>

<style scoped lang="scss">
    .{{kebabCase componentName}}
    { //
    {{kebabCase componentName}}
    组件 }
</style>
```

> 其他模板可以自己根据实际情况去配置
