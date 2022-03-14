- 在动态组件中的应用

```javascript
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <component :is="currentComponent"></component>
</keep-alive>
```

- 在vue-router中的应用

```javascript
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <router-view></router-view>
</keep-alive>
```

对于max 采用LRU算法：淘汰最近最久未被使用的

源码

```javascript
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真是dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number] // 缓存的组件实例数量上限
  },

  created () {
    this.cache = Object.create(null) // 缓存虚拟dom
    this.keys = [] // 缓存的虚拟dom的健集合
  },

  destroyed () {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 实时监听黑白名单的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
   /*
   第一步：获取keep-alive包裹着的第一个子组件对象及其组件名；
	第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；
	第三步：根据组件ID和tag生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键），否则执行第四步；
	第四步：在this.cache对象中存储该组件实例并保存key值 检查缓存数量是否超过max的设置值 超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key
	第五步：将该组件实例的keepAlive属性值设置为true 使得拥有钩子函数。
   */
  }
}
```

钩子函数

​	可以看出，当`vnode.componentInstance`和`keepAlive`同时为truly值时，不再进入`$mount`过程，那`mounted`之前的所有钩子函数（`beforeCreate`、`created`、`beforemounted` `mount`）都不再执行。

​	activated 缓存阶段执行

​	deactivated 当移除缓存界面时候触发