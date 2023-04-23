# js 常用工具函数

## 深拷贝（可以拷贝数组、对象、日期、函数等）

```js
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let result
  if (obj instanceof Array) {
    result = []
  } else if (obj instanceof Date) {
    result = new Date(obj)
  } else if (obj instanceof RegExp) {
    result = new RegExp(obj)
  } else {
    result = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```

## 判断数据类型（可以准确判断所有数据类型）

```js
function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}
```

## 防抖（只执行最后一次点击）

```js
function debounce(fn, delay) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
```

## 节流（每隔一段时间执行一次）

```js
function throttle(fn, delay) {
  let lastTime = 0
  return function () {
    let nowTime = Date.now()
    let context = this
    let args = arguments
    if (nowTime - lastTime > delay) {
      fn.apply(context, args)
      lastTime = nowTime
    }
  }
}
```

## 数组去重（可以去重基本数据类型和引用数据类型）

```js
function unique(arr) {
  let result = []
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    if (!obj[typeof arr[i] + arr[i]]) {
      result.push(arr[i])
      obj[typeof arr[i] + arr[i]] = true
    }
  }
  return result
}
```

## 数组扁平化（可以扁平化多维数组）

```js
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
```

## 数组乱序（打乱数组顺序）

```js
function shuffle(arr) {
  let result = []
  while (arr.length) {
    let random = Math.floor(Math.random() * arr.length)
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result
}
```

## 数组最大值

```js
function max(arr) {
  return Math.max.apply(null, arr)
}
```

## 数组最小值

```js
function min(arr) {
  return Math.min.apply(null, arr)
}
```

## 判断设备系统（可以判断 ios、android、windows、mac 等）

```js
function getOS() {
  const userAgent = ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) || ''
  const vendor = ('navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase()) || ''
  const appVersion = ('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase()) || ''
  if (/mac/i.test(appVersion)) return 'MacOSX'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}
```

## 判断设备类型（可以判断移动端、pc 端）

```js
function getDevice() {
  const userAgent = ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) || ''
  const appVersion = ('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase()) || ''
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
  if (/mac/i.test(appVersion)) return 'MacOSX'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
}
```

## 判断浏览器类型（可以判断 chrome、safari、firefox、edge、ie 等）

```js
function getBrowser() {
  const userAgent = ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) || ''
  const vendor = ('navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase()) || ''
  const appVersion = ('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase()) || ''
  if (/edge/i.test(userAgent)) {
    return 'edge'
  } else if (/rv:11/i.test(userAgent) && /like gecko/i.test(userAgent)) {
    return 'ie11'
  } else if (/msie/i.test(userAgent)) {
    return 'ie'
  } else if (/firefox/i.test(userAgent)) {
    return 'firefox'
  } else if (/(?:opera|opr)./i.test(userAgent)) {
    return 'opera'
  } else if (/chrome/i.test(userAgent) && /webkit/i.test(userAgent) && /mozilla/i.test(userAgent)) {
    return 'chrome'
  } else if (/safari/i.test(userAgent) && /applewebkit/i.test(userAgent) && /mozilla/i.test(userAgent)) {
    return 'safari'
  }
}
```

## 判断是否为微信浏览器

```js
function isWeChat() {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
```

## 校验常用的表单

```js
function checkForm(type, value) {
  switch (type) {
    case 'phone': //手机号码
      return /^1[3|4|5|7|8][0-9]{9}$/.test(value)
    case 'tel': //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(value)
    case 'card': //身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(value)
    case 'postal': //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(value)
    case 'QQ': //QQ号
      return /^[1-9][0-9]{4,9}$/.test(value)
    case 'email': //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)
    case 'money': //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(value)
    case 'URL': //网址
      return /http[s]?:\/\/.*/.test(value)
    case 'IP': //IP
      return /\d+\.\d+\.\d+\.\d+/.test(value)
    case 'date': //日期时间
      return !isNaN(new Date(value).getTime())
    case 'number': //数字
      return /^[0-9]$/.test(value)
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(value)
    case 'chinese': //中文
      return /^[\u4E00-\u9FA5]+$/.test(value)
    case 'lower': //小写
      return /^[a-z]+$/.test(value)
    case 'upper': //大写
      return /^[A-Z]+$/.test(value)
    case 'HTML': //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(value)
    default:
      return true
  }
}
```

## 格式化日期-时间/格式化时间戳

```js
function formatDate(time, format) {
  let t = new Date(time)
  let tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}
```
