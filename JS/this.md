**this指向 当前作用域的上一级的this**

#### 全局环境

​	this 直接指向全局对象

​	如果普通函数在全局环境中被调用 非严格模式也指向全局对象 严格模式则是undefined

#### 对象调用

​	当函数作为对象的方法被调用时 函数的this指向调用的对象

特殊点

```javascript
 var obj = {
   b: function () {
     console.log(this === obj); // true
     console.log(this); // {b: f}
     // 执行foo函数 好比全局调用函数
     foo();

     function foo() {
       console.log(this === obj); // false
       console.log(this); // Window 全局对象
     }
   }
 }

 obj.b();
```

#### 构造器调用

​	在构造函数内 this指向实例对象

#### call apply bind

​	动态修改 this 指向

#### 箭头函数

​	没有自己的this this是通过函数或函数表达式继承来的（继承外层函数的this 

​	**tips**：

​		除了箭头函数 this的绑定是基于动态的 

​		简单说 call aplly bind 的强制修改this 

​		如果是对象调用 this指向该对象

​		如果构造器（new） this则绑定该实例对象

​		否则 this 就指向全局对象

​		setTImeout（func，delay）中的func好比新定义一个变量 因此this 指向全局

​	**特点**

​	函数体内的this对象，继承的是外层代码块的this。

​	不可以当作构造函数，也就是说，不可以使用new命令

​	不可以使用arguments对象 可以用 rest 参数代替。

​	不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

​	箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向

#### 优先级

​	new 显示绑定（call apply bind） 对象调用 全局调用

#### test

```javascript
function sayHi(){
    console.log('Hello,', this.name);
}
var person1 = {
    name: 'YvetteLau',
    sayHi: function(){
        setTimeout(function(){
            console.log('Hello,',this.name);
        })
    }
}
var person2 = {
    name: 'Christina',
    sayHi: sayHi
}
var name='Wiliam';
person1.sayHi();
setTimeout(person2.sayHi,100);
setTimeout(function(){
    person2.sayHi();
},200);

/*
Hello, Wiliam
Hello, Wiliam
Hello, Christina
*/


/* 箭头函数 */
var obj = {
    hi: function(){
        console.log(this);
        return ()=>{
            console.log(this);
        }
    },
    sayHi: function(){
        /* return a = new function的效果 因此 this 指向全局 */
        return function() {
            console.log(this);
            return ()=>{
                console.log(this);
            }
        }
    },
    /* 好比 function say(){} 因此外层作用域是obj 而obj的this 是全局对象*/
    say: ()=>{
        console.log(this);
    }
}
let hi = obj.hi();  //输出obj对象
hi();               //输出obj对象
let sayHi = obj.sayHi();
let fun1 = sayHi(); //输出window
fun1();             //输出window
obj.say();          //输出window
```

