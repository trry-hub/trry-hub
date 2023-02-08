



# Vue事件总线（EventBus）使用详细介绍

[![慕课网](https://pic1.zhimg.com/v2-1a7e8b36a7dc94b127c6cea1773ed171_xs.jpg?source=172ae18b)](https://www.zhihu.com/org/mu-ke-wang-14)

[慕课网](https://www.zhihu.com/org/mu-ke-wang-14)[](https://www.zhihu.com/question/48510028)

已认证的官方帐号

56 人赞同了该文章

**前言**

vue组件非常常见的有父子组件通信，兄弟组件通信。而父子组件通信就很简单，父组件会通过 `props` 向下传数据给子组件，当子组件有事情要告诉父组件时会通过 `$emit` 事件告诉父组件。今天就来说说如果两个页面没有任何引入和被引入关系，该如何通信了？

![img](https://pic4.zhimg.com/v2-b39082ed6c899ea38fcb1012d5903ebb_r.jpg)

如果咱们的应用程序不需要类似Vuex这样的库来处理组件之间的数据通信，就可以考虑Vue中的 `事件总线` ，即 **`EventBus`**来通信。

**EventBus的简介**

`EventBus` 又称为事件总线。在Vue中可以使用 `EventBus` 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的“灾难”，因此才需要更完善的Vuex作为状态管理中心，将通知的概念上升到共享状态层次。

**如何使用EventBus**

![img](https://pic3.zhimg.com/v2-a6e2f29fb943e5a17a311685e4817cb6_r.jpg)

**一、初始化**
首先需要创建事件总线并将其导出，以便其它模块可以使用或者监听它。我们可以通过两种方式来处理。先来看第一种，新创建一个 .js 文件，比如 `event-bus.js`

```text
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

实质上`EventBus`是一个不具备 `DOM` 的组件，它具有的仅仅只是它实例方法而已，因此它非常的轻便。

另外一种方式，可以直接在项目中的 `main.js` 初始化 `EventBus` :

```text
// main.js
Vue.prototype.$EventBus = new Vue()
```

注意，这种方式初始化的`EventBus`是一个`全局的事件总线`。稍后再来聊一聊全局的事件总线。

现在我们已经创建了 `EventBus` ，接下来你需要做到的就是在你的组件中加载它，并且调用同一个方法，就如你在父子组件中互相传递消息一样。

**二、发送事件**

![img](https://pic3.zhimg.com/v2-7596bb8669bd3b995171e0b09439afce_r.jpg)

假设你有两个Vue页面需要通信： A 和 B ，A页面 在按钮上面绑定了点击事件，发送一则消息，想=通知 B页面。

```text
<!-- A.vue -->
<template>
    <button @click="sendMsg()">-</button>
</template>

<script> 
import { EventBus } from "../event-bus.js";
export default {
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
}; 
</script>
```

接下来，我们需要在 B页面 中接收这则消息。

**三、接收事件**

![img](https://pic2.zhimg.com/v2-460413596c47645c29e688e1efcdfccd_r.jpg)

```text
<!-- IncrementCount.vue -->
<template>
  <p>{{msg}}</p>
</template>

<script> 
import { 
  EventBus 
} from "../event-bus.js";
export default {
  data(){
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  }
};
</script>
```

同理我们也可以在 B页面 向 A页面 发送消息。这里主要用到的两个方法：

```text
// 发送消息
EventBus.$emit(channel: string, callback(payload1,…))

// 监听接收消息
EventBus.$on(channel: string, callback(payload1,…))
```

前面提到过，如果使用不善，`EventBus`会是一种灾难，到底是什么样的`“灾难”`了？大家都知道vue是单页应用，如果你在某一个页面刷新了之后，与之相关的`EventBus`会被移除，这样就导致业务走不下去。还要就是如果业务有反复操作的页面，`EventBus`在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理`EventBus`在项目中的关系。通常会用到，在vue页面销毁时，同时移除`EventBus`事件监听。

**移除事件监听者**

![img](https://pic1.zhimg.com/v2-cd5627b06af54de5b8722fee76006500_r.jpg)

如果想移除事件的监听，可以像下面这样操作：

```text
import { 
  eventBus 
} from './event-bus.js'
EventBus.$off('aMsg', {})
```

你也可以使用 `EventBus.$off('aMsg')` 来移除应用内所有对此某个事件的监听。或者直接调用 `EventBus.$off()` 来移除所有事件频道，不需要添加任何参数 。

上面就是 `EventBus` 的使用方法，是不是很简单。上面的示例中我们也看到了，每次使用 `EventBus` 时都需要在各组件中引入 `event-bus.js` 。事实上，我们还可以通过别的方式，让事情变得简单一些。那就是创建一个全局的 `EventBus` 。接下来的示例向大家演示如何在Vue项目中创建一个全局的 `EventBus` 。

**全局EventBus**

它的工作原理是发布/订阅方法，通常称为 `Pub/Sub` 。

**创建全局EventBus**

```text
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
```

在这个特定的总线中使用两个方法`$on`和`$emit`。一个用于创建发出的事件，它就是`$emit`；另一个用于订阅`$on`：

```text
var EventBus = new Vue();

this.$bus.$emit('nameOfEvent', { ... pass some event data ...});

this.$bus.$on('nameOfEvent',($event) => {
  // ...
})
```

然后我们可以在某个Vue页面使用`this.$bus.$emit("sendMsg", '我是web秀');`，另一个Vue页面使用

```text
this.$bus.$on('updateMessage', function(value) {
  console.log(value); // 我是web秀
})
```

同时也可以使用`this.$bus.$off('sendMsg')`来移除事件监听。

**总结**

本文主要通过简单的实例学习了Vue中有关于 `EventBus` 相关的知识点。主要涉及了 `EventBus` 如何实例化，又是如何通过 `$emit` 发送频道信号，又是如何通过 `$on` 来接收频道信号。最后简单介绍了如何创建全局的 `EventBus` 。从实例中我们可以了解到， `EventBus` 可以较好的实现兄弟组件之间的数据通讯。