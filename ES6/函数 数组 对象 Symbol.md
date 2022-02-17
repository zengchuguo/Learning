# 函数扩展

- 默认参数变量是默认声明的 不是使用let const

```javascript
function f(x = 5){
	let x = 1;//error
	const x = 2;//error
}
```

- 函数的length（）返回非默认传入的参数
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
- 尾调用
  -  大概意思： 函数最后返回一个函数
  - 尾调用优化 只在严格模式下

# 数组扩展

- spread rest的逆运算
- 数组作为参数传入参数 `function(...array)`
-  实现Iterator接口的对象能 使用扩展运算符转为 数组 `eg:[...class]`
- `Array.from(class)`转化成数组 
  - 能将有length属性的对象 转化成数组 不需要实现Iterator接口
  - 第二个参数类似map方法对元素处理后返回
- `Array.of（）`方法用于将一组值转化成数组
- `find（callback）`返回第一个 callback返回值为true的成员  诺无返回undefined
- `findIndex（callback）`返回符合成员的下标数组
- `fill（参数`）填充数组 参数1：填充数值 参数2：初始位置（默认0  参数3：终止位置（默认length-1
- 遍历器对象能使用`next（）`遍历
  - `entries（）`键值对的遍历
  - `keys（）` 建名遍历
  - `values（`）键值遍历
- 对空值不同方法不同的处理方式

# 对象扩展

- 比较值是否相等 == or === 都会自动转化数据类型
- `Object.is( )`比较值是否相同
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
- `Object.getPrototypeOf()`获得原型对象 
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