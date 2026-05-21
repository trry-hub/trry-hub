# 从 VS Code 迁移到 Cursor 指南

## 简介
Cursor 是一个基于 VS Code 的现代化代码编辑器，集成了强大的 AI 功能。本指南将帮助你顺利地从 VS Code 迁移到 Cursor，并充分利用其新特性。

## 为什么选择 Cursor？
- 内置强大的 AI 助手功能
- 与 VS Code 相似的界面和操作方式
- 支持 VS Code 的大部分插件
- 更智能的代码补全和重构建议
- 优化的性能和响应速度

## 迁移步骤

### 1. 下载和安装
1. 访问 [Cursor 官网](https://cursor.sh)
2. 下载适合你操作系统的版本
3. 按照安装向导完成安装

### 2. 设置迁移
- 快捷键设置与 VS Code 保持一致
- 可以导入 VS Code 的用户设置
- 主题和配色方案可以继续使用

### 3. 插件迁移
- Cursor 支持大多数 VS Code 插件
- 常用插件推荐：
  - GitLens
  - ESLint
  - Prettier
  - Live Share
  - Remote Development

### 4. 代码片段迁移
#### 方法一：直接复制
1. 在 VS Code 中打开代码片段文件
   - Windows/Linux: `%APPDATA%\Code\User\snippets`
   - macOS: `~/Library/Application Support/Code/User/snippets`
2. 复制所有 `.json` 文件
3. 在 Cursor 中粘贴到相同位置
   - Windows/Linux: `%APPDATA%\Cursor\User\snippets`
   - macOS: `~/Library/Application Support/Cursor/User/snippets`

#### 方法二：手动迁移
1. 在 Cursor 中打开命令面板（Ctrl/Cmd + Shift + P）
2. 输入 "Snippets: Configure User Snippets"
3. 选择要创建的语言
4. 将 VS Code 中的代码片段复制到新文件中

#### 方法三：使用设置同步
1. 在 VS Code 中启用设置同步
2. 在 Cursor 中登录相同的账号
3. 启用设置同步功能
4. 等待同步完成

#### 代码片段格式示例
```json
{
  "React Function Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "export const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = (props) => {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "};"
    ],
    "description": "React Function Component with TypeScript"
  }
}
```

#### 注意事项
- 确保代码片段格式正确
- 检查语言标识符是否匹配
- 验证变量占位符（$1, $2 等）
- 测试代码片段是否正常工作

### 5. AI 功能使用
Cursor 的主要特色是其内置的 AI 功能：
- 智能代码补全
- 代码解释和文档生成
- Bug 修复建议
- 代码重构辅助
- 自然语言交互

### 6. 常用快捷键
| 功能 | Windows/Linux | macOS |
|------|--------------|-------|
| 命令面板 | Ctrl + Shift + P | Cmd + Shift + P |
| AI 助手 | Ctrl + K | Cmd + K |
| 快速打开文件 | Ctrl + P | Cmd + P |
| 转到定义 | F12 | F12 |
| 查找引用 | Shift + F12 | Shift + F12 |

## 使用技巧

### 1. AI 助手最佳实践
- 使用清晰具体的提示语
- 善用上下文相关的代码生成
- 利用 AI 进行代码审查
- 请求代码优化建议

### 2. 工作流优化
- 使用工作区
- 配置 Git 集成
- 自定义代码片段
- 利用智能提示

## 常见问题解决

### 1. 性能优化
- 定期清理缓存
- 关闭不需要的插件
- 适当调整内存使用

### 2. 兼容性问题
- 检查插件版本
- 更新到最新版本
- 查看官方文档

## 结论
Cursor 作为 VS Code 的升级版本，不仅保留了 VS Code 的优秀特性，还加入了强大的 AI 功能。通过合理使用这些新特性，可以显著提升开发效率。

## 相关资源
- [Cursor 官方文档](https://cursor.sh/docs)
- [Cursor GitHub](https://github.com/getcursor/cursor)
- [VS Code 到 Cursor 迁移指南](https://cursor.sh/docs/migration)
