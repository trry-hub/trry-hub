---

title: loopFn
sidebar: true
---

# forEach、map、filter、find、sort、some 等易错点整理

最近手头上做了一个很大的后台管理项目，前端对复杂数据的处理要求颇高，也确实让自己发现了很多之前被忽视的细节。在此特整理出来，希望不熟悉的朋友们们以后可以绕开我踩的这些坑。本文初衷在于帮助大家梳理一些数组操作上的重点和易错点，希望也能帮助和提醒大家，我会尽可能写的幽默些，加深大家的记忆。水平有限，真心无限。希望大家喜欢，本文很基础很基础，请大神绕道，谢谢。。。我不知道为什么成了热门。。。

## 一、常用方法解析

说起数组操作，我们肯定第一反应就是想到 forEach()、map()、filter()等方法，下面分别阐述一下各方法的优劣。

### 1、forEach

#### 1.1 基础点

forEach 的使用频率很高，多用于对数组自身的改变和各元素相关统计性的计算，重要特性如下：

1. 可以改变数组自身，没有返回值；
2. 中途不能用常规操作跳出循环，可以用抛出异常（try/catch）的方式，但不推荐这样做；

#### 1.2 易错点

1. forEach()不一定改变自身数组。我们可以看看数组中的元素是值类型和引用类型场景下，是否都能获得改变：

```js
var arr1 = [
    { name: "鸣人", age: 16 },
    { name: "佐助", age: 17 },
];
var arr2 = [1, 2, 3];

arr1.forEach((item) => {
    item.age = item.age + 1;
});

//=> [{name:'鸣人',age:17},{name:'佐助',age:18}]

arr2.forEach((item) => {
    item = item * 2;
});

// => [1,2,3]
```

最后的结果是，arr1 发生了改变，鸣人、佐助都长了一岁，arr2 没有任何改变。所以，可以粗暴得出结论：**当数组中元素是值类型，forEach 绝对不会改变数组；当是引用类型，则可以改变数组**

1. 不支持链式操作，所以以下代码是错误的：

```js
[1, 2, 3, 4, 5]
    .forEach((item) => console.log(item))
    .filter((item) => {
        return item > 2;
    });
// Uncaught TypeError: Cannot read property 'filter' of undefined
```

注意这里我们说仅仅是 forEach()这个方法不支持链式调用，在调用 forEach 之前，前面的数组你怎么玩链式都没问题，最后返回一个正常数组即可：

```js
// 这个没问题
[1, 2, 3, 4, 5]
    .filter((item) => {
        return item > 2;
    })
    .forEach((item) => {
        console.log(item);
    });
```

1. 不会在迭代之前创建数组的副本，这个使用场景太少太少了，忽略了...

### 2、map

map()功能很强大，forEach()的一些局限性它很多都能解决。"map"即"映射"，也就是原数组被"映射"成对应新数组。

#### 2.1 基础点

1. 新建一个数组，需要有承载对象，也意味着原始数组在调用它后不会发生变化;
2. 该数组中的每个元素都调用一个提供的函数后返回结果。

#### 2.2 易错点

1. 创建新数组不代表不能用它改变原有数组，你用原有数组去承载就可以：

```js
let arr = [1, 2, 3];
arr = arr.map((item) => {
    return item * 2;
});
```

arr 同样也会改变，所以这也不费事嘛。。。

1. map()中每个元素都要执行相应的回调函数，所以必须要有 return（千万别学某些人，判断过程一复杂，忘了 return，最后得到的是个空数组，哭天喊地的~~~），如果你想给数组做一定的过滤处理，那 map()基本上行不通：

```js
let newArr = [1,2,3,4,5].map(item => { if(item > 3) return item })
// => [undefined, undefined, undefined, 4, 5]
```

最终得到的结果是[undefined, undefined, undefined, 4, 5]。别和我说你简单处理一下就能凑合用， 人生不能凑合，代码也是！

### 3、filter

map()没法做到的过滤，就交给 filter()去完成，这个大家肯定也都知道。filter()和 map()很像，就像周董《东风破》和《发如雪》一样像，也是创建一个新数组，新数组中的元素是筛选出来的符合条件的所有对象。简单写个例子：

```js
let newArr = [1,2,3,4,5].filter(item =>{
   if(item > 3) return item
})
//  => [4,5]

```

这个相信也没啥易错点，有的话欢迎评论指出~~~

### 4、sort()

sort()用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序。

#### 4.1 基础点

1.默认排序按字母升序（更准确一些是根据字符串 Unicode 码点）：

```js
[3,4,2,1,5].sort()
// => [1,2,3,4,5]

['Javascript','Vue','React','Node','Webpack'].sort();
// => ["Javascript", "Node", "React", "Vue", "Webpack"]

```

#### 4.2 易错点

1. sort()与 map()、filter()等不同，它直接改变原始数组（很重要！）；
2. 如果想按照其他标准进行排序，就需提供比较函数 compareFunction(a,b)，数组会按照调用该函数的返回值排序，即 a 和 b 是两个将要比较的元素：

- 如果 compareFunction(a,b)小于 0，则 a 排列到 b 之前；
- 如果 compareFunction(a, b)等于 0，a 和 b 的相对位置不变（并不保证）;
- 如果 compareFunction(a, b)大于 0，b 排列到 a 之前； 直接上例子：

```js
let Users = [
  {name:'鸣人',age:16},
  {name:'卡卡西',age:28},
  {name:'自来也',age:50},
  {name:'佐助',age:17}
];
Users.sort((a,b)=> {
   return a.age - b.age
})

// => 鸣人、佐助、卡卡西、自来也

```

### 5、some()

some()也是很好的一个方法，用于检查数组中是否有某些符合条件。

#### 5.1 基础点

1. 只要有一个满足即返回 true，之后的不再执行(所以说对性能很友好！)。

```js
var result = [
   {name:'鸣人',age:16},
   {name:'佐助',age:17}
].some(item => {
 return item.age > 16
});
=> true

```

#### 5.2 易错点

some()和下面讲的 every()返回的都是`Boolean`值，仅此而此，别多想......

### 6、every()

如果说 some()是"||"判断，那 every()就是"&&"判断，它用于检测数组中的每一项是否都满足条件，只有都满足了才会返回 true。这点也很好理解：

```js
var result = [
   {name:'鸣人',age:16},
   {name:'佐助',age:17}
].every(item => {
 return item.age > 16
});
=> false

```

## 二、其他经典方法

在我们的日常工作中，会有很多业务需求是上述方法做不到的，比如下面三个需求：

1. 给一个数组做去重处理;
2. 判定当前数组里是否有某个元素，并返回该元素;
3. 判定当前数组里是否有某个元素，并把它去除;

针对需求 1，我相信看到"去重"，你肯定会想到`new Set()`，这也是个经常出现的面试题；针对需求 2，当你看到判定当前数组中是否有某个元素，也许会说`filter()` 不就是干这脏活累活的吗？ 还真不是，不信，我们分别展开讨论一下吧。

### 1. 数组去重（没你想的那么简单）

#### 1.1 new Set() 的局限性

数组去重，基本上论坛上各位大神的面试题里都会有这个，没错，正是 new Set()，很经典的办法，面试必备：

```js
let tempArr = new Set([1,2,3,3,4,4,5])
// => {1,2,3,4,5}

//并且已有元素是添加不进去的：
tempArr.add(3)
// => {1,2,3,4,5}

tempArr.add(6)
// => {1,2,3,4,5,6}

```

恩，很棒，一定注意 new Set()会将结果转换成对象！但实际工作中我们很少会和元素是值类型的数组打交道，那看看元素是引用类型还行不行：

```js
let mySet = new Set();
mySet.add(1); // Set(1) {1}
mySet.add(5); // Set(2) {1, 5}
mySet.add(5); // Set(2) {1, 5} 这里体现了值的唯一性
mySet.add('some text');
[...mySet]
// => [1,5,'some text']

mySet.add({name:'jay Chou',age:40});
mySet.add({name:'jay Chou',age:40});

[...mySet]
// => [1,5,'some text',{name:'jay Chou',age:40},{name:'jay Chou',age:40}]

```

看到了吧，Set()没法去重元素是引用对象的数组。那接下来咋整呀？

#### 1.2 \_.uniqWith()

别担心，[Lodash](https://www.lodashjs.com/)帮我们，Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。它有提供给了我们一个很好的方法——\_.uniqWith()：

```js
import _ from 'lodash';
<script>
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
_.uniqWith(objects, _.isEqual);
</script>

//=> [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]

```

其中， `_.isEqual(value,other)`用于执行深比较来确定两者的值是否相等。 `_.uniqWith()`做去重处理。

### 2. 获取数组中的指定元素

在工作中我们还有一个比较常见的场景，就是在数组中找到我想要的那一个，并且返回给我。好的，some()已经办不到了，它只会告诉我是否存在，filter()确实可以做到，但是如果我本身就知道这个数组里即使有我想的那个，也肯定只有一个，不可能出现多个，所以，出于性能的考虑，我不想用 filter()给我从头遍历到尾，这样怎么办？

#### 2.1 findIndex()

好了，既然 filter()不支持中断遍历，那我们就要找一个能中断遍历的方法，我们可以使用`for...of`，该方法支持中断遍历，但是该方法代码量较大，不建议使用，感兴趣的同学可以查阅一下。针对这个场景，我们可以使用 `findIndex()`帮我们先获取到所需元素的索引值，拿到索引后，你要杀要剐随你便

```js
let testArr = [{name:'鸣人',age:16},{name:'佐助',age:17},{name:'卡卡西',age:26}]
let index = testArr.findIndex(item => { return item.age > 16 });
// => 1

```

或者也可以使用 Lodash 提供的`_.findIndex()`，通过对象属性值直接获取对应索引：

```js
let testArr = [{name:'鸣人',age:16},{name:'佐助',age:17},{name:'卡卡西',age:26}]
let index = _.findIndex(testArr, {name:'佐助'});
// => 1

```

注意：IE 11 及更早版本不支持`findIndex()` 方法。所以，如果对浏览器兼容有要求，那就用 Lodash 的 `_.findIndex()`

#### 2.2 find()

`find()`顾名思义，就是用来在数组中找到我们所需要的元素，并且和`some()`一样，只要有一个满足即返回该元素，不会多余遍历，对性能很友善。

```js
let testArr = [{name:'鸣人',age:16},{name:'佐助',age:17},{name:'卡卡西',age:27},{name:'佐助',age:17}]
let result = testArr.find(item => { return item.name == '佐助'});
// => { name:'佐助',age:17 }

```

但是！很遗憾 IE 11 及更早版本也不支持 find()。

在实际工作中，对数组的各种操作必须要做到娴熟、娴熟、再娴熟，希望我整理的这些问题都能对大家有所收获。好了，就这么多吧，后面遇到其他问题了再接着补充，希望大家喜欢！谢谢你们的赞
