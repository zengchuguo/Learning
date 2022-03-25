# EventLoop

- EventLoop本质是JS引擎的事件处理 主线程和调用栈的任务执行 

- JavaScript单线程

  - GUI线程 渲染布局
  - JS引擎线程 解析执行JS  **与GUI线程互斥**
  - 定时触发器线程 （setTimeout setInterval
    - 定时任务可能不会按时执行 （因所执行函数的延时等
    - 嵌套5次之后最小间隔不能低于4ms
  - 时间触发线程 将满足触发条件的时间放入任务队列
  - 异步HTTP请求线程 XHR所在的线程

- 任务分为两种 

  - 宏任务
    - script全部代码 setTimeout setInterval setImmediate IO UI Rendering

  - 微任务

    - Process.nextTick（Node） **Promise**  object.observe（废弃） MutationObserver

  - ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/18/16860ae5ad02f993~tplv-t2oaga2asx-watermark.awebp)

  - ```javascript
    console.log('script start')
    
    //async 本质上一个promise
    async function async1() {
    //await 会阻塞后面的代码
      await async2()
    //await后面的代码 好比一个新then函数
      console.log('async1 end')
    }
    async function async2() {
      console.log('async2 end') 
    }
    async1()
    
    setTimeout(function() {
      console.log('setTimeout')
    }, 0)
    
    new Promise(resolve => {
      console.log('Promise')
      resolve()
        consolve.log('promsie resolve')
    })
      .then(function() {
        console.log('promise1')
      })
      .then(function() {
        console.log('promise2')
      })
    
    console.log('script end')
    
    /*
     script start
     async2 end
     Promise
     promsie resolve
     script end
     async1 end
     promise1
     promise2
     setTimeout
    */
    
    async function async1() {
        console.log('async1 start');
        await async2();                
        console.log('async1 end');
    }
    async function async2() {
        await async3(); 
        console.log('async2');
    }
    async function async3() {
        console.log('async3');
    }
    console.log('script start');
    setTimeout(function() {
        console.log('setTimeout');
    }, 0)
    async1();
    new Promise(function(resolve) {
        console.log('promise1');
        resolve();
    }).then(function() {
        console.log('promise2');
    });
    console.log('script end');
    /*
    script start
    async1 start
    async3
    promise1
    script end
    async2
    promise2
    async1 end
    undefined
    setTimeout
    */
    ```



# Node EventLoop

Node.js的运行机制如下:

- V8引擎解析JavaScript脚本
- 解析后的代码，调用Node API
- libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎
- V8引擎再将结果返回给用户

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/12/16841bd9860c1ee9~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

**timer**

执行setTimeout setInterval回调

**poll**

执行顺序：

​	回到timer阶段执行回调

​	执行I/O回调

**check**

​	Process.nextTick的优先级大于其他的微任务

在Node.js中 微队列存在队列顺序 按先进先出的原则

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/12/16841d5f85468047~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

**区别**

​	在同步代码上的处理保持一致

​	浏览器环境下，microtask的任务队列是每个**macrotask执行完之后**执行。而在Node.js中，microtask会在事件循环的**各个阶段之间**执行，也就是一个阶段执行完毕，就会去执行microtask**完成队列**的任务

​	在node - 11 版本上 执行顺序和浏览器保持一致

```javascript
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
/* node 中执行顺序 */
//start end promise3 timer1 timer2 promise1 promise2
/* 浏览器 中执行顺序 */
//start end promise3 timer1 promise1 timer2 promise2
```

