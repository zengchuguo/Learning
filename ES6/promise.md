# [文档](https://myhm_admin.gitee.io/es6_demo/view/es6/6.Promise.html#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)

前提：如果异步之间存在依赖关系就需要层层嵌套回调 因此形成回调地狱

- Promise在新建时 内部操作就立即执行
- 缺点：
  - 当处在未完成状态时，不能确定是出来什么阶段
  - promise的内部错误不会反馈到外部 得用catch捕获  **内部消化**
  - 不能暂停取消promise 一旦启动 无法中途取消
- 优点
  - 避免回调地狱
  - 链式调用：在上一个操作执行成功后再开始下一个操作 通过return返回结果下一层的`.then()`
- [`Promise.all()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 和 [`Promise.race()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 是**并行**运行异步操作的两个组合式工具。
- 三种状态pending （fulfilled）resolved rejeted  状态修改后就不能变化！
- `then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。返回新的promise对象 因此能采用链式调用
- `catch()`正常执行返回的是`resolved`状态
- [`Promise.all()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 需要所有的promise参数都要执行完才能执行`.then()  `
  - 当有**一个**promise参数失败后 不需要管另外的请求是否的结束
  - 如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。自己执行完`catch()`后变成`resolved` 就不会执行Promise的catch（）只会相应一个`catch()`
- [`Promise.race()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 
  - 第一个运行快的结果
  - 某个 Promise 变成`rejected`状态而结束
- `Promise.allSettled()`来确定一组异步操作是否**都**结束  目的解决all（）
- `Promise.any()`一组Promise作为参数 
  - 只要有一个参数是`fulfilled`状态 包装实例就会变成`fulfilled`状态
  - **所有**参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。
-  `Promise.try()` 同步操作
-  调度器 并行执行promise

```javascript
class Scheduler {
    constructor() {
        this.arr = [];
        this.maxnum = 2;
        this.runnum = 0;
    }
    add(promise){
        this.arr.push(promise);
    }
    start() {
        for(let i = 0;i < this.maxnum;i++)
            this.request()
    }
    request(){
        if(!this.arr || !this.arr.length || this.runnum >= this.maxnum)
            return ;
        this.runnum++;
        this.arr.unshift()().then( () => {
            this.runnum--;
            /* 接着请求执行后面的promise */
            this.request();
        })
    }
}

const scheduler = new Scheduler();
const addTask = (time,num) => {
    scheduler.add(() => timeout(time).then(()=>console.log(num)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

scheduler.start()
```

