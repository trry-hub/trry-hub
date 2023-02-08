# 浅析 TypeScript


## 一、TS基础类型
准备做一个系列的学习总结,这个是第一篇.欢迎叨扰!!!
## 问题

#### 什么是TypeScript?
  * TypeScript 是 JavaScript 的一个超集, 主要提供了*类型系统*和*对 ES6 的支持*(这是官方的解释)
  
  * 自己的理解: ts 就是 给了 js 代码的类型检查,让我们在编写代码时减少错误,尽可能的避免把 bug 带到线上去.
#### 为什么要学习 TypeScript?
  * 第一点: 因为别人都在学,我们为了不掉队,就必须学.
  * 第二点: 学了它,可以让我们写代码时可以避免低级错误.
  * 第三点: 目前三大框架都已经很好的兼容了TypeScript,为了后续的开发工作,我们必须学!

> 你不想学，但你不学不行。
> 如果你不会 TS 你就找不到好工作，
> 找不到好工作，就没法挣更多的钱，
> 没有更多的钱，就不能给女朋友买好东西，
> 买不了好东西，女朋友就会跟别人跑了，
> 没了女朋友，你父母就不开心，
> 父母不开心，你就不开心，你不开心，
> 就不想学习，然后恶性循环。

**废话不多说，为了女朋友，加油！！！**

## 1. 基础类型

* #### js 中 声明变量
```javascript
// boolean
let flag = true

// string
let str = '小姐姐'

// object
let obj = {}

// array
let arr = ['马云','准备','给我','一个亿']

// number
let num = 18

// undefined
let sex = undefined

// null
let height = null
```
* #### TS 中 声明变量
```TypeScript
// boolean
let flag: boolean = false

// string
let str: string = '小姐姐'

// object 
let obj: {
  name: string,
  flag: boolean,
  num: number
} = {
  name: '张三',
  flag: true,
  num: 123
}

// array
let arr: string[] = ['马云', '准备', '给我', '一个亿']
let arr: number[] = [1, 2, 3, 4]
let arr: (string | number)[] = [1,2,'mayun']
let arr: {}[] = [{}, {}, {}]
let arr: {
  name: string,
  money: number
}[] = [{ name: '马云', money: 100 }]

// number
let num: number = 18

// undefined
let sex: undefined = undefined

// null
let height: null = null
```

## 2. TS中一些其它的类型
* #### 元组

如果: 你有一个元素的数量和类型的数组,各元素类型可以相同,那么就可以使用元素来指定数组的类型

```TypeScript
let list: [string,string,string,number,string] = ['马云','今年','挣了',100,'块钱']
```

* #### 枚举

枚举(`enum`)在JavaScript中是没有的,为了补充这一点,在TypeScript中引入了枚举.使用枚举类型可以为一组数值赋予友好的名字。

```TypeScript
enum Person { name, sex, age }

let xiaojiejie = Person.name
```

> 枚举的值是自己根据实际应用去设置的,**默认情况下,枚举中的数据会有默认值**

**枚举默认值** 如: 上面的枚举
```TypeScript
enum Person { name, sex, age }

// 枚举的默认值 就像是数组的下标一样
// name = 0, sex = 1, age = 2

// 默认值也是可以读取的
console.log(Person.age) // 0
```
> 注意: **枚举的值是只读的!!!,一但创建好了枚举类型,它的值就不可改变的.**

在项目中使用枚举
```TypeScript

enum creatPerson { name = '小姐姐', sex = '男', age = 18 }

console.log('前边有个' + creatPerson.name + '她今年' + creatPerson.age + '她的性别是' + creatPerson.sex)
```

* #### `Any` 类型

any 就是 任意值的意思,可以赋予任何值(不建议使用)

```TypeScript
let creat: any

// 这些都是可以的, 但滥用any类型,就失去TS的意义了
creat = 'string'
creat = true
creat = []
creat = {}
```

* #### `Void` 类型
void 类型 可以理解为于 any类型 相反
* `any` 类型的数据 可以赋值为任意值
* `void` 类型是空值 就是什么都没有

void 类型一般用在函数的返回值中,函数没有返回值时,就是void(空值),可以省略

```TypeScript
let name: string = 'xiaojiejie'

// 有返回值
function getStr(str: string): string {
    console.log(str)
    return str
}

// 没有返回值
function get(str: string): void {
    console.log(str)
}

getStr(name)
get(name)
```
* #### `Never` 类型

> never 类型表示永远不存在的值的类型
> ,never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

`never` 类型的值可以赋值为其它任意类型的值,但其它类型的值不能赋值给 `never` 类型

* #### 类型断言
类型断言指的是:
> 当你比TS更了解当前数据的类型时,可以给数据指定更准确的类型.

**类型断言语法有两种:**

一种 '尖括号' 语法
```TypeScript
let some: string = 'nihao'

let someLength: number = (<string>some).length
```
另一种 as 语法
```TypeScript
let p = document.querySelector('p') as HTMLParagraphElement
```
# 结束了
> 到这里就结束了, 本篇内容,都是个人的学习总结,如果有什么不对的地方,欢迎大家及时☞出.毕竟大家学才是真的学.