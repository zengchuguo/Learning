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

    - Process.nextTick（Node） Promise object.observe（废弃） MurationObserver

  - ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/18/16860ae5ad02f993~tplv-t2oaga2asx-watermark.awebp)

  - ```javascript
    console.log('script start')
    
    //async 本质上一个promise
    async function async1() {
    //await 会阻塞后面的代码
      await async2()
    //await好比一个新then函数
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