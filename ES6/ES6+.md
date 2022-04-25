#### `?.`

​	可选链操作符 读取位于对象链深处的属性值（好比  . 链式操作符

​	特点：在引用是null 或undefined情况下不会引起错误

####  `??`

​	逻辑运算符 当左侧的操作数为 null 或者 undefined 时 返回右侧操作数

​	和 `||` 区别	后者对于 false  ‘ ’ 等等也会返回右侧操作数

```javascript
console.log(false || 'default string') // default string
console.log('' || 'default string')    // default string

console.log(false ?? 'default string') // false
console.log('' ?? 'default string') // ''
```

