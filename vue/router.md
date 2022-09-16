### 背景

最主要的目的更好的服务SPA（单页面），即当改变地址栏时候，该整个页面不会刷新（利用好axios 进行局部刷新形式）

### hash

​	表示的是URL地址都中 # 符号 不会重新加载页面

缺点：

- 地址栏携带# 不美观


- 有体积限制


### history

- 利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法。（需要特定浏览器支持）


- 基于浏览器的历史记录栈 对当前已有的back forward go


### 钩子函数

#### 全局守卫

**router.beforeEach( (to,from,next) => { })**

​	to from 即将进入的目标路由对象 当前导航的路由对象

​	next(): 进行管道中的下一个钩子。

​	next(false): 中断当前的导航。回到 `from` 路由对应的地址。

​	next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址 可传递的参数与 `router.push` 中选项一致。

​	next(error): 导航终止，且该错误会被传递给 `router.onError()` 注册过的回调

特点；

​	在全局守卫完成之前导航都与一直处在等待中

**router.beforeResolve( (to,from,next) => { })**

​	全局解析守卫，在路由跳转前，所有 **组件内守卫** 和 **异步路由组件** 被解析之后触发，它同样在 **每次导航** 时都会触发

**router.afterEach( (to,from) => { })** 

#### 路由守卫

**beforeEnter**   同 `beforeEach` 一样

#### 组件守卫

**beforeRouterEnter( (to,from,next) => {})**

特点：

​	在全局守卫`beforeEach`和路由守卫`beforeEnter`后 全局 `beforeResolve` 和全局 `afterEach` 之前

​	在beforeCreate生命周期前 因此没有this

**beforeRouteUpdate（ （to,from）=> {} ）**

特点：this已经可以使用

**beforeRouteLeave（ （to,from）=> {} ）**

特点：this已经可以使用

![未命名文件.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f72fd5c28a54767b1892ebf9c307653~tplv-k3u1fbpfcp-watermark.awebp)

# 实现手段

## hash（只需要去监听hashchange

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Router By Hash</title>
</head>
<body>
    <div id="content"></div>
    <nav>
        <a href="#/">1</a>
        <a href="#/2">2</a>
        <a href="#/3">3</a>
        <a href="#/4">4</a>
        <a href="#/5">5</a>
    </nav>
    <button onclick="push()">push形式到达界面2</button>
</body>
<script>
    class Router {
        constructor(routes = []) {
            /* 存储所有的路由节点信息 */
            this.routes = routes
            /* 存储当前界面 */
            this.currentHash = ''
            this.refresh = this.refresh.bind(this)
            window.addEventListener('load', this.refresh, false)
            window.addEventListener('hashchange', this.refresh, false)
        }

        getUrlPath(url) {
            /* 获取URL hash后的值 */
            return url.indexOf('#') >= 0 ?
                url.slice(url.indexOf('#') + 1) :
                '/'
        }

        refresh(event) {
            /* 更新路由 */
            let newHash = ''
            if(event.newURL) {
                newHash = this.getUrlPath(event.newURL || '')
            }
            else {
                newHash = this.getUrlPath(window.location.hash)
            }
            this.currentHash = newHash
            this.matchComponeny()
        }

        /* 路由发生变化时 刷新界面 */
        matchComponeny() {
            let curRoute = this.routes.find(route => 
                route.path === this.currentHash
            )
            /* 但没查到该路由 会重定向到 / */
            if(!curRoute) {
                curRoute = this.routes.find(route => 
                    route.path === '/'
                )
            }
            const { component } = curRoute
            /* 修改视图 */
            document.querySelector('#content').innerHTML = component
        }
    }

    const router = new Router([
        {
            path: '/',
            name: '/',
            component: '第1个界面'
        },
        {
            path: '/2',
            name: '2',
            component: '第2个界面'
        },
        {
            path: '/3',
            name: '3',
            component: '第3个界面'
        },
        {
            path: '/4',
            name: '4',
            component: '第4个界面'
        },
        {
            path: '/5',
            name: '5',
            component: '第5个界面'
        },
    ])

    /* 原生的push调用？pushState同样也不会触发hashchange */
    function push() {
        window.location.hash = '/2'
    }
</script>
</html>
```



## history

需要去监听popstate （目的能监听back forward go触发

和监听pushState replaceState（使得能直接触发到popstate形式

```html

```

### 部分面试题
1.为什么配置history模式下，部署在服务器上使用地址访问会出现404？如何解决？

因为使用Hash模式下，哈希值的东西是不会发送出去的

```

```

所以在History下产生的原因就很简单了

```
当前的地址假设为： http://127.0.0.1:8081/router/index.html
发送到服务器的东西是： http://127.0.0.1:8081/router/index.html

当地址发送变化： http://127.0.0.1:8081/router/a
发送到后端的东西是：http://127.0.0.1:8081/router/a
（导致服务器在该地址下找不到该资源 就会返回404
```

处理方案：

既然是服务器找不到该资源，那在找不到该资源下进行修改，使得所有404情况都访问router/index.html

```
location /router {
    try_files $uri $uri/ /index.html;
    index index.html;
}
```

同时最好在路由也设置404界面，防止是真的找不到形式（而且需要放置到最后

```
routes: [{
    path: "/",
    component: index
}, {
    path: "*",
    component: errPage
}]
```

