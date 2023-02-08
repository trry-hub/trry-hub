### 为什么要自动生成基础模板

> 1.在开发过程中，无论我们添加页面也好还是添加组件也好。都需要不停的新建 Vue 文件（或者其他框架或者 html/js/css 文件）

以 Vue 项目为例，我们新建一个 component 或 view 的时候，需要新建一个.vue 文件，然后写`<template>`、`<script>`、`<style>`。最后写我们的业务代码。如果使用 class 风格来写 Vue 还需要再每个页面都引入 Vue 和 Component。

一般来说一个.vue 文件的格式如下:

```vue
<template>
    <div />
</template>

<script>
export default {
    data(){
        return {
            name:'123'
        }
    }
}
</script>

<style lang="scss" scoped>

<style>
```

这样我们每次再页面开发之前都需要进行如下操作:

1. 新建 component/view 的对应的.vue 文件/文件夹

2. 然后打开页面写 template,script,style

3. 如果是 css 单独写的还要新建一个.css(less/scss 等)。

假设每次我们完成上边这一系列操作需要 30 秒，我们一个项目有 50 个 vue 文件。就需要 1500 秒，约等于 25 分钟。如果我们做 5 个 vue 项目，我们相当于浪费了两个小时再写这种重复性高、无聊且枯燥的代码。

作为一个 程序猿 有追求的程序猿，怎么能忍受在这种地方浪费大好的青春。

### 基于 vscode 的 Snippets

通过 vscode 的 snippets 我们可以自己配置自定义的 snippets，从而实现快捷生成代码片段：

- 在 Vscode 里按 F1，输入 snippets -> 选择配置用户代码片段

选择后出现选择配置的界面，这里我们对 Vue 文件的代码片段进行配置，所以选择 Vue.json

在打开的 Vue.json 里会有一段简单的说明和一个例子告诉我们如何编写代码片段，我们在 vue.json 中编写如下片段：

```json
// vue.json
{
    "生成组件结构"：{
    "prefix":"tscomponent",
    "body":[
       "<template>"
        "<div class></div>"
        "</template>"
        "<script lang='ts'>"
        "import { Component, Vue } from 'vue-property-decorator';"
        "@Component({"
        "name: ''"
        "})"
        "export default class extends Vue {}"
        "</script>"
        "<style lang='less'>"
        "</style>"
        ]
    }
}
```

然后打开一个 vue 文件，输入 tscomponents，会出现代码提示：

确定以后会生成我们配置的代码片段：

> 上边生成的代码是经过格式化的，因为我们在 JSON 中配置的代码片段并没有调整缩进，想要生成的时候就缩进只需要在需要缩进的行的开始引号后加对应的空格即可

因为这个方案还是需要手动创建 vue 文件和.less 文件、并且组件的 name 需要每次手动输入，这一点也不 geek

## 基于 plop 使用命令行自动生成.vue 文件

> plop 不仅限于 vue 项目，在此只是使用 vue 项目为例

plop 的介绍可以看[官网](https://plopjs.com/documentation/)，plop 功能主要是基于[inquirer]和[handlebars](https://github.com/handlebars-lang/handlebars.js)

简单的说就是通过提前配置要生成的页面模板，并且在命令行中接收指定的参数，从而生成我们需要的模板。

这里简单介绍一下我们实现的基础模板生成的流程，关于 plop 的 API 和其他相关内容不在赘述，感兴趣的朋友可以前往官网查阅。

#### 安装 plop

首先我们按照官网的说明在项目中安装 plop

```js
npm install --save-dev plop
```

#### 基本配置

由于 plop 的模板基于 handlebars，我们在茛目录下创建一个 piop-templates 文件夹，并在 piop-teemplates/view 里新建一个 index.hbs

```hbs
<template>
    <div />
<template>
<script>
    export default {
        name: "{{ properCase name }}",
        props: {},
        data() {
            return {};
        },
        created() {},
        mounted() {},
        methods: {},
    };
</script>
<style lang="scss" scoped></style>
```

然后编写 plopfile.js

```js
module.exports = function (piop) {
    plop.setGenerator("test", {
        description: "generate a test",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "view name please",
            },
        ],
        actions: (data) => {
            const name = "{{ name }}";
            const actions = [
                {
                    type: "add",
                    path: `src/views/${name}/index.vue`,
                    templateFile: "plop-templates/view/index.hbs",
                    data: {
                        name: name,
                    },
                },
            ];
            return actions;
        },
    });
};
```

然后在 package.json 中设置 script

```json
"script":{
    "new": "plop"
}
```

#### 设置 script 并运行

运行 npm run new 或 yarn new

#### 根据模板生成 vue 文件

然后输入 name 以后会看到

这个时候我们在项目的 views/test/index.vue 里就可以看到生成的 vue 文件

这样执行命令后就会根据我们输入的 name 生成对应的文件夹和页面，并且组件的 name 也已经有了值。

name 的值是通过 action 的时候返回给 hbs，后插入到页面中的，具体这部分内容可以参考 plop 和 handlebard 的官方文档。

当然，plop 的使用并不只生成静态的模板，我们可以自由发挥配置生成的文件需要显示的内容、文件生成位置、css 处理器类型、JS/TS。甚至同时生成 Router 文件。
