# Git pull 合并策略配置

## 背景

新版 Git 在本地分支和远端分支已经分叉时，不会再默认替你选择 `pull` 策略。

常见场景：

```bash
git status
```

看到类似状态：

```txt
your-branch...origin/your-branch [ahead 1, behind 2]
```

这表示：

- 本地有 1 个提交远端没有。
- 远端有 2 个提交本地没有。

如果此时没有配置默认策略，执行 `git pull` 可能会被 Git 拒绝，并提示需要指定如何处理分叉分支。

VSCode 只是调用本机 Git，所以 Git 在策略选择阶段拒绝后，VSCode 不会进入冲突解决界面。只有 Git 真正开始 merge 或 rebase，并把冲突文件写入工作区后，VSCode 才会显示冲突解决 UI。

## 推荐配置

如果希望不论远端有没有更新，都先拉取远端内容到本地，并在本地合并；有冲突时再手动解决，可以使用 merge 作为默认 `pull` 策略。

```bash
git config --global pull.rebase false
git config --global merge.conflictStyle zdiff3
git config --global merge.autoStash true
```

含义：

- `pull.rebase false`：`git pull` 默认使用 merge，不使用 rebase。
- `merge.conflictStyle zdiff3`：冲突内容显示更完整，包含两边改动和共同基线。
- `merge.autoStash true`：pull/merge 前如果工作区有未提交改动，Git 尽量自动暂存并在结束后恢复。

查看当前配置：

```bash
git config --global --get-regexp '^(pull|merge)\.'
```

预期输出：

```txt
pull.rebase false
merge.conflictstyle zdiff3
merge.autostash true
```

## VSCode 同步配置

VSCode 的同步按钮也可能按自己的设置决定是否 rebase。为了让 VSCode 同步也按 merge 口径走，可以在用户设置中加入：

```json
{
  "git.rebaseWhenSync": false,
  "git.confirmSync": false,
  "git.autofetch": true
}
```

说明：

- `git.rebaseWhenSync: false`：VSCode 同步时不走 rebase。
- `git.confirmSync: false`：点击同步时不再弹确认框。
- `git.autofetch: true`：自动 fetch，VSCode 能及时看到远端是否有新提交。

## 日常使用流程

提交前：

```bash
git status
git add .
git commit -m "docs: 更新 Git pull 合并策略配置"
```

推送前如果远端有更新：

```bash
git pull
```

因为已经配置 `pull.rebase false`，这里会默认走 merge。

如果没有冲突，Git 会生成一次 merge 提交，之后再推送：

```bash
git push
```

如果有冲突：

1. 打开 VSCode Source Control。
2. 找到冲突文件。
3. 选择保留当前、更改传入或手动编辑。
4. 解决后执行：

```bash
git add <conflict-file>
git commit
git push
```

## 换电脑或重装后的注意事项

Git 全局配置写在本机的 `~/.gitconfig`，不会自动跟随仓库提交。

换新电脑后需要重新执行：

```bash
git config --global pull.rebase false
git config --global merge.conflictStyle zdiff3
git config --global merge.autoStash true
```

VSCode 用户设置是否保留，取决于是否开启 Settings Sync。

如果开启了 VSCode Settings Sync，并同步 Settings，新电脑登录同一个账号后通常会带上：

```json
"git.rebaseWhenSync": false
```

如果没有开启 Settings Sync，就需要在新电脑的 VSCode 用户设置里手动补上。

## merge 和 rebase 怎么选

### 选择 merge

适合希望保留真实协作历史的场景。

优点：

- 不改写本地提交历史。
- 有冲突时流程直观。
- 更符合 VSCode 默认冲突解决体验。

缺点：

- 可能产生额外 merge commit。
- 提交历史不如 rebase 线性。

### 选择 rebase

适合希望提交历史保持线性的场景。

```bash
git config --global pull.rebase true
```

优点：

- 历史更线性。
- PR 提交记录更清爽。

缺点：

- 会改写本地提交的位置。
- 冲突可能需要按提交逐个解决。
- 对不熟悉 Git 历史改写的人更容易困惑。

## 结论

如果目标是“远端有更新时先拉到本地，本地能合并就合并，有冲突就在 VSCode 里解决”，推荐使用：

```bash
git config --global pull.rebase false
git config --global merge.conflictStyle zdiff3
git config --global merge.autoStash true
```

再配合 VSCode：

```json
"git.rebaseWhenSync": false
```
