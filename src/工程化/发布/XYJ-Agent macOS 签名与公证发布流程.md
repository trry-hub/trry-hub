# XYJ-Agent macOS 签名与公证发布流程

## 适用范围

本文记录 `XYJ-Agent` 通过 macOS Developer ID 直接分发 DMG 的发布流程，适用于外部分发 `xyj-agent-mac-*.dmg`。

当前已验证的发行快照：

- 证书：`Developer ID Application: Hangzhou Yunzhi Jianyuan Digital Technology Co., LTD (U2Y37G6MN9)`
- Team ID：`U2Y37G6MN9`
- notary keychain profile：`xyj-agent-notary`
- 产物：`dist/native-release/xyj-agent-mac-1.0.0.dmg`
- SHA256：`a1f998c180374996694dfb450dffebba3d1a1e5d1d22c59f94ac5af3b052bc4d`
- 公证提交 ID：`041908da-11c7-4285-8a93-79bdcc8e330c`
- 验证结果：`codesign --verify`、`spctl -a -vv -t open --context context:primary-signature`、`xcrun stapler validate`、项目验证脚本和测试均通过。

这个流程不是 Mac App Store、TestFlight、IAP 或 `.pkg` 安装包发布流程。直接分发 DMG 不要求先创建 App Store Connect 应用记录；它要求 `Developer ID Application` 证书、`notarytool` 公证和 `stapler` 装订。只有发布 `.pkg` 时才需要再评估 `Developer ID Installer`。

## 前置条件

发布机需要具备：

- macOS，已安装 Xcode Command Line Tools，可使用 `codesign`、`xcrun notarytool`、`xcrun stapler`、`spctl`、`hdiutil`。
- Apple Developer 账号已经切到正确组织团队：`Hangzhou Yunzhi Jianyuan Digital Technology Co., LTD`，Team ID 为 `U2Y37G6MN9`。
- Keychain 中安装了 `Developer ID Application` 证书，并且该证书带有匹配的 private key。
- Keychain 中已经保存 notary profile：`xyj-agent-notary`。
- `XYJ-Agent` 仓库依赖完整，可执行 `uv run python scripts/package_native.py` 和 `uv run python scripts/verify_native_release.py`。

检查签名身份：

```bash
security find-identity -v -p codesigning | grep "Developer ID Application"
```

预期能看到：

```txt
Developer ID Application: Hangzhou Yunzhi Jianyuan Digital Technology Co., LTD (U2Y37G6MN9)
```

## 证书申请流程

1. 在 macOS 本机生成 CSR。

   推荐使用 Keychain Access 或本机证书工具生成 CSR。CSR 对应的 private key 会留在本机 Keychain 中，后续下载的 `.cer` 必须和这个 private key 配对才可用于签名。

2. 登录 Apple Developer 后进入证书创建页。

   选择：

   - 证书类型：`Developer ID Application`
   - Sub-CA：`G2 Sub-CA (Xcode 11.4.1 or later)`
   - Team：`Hangzhou Yunzhi Jianyuan Digital Technology Co., LTD - U2Y37G6MN9`

3. 上传 CSR，下载 Apple 返回的 `.cer` 文件。

4. 双击 `.cer` 安装到 Keychain。

5. 用 `security find-identity` 确认签名身份可用。

如果 `Developer ID Application` 选项不可用，优先确认浏览器登录的是正确 Apple Developer 团队，并确认当前账号角色有权限创建组织级 Developer ID 证书。不要把 App Store Connect 中是否有应用记录当作 Developer ID 证书能否创建的判断依据。

## CSR 和 Private Key 注意事项

CSR 和 private key 是一组。常见错误是换机器下载了 `.cer`，但本机没有生成 CSR 时对应的 private key，导致 Keychain 里只有证书没有可用签名身份。

要求：

- private key 只保存在本机 Keychain 或受控密钥库中。
- 不要把 private key、`.p12`、Keychain 密码或导出密码提交到仓库。
- 如果必须迁移签名身份，只能通过受控密钥交接方式导出 `.p12`，密码单独传递，不写入文档、Issue、PR 或聊天记录。
- CSR 本身不是私钥，但仓库通常也不需要保存 CSR；重新申请证书时在发布机重新生成即可。

如果 `codesign` 找不到身份，通常不是打包脚本问题，而是证书和 private key 没有配对，或证书安装在了脚本不可访问的 Keychain 中。

## Notary Profile 配置

notary profile 必须保存在发布机 Keychain，名称固定使用：

```txt
xyj-agent-notary
```

首次配置时在本机执行：

```bash
xcrun notarytool store-credentials "xyj-agent-notary" \
  --apple-id "<APPLE_ID>" \
  --team-id "U2Y37G6MN9"
```

命令会提示输入 app-specific password。只在本机交互输入，不要把真实 app-specific password 写进 shell 脚本、环境变量、Markdown、Issue、PR 或仓库文件。

检查 profile 是否可用：

```bash
xcrun notarytool history --keychain-profile "xyj-agent-notary"
```

如果 profile 失效，重新执行 `store-credentials` 覆盖本机 Keychain 记录。不要在仓库里补充密码或 Keychain 解锁信息。

## 打包与公证命令

在 `XYJ-Agent` 仓库根目录执行：

```bash
MACOS_CODESIGN_IDENTITY="Developer ID Application: Hangzhou Yunzhi Jianyuan Digital Technology Co., LTD (U2Y37G6MN9)" \
MACOS_NOTARY_PROFILE="xyj-agent-notary" \
uv run python scripts/package_native.py --target mac --env prod --sign --notarize --clean
```

参数含义：

- `--target mac`：只打 macOS 包。
- `--env prod`：生产发行包，不使用 dev 标识。
- `--sign`：启用 Developer ID Application 签名。
- `--notarize`：上传 Apple 公证并等待结果。
- `--clean`：清理旧构建产物，避免误传历史 DMG。
- `MACOS_CODESIGN_IDENTITY`：指定本次使用的 Developer ID Application 身份。
- `MACOS_NOTARY_PROFILE`：指定本机 Keychain 中的 notary profile。

本次已验证产物：

```txt
dist/native-release/xyj-agent-mac-1.0.0.dmg
```

## 验证命令

先校验 SHA256：

```bash
shasum -a 256 dist/native-release/xyj-agent-mac-1.0.0.dmg
```

预期：

```txt
a1f998c180374996694dfb450dffebba3d1a1e5d1d22c59f94ac5af3b052bc4d  dist/native-release/xyj-agent-mac-1.0.0.dmg
```

检查公证提交详情：

```bash
xcrun notarytool info "041908da-11c7-4285-8a93-79bdcc8e330c" \
  --keychain-profile "xyj-agent-notary"
```

检查 DMG Gatekeeper 签名状态：

```bash
spctl -a -vv -t open --context context:primary-signature dist/native-release/xyj-agent-mac-1.0.0.dmg
```

检查 DMG 是否已经 staple：

```bash
xcrun stapler validate dist/native-release/xyj-agent-mac-1.0.0.dmg
```

执行项目验证脚本：

```bash
uv run python scripts/verify_native_release.py \
  --output dist/native-release \
  --expected mac \
  --require-signature \
  --mount-dmg
```

执行测试：

```bash
uv run pytest
```

本次发行验证结果为 `49 passed`。如果后续测试数量变化，以当前仓库实际测试结果为准，但发布前必须保留完整通过记录。

## Release Center 上传前检查

上传到 Release Center 前，逐项确认：

- 文件路径是生产 DMG：`dist/native-release/xyj-agent-mac-1.0.0.dmg`。
- SHA256 等于：`a1f998c180374996694dfb450dffebba3d1a1e5d1d22c59f94ac5af3b052bc4d`。
- `spctl`、`stapler validate` 和 `verify_native_release.py --require-signature --mount-dmg` 都通过。
- Release Center 平台选择 `mac`，包类型选择 `dmg`，版本号和渠道与本次发布计划一致。
- 上传字段中的 `sha256`、产物 URL、版本号、发布说明和强制更新策略已经复核。
- 不上传 `*-dev.dmg`、未签名 DMG、未公证 DMG 或未 staple 的 DMG。
- 上传后从公开下载入口重新下载一次，复核下载文件 SHA256 与 Release Center 记录一致。

Release Center 的可访问性、OSS/CDN 地址、版本启用状态和 macOS 签名公证是不同检查面。不要用“页面能下载”替代签名公证验证，也不要用“签名公证通过”替代线上下载验证。

## 常见问题

### 直接分发 DMG 是否需要 App Store Connect 应用记录

不需要。直接分发 DMG 走 Developer ID 签名、公证和 staple。只有目标改成 Mac App Store、TestFlight、App Store Review 或 IAP 时，才进入 App Store Connect 应用记录流程。

### 需要 Developer ID Installer 吗

当前 DMG 分发不需要。`Developer ID Installer` 主要用于 `.pkg` 安装包签名。如果未来改发 `.pkg`，再补充对应证书和验证流程。

### `notarytool` 认证失败怎么办

先确认：

- `xyj-agent-notary` profile 是否存在于本机 Keychain。
- Apple ID、Team ID 是否匹配 `U2Y37G6MN9`。
- app-specific password 是否仍有效。
- 当前机器 Keychain 是否可访问该 profile。

如果无法确认，重新执行 `xcrun notarytool store-credentials "xyj-agent-notary" --apple-id "<APPLE_ID>" --team-id "U2Y37G6MN9"`，在本机交互输入新的 app-specific password。

### `codesign` 找不到 Developer ID 身份怎么办

用下面命令确认身份：

```bash
security find-identity -v -p codesigning | grep "U2Y37G6MN9"
```

如果只看到证书但没有可用 identity，通常是 private key 不在本机 Keychain。需要回到生成 CSR 的机器安装证书，或按受控流程迁移带 private key 的签名身份。

### `stapler validate` 失败怎么办

先确认 `notarytool` 提交已经 `Accepted`。如果公证已通过但 DMG 没有 staple，重新执行打包脚本的公证流程，或对同一 DMG 执行 staple 后再 validate。不要上传未 staple 的 DMG。

### Gatekeeper 仍提示无法验证怎么办

先确认下载的不是 dev 包或历史包，再检查 SHA256 是否是本次发布值。历史 dev DMG 没有完整 Developer ID 签名、公证和 staple 时，Gatekeeper 提示是预期现象，不能把它当成 UI 或下载页问题。

## 不能做的事

- 不能把真实 app-specific password 写入文档、脚本、环境变量模板、Issue、PR 或仓库。
- 不能提交 private key、`.p12`、Keychain 密码、导出密码或任何可还原签名身份的材料。
- 不能用 App Store Connect 应用记录替代 Developer ID Application 证书。
- 不能把 `Developer ID Installer` 当作当前 DMG 内 `.app` 签名身份。
- 不能上传未签名、未公证、未 staple 或 `--env dev` 产出的 DMG。
- 不能只看 Release Center 上传成功就宣布 macOS 分发安全，必须保留本机签名、公证、staple、挂载和下载校验结果。
- 不能在没有重新验证的情况下替换 Team ID、证书身份、notary profile 名称或产物 SHA256。
