## 为什么不推荐用for...in遍历数组

程序员黑叔 *今天*

点击上方“程序员黑叔”，选择“置顶或者星标”

你的关注意义重大！

> 转载自：沐码小站
>
> https://wintc.top/article/49

## 一、for...in引发的一个报错

两年前写的一个文章目录生成插件vue-outline，一直用着没出啥问题（本站的文章目录也是用该插件生成的）。但是最近一个网友在使用的时候却出现了异常报错，异常代码使用了一个for...in遍历数组：

```
  for (let idx in selectors) {
    let elementList = dom.querySelectorAll(selectors[idx])
    elementList.forEach(element => {
      if (element.__nav_except || element.offsetParent === null) return
      element.__nav_level = idx
    })
  }
```

代码本意是，通过用户给定的选择器列表selectors确定哪些元素可以提取出来作为标题，比如传一个['h1', 'h3', 'div.title']。网友的使用方法完全正确，selectors传递的都是合法的选择器，但是会出现以下报错：

![图片](https://mmbiz.qpic.cn/mmbiz_png/pfCCZhlbMQRpAia4QpnhiacNT75ibnMY6vuUYIvdge0LMW5wg6MicOhxAnOI65lHP0g3crAgs8R8v0HtmSX0Nib9HkA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)img

一个函数不是一个合法的选择器？selectors里传递的都是选择器。最后这位网友找到了原因，可能和for...in有关系，因为他在数组的原型上添加了一些便捷的方法：

![图片](https://mmbiz.qpic.cn/mmbiz_png/pfCCZhlbMQRpAia4QpnhiacNT75ibnMY6vuOiccJeRUfDx7nXPaiczcg9gMKEXic9GiagqCEIZSObibvk6dM0KNvqE5cQA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)img

而for...in会遍历出原型上的这些方法，这就导致在执行前面的代码时，把一个函数作为参数传递给了querySelectorAll，导致报错！

## 二、for...in细节

for...in本身是Object的遍历方法，JS中的数组也继承自Object，所以自然而然也能使用for...in遍历出属性。然而for...in有一些难以注意到的细节，稍不注意就可能被坑。

#### 1. 细节一：遍历的的属性值是字符串，而不是数字！（相信初接触JS的人都要被坑一次吧）

```
const list = [1, 2, 3]
for (let i in list) {
    console.log(i, i + 1, typeof i)
}
```

打印：

```
0 01 string
1 11 string
2 21 string
```

可以看到typeof i的返回值是“string”，这个最坑的地方在于我们通过下标加减想取别的元素时，就会出现异常，像上述输出的i + 1一样，并不是数字相加，而是字符串拼接！

#### 2. 细节二：遍历的是对象的枚举属性，包括自身属性以及原型链上的属性

```
const obj = {
  a: 'value_a',
  b: 'value_b'
}

Object.prototype.c = 'proto_value_c'

Object.defineProperty(obj, 'd', {
  get () { return 'value_d' },
  enumerable: false,
})

for (let key in obj) {
  console.log(key, obj[key])
}
```

输出：

```
a value_a
b value_b
c proto_value_c
```

可以看到，原型上的属性c也打印出来了，但是通过Object.defineProperty定义的不可枚举属性d（enumerable: false）没有被遍历到。

#### 3. 细节三：遍历顺序是对象属性的枚举顺序，并不一定按数组的下标顺序遍历

for...in的遍历顺序是枚举顺序，对于数组而言，规范并没有约束各浏览器的实现。因此即便在一定范围内是按顺序遍历的，也应该尽量不依赖for...in遍历的顺序。MDN文档也明确指出，不建议使用for...in遍历数组，特别是想按照索引顺序遍历的时候：

![图片](https://mmbiz.qpic.cn/mmbiz_png/pfCCZhlbMQRpAia4QpnhiacNT75ibnMY6vuwTuNicGswkeMfugAD1eMicKVLZdCT6acRh1Kd5Wkl8aYXiajkzgYZQUXQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)img

此外，因为有稀疏数组的存在，其实JS里的数组不一定是顺序结构存储的。当数组的键分布较为稀疏，为了充分节约空间，数组可能会退化为像对象一样的哈希表存储结构。

因为for...in本身是对象的遍历方法，并不适用于数组，对于数组，还是for...of、for循环、forEach等遍历比较好。