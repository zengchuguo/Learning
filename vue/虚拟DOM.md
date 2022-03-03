### 背景

​	随着项目上不断扩展，所操作DOM次数增加，带来极大性能损耗（在更新节点时候 直接去除旧节点 性价比并不高

​	React Angular对DOM处理 React的虚拟DOM操作 Angular脏检查

​	Vue.js 1.0 更细粒度绑定更新视图（能直接知道什么节点使用已改变的状态 直接对节点操作 不需要对比 但有极大内存开销以及一些依赖追踪的开销

​	Vue.js 2.0 中等粒度———**虚拟DOM**

### 作用

1. 提升性能 减少对不必要的DOM操作

### 虚拟DOM

<img src="C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220221194039493.png" alt="image-20220221194039493" />

### VNode

​	不同类型的vnode实例表示不同类型的DOM元素 描述怎么去创建真实的DOM节点 

​	每次渲染视图是都是先创建vnode，然后使用它创建真实DOM插入到页面中 因此在后面每次需要重新渲染视图时 将新创建vnode和上一次缓存vnode进行比较 找出这些不一样的地方并基于此去修改真实的DOM

​	当状态发送变化时 只通知到组件级别 然后组件内使用虚拟DOM渲染视图

#### 类型

​	**注释节点** text isComment

​	**文本节点** text

​	**元素节点** tag data children context

​	组件节点 componentOptions（参数） componentInstance

​	函数式节点 functionalContext functionalOptions

​	克隆节点 isCloned

### Diff

​	Diff算法只会比较同一层级的节点

### **patch**

​	目的：对比新旧vnode区别 根据结找到需要更新节点进行更新

​	因为DOM操作的执行速度远不如js的运算速度 把大量的DOM操作由js执行 大大减少DOM操作 显著提升性能

#### 新增/删除节点

![image-20220221210453859](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220221210453859.png)![image-20220221210701124](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220221210701124.png)

#### 更新节点

​	<img src="C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220221211410500.png" alt="image-20220221211410500" style="zoom:200%;" />

源码逻辑

![image-20220221211506000](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220221211506000.png)

#### 子节点操作

### v-for 的key的设置

​	key作用 在新旧虚拟节点比较时候（比较时候 会根据key值判断某个值是否发生修改

​	如果没有key 不能很好重用旧的节点 