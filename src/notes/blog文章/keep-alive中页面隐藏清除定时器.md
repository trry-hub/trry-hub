# vue项目中清除定时器（清除定时器不成功）



**首先确认< router-view >外层是否有包裹了一层< keep-alive >**

## 如果有包裹：

```
<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
1234567
```

在data中：

```
data () {
    return {
      timer: null // 定时器
    }
  },
12345
```

在activated中设置定时器：

```
activated () {
    this.timer = setInterval(() => {
      //  定时器中执行的代码
    }, 30000)
  },
12345
```

在deactivated中清除定时器：

```
deactivated () {
    // 页面关闭（路由跳转）时清除定时器
    clearInterval(this.timer)
    this.timer = null
  },
12345
```

< keep-alive >作用：
< keep-alive > 可以使被包含的组件状态维持不变，即便是组件切换了，其内的状态依旧维持在内存之中。在下一次显示时，也不会重现渲染（有缓存的作用）。

**被包含在 < keep-alive > 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated**

activated
在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用。

deactivated
在组件被停用时调用。

> 注意：只有组件被 keep-alive 包裹时，这两个生命周期才会被调用，如果作为正常组件使用，是不会被调用，以及在 2.1.0 版本之后，使用 exclude 排除之后，就算被包裹在 keep-alive中，这两个钩子依然不会被调用！另外在服务端渲染时此钩子也不会被调用的。

## 如果没有包裹

在data中：

```
data () {
    return {
      timer: null // 定时器
    }
  },
12345
```

在mounted中设置定时器：

```
mounted() {
    this.timer = setInterval(() => {
      //  定时器中执行的代码
    }, 30000)
  },
12345
```

在beforeDestroy中清除定时器：

```
beforeDestroy() {
    // 页面关闭（路由跳转）时清除定时器
    clearInterval(this.timer)
    this.timer = null
  },
```