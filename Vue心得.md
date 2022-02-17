# **VUE心得**

- 在compute：定义好比data的数据 双向变化(能绑定到**v-model**数据信息 生成那一个对象中

  例如：对象（）：return 对象 或者 对象属性信息

- methods computed watch(定义都是方法） 在调用的时候只是对名称调用（.部分情况下需要有返回值

  - methods 每次调用都是全新生成调用de
  - computed 和 watch（有新旧值）的调用是缓存中调用（.在第一次生成后 后面的使用直接调用 
  - （只要运算所依赖的数据没有发生变化就会从缓存中取出结果）

# Vue3

- 在vue3中使用vue2的ref toref torefs reactive 需要从vue导入
- 

```javascript
data(){
    reutrn {
        对象，
        数据类型
    }
}
//存在有函数作用域 不会造成变量污染

//setup响应式数据：数据变化，页面跟着渲染变化。
//通过ref reactive torefs 来定义变量
setup{
	    
}
```

## ref toref torefs reactive

响应式引用的原理：通过proxy对数据进行封装，当数据变化时，触发模版等内容的更新。

- ref 返回响应式且可变的ref对象  一个基本类型值
- reactive返回响应式且可变的对象 一个对象值

**数据结构之后在返回不具备响应式**

- toRefs将响应式对象转化成普通对象
- toRef



- 事件修饰符 
  - stop
  - prevent等等
