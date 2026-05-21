# shadow DOM

> 在浏览器的DOM树中，我们常见的就是DOM tree了，如果了解了 vue、react 等框架的也会知道虚拟dom。
- 这些dom树的作用就是，渲染出真实DOM
- 今天来了解下shadow DOM

## shadow DOM 是什么

通俗点讲，他是真实dom的影子，浏览器在渲染时，如果遇到 shadow DOM 会先渲染，然后转为真实DOM

## shadow DOM 都有哪些

在DOM tree 中会有一些dom在页面中展示，但在Elements中看不到，这些都是shadow DOM

- 例如： video audio 

## 怎样查看这些 DOM 呢

shadow DOM 其实是可以出现在 Elements 中的只是 浏览器默认隐藏了

- 打开方法

:::tip
以 chrome 96.0.4664.55 为例
:::

<img-preview src="/前端笔记/chrome使用技巧/shadow DOM-01.png" />

1. F12 打开控制台
2. 选择右侧设置
3. 勾选 Show user agent shadow DOM
4. 重启控制台就可以看到了

<img-preview src="/前端笔记/chrome使用技巧/shadow DOM-02.gif" />

<img-preview src="/前端笔记/chrome使用技巧/shadow DOM-03.png" />

## shadow DOM 也是可以进行修改的

例如修改 video 标签的 controls

```css
    /* 全屏按钮 */
    video::-webkit-media-controls-fullscreen-button {
        display: block;
    }
    /* 播放按钮 */
    video::-webkit-media-controls-play-button {
        display: none;
    }
    /* 进度条 */
    video::-webkit-media-controls-timeline {
        display: none;
    }
    /* 观看的当前时间 */
    video::-webkit-media-controls-current-time-display {
        display: none;
    }
    /* 剩余时间 */
    video::-webkit-media-controls-time-remaining-display {
        display: none;
    }
    /* 音量按钮 */
    video::-webkit-media-controls-mute-button {
        display: none;
    }
    video::-webkit-media-controls-toggle-closed-captions-button {
        display: none;
    }
    /* 音量的控制条 */
    video::-webkit-media-controls-volume-slider {
        display: none;
    }
    /* 所有控件 */
    video::-webkit-media-controls-enclosure {
        display: none;
    }
```