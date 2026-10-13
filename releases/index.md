---
title: Release · 导航版本
description: V3.5.722 导航兼容版下载、更新记录与安装说明
sidebar: false
lastUpdated: false
editLink: false
---

<script setup>
import { withBase } from 'vitepress'
import { data as release } from './navigation.data'
</script>

# Release

导航安装包、更新记录与使用说明。

## V3.5.722

**2026 年 10 月 13 日 · 当前保留版本 · 兼容测试版**

本次保留改为百度包名之前的版本，应用包名为 `com.autonavi.amapauto`。百度包名实验版已撤回，不在此页提供下载。

<div class="release-download">
  <a v-if="release.available" class="release-button" :href="withBase(release.downloadPath)" download>下载 APK · {{ release.sizeMiB }} MiB</a>
  <p v-else>安装包暂未部署，下载尚不可用。请联系维护者补充发布附件。</p>
  <a :href="withBase('/releases/navigation/20261013/SHA256SUMS.txt')" download>下载 SHA-256 校验文件</a>
</div>

| 项目 | 内容 |
| --- | --- |
| 文件 | {{ release.file }} |
| 应用包名 | `com.autonavi.amapauto` |
| 更新编号 | `20261013_6` |
| 安装方式 | 相同包名、相同签名的修改版可尝试覆盖安装 |
| 发布性质 | 非官方兼容修改版，需按车型和固件验证 |

## 更新内容

### 语音与播报

- 完善小迪目的地导航指令、目的地选择及回调处理。
- 系统 TTS 权限受限时回退到内置语音引擎。
- 修正语音包资源查找，保留地图单一桌面入口。

### 车辆车速与兼容

- 优先读取真实车辆车速，支持多来源及定位速度回退。
- 增加连接重试和过期数据清理；仅对定位回退的低速漂移做归零处理。
- 改善授权信息读取和私有目录存储兼容性，保留原有激活校验。

### 中控与仪表

- 接入当前道路名、道路限速数据；未知数据不编造，部分仪表模式尚未接入。
- 副屏使用主屏实际布局的独立实例，同步文字、图标和状态。
- 副屏分隔线改为全程进度／路况条；已有剩余距离、到达时间及主屏时间栏行为保持原样。
- 副屏背景使用 90% 不透明度，文字和箭头保持清晰。
- 按绘制和导航事件同步并限制刷新频率，不使用周期截图，不额外启动导航引擎。

## 安装与验证

1. 停车后下载并安装。覆盖安装会结束当前地图进程。
2. 首次启动按提示授予定位等必要权限，检查小迪打开地图、目的地导航及播报。
3. 如需车辆车速连接，可在地图语音包设置页进入“车辆车速连接设置”。受限车机可能需要开启网络 ADB 并由车主授权。
4. 核对仪表画面和导航信息；出现问题时保留完整提示、版本及对应时间的诊断日志。

::: warning 已知限制
本版未恢复车道级服务，也尚未确认解决所有飞屏延迟问题。真实车速、激活、小迪多轮对话和仪表兼容性均受车型与固件影响，免流状态未经确认。

原厂同名地图的系统记录、证书或版本可能阻止安装。百度包名版与本版是两个不同应用，不能互相覆盖。请勿为安装问题盲目清除地图数据。
:::

### 已完成的检查

当前副屏布局有 149 项隔离检查通过，覆盖独立布局实例、信息同步、进度显示和透明度；使用合成导航数据。已完成 APK 签名、对齐与文件校验。以上不等同于完整模拟器导航启动或所有车型实车验证，旧副屏控制器仍保留用于回退。

### 文件校验

下载后可比对 SHA-256：

```text
8f1a9e6b0793fd67eb4f1645dc131f4278e655f7a506510ec04cb3e8654b9653
```

### 反馈时提供

车型和车机系统版本、完整 APK 文件名、故障发生时间、具体表现，以及诊断日志。分享日志前请检查并遮挡个人信息。

<style scoped>
.release-download { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin: 24px 0; }
.release-download .release-button { display: inline-flex; align-items: center; min-height: 44px; padding: 10px 22px; border-radius: 8px; color: var(--vp-button-brand-text); background: var(--vp-button-brand-bg); text-decoration: none; font-weight: 600; }
.release-download .release-button:hover { background: var(--vp-button-brand-hover-bg); }
.release-button:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 4px; }
</style>
