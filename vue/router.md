### 背景

目的改变视图的同时不会向后端发出请求

本质上基于浏览器API运用

### hash

​	表示的是URL地址都中 # 符号 不会重新加载页面

缺点：

​	地址栏携带# 不美观

​	有体积限制

### history

​	利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法。（需要特定浏览器支持）

​	基于浏览器的历史记录栈 对当前已有的back forward go

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

### 懒加载

（） => import（‘ ’）

### 底层代码实现

https://juejin.cn/post/6844903615283363848
