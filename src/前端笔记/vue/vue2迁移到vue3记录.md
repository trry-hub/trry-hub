# vue2 迁移到 vue3 指南

### 将 vue2 项目支持到 pnpm 和 node 16

#### node 版本控制
1. 在 node 16 使用 pnpm 安装项目依赖

### 将 webpack 迁移到 vite

#### 版本控制

1. 新建 migrate-to-vite 分支，基于此分支进行迁移

#### 安装 Vite

在项目根目录中安装 Vite 及相关插件。

```shell
npm install vite @vitejs/plugin-vue --save-dev
```

迁移过程记录需要更新的依赖，记录影响到的代码，以便后续回归测试。

#### 配置文件

创建 [Vite](https://cn.vitejs.dev/) 的配置文件 vite.config.js。你需要将原有 Webpack 配置中的相关部分转换为 Vite 配置，这可能包括别名（alias）、代理（proxy）等。

#### 更新 index.html

将原有的 Webpack 入口文件 index.html 中的内容移到项目根目录下的 index.html，并确保其结构适配 Vite。

#### 修改源码引用

检查并修改源码中的资源引用，确保路径正确。由于 Vite 要求使用 ES 模块导入语法，你可能需要将 CommonJS 模块导入语法（如 require）更改为 import。

#### 更新脚本命令

在 package.json 里更新 scripts 部分，替换原有的 Webpack 构建和开发命令为 Vite 命令。

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "serve": "vite preview"
}
```

#### 测试

运行 Vite 的开发服务器，检查应用是否正常工作。

```shell
npm run dev
```

#### 逐步移除Webpack
如果一切正常，你可以开始逐步移除Webpack相关的配置、插件和依赖。

#### 回归测试

在迁移完成后，进行全面的回归测试以确保应用的每个部分都能正常工作。


#### 注意事项：
某些基于Webpack特有功能的代码可能需要重写。
可能需要查找并使用Vite对应的插件来替换Webpack插件。
环境变量前缀将从VUE_APP_更改为VITE_。
务必在更改后进行充分测试。
vite 不支持省略 .vue 文件扩展名，因此需要在引用时添加扩展名。
