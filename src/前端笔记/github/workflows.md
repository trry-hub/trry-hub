# 深入浅出GitHub Actions：打造自动化工作流

在软件开发的世界中，自动化是提高效率和确定性的关键。GitHub Actions是一个强大的自动化工具，它允许开发者将代码仓库中的各种工作流程自动化，无论是构建和测试代码、部署软件，还是其他任何通过脚本或代码可以自动完成的任务。在这篇文章中，我们将了解GitHub Actions的基本概念，并逐步编写一个简单的工作流实例。

## GitHub Actions 基础

GitHub Actions是GitHub提供的CI/CD平台，允许你在仓库中定义自动化操作，这些操作可以在代码变动时（如push或pull request事件）或者通过计划任务被触发。

### 核心概念

- **Workflow（工作流）**：是自动化过程的描述，包含一个或多个jobs，定义在项目仓库的`.github/workflows`目录下的`yml`或`yaml`文件中。

- **Job（作业）**：是在同一个runner上执行的一组步骤，作业可以依赖于其他作业，它们可以顺序执行或并行执行。

- **Step（步骤）**：是作业中的一个任务，可以是执行命令的命令行脚本或者是使用一个Action。

- **Action（动作）**：是GitHub Actions最强大的特性之一，你可以把Action想象成是可以重复使用的小插件或脚本。

### 创建你的第一个Workflow

让我们从创建一个基本的持续集成（CI）工作流开始。这个工作流会在每次tag push到主分支时运行，执行构建和测试。

1. 在仓库的`.github/workflows`目录下创建一个新的`main.yml`文件。
2. 编写以下内容:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - run: npx changelogithub # or changelogithub@0.12 if ensure the stable result
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  upload-archive:
    needs: release
    runs-on: ubuntu-latest
    steps:
      - name: Extract Repo Name
        id: repo_name
        run: echo "REPO_NAME=$(echo $GITHUB_REPOSITORY | cut -d'/' -f2)" >> $GITHUB_ENV

      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get Release
        id: last_release
        uses: joutvhu/get-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          latest: true

      - name: Create Archive
        uses: thedoctor0/zip-release@main
        with:
          type: zip
          filename: ${{ env.REPO_NAME }}.${{ steps.last_release.outputs.tag_name }}.zip
          exclusions: '/.git/* /.github/*'

      - name: Upload Archive To Release
        uses: xresloader/upload-to-github-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          release_id: ${{ steps.last_release.outputs.id }}
          draft: false
          file: ${{ env.REPO_NAME }}.${{ steps.last_release.outputs.tag_name }}.zip
```

在上边 yml 文件中使用到的 `GITHUB_TOKEN` 需要在github中设置， 可参考[https://docs.github.com/zh/actions/using-workflows/sharing-workflows-secrets-and-runners-with-your-organization](https://docs.github.com/zh/actions/using-workflows/sharing-workflows-secrets-and-runners-with-your-organization)

我们来逐步解析这个工作流文件：
- `name`字段为我们的工作流提供了一个名字。
- `on`关键字定义了触发工作流的事件。
- `jobs`定义了工作流中的作业。
- `build-and-test`是我们定义的作业的ID。
- `runs-on`定义了作业运行的环境。
- `steps`定义了作业中的步骤，包括检出代码（`actions/checkout@v2`）、设置Node环境（`actions/setup-node@v2`）、安装依赖（`npm install`）和运行测试（`npm test`）。

当你将这个文件提交到`main`分支时，你应该能在GitHub仓库的`Actions`标签页看到工作流被触发并执行。

## 定制化Workflow

GitHub Actions的真正魅力在于你可以通过创建具有特定参数和功能的工作流来满足复杂的需求。以下是一些可能的定制化示例：

- 在不同操作系统上运行作业。
- 实现代码覆盖率报告。
- 自动化部署到云服务。
- 处理工作流发布的软件包。
- 监听并响应仓库中的GitHub Issues和Pull Requests。
- 等等。

## 总结和展望

GitHub Actions确立了一个全新的自动化水平，让开发者从机械重复的任务中解放出来。它是开源的，欢迎社区贡献，因此你可以找到适合几乎任何需求的Action。通过精心设计的工作流，你可以确保软件质量，优化开发流程，并最大程度地提高生产力。

随着你对GitHub Actions的理解加深，你将可以创建更复杂、更优化的工作流，这样你的代码就可以像钟表一样自动、准确无误地运行。快去创建你的第一个工作流，开启自动化的新纪元吧！
