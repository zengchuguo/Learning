#### 数据相关实例方法

`vm.$watch`



`vm.$set`

监听新建响应式数据属性

`vm.$delete`

删除响应式数据属性

#### 事件相关实例方法

`vm.$on(event, callback)`

监听当前实例上的自定义事件（事件由`vm.$emit`触发）

```js
this.$on('chuguo',function(data){
  console.log(data);
})

this.$emit('chuguo','hi')
```

`vm.$once(event, callback)`

自定义一个事件 但只触发一次 在第一次触发之后移除监听器

`vm.$off(event, callback)`

删除事件的监听器

​	如果没有提供参数 移除所有事件监听器

​	如果提供事件 没有对应的监听器 删除该事件的全部监听器

​	如果提供事件 监听器 才会删除对应的监听器

`vm.$emit(event, [...args])`

事件提交触发

#### 生命周期相关实例方法

`vm.$mount`

创建并挂载到DOM上去 挂载完成后会触发mounted钩子函数

`vm.$foreUpdate`

迫使实例重新渲染

`vm.$nextTick`

接受一个回调函数作为参数 作用将回调的延迟到下一次的DOM更新周期之后执行 this自动绑定在调用它的实例上

`vm.$destroy`

销毁一个实例 清除该实例与其他的实例的链接 并解绑其所有全部指令和监听器（本质上是调用`vm.$off`