# 深入理解JavaScript作用域



## 1. 什么是作用域

作用域是代码中的某些特定部分中变量，函数和对象的可访问性。

换句话说，作用域决定了代码区块中变量和其他资源的生命周期和可见性。变量在作用域之外是不可见的。

JavaScript 的作用域包括：

* 全局作用域

* 模块作用域
* **函数作用域**
* 块作用域
* 词法作用域

## 2. 全局作用域

在任何函数、块或模块范围之外定义的变量具有全局作用域。具有全局作用域的变量可以在程序的任意位置访问。

创建全局作用域，

这里分两种情况来说:

* 一种是在具有模块系统的情况下，例如在HTML中，我们可以使用基于AMD或者CMD的模块系统，这时如果要创建全局作用域，需要定义在模块外部，这里的模块本质上就是个闭包函数，也就是在函数外部去创建：

```javascript
<script>
  //定义全局变量
  let GLOBAL_DATA = { value : 1};
  (function(){
    //使用闭包创建的模块
  })()
</script>
console.log(GLOBAL_DATA);
```

*  当没有模块系统时，创建全局变量会容易很多。在任何文件中的函数外声明的变量都是全局变量。
  全局变量贯穿于程序的整个生命周期。

* 另一种创建全局变量的方法是在程序的任意位置使用 window 全局对象：

```javascript
window.GLOBAL_DATA = { value: 1 };
```

这样 GLOBAL_DATA 变量会随处可见。

```
console.log(GLOBAL_DATA)
```

- 所有 window 对象的属性拥有全局作用域

一般情况下，window 对象的内置属性都拥有全局作用域，例如 window.name、window.location、window.top 等等。

全局作用域有个弊端：如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样就会 污染全局命名空间, 容易引起命名冲突。

```javascript
// 张三写的代码中
var data = {a: 100}

// 李四写的代码中
var data = {x: true}
```

这就是为何 jQuery、Zepto 等库的源码，所有的代码都会放在`(function(){....})()`中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者 JS 脚本造成影响。这是函数作用域的一个体现。关于函数作用域我们下面再说。



```js
(function(){
    var count = 0;
  	return function(){
        count++;
    }
})()
```



## 2. 模块作用域

如果不启用模块，在所有函数之外声明的变量是全局变量。在模块中，在函数外部声明的变量都是隐藏的，除非显式导出，否则不可用于其他模块。

导出使函数或对象可用于其他模块。在这个例子中，我从模块文件 a.js 中导出了一个函数：

```javascript
function add(x,y){
	return x + y
}
//导出add函数
module.exports.add = add;
```

当前模块可以通过导入来使用其他模块的函数或对象。

```javascript
//导入其他模块内的变量
let {add} = require('./a.js')

let r = add(2,3)
console.log(r)
```

在Node.js中，也有一个类似Window的顶级对象，就是global对象。所以我们也可以通过把某个**变量挂载到global**对象下，从而创建全局变量。例如：在a.js中：

```javascript
function add(x,y){
	return x + y
}

//把name挂载到global对象下
global.name = 'Davie'
//导出add函数
module.exports.add = add;
```

然后在b.js中可以直接使用name变量

```javascript
let {add} = require('./a.js')

let r = add(2,3)
console.log(r)
console.log(name)
```

不过前提是要导入a.js文件。

## 3. 函数作用域

函数作用域是指在函数内部定义的变量和参数在函数内部任何位置都可以被访问到，但在函数外部不可见。

```javascript
function doSomething(){
    var blogName="Davie";
    function innerSay(){
        alert(blogName);
    }
    console.log(blogName)
    innerSay();
}
alert(blogName); //脚本错误
innerSay(); //脚本错误


```

**作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行**。看个例子:

![image-20210119154645288](https://tva1.sinaimg.cn/large/008eGmZEly1gmt1w4641gj30fs09yq4a.jpg)

最后输出的结果为 2, 4, 12

- 泡泡 1 是全局作用域，有标识符 foo；
- 泡泡 2 是作用域 foo，有标识符 a,bar,b；
- 泡泡 3 是作用域 bar，仅有标识符 c。

## 4. 块级作用域

块作用域用花括号定义。它由 { 和 } 分隔。

用 let 和 const 声明的变量可以受到块作用域的约束，只能在定义它们的块中访问。

思考下面这段关于 let 块范围的代码：

```javascript
let x = 1;
{ 
	let x = 2;
}
console.log(x); //1
```

相反，var 声明不受块作用域的约束：

```javascript
var x = 1;
{ 
	var x = 2;
}
console.log(x); //2
```

另一个常见问题是在循环中使用类似 setTimeout() 的异步操作。下面的循环代码将显示五次数字 5。

```javascript
(function run(){
  for(var i=0; i<5; i++){
    setTimeout(function logValue(){
        console.log(i); //5
    }, 100);
  }
})();
```

带有 let 声明的 for 循环语句在每次循环都会创建一个新的变量并设置到块作用域。下一段循环代码将会显示 0 1 2 3 4 5。（let 改变值得时候就好比是**新生成的变量** 带入到块级作用域中每次的输入都不会相互影响的

```javascript
(function run(){
  for(let i=0; i<5; i++){
    setTimeout(function log(){
    	console.log(i); //0 1 2 3 4
    }, 100);
  }
})();
```

## 5. 词法作用域

词法作用域是内部函数访问定义它的外部作用域的能力。

看一下这段代码：

```javascript
(function autorun(){
  
  let x = 1;
  
  function log(){
  	console.log(x);
  };
  
  function run(fn){
  	let x = 100;
  	fn();
  }
  
  run(log);//1
  
})();//IIFE, 闭包
```

log 函数是一个闭包。它从父函数 autorun() 引用 x 变量，而不是 run() 函数中的 x 变量。

**闭包函数可以访问创建它的作用域，而不是它自己的作用域。**

autorun() 的局部函数作用域是 log() 函数的词法作用域。

## 6. 作用域链

#### 1.自由变量

首先认识一下什么叫做 **自由变量** 。如下代码中，`console.log(a)`要得到 a 变量，但是在当前的作用域中没有定义 a（可对比一下 b）。当前作用域没有定义的变量，这成为 自由变量 。自由变量的值如何得到 —— 向父级作用域寻找（注意：这种说法并不严谨，下文会重点解释）。

**注意var的变量提升**



```javascript
var a = 100
function fn() {
    var b = 200
    console.log(a) // 这里的a在这里就是一个自由变量
    console.log(b)
}
fn()
```

#### 2. 什么是作用域链

如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 作用域链 。

```javascript
var a = 100
function F1() {
    var b = 200
    function F2() {
        var c = 300
        console.log(a) // 自由变量，顺作用域链向父作用域找
        console.log(b) // 自由变量，顺作用域链向父作用域找
        console.log(c) // 本作用域的变量
    }
    F2()
}
F1()
```

#### 3. 自由变量的取值

关于自由变量的值，上文提到要到父作用域中取，其实有时候这种解释会产生歧义。

```javascript
var x = 10
function fn() {
  console.log(x)
}
function show(f) {
  var x = 20
   f() //10，而不是20
}
show(fn) //函数柯里化
```

在 fn 函数中，取自由变量 x 的值时，要到哪个作用域中取？——要到创建 fn 函数的那个作用域中取，**无论 fn 函数将在哪里调用**。

再强调一下：

**要到创建这个函数的那个域”**
作用域中取值,这里强调的是***创建***，而不是***调用***



自由变量的理解：

```javascript
var scope="global";
function t(){
    console.log(scope);//undefined
    var scope="local"
    console.log(scope);//local
}
t();

//var的创建 和 初始化 的提升
//当在函数作用域都定义后 变量上的提升 使得读取到scope 的undefined
var scope="global";
function t(){
    //var 的scope的变量提升到这位置
    console.log(scope);//undefined
    console.log(scope);//undefined
    var scope="local"
}
t();

//当函数作用域没有定义时候 即自由变量 向父找数据
var scope="global";
function t(){
    console.log(scope);//global
    console.log(scope);//global
}
t();

let scope="global";
function t(){
    console.log(scope);//global
    scope="local"
    console.log(scope);//local
}
t();


```



## 7. 总结

* 在全局作用域中定义的变量可在程序的任何位置使用。
* 在模块中，在函数外部声明的变量都是隐藏的，除非被显式导出，否则不可用于其他模块。
* 函数作用域意味着函数中定义的参数和变量在函数的任意位置都可见
* 用 let 和 const 声明的变量具有块作用域。 var 没有块作用域。
* **函数中自由变量的取值是到创建当前函数的那个作用域中取**



## 变量提升

函数 变量的 **创建(代码执行前) 初始化（定义成undefined） 赋值（**

1. let 的「创建」过程被提升了，但是初始化没有提升。
2. var 的「创建」和「初始化」都被提升了。（****
3. function 的「创建」「初始化」和「赋值」都被提升了。





