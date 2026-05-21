## 开始

每一个Vuex应用的核心就是store（仓库）。"store"基本上就是一个容器，它包含着你的应用中大部分的**状态（state）**。Vuex和单纯的全局对象有以下两点不同：

1.Vuex 的状态存储是响应式的。当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应地得到更高效更新。

2.你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交（commit）mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。


### 最简单的 Store

> 安装 Vuex 之后，让我们来创建一个 store。创建过程直接了当——仅需要提供一个初始 state 对象和一些 mutation：

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        count: 0,
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
```

现在，你可以通过 ```store.state```来获取状态对象，以及通过```store.commit```方法触发状态变更:

```
store.commit('increment')

console.log(store.state.count) // -> 1
```

为了在Vue组件中访问```this.$store``` property,你需要为Vue实力提供创建好的store。Vuex提供了一个从根组件向所有子组件，以```store```选项的方式"注入"该store的机制：

```
new Vue({
    el:'#app',
    store: store,
})
```

现在我们可以从组件的方法提交一个变更：

```
methods: {
    increment() {
        this.$store.commit('increment')
        console.log(this.$store.state.count)
    }
}
```

再次强调，我们通过提交 mutation 的方式，而非直接改变```store.state.count```,是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候就更容易的解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。

由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutation。

这是一个**最基本的 Vuex 技数应用**示例。

## State

### 单一状态树

Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个"唯一数据源（SSOT）"而存在。这意味着，每个应用将仅仅包含一个store实例。单一状态树让我们能够直接的定位任一特定的状态片段，在调试的过程中也能轻易的取得整个当前应用状态的快照。

但状态树和模块化并不冲突——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。

存储在 Vuex 中的数据和Vue实例中的```data```遵循相同的规则，例如状态对象必须是纯粹的。

### 在Vue组件中获得Vuex状态

那么我们如何在Vue组件中展示状态呢？由于Vuex的状态存储是响应式的，从store实例中读取状态最简单的方法就是在**计算属性**中返回某个状态：

```
// 创建一个 Counter 组件
const Counter = {
    template: `<div> {{ count }}</div>`,
    computed: {
        count () {
            return store.state.count
        }
    }
}
```

每当 ```store.state.count```变化的时候，都会重新求取计算属性，并且触发更新相关联的 DOM。

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用state的组件中需要频繁的导入，并且在测试组件时需要模拟状态。

Vuex 通过 ```store```选项，提供了一种机制将状态从根组件"注入"到每一个子组件中（需调用Vue.use(Vuex)）:

```
const app = new Vue({
    el:'#app',
    // 把 store 对象提供给 'store' 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
        <div class="app">
            <counter></counter>
        </div>
    `
})
```

通过在根实例中注册 ```store``` 选项，该store实例会注入到根组件下的所有子组件中，且子组件能通过```this.$store``` 访问到。让我们更新下 ```Counter``` 的实现：

```
const Counter = {
    template:  `<div>{{ count }}</div>`,
    computed: {
        count () {
            return this.$store.state.count
        }
    }
}
```

### ```mapState```辅助函数

> 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些向重复和冗余。为了解决这个问题，我们可以使用 ```mapState``` 辅助函数帮助我们生成计算属性，让你少按几次键：

```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
    // ...
    count: state => state.count,
    
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
    
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
        return state.count + this.localCount
    }
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 ```mapState```传一个字符串数组。

```
computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
])
```

#### 对象展开运算符

```mapState```函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给```computed```属性。但是自从有了对象展开运算符，我们可以极大地简化写法：

```
computed: {
    localComputed () { /* ... */},
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
        // ...
    })
}
```

#### 组件任然保有局部状态

使用 Vuex 并不意味着你需要将所有的状态存放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显示和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。

## Getter

有时候我们需要从 store 中派生出一些状态，例如对列表惊醒过滤并计数：

```
computed: {
    doneTodosCount () {
        return this.$store.state.todos.filter(todo => todo.done).length
    }
}
```

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

Vuex 允许我们在store中定义 "getter" （可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只是当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其第一个参数：

```
const store = new Vuex.Store({
    state: {
        todos: [
        {id: 1, text: '...',done: true},
        {id: 2, text: '...',done: false}
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})
```

### 通过属性访问

Getter 会暴露为 ```store.getters```对象，你可以以属性的形式访问这些值：

```
store.getters.doneTodos // -> [{ id: 1,text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为第二个参数：

```
getters: {
    // ...
    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    }
}
```

```
store.getters.doneTodosCount // -> 1
```

我们可以很容易地在任何组件中使用它：

```
computed: {
    doneTodosCount () {
        return this.$store.getters.doneTodosCount
    }
}

```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

### 通过方法访问

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```
getters: {
    // ...
    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
}
```

```
store.getters.getTodoById(2) // -> { id: 2, text: '...',done: false }
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

### ```mapGetters``` 辅助函数

```mapGetters``` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```
import { mapGetters } from 'vuex'

export default {
    // ...
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ... mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
        ])
    }
}
```

如果你想将一个 getter 属性领取一个名字，使用对象形式：

```
...mapGetters({
    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    doneCount: 'doneTodosCount'
})
```

## Mutation 

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。 Vuex 中的 mutation 非常类似于事件：每个mutation 都有一个子字符串的 **事件类型（type）**和一个**回调调函数（handler）**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
            // 变更状态
            state.count++
        }
    }
})
```

你不能直接调用一个 mutation handler。这个选项更像是事件注册："当触发一个类型为```increment```的 mutation 时，调用此函数。"要唤醒一个mutation handler，你需要以相应的type调用stroe.commit方法：

```
store.commit('increment')
```

### 提交载荷（Payload）

你可以向```store.commit```传入额外的参数，即 mutation的**载荷（payload）**

```
// ...
mutations: {
    increment (state, n) {
        state.count += n
    }
}
```

```
store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段病且记录的mutation会更易读：

```
// ...
mutations: {
    increment (state, payload) {
        state.count += payload.amount
    }
}
```

```
store.commit('increment', {
    amount: 10
})
```

### 对象风格的提交方式

提交 mutation 的另一种方式是直接使用包含 ```type```属性的对象：

```
store.commit({
    type: 'increment',
    amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷穿给 mutation 函数，因此 handler 保持不变：

```
mutations: {
    increment (state, payload) {
        state.count += payload.amount
    }
}
```

### Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的Vue组件也会自动更新。这也意味着Vuex中的mutation 也需要使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的store中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该
  + 使用```Vue.set(obj, 'newProp', 123)```，或者
  + 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：
  ```
  state.obj = { ...state.obj, newProp: 123 }
  ```
### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使用 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```
// store.js
import Vuex from 'vuex'
import { SOME_MUTATIOON } from './mutation-types'

const store = new Vuex.Store({
    state: { ... },
    mutatuons: {
        // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
        [SOME_MUTATION] (state) {
            // mutate state
        }
    }
})
```

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。

### Mutation 必须是同步函数

一条重要的原则就是要记住 **mutation 必须是同步函数**。为什么？请参考下面的例子：

```
mutations: {
    someMutation (state) {
        api.callAsyncMethod(() => {
            state.count++
        })
    }
}
```

现在想象，我们正在 debug 一个 app 并且观察 debtool 中的 mutation 日志。 每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让着不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

### 在组件中提交 Mutatiion

你可以在组件中使用 ```this.$store.commit('xxx')```提交mutation，或者使用 ```mapMutations``` 辅助函数将组件中的methods映射为 ```store.commit``` 调用（需要在根节点注入```store```）。

```
import { mapMutations } from 'vuex'

export default {
    // ...
    methods: {
        ...mapMutations({
            'increment', // 将`this.increment()`映射为`this.$store.commit('increment')`
            
            //`mapMutations` 也支持载荷：
            'incrementBy' // 将 `this.incrementBy(amount)`映射为`this.$store.commit('incrementBy', amount)`
        }),
        ...mapMutations({
            add: 'increment' // 将` this.add() `映射为 `this.$store.commit('increment')`
        })
    }
}
```

### 下一步：Action

在 mutation 中混合异步调用会导致你的程序很难调试。例如，当你调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在Vuex中，**mutation都是同步事务**：
```
store.commit('increment')
// 任何由 'increment' 导致的状态变更都应该在此刻完成。
```
