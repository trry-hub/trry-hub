# 发布文件管理

当前 Release 页面：`/releases/`，网站使用 `/trry-hub/` base，下载链接由 withBase 生成。

- `navigation.json`：当前版本文件名、大小、SHA-256、包名。
- `index.md`：对外更新说明与下载页面。
- `navigation.data.ts`：构建时读取元数据并检查附件是否存在；缺附件时显示“暂未部署”，不提供失效下载按钮。
- `../public/releases/navigation/20261013/`：当前 APK 和校验文件。

APK 约 591 MiB，已复制到项目本机目录，并由 `.gitignore` 排除；说明、元数据和校验文件可以提交。原项目 GitHub Pages 流水线仅检出 Git 文件，**只 push 源码不会上传 APK**。

本机发布：确认附件存在后执行 `pnpm build`，VitePress 会把 public 内的附件复制到 `.vitepress/dist/releases/`。部署时需连同整个产物目录上传。若使用 CI，应先通过存储服务把同一 APK 下载到上述 public 目录，核对 SHA-256，再构建；目前未配置外部附件服务或修改部署流程。

新增版本时：把 APK 放到新的日期目录，生成 SHA256SUMS.txt，更新 navigation.json 和 index.md，运行 `pnpm build` 并验证附件哈希。

本次没有推送、创建 GitHub Release 或部署公网网站。
