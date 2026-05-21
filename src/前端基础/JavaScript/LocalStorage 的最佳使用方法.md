### 使用 localStorage 的最佳实践

#### 前言

> localStorage 是HTML5 规范中作为持久化保存客户端数据的方案，localStorage 可以用于数据缓存，日志储存等应用场景。由于 localStorage 本身的一些特性：

* 受同源策略的限制
* 储存空间一般在 5MB 左右
* 键值对最终的存储形式为字符串

使用好 localStorage 并没有那么简单，本文主要介绍其使用的一些最佳实践。

#### 兼容性

由于浏览器对于新特性支持的速度和用户浏览器的版本不同，在使用 localStorage 之前，需要先通过嗅探操作判断当前环境是否支持：

```js
function isLocalStorageUsable() {
    const localStorageTestKey = '__localStorage_support_test';
    const localStorageTestValue = 'test';
    let isSupport = false;
    
    try {
        localStorage.setItem(localStorageTestKey, localStorageTestValue);
        
        if (localStorage.getItem(localStorageTestKey) === localStorageTestValue) {
            isSupport = true;
        }
        localStorage.removeItem(localStorageTestKey);
        return isSupport;
    } catch (e) {
        return isSupport;
    }
}
```

读写操作虽然可以用来验证当前浏览器是否支持 localStorage 特性，但是并非支持localStorage 的浏览器一定可以进行写操作，前面已经提到浏览器给localStorage 分配的储存空间是有限的，当存储的内容已经到达上限，则无法再进行写操作。

```js
try {
    localStorage.setItem(localStorageTestKey, localStorageTestValue);
    if(localStorage.getItem(localstorageTestKey) === localStorageTestValue) {
        isSupport = true;
    }
    localStorate.removeItem(localStorageTestKey);
    return isSupport;
} catch (e) {
    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        console.warn('localStorage 存储已达上限！')
    } else {
        console.warn('当前浏览器不支持 localStorage！')
    }
    return isSupport
}
```

在调用 localStorage 相关方法，都要确保当前浏览器支持 localStorage 特性，这里可以利用值缓存来避免多次调用该方法造成的性能损耗：

```js
ready() {
    if (this.isSupport === null) {
        this.isSupport = isLocalStorageUsable();
    }
    
    if (this.isSupport) {
        return Promise.resolve();
    }
    return Promise.reject();
}
```

通过定义上述的 ready 方法，使得嗅探方法具备 惰性执行 的特性。

#### 键值对

当将对象直接作为键值对传入 localStorage 时，会隐式调用 toString 方法：

```js
// 最终储存的键值为 key: [object object] value: [object object]
localStorage.setItem({}, {});
```

如果不注意键名的类型， 可能会出现因键名重复造成数据丢失的问题。

当 localStorage 的 key 为对象时，应该给予适当的警告提示，一定程度上避免低级错误导致的 Bug：

```javascript
function normalizeKey(key) {
    if (typeof key !== 'string') {
        console.warn('${key} used as a key, but it is not a string.');
        key = String(key);
    }
    return key;
}
```

对于 value，如果这样处理，则使得存储的值没有什么意义，所以需要根据数据的类型进行序列化和反序列化处理。

#### 序列化

当调用 setItem 方法向 localStorage 中存储值时，需要对存储的值进行统一的序列化处理:

```javascript
setItem(key, value) {
    key = normalizeKey(key);
    return this.ready().then(() => {
        if (value === undefined) {
            value = null;
        }
        serialize(value, (error, valueString) => {
            if (error) {
                return Promise.reject(error);
            }
            try {
                // 可能会因超出最大储存空间，储存失败。
                localStorage.serItem(key, valueString);
                return Promise.resolve();
            } catch (e) {
                return Promise.reject(e);
            }
        })
    })
}
```

一般情况下，存储都是 JSON 格式的数据，利用 JSON.stringify 进行序列化处理：

```javascript
function serialize(value, callback) {
    try {
        const valueString = JSON.stringify(value);
        callback(null, valueString);
    } catch (e) {
        callback(e);
    }
}
```

这里需要对 JSON.stringify 方法进行异常捕获，当序列化的对象存在循环引用时，该方法会抛出异常 。反序列化处理时，同样需要对 JSON.parse 进行异常捕获，比较常见的错误：

```javascript
JSON.parse('undefined');
// VM20179:1 Uncaught SyntaxError: Unexpected token u in JSON at position 0
```

针对这种情况，可以在 setItem 方法中做一层过滤处理：

```javascript
if (value === undefined) {
    value = null
}
```

但是也不能完全避免掉非法的 JSON 字符串，所以仍需要利用 try/catch 捕获异常。

如果业务需求比较复杂，那么需要通过判断存储值得具体类型来进行特定的序列化处理：

```javascript
const toString = Object.prototype.toString;
function serialize(value, callback) {
    const valueType = toString.call(value).replace(/^\[object\s(w+?)\]$/g, '$1');
    switch(valueType) {
        case 'Blob':
            const fileReader = new FileReader();
            
            fileReader.onload = function() {
                // 需要标记该值得类型
                var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
                
                
                callback(null, SERIALIZED_MARKER + TYPE_BLOB + str);
            }
            
            fileReader.readAsArrayBuffer(value);
            break;
        default:
        try {
            const valueString = JSON.stringify(value);
            callback(null, valueString);
        } catch (e) {
            callback(e);
        }
    }
}
```

这里增加了 Blob 类型得存储需求，需要利用 FileReader + ArrayBuffer 将其序列化，另外需要标识符来高速反序列化过程中该值得类型。

#### JSON.stringify 优化

JSON.stringify 方法在执行得过程中（运行时）需要分析对象得结构以及键值对得类型，这在处理复杂嵌套对象时是非常耗时的。

优化的手段实际上就是将这部分耗时的工作提到编译阶段，举个例子：

```javascript
const testObj = {
    firstName: 'Matteo',
    lastName: 'Collina',
    age: 32
}
function stringify({ firstName, lastName, age }) {
    return `"{"firstName":"${firstName}","lastName":"${lastName}","age":${age}}"`
}
```

针对上述例子，可以在运行时之前确定该对象的键值对以及类型，可以通过 benchmark.js 得到相关的基准测试数据:

```javascript
const benchmark = require('benchmark');
const fastjson = require('fast-json-stringify');
const suite = new benchmark.Suite();


coonst testObj = {
    firstName: 'Matteo',
    laseName: 'Collina',
    age: 32
}

function stringify({ firstName, lastName, age }) {
    return `"{"firstName":"${firstName}","lastName":"${lastName}","age":${age}}"`
}
suite.add('JSON.stringify obj', function () {
    JSON.stringify(testObj)
})

suite.add('fast-json-stringify obj', function () {
    stringify(testObj)
})

suite.on('cycle', (e) => console.log(e.target.toString())).on('complete', function() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})

suite.run()
```

上述例子不具备通用性，在实际的业务开发中，可以利用自定义 JSON Schema 来生成特定的 stringify 方法， 有成熟的开源框架供选择：

* fast-json-stringify
* slow-json-stringify (来自程序员的调侃)

#### 命名空间

localStorage 是受同源策略限制的，这种隔离级别相当于是应用级别的，但是在实际的业务开发过程中，这种隔离级别部分场景是覆盖不到的。

向 localStorage 中存储键值对时，主要有以下特点：

* 键值对个数可以通过 length 属性获取
* 键值对通过键名来索引
* 键值对按照添加的实践倒序排列

如果当前应用中各个模块都有采用 localStorage 存储数据的需求，那么怎么从模块及别去隔离呢？

因为键值对都是通过键名来索引，所以可以为键名加上命名空间来区分：

```javascript
const keyPrefix = name + '/'

localStroage.setItem(keyPrefix + key, value);
```

在多存储模块的情况下，直接调用 clear 方法会出现误删其他存储模块数据的问题，引入命名空间之后，可以避免这样的情况：

```javascript
function clear(keyPrefix){
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if(key.indexOf(keyPrefix) === 0) {
            localStorage.removeItem(key);
        }
    })
}
```

#### 总结

最后，总结本文提到的最佳实践：

* 利用 try/catch 嗅探浏览器兼容性，但是要注意超出存储上限的情况。
* 针对 localStorage 键值都是字符串的特性，采用统一的序列化和反序列化方法。
* 针对JSON.stringify 方法，可以采用约定JSON Schema 的方式，将对象结构的分析提前到编译阶段来优化执行效率。
* 引入命令空间增强多模块的管理。
