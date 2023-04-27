### 前言

ok，兄弟们。前面一篇文章就说过要用指令的方式来实现图片的懒加载。其实，前端发展这么多年，要实现图片懒加载非常简单，配合上Vue的指令，30行轻轻松松实现一个高复用的Vue指令。一起来看看吧。

### v-imgLazy

这里我是用intersectionObserber API去实现的。

> intersectionObserver 对象的observe()方法向intersectionObserver对象监听的目标集合添加一个元素。一个监听者有一组阈值和一个根，但是可以监视多个目标元素，以查看这些元素可见区域的变化。

简单来说可以监听dom元素进出可视区域，并且可以控制具体的变化。

具体的使用请看[IntersectionObserver API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

新建一个directive用来存放自定义指令

> directive/imgLazy.js

```
import baseImg form '@/assets/logo.png'

// 创建一个监听器
let obserer = new IntersectionObserver((entries)=>{
    // entries 是所有呗监听对象的集合
    entries.forEach(entry) => {
        if(entry.isIntersecting){
            // 当被监听元素到临界值且未加载图片时触发。
            !entry.target.isLoaded && showImage(entry.target,entry.target.data_src)
        }
    }
})

function showImage(el,imgSrc){
    const img = new Image();
    img.src = imgSrc;
    img.onload = () =>{
        el.src = imgSrc;
        el.isLoaded = true;
    }
}

export default {
    // 这里用inserted 和 bind 都行，因为IntersectionObserver时异步的，以防意外还是用inserted好一点
    //inserted和bind的区别在于inserted时元素已经插入页面，能够直接获取到dom元素的位置信息。
    inserted(el,binding) {
        // 初始化时展示默认图片
        el.src = baseImg;
        // 将需要加载的图片地址绑定在dom上
        el.data_src = binding.value;
        observer.observe(el)
    },
    unbind(){
        // 停止监听
        observer.disconnect();
    }
}
```
在main.js中使用，注册全局指令

> main.js

```
import imgLazy from '@/directive/imgLazy.js'

Vue.directive('imgLazy',imgLazy)
```

在组件中定义directives使用，给当前组件注册指令

```
import imgLazy from '@/directive/imgLazy.js'

export default {
    //...
    directives: {
        imgLazy: imgLazy,
    }
}
```

组件中使用

```
<template>
    <div class='container'> 
        <div v-for="(item,index) in imgSrc" :key="index" >
            <img v-imgLazy="item"  />
        </div>
    </div>
</template>

<script>
import imgLazy from '@/directive/imgLazy.js'
export default {
    directives: { imgLazy: imgLazy,},
    data() {
        return {
            imgSrc: ["https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg","https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2396395246,715775841&fm=26&gp=0.jpg","https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=224866248,765861809&fm=26&gp=0.jpg","https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2670715487,1547868437&fm=26&gp=0.jpg","https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2988957523,3295751190&fm=26&gp=0.jpg","https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2698110318,782174384&fm=26&gp=0.jpg","https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1102788601,953675482&fm=26&gp=0.jpg","https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg","https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2396395246,715775841&fm=26&gp=0.jpg","https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=224866248,765861809&fm=26&gp=0.jpg","https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2670715487,1547868437&fm=26&gp=0.jpg","https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2988957523,3295751190&fm=26&gp=0.jpg","https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2698110318,782174384&fm=26&gp=0.jpg","https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1102788601,953675482&fm=26&gp=0.jpg","https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2004055534,3969071219&fm=26&gp=0.jpg",]
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 200px;
    height: 200px;
}
</style>

```

intersectionObserver API 的兼容性方面基本上处理ie都兼容，所以说你如果想要在ie上实现懒加载就只能自己计算每一个元素了。