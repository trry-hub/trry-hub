### 手把手实现图片懒加载+封装vue懒加载组件

#### 1.为什么要懒加载或者预加载

---------------------------------------------------

图片对页面加载速度影响非常大

当页面内图片比较多，加载速度慢、非常影响用户体验

思考一下，页面有可能有几百张图片，但是首屏上需要展示的可能就一张而已，其他的那些图片能不能晚一点再加载，比如用户往下滚动的时候...

这是为什么用懒加载的原因

那预加载呢？这个非常语义化，预备，提前....就是让用户感觉到你加载图片非常快，甚至用户没有感受到你再加载图片

#### 2.懒加载原理

---------------------------------------------------

图片先用占位符表示，不要将图片地址放到`src`属性中，而是放到其它属性(`dataoriginal`)中 页面加载完成后，监听窗口滚动，当页面出现在视图中时再给它赋予真实的图片地址，也就是将`data-original`中的属性拿出来放到src属性中 在滚动页面的过程中，通过给`srcoll`事件绑定`lazyload`函数，不断地加载出需要的图片

注意：请对`lazyload`函数使用防抖与节流，不懂这俩的可以去自己查

#### 3. 懒加载使用方式

--------------------------------------------

##### 1) 纯粹的延迟加载，使用setTimeOut或setInterval

这种方式，本质上不算懒加载 加载完首屏内容后，隔一段时间，去加载全部内容 但这个时间差已经完成了用户对首屏加载速度的期待

##### 2）条件加载

用户点击或者执行其他操作再加载 其实也包括的滚动可视区域，但大部分情况下，大家说的懒加载都是值可视区域的图片懒加载，所以就拿出来说了

##### 3）可视区加载

这里也分为两种情况：

1. 页面滚动的时候计算图片的位置与滚动的位置
2. 通过新的API： `IntersectionObserver API` (可以自动"观察"元素时否可见)[intersectionObserver API - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

#### 4.懒加载代码实现

----------------------------------------

##### 1.核心原理

将非首屏的图片的src属性设置一个默认值，监听事件`scroll`、`resize`、`orientationchange`，判断元素进入视口viewport时则把真实地址赋予到`src`上

##### 2.img标签自定义属性相关

```html
<img class="lazy" src="[占位图]" data-src="[真实url地址]" data-srcset="[不同屏幕密度下，不同的url地址]" alt="I'm an image!">
```

如上， `data-*`属于自定义属性，`ele.dataset.*`可以读取自定义属性集合`img.srcset`属性用于设置不同屏幕密度下，image自动加载不同的图片，比如`<img src="image-128.png" srcset="image-256.png 2x" />`

##### 3.判断元素进入视口viewport

常用的方式有两种

1）、图片距离顶部距离 < 视窗高度 + 页面滚动高度 （太LOW了~）

```js
imgEle.offserTop < window.innerHeight + document.body.scrollTop
```

2) `getBoundingClientRect` (很舒服的一个API)

`Element.getBoundingClientRect()`方法返回元素的大小及其相对于视口的位置，具体参考文档 [Element.getBoundingClientRect() - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

```js
function isInViewport(ele) {
    // 元素顶部 距离 视口左上角 的距离top <= 窗口高度（反例：元素在屏幕下方的情况）
    // 元素底部 距离 视口左上角 的距离bottom > 0 (反例：元素在屏幕上方的情况)
    // 元素 display 样式不为 none
    
    const notBelow = ele.getBoundingClientRect().top <= window.innerHeight ? true : false;
    const notAbove = ele.getBoundingClientRect().bottom >= 0 ? true : false;
    const visable = getComputedStyle(ele).display !== 'none' ? true : false;
    
    return notBelow && notAbove && visable ? true : false;
}
```

3）`Intersection Observer` (存在兼容性问题，但帅啊)

由于兼容性问题，暂时不写，具体可参考文档[Intersection Observer - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

#### 4.具体实现 (demo)

核心内容都在上面分析完了，下面就是整合一下，

1）适合简单的HTML文件或者服务端直出的首页

注意`DOMContentLoaded`，在DOM解析完之后立马执行，不适合前后端分离的但页面应用，因为SPA应用一般来说图片数据是异步请求的，在`DOMContentloaded`的时候，页面上未必完全解析完JS和css，这时候`let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));`拿到的不是真正的首屏的所有图片标签

```js
document.addEventListener("DOMContentLoaded", () => {
  // 获取所有class为lazy的img标签
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  // 这个active是节流throttle所用的标志位，这里用到了闭包知识
  let active = false;

  const lazyLoad = () => {
    // throttle相关：200ms内只会执行一次lazyLoad方法
    if (active) return;
    active = true;

    setTimeout(() => {
      lazyImages.forEach(lazyImage => {
        // 判断元素是否进入viewport
        if (isInViewport(lazyImage)) {
          // <img class="lazy" src="[占位图]" data-src="[真实url地址]" data-srcset="[不同屏幕密度下，不同的url地址]" alt="I'm an image!">
          // ele.dataset.* 可以读取自定义属性集合，比如data-*
          // img.srcset 属性用于设置不同屏幕密度下，image自动加载不同的图片  比如<img src="image-128.png" srcset="image-256.png 2x" />
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          // 删除class  防止下次重复查找到改img标签
          lazyImage.classList.remove("lazy");
        }
        // 更新lazyImages数组，把还没处理过的元素拿出来
        lazyImages = lazyImages.filter(image => {
          return image !== lazyImage;
        });
        // 当全部处理完了，移除监听
        if (lazyImages.length === 0) {
          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
          window.removeEventListener("orientationchange", lazyLoad);
        }
      })

      active = false;
    }, 200);
  }

  document.addEventListener("scroll", lazyLoad);
  document.addEventListener("resize", lazyLoad);
  document.addEventListener("orientationchange", lazyLoad);
})
```

2）.适合单页面应用的写法(模拟封装vue的懒加载)

 (1) 核心实现
 *因为是demo，所以执行时机放到vue的全局`mounted`钩子里面（这样的首屏体验其实是不好的），不过足够理解就好了
 *跟上面不同的地方：`let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'))`;的获取时机放在了定时器里面，不是一开始就拿到全局的`lazyImages`,而是每次刷新时才拿到还没处理过的

 ```js
function LazyLoad() {
  // 这个active是节流throttle所用的标志位，这里用到了闭包知识
  let active = false;

  const lazyLoad = () => {
    // throttle相关：200ms内只会执行一次lazyLoad方法
    if (active) return;
    active = true;

    setTimeout(() => {
      // 获取所有class为lazy的img标签，这里由于之前已经把处理过的img标签的class删掉了  所以不会重复查找
      let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

      lazyImages.forEach(lazyImage => {
        // 判断元素是否进入viewport
        if (isInViewport(lazyImage)) {
          // <img class="lazy" src="[占位图]" data-src="[真实url地址]" data-srcset="[不同屏幕密度下，不同的url地址]" alt="I'm an image!">
          // ele.dataset.* 可以读取自定义属性集合，比如data-*
          // img.srcset 属性用于设置不同屏幕密度下，image自动加载不同的图片  比如<img src="image-128.png" srcset="image-256.png 2x" />
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          // 删除class  防止下次重复查找到该img标签
          lazyImage.classList.remove("lazy");
        }

        // 当全部处理完了，移除监听
        if (lazyImages.length === 0) {
          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
          window.removeEventListener("orientationchange", lazyLoad);
        }
      })

      active = false;
    }, 200);
  }

  document.addEventListener("scroll", lazyLoad);
  document.addEventListener("resize", lazyLoad);
  document.addEventListener("orientationchange", lazyLoad);
}
 ```

 (2)在全局中的`mounted`钩子中执行

 ```js
 const vm = new Vue({
     el: '.wrap',
     store,
     mounted: function () {
         this.LazyLoad();
     }
 })
 ```

 (3)封装`img-lazy`组件

 ```vue
 <template>
    <img :class="['lazy',className]" :src="defaultImg" :data-src=""url" :data-srcset="`${url} 1x`">
 </template>
 
 <script>
    export default {
        props: {
            url: {
                type: String
            },
            defaultImg: {
                type: String,
                default: [默认图片]
            },
            className: {
                type: String,
                default: ''
            }
        }
    }
 </script>
 ```

 (4)使用

 ```html
 <img-lazy className="image" :url="item.display_image" />
 ```

 以上实现的只是比较粗糙的版本，要真正实现性能大幅提升优化还需要处理较多的细节，本文旨在让帮助部分同学了解基本原理，有了宏观的认识后，可以尝试去读一下相关这种懒加载插件的源码，能学到不少东西。
