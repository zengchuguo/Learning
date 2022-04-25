Vue.js2 和 Vue.js3区别

- 响应数据
- V

Vue3新特性

- 性能

  - 虚拟DOM的重写 
  - 打包大小减少( `tree shaking`)
  - 初次渲染快
  - 内存使用减少(`compositionAPI`)

- 新增语法(`compositionAPI`)

  - ref和reactive

  - computed和watch

  - 新的生命周期函数

  - 自定义函数-Hooks函数(`像React Hooks`)

    .......

- 其它新赠特性

  - Teleport 瞬移组件
  - Suspense 异步加载组件
  - 全局API的修改和优化
  - Custom renderer

- 任何的修改都已经移到全局的实例上去

  全局配置

  - Vue.config 改成 app.config

  全局注册类API

  - Vue.component  改为 app.component
  - Vue.directive 改为 app.directive

  行为扩展类API

  - Vue.mixin 改为 app.mixin
  - Vue.use 改为 app.use

- 更好的Typescript支持



响应式数据在Vue3进行包装 需要`.value`得到数据