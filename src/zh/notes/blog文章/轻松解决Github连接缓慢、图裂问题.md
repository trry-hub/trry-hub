# [轻松解决Github连接缓慢、图裂问题](https://www.cnblogs.com/feffery/p/13067339.html)

# 1 简介[#](https://www.cnblogs.com/feffery/p/13067339.html#2070470992)

　　gayhub（误）`github`作为全世界最大的开源代码库以及版本控制系统，是用来托管项目以及学习开源技术非常好的平台，是我心中最好的学习网站，我们公众号（**Python大数据分析**）的众多技术文章对应的数据和代码也都一直托管在`github`上。

　　但熟悉`github`的朋友应该都被其越来越慢的连接速度，以及“全员图裂”所困扰：

[![img](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111714863-1566077869.png)](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111714863-1566077869.png)

图1

　　本文就将参考`github`仓库（https://github.com/521xueweihan/GitHub520 ），教大家如何在不kexue上网的前提下，简单几步解决`github`访问缓慢已经各种图裂的问题。

# 2 通过修改本地hosts文件加速github[#](https://www.cnblogs.com/feffery/p/13067339.html#469244965)

## 2.1 手动修改更新[#](https://www.cnblogs.com/feffery/p/13067339.html#3130120688)

　　首先我们需要找到自己设备上的`hosts`文件，不同的平台其存放路径各不相同，主要的平台`hosts`文件所在路径如下：

- Windows ：`C:\Windows\System32\drivers\etc\hosts`
- Linux：`/etc/hosts`
- Mac：`/etc/hosts`

　　以`Windows`为例，按照上面的说明，进入`C:\Windows\System32\drivers\etc`目录，找到`hosts`文件：

[![img](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111719140-1423899516.png)](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111719140-1423899516.png)

图2

　　这是一个无拓展名的文件，我们可以使用记事本、notepad++等文本编辑器来打开它，将下面的内容（这部分内容在写作本文的时候是有效的，如果你在尝试时它们已经失效了，可以前往上文提到的`github`仓库复制最新的，或者参考下文中的第2种方法）复制，并**粘贴**到`hosts`文件的最后：

```
Copy# GitHub520 Host Start
185.199.108.154                                   github.githubassets.com
199.232.68.133                                    camo.githubusercontent.com
199.232.68.133                                    github.map.fastly.net
199.232.69.194                                    github.global.ssl.fastly.net
140.82.112.3                                      github.com
140.82.113.5                                      api.github.com
199.232.68.133                                    raw.githubusercontent.com
199.232.68.133                                    user-images.githubusercontent.com
199.232.68.133                                    favicons.githubusercontent.com
199.232.68.133                                    avatars5.githubusercontent.com
199.232.68.133                                    avatars4.githubusercontent.com
199.232.68.133                                    avatars3.githubusercontent.com
199.232.68.133                                    avatars2.githubusercontent.com
199.232.68.133                                    avatars1.githubusercontent.com
199.232.68.133                                    avatars0.githubusercontent.com
# GitHub520 Host End
```

[![img](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111722003-1310986842.png)](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111722003-1310986842.png)

图3

　　如果保存时需要管理员权限，按照提示以管理员方式重新打开再保存即可，正常情况下在保存退出后会立即生效，如果依然加载不出图，可以根据自己系统的不同来执行对应的命令刷新`DNS`重启机器即可：

- Windows：`ipconfig /flushdns`
- Linux：`sudo rcnscd restart`
- Mac：`sudo killall -HUP mDNSResponder`

　　接下来我们来看看这种方法的效果如何，在遵循上述流程修改好`hosts`文件之后，重新打开图1对应的`README`页面：

[![img](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111725511-1977660683.png)](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111725511-1977660683.png)

图4

　　O(∩_∩)O哈哈~，这时我们成功地加载出了原本裂掉的图，但这种方式麻烦的地方在于当你配置好`hosts`之后的确是可以正常访问`github`的，但一旦你某天访问`github`发现老毛病又出现了，就得重复一遍上述的过程，接下来我们来学习另一种能将上述过程自动化的方法。

## 2.2 利用SwitchHosts软件自动更新hosts信息[#](https://www.cnblogs.com/feffery/p/13067339.html#2409091832)

　　`SwitchHosts`是一个用于快速切换`hosts`文件的开源软件（https://github.com/oldj/SwitchHosts ），我们可以通过其官方提供的百度云盘地址（https://pan.baidu.com/s/1inED1 ）下载适合自己系统的版本。

　　下载后直接正常安装，接着以**管理员身份**打开，点击左下角`+`新建`hosts`，再按照图5配置好，设置自动刷新时间间隔为你觉得合适的，我选的1小时刷新一次，这样每隔一小时`SwitchHosts`就会自动访问URL并更新`hosts`信息：

[![img](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111728585-1852343450.png)](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111728585-1852343450.png)

图5

　　点击刷新按钮刷新成功后，点击OK创建完成。其中URL信息是码云同步可正常访问版本（https://gitee.com/xueweihan/codes/6g793pm2k1hacwfbyesl464/raw?blob_name=GitHub520.yml ），因为原始仓库中的URL为`github`源会连接失败。

　　创建完成后，把开关打开，让`SwitchHosts`在后台静静的运行即可：

[![img](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111731241-1827589612.png)](https://img2020.cnblogs.com/blog/1344061/202006/1344061-20200608111731241-1827589612.png)

图6

　　完成后，保持软件后台运行即可，之后访问`Github`同样解决了问题。

　　以上就是本文的全部内容，如有疑问欢迎在评论区与我讨论。