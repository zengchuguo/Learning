# Iterator

- ES6的for of 对此操作

- `for of`

  - 执行会自动调用对象的迭代器取值
  - 只有实现`Iterator`接口对象才能使用遍历取值
  - 当 `for of`执行的时候，循环过程中引擎就会自动调用这个`对象上的迭代器方法`， 依次执行迭代器对象的 `next` 方法,将 `next` 返回值赋值给 `for of` 内的变量，从而得到具体的值。
  - 数组 Set Map默认调用

- 迭代器对象

  - 默认迭代对象 字符串、数组、map、Set、、typedArray、`arguments` 类数组，NodeList对象（DOM）

    - ```javascript
      数组
      var arr=[100,200,300];
      var iteratorObj=  arr[Symbol.iterator]();//得到迭代器方法，返回迭代器对象
      字符串
      var str='abc';
      var strIteratorObj = str[Symbol.iterator]();//得到迭代器
      ```

- then（）

- return（）

- throw（）

- 并不是所有的类似数组对象都具有Iterator接口 能使用`Array.from`转化成数组

- 遍历
  - forEach
    - 不能中途跳出forEach break和return都不行
  - for in针对对象
    - 数组的键名是数字 但循环遍历的结果是字符串
    - 不仅会遍历数字键名 还会遍历手动添加到其他键 甚至是原型链上的键
    - 某些情况下  循环以任意顺序遍历
  - for of
    - 能中途退出 等等 使用  return break continue 
    - 能遍历所有的数据结构



# Generator 状态机 封装内部状态

作用： 函数“刹车” 能控制函数执行顺序 处理异步操作改写回调函数

- Generator 语法糖 就是函数 好比有多个return 通过`next（）`不断类似 return

- yield表达式只能在Generator函数中 不能在该函数下的 新函数域使用

- next

  - ·Generator函数运行时 能在不同阶段从外部向内部注入不同的值·

    next（param）中的参数作为上一条next（）- yield的返回值 

    第一条next的参数是无效的

  - 

- throw

  - Generator的catch（）只执行一次
  - throw会附带执行下一条yield表达式

- return

  - 返回给定的值 并终止后面的遍历

- yield* 

  - 正常下 Generator函数内部 不会执行到别的Generator函数
  - 采用`yield*` 重新定义成一个Generator的对象就能进行遍历     

## 协程

- 最大特点 可以交出函数的执行权（即暂停执行

# Generator 异步

- Tnunk函数 传名调用
  - 多参数 转化单参数
  - Thunkify模板 生产环境下的转换器

```javascript
fs.read(fileName,callback);

let Thunk = function(fileName){
	return function(callback){
        return fs,read(fileName,callback);
    }
}

let readfile = Thunk(fileName);
readfile(callback);

//ES5/6对简单的Thunk函数转换器
```





### **async/await实际上是对Generator（生成器）的封装**
