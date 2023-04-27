## 配置 code 命令

环境 `macos`

- 一、 打开 vscode 
- 二、 组合键 ctrl (command) + shift + p 
- 三、 输入 code 找到
 <img-preview src="/前端笔记/vscode/code.png" />


## code 错误

如果使用中 报如下错误

`EACCES: permission denied, unlink '/usr/local/bin/code'`


<img-preview src="/前端笔记/vscode/image.png" />

执行 `sudo rm /usr/local/bin/code` 后，重新配置 code 命令即可
