# 手动安装 Node.js 的步骤

由于最近通过自动化工具安装 Node.js 可能遇到问题，我们可以采用手动安装的方式。以下是具体步骤：

## 1. 下载 Node.js

请访问以下链接下载所需版本的 Node.js 压缩包：[Node.js 下载页面](https://registry.npmmirror.com/binary.html?path=node)

## 2. 复制解压后的 Node 文件夹

### 使用 `n` 进行管理

将解压后的 Node 文件夹复制到 `/usr/local/n/versions/node` 目录中。

### 使用 `nvm` 进行管理

将解压后的 Node 文件夹复制到 `~/.nvm/versions/node` 目录中。

## 3. 确保文件夹名称与之前的 Node.js 版本一致

确保复制的文件夹名称与之前的 Node.js 版本一致，以便工具能够正确识别和管理。
