# Set

- 类似于数组 成员值是唯一的 没有重复
- 方法
  - 操作方法
    - `add（value）` 添加value
    - `delete（value）` 删除value
    - `has（value）` 返回一个布尔值 表示参数是否含有
    - `clear（）` 清楚所有成员
  - 遍历方法
    - `keys（）` 返回键名的遍历器 和values（）的行为一致
    - `values（）` 返回键值的遍历器
    - `entries（）` 返回键值对的遍历器
    - `forEach（）` 遍历成员
- 转化成数组的扩展运算符 (...)
- `WeakSet` 成员只能是对象 **弱引用**
  - 没有length（） 属性  不能进行遍历
  - 用处 存储DOM节点 

# Map

- 任何类型的值都可以作为键 例如对象
- 同一个键多次赋值 和覆盖之前值
- 方法
  - `set（key，value）`
    - 返回当前的Map对象 因此能采用链式写法
    - key如果有值 键值会进行更新 否则新建一个
  - `get（key） `返回对应的键值 或undefined
  - `has（key）` 返回布尔值 
  - `delete（key）` 删除键 返回布尔值
  - `clear（）`清空所有成员
- 遍历方法
  - `keys（） `返回键名的遍历器 和values（）的行为一致
  - `values（）` 返回键值的遍历器
  - `entries（） `返回键值对的遍历器
  - `forEach（）` 遍历成员
- Map和其他数据结构的互相转换
- `WeakMap` **弱引用**
  - 只接受对象作为键名（null除外
  - 键名指向的对象不计入垃圾回收机制
