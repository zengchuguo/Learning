# 函数扩展

- 默认参数变量是默认声明的 不能使用let const

```javascript
function f(x = 5){
	let x = 1;//error
	const x = 2;//error
}
```

- 函数的length（）返回 非默认值的参数的个数
- `...rest`获取函数的多余参数
- 函数严格模式
  - 因函数执行先执行参数  再函数体
  - 因此参数不能使用默认值 解构赋值 扩展运算符
- name属性 得到该函数名
- 箭头函数
  - this对象：定义时**所在**的对象
  - 不能作为构造函数 没有this导致内部的this就是外部的this
  - 只能用rest 不能使用arguments
  - 不是使用yield 因此不能作为Generator函数
- 绑定this
  - `::`将左边的对象作为上下文环境（this对象） 绑定到右边的函数上
- 尾调用
  -  大概意思： 函数最后返回一个函数执行（不能有赋值、调用后操作等等
  -  作用：
     -  如果使用递归调用 会同时保存很多调用栈 容易发生溢出（对于尾递归 值存在一个调用栈
  - 尾调用优化 只在严格模式下



# 对象扩展

- 比较值是否相等 == or === 都会自动转化数据类型
- `Object.is( )`比较**左右两参数值**是否相同（比较+-0 和NaN
- `Object.assign()`将源对象的所有可枚举属性复制到目标对象
  - 目标对象为第一个参数
  - 同名属性 后者覆盖前者
  - 该参数不是对象 自动转化对象后在处理
  - 复制 浅复制 复制引用 会受到其他引用条件的影响
  - 作用：
    - 给对象直接添加属性 方法
    - 克隆对象 - 简单克隆不继承它的值
    - 合并多个对象
- `__proto__`属性 获取当前实例的构造函数的prototype对象
- `Object.setPrototypeOf()`设置第一个参数的prototype对象为第二个参数 
- `Object.getPrototypeOf()`获得**参数**的原型对象 
- 解构赋值
  - 浅赋值 引用值的赋值情况
  - 不会继承原型对象的属性
  - 双重解构赋值
- Null传导运算符 来判断是否返回null或undefined

# Symbol 原始类型值

- Symbol值不能与其他类型的值进行运算 
- Symbol能转化成字符串和布尔值
- 对象属性
  - 不能使用点运算符 点运算符后面总是字符串
  - Symbol值必须放在方括号
- `Symbol.for()`搜索有无该参数名的值 并返回
- `Symbol.keyFor`返回一个已登记的Symbol类型的key值
- 内置的Symbol值