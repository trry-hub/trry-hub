# xcode 中调试低版本ios

Xcode 15 作为苹果最新的开发工具，主要面向最新的 iOS 版本进行开发。但是，有时候我们可能需要为旧版本的 iOS 设备进行开发和调试。下面，我将为你详细讲解如何在 Xcode 15 中设置最低支持 iOS 12 并进行一步步的调试。

**一、设置最低支持 iOS 版本为 12**

1. 打开 Xcode 15，并创建一个新的项目或者打开一个已存在的项目。

2. 在项目导航器中，选择你的项目文件（通常是一个 .xcodeproj 文件），然后右键点击它，选择“显示包内容”（Show Package Contents）。

3. 进入 project.pbxproj 文件，这是一个文本文件，记录了项目的配置信息。

4. 在 project.pbxproj 文件中搜索 IPHONEOS_DEPLOYMENT_TARGET，这个字段定义了项目的最低支持 iOS 版本。

5. 将 IPHONEOS_DEPLOYMENT_TARGET 的值设置为 12.0，保存并关闭文件。

6. 回到 Xcode，你会发现 Xcode 已经自动将最低支持 iOS 版本设置为了 12。
