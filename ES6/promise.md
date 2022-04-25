# Promise 基本函数 与 调度器

# [文档](https://myhm_admin.gitee.io/es6_demo/view/es6/6.Promise.html#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)

前提：如果异步之间存在依赖关系就需要层层嵌套回调 因此形成回调地狱

- Promise在新建时 内部操作（resolve reject前的代码 这好比是同步代码）就立即执行
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
  - 当有**一个**Promise参数失败后 不需要管另外的请求是否的结束
  - 如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。自己执行完`catch()`后变成`resolved` 就不会执行Promise的catch（）只会相应一个`catch()`

```javascript
/* 设置的简单Promise */
const PromiseA = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('PromiseA')
    resolve() // rejected()
  }, 200)
})
  .then(() => {
    console.log('PromiseA then')
  })
  .catch(err => {
    console.log('PromiseA catch')
  })

const PromiseB = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('PromiseB')
    resolve() // rejected()
  }, 500)
})
  .then(() => {
    console.log('PromiseB then')
  })
  .catch(err => {
    console.log('PromiseB catch')
  })
```

```javascript
/* Promise.All([ ]) */
Promise.all([PromiseA, PromiseB])
  .then(() => {
    console.log('PromiseAll then')
  })
  .catch(() => {
    console.log('PromiseAll catch')
  })
```

```javascript
/*  当PromiseA/B 都是resolve() */
输出：PromiseA => PromiseA then => PromiseB => PromiseB then => PromiseAll then

/*  当PromiseA/B 有一个rejected() */
输出：PromiseA => PromiseA then => PromiseB => PromiseB then => PromiseAll then
/* 原因：PromiseA/B 自己catch捕获错误后 返回是Promise实例状态是resolved*/
```

- `Promise.allSettled()` 
  - 目的为了解决all（）方法中有的 Promise出错 被catch捕获
  - 无论是否有失败 都会执行到 then 并用**对象** 将结果包起来 能直接看到各自的 Promise 的执行情况

```javascript
/* PromiseA/B如上 删除cach的捕获错误 A设置成resolve B设置成reject*/
Promise.allSettled([PromiseA, PromiseB])
  .then(res => {
    console.log(res)
    console.log('PromiseAll then')
  })
  .catch(() => {
    console.log('PromiseAll catch')
  })
/*
输出：
PromiseA
PromiseA then
PromiseB
[
  { status: 'fulfilled', value: undefined },
  { status: 'rejected', reason: undefined }
]
PromiseAll then
*/
```

- [`Promise.race()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 
  - 第一个运行快的结果
  - 某个 Promise 变成`rejected`状态而结束
- `Promise.any()`一组Promise作为参数 
  - 只要有一个参数是`fulfilled`状态 包装实例就会变成`fulfilled`状态
  - **所有**参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。
- `Promise.finally` 一组Promise作为参数
  - 无论返回的Promise是什么状态 最终都会执行
- `Promise.try()` 同步操作
-  调度器 **并行**执行promise

```javascript
class Scheduler {
  constructor() {
    this.arr = []   //保存Promise等待队列
    this.maxnum = 2 //并发执行个数
    this.runnum = 0 //正在执行的个数
  }
  add(promise) {
    this.arr.push(promise)
  }
  start() {
    for (let i = 0; i < this.maxnum; i++) {
      this.request()
    }
  }
  request() {
    if (!this.arr || !this.arr.length || this.runnum >= this.maxnum) return
    this.runnum++
    /* 抽取出一个新的 Promise 执行 */
    this.arr.shift().then(() => {
      this.runnum--
      /* 接着请求执行后面的promise */
      this.request()
    })
  }
}

const scheduler = new Scheduler()
const addTask = (time, num) => {
  scheduler.add(
    () =>                                                                                                                                                                                                                                                                    new Promise(resolve => {
        setTimeout(() => {
          console.log(num)
          resolve()
        }, time)
      })
  )
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

scheduler.start()
/*
    2 => 3 => 1 => 4
    1 和 2 Promise先进入执行 2执行完再执行3（此时时间500ms） 3执行后（此时时间800ms）再执行 4
*/
```

