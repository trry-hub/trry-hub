# mac 删除自带 ABC 输入法

> 在使用 `mac` 时相信很多都习惯使用第三方输入法，而 `mac` 规定必须保留一个自带的 `ABC`输入法，这样导致平时在打字的时候，老是莫名其妙的自己切换成了自带的 `ABC` 输入法，还要老是切换回第三方输入法（快捷键是 `control + 空格`），这个问题困扰我好久了，终于被我找到了删除自带的 `ABC` 输入法的方法，这里分享一下。

- 首先需要关闭 `mac` 系统的 `SIP` ，不然删不掉，不会关的可以查看我的另一篇文章：[mac 关闭系统完整性保护 SIP（System Integrity Protection）的方法](https://www.jianshu.com/p/d7d73b2846d1) 。
- 关闭 `SIP` 重启完成后，先将输入法切换为系统自带的 `ABC 输入法`，然后打开终端输入以下命令:



```jsx
sudo open ~/Library/Preferences/com.apple.HIToolbox.plist
```

接着输入密码即可打开`com.apple.HIToolbox.plist` 文件。（打开 .plist 文件需要安装有 Xcode 或者 PlistEdit Pro 也行）

![img](https://upload-images.jianshu.io/upload_images/293993-982bb396764dea58.png?imageMogr2/auto-orient/strip|imageView2/2/w/804/format/webp)

com.apple.HIToolbox.plist



- 依次点开 `Root - AppleEnabledInputSources` ，会看到一列 `item` ，找到其中 `KeyboardLayout Name` 为 `ABC` 的那一列，将整列 `item` 删掉，然后 `command + S` 保存。
- 删除`AppleCurrentKeyboardLayoutInputSourceID` (此时，这个`key`的值应该为`com.apple.keylayout.ABC`)
- 接着重启电脑，打开键盘设置，就可以看到系统自带的 ABC 输入法已经被删掉了。
- 如果又想用回自带输入法，只要在 偏好设置 - 键盘 - 输入法 里，按 + 号，把自带的输入法重新添加就可以了。
