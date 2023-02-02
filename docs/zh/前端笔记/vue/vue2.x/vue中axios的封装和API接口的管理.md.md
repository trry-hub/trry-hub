### vue中Axios的封装和API接口的管理

如图，面对一团糟代码的你~~~真的想说，What F~U~C~K！！！  回归正题，我们所要的说的axios的封装和api接口的统一管理，其实主要目的就是在帮助我们简化代码和利于后期的更新维护。

### 一、axios的封装

在vue项目中，和后台交互获取数据这块，我们通常使用的是axios库，它是基于promise的http库，可运行在浏览器端和node.js中。他有很多优秀的特性，例如拦截请求和响应、取消请求、转换json、客户端防御XSRF等。所以我们的尤大大也是果断放弃了对其官方库vue-resource的维护，直接推荐我们使用axios库。如果还对axios不了解的，可以移步到axios文档。

####  安装

```JavaScript
npm install axios; // 安装axios
```

#### 引入

一般我会在项目的src目录中，新建一个request文件夹，然后在里面新建一个http.js和一个api.js文件。http.js文件用来封装我们的axios，api.js用来同意管理我们的接口。

```JavaScript
// 在 http.js 中引入axios
import axios from 'axios'; //引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件、大家可根据自己的ui组件更改。
import { Toast } from 'vant';
```

#### 环境的切换

我们的项目环境可能有开发环境、测试环境和生产环境。我们通过node的环境变量来匹配我们的默认的接口url前缀。axios.defaults.baseURL可以设置axios的默认请求地址就不多说了。

```JavaScript
// 环境的切换
if (process.env.NODE_ENV == 'development'){
    axios.defaults.baseURL = 'https://www.kaifa.com';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'https://www.production.com';
}
```

#### 设置请求超时

通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s,就回告知用户当前请求超时，请刷新等。

```JavaScript
axios.defaults.timeout = 10000;
```

#### post请求头的设置

post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为```application/x-www-form-urlencoded;charset=UTF-8```

```JavaScript
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
```

* 请求拦截

我们在发送请求前可以进行一个请求的拦截，为什么要拦截呢，我们拦截请求是用来做什么的呢？比如，有些请求是需要用户登录之后才能访问的，或者post请求的时候，我们需要序列化我们提交的数据。这时候，我们可以在请求被发送之前进行一个拦截，从而进行我们想要的操作。

#### 请求拦截

```JavaScript
// 先导入vuex，应为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
import store from '@/store/index';

//请求拦截
axios.interceptors.request.use( config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    return Promise.error(error);
})
```

这里说一下token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token，如果token存在说明用户已经登录过，则更新vuex中的token状态。然后，在每次请求接口的时候，都会在请求的hrader中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录。

#### 响应的拦截

```JavaScript
// 响应拦截器
axios.interceptors.response.use(response => {
    //如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if(response.status === 200) {
        return Promise.resolve(respponse);
    } else {
        return Promise.reject(response);
    }
},
// 服务器状态码不是2开头的情况
// 这里可以跟你们的后台人员协商好统一的错误状态码
// 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
// 下面例举几个常见的操作，其他需求可自行扩展
error => {
    if(error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页面操作。
            case 401:
            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            });
            break;
            // 403 token 过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中的token对象
            // 跳转登录页面
            case 403:
            Toast({
                message: '登录过期，请重新登录'，
                duration: 1000,
                forbidClick: true
            });
            // 清楚token
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            setTimeout(() => {
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
            }, 1000);
            break;
            
            // 404请求不存在
            case 404:
            Toast({
                message: '网络请求不存在',
                duration: 1500,
                forbidClick: true
            })
        }
        return Promise.reject(error.response);
    }
})
```

响应拦截器很好理解，就是服务端返回给我们的数据，我们在拿到之前可以对他进行一些处理。例如上面的思想：如果后台返回的状态码是200，则正常返回数据，否则得根据错误的状态码类型进行一些我们需要的错误，其实这里主要就是进行了错误的统一处理和没登录或登录过期后跳转登录页的一个操作。

**要注意的是，上面的Toast()方法，是我引入的vant库中的toast轻提示组件，你根据你的ui库，对应使用你的一个提示组件。**

#### 封装get方法和post方法

我们常用的ajax请求方法有get、post、put等方法，相信小伙伴都不会陌生。axios对应的也有很多类似的方法，不清楚的可以看下文档。但是为了简化我们的代码，我们还是要对其进行一个简单的封装。下面我们主要封装两个方法： get和post。

**get方法**：我们通过定义一个get函数，get函数有两个参数，第一个参数表示我们要请求的url地址，第二个参数是我们要携带的请求参数。get函数返回一个promise对象，当axios其请求成功时resolve服务器返回值，请求失败时reject错误值。最后通过export抛出get函数。

```JavaScript
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function get(url,params){
     return new Promise((resolve, reject) => {
         axios.get(url, {
             params: params
         }).then(res => {
             resolve(res.data);
         }).catch(err => {
             reject(err.data)
         })
     })
 }
```

**post方法：**原理同get基本一样，但是要注意的是，post方法必须要使用对提交从参数对象进行序列化的操作，所以这里我们通过node的qs模块来序列化我们的参数。这个含中药，如过没有序列化操作，后台拿不到你提交的数据的。这就是文章开头哦我们```import QS from 'qs```的原因。
```JavaScript
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function post(url, params) {
     return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params)).then(res => {
             resolve(res.data);
         }).catch(err => {
             reject(err.data)
         })
     })
 }
```

这里有个小细节说下，```axios.get()```方法和```axios.post()```在提交数据时参数的书写方式还是有区别的。区别就是，get的第二个参数是一个{},然后这个对象的params属性值是一个参数对象。而post的第二个参数就是一个参数对象。两者略微的区别要留意。


### axios的封装基本就完成了，下面在简单说下api的统一管理。

整齐的api就像电路板一样，即使在复杂也能很清晰整个线路。上面说了，我们就新建一个api.js然后在这个文件中寻访我们所有的api接口。

* 首先我们在api.js中引入我们封装的get和post方法

```JavaScript
/**   
 * api接口统一管理
 */
import { get, post } from './http'
```
现在，例如我们有这样一个接口，是一个post请求：

```JavaScript
http://www.baiodu.com/api/v1/users/my_address/address_edit_before
```

我们可以在api.js中这样封装：

```JavaScript
export const apiAddress = p => post('api/v1/users/my_address/address_edit_before',p)
```
我们定义一个```apiAddress```方法，这个方法有一个参数p，p是我们请求接口时携带的参数对象。而后调用了我们封装的```post```方法，```post```方法的第一个参数使我们的接口地址，第二个参数是```apiAddress```的p参数，即请求接口时携带的参数对象。最后通过export导出```apiAddress```.

然后在我们的页面中可以这样调用我们的api接口：

```JavaScript
import { apiAddress } from '@/request/api';// 导入我们的api接口
export default {        
    name: 'Address',    
    created () {
        this.onLoad();
    },
    methods: {            
        // 获取数据            
        onLoad() {
            // 调用api接口，并且提供了两个参数                
            apiAddress({                    
                type: 0,                    
                sort: 1                
            }).then(res => {
                // 获取数据成功后的其他操作
                ………………                
            })            
        }        
    }
}
```

其他的api接口，就在api.js中继续往下面扩展就可以了。友情提示，为每个接口写好注释

api接口管理的一个好处就是，我们把api统一集中起来，如果后期需要修改接口，我们就直接在api.js中找到对应的修改就好了，而不用去每一个页面查找我们的接口然后在修改会很麻烦。关键是，万一修改的量比较大，就规格gg了。还有就是如果直接在我们的业务代码修改接口，一不小心还容易动刀我们的业务代码造成不必要的麻烦。

好了，最后把完成的axios封装代码奉上。

```JavaScript
import { apiAddress } from '@/request/api';// 导入我们的api接口
export default {        
    name: 'Address',    
    created () {
        this.onLoad();
    },
    methods: {            
        // 获取数据            
        onLoad() {
            // 调用api接口，并且提供了两个参数                
            apiAddress({                    
                type: 0,                    
                sort: 1                
            }).then(res => {
                // 获取数据成功后的其他操作
                ………………                
            })            
        }        
    }
}
```


