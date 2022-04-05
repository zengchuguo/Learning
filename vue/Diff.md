#### 虚拟DOM如何被渲染函数产生 diff算法原理 虚拟DOM如何装阿虎成真正的DOM

#### 什么是虚拟DOM

​	是一个js对象 描述真实DOM的结构信息 里面包含sel选择器 data数据 text文本内容 children子节点等

#### 为什么需要虚拟DOM

1. 前端的性能优化尽可能选择减少DOM操作 然后虚拟DOM能在patch（比较新旧节点去更新视图）尽可能将一次性差异更新到DOM中

2. 改变虚拟DOM状态不会立即去更新DOM 而是对更新的内容进行更新

3. 跨平台 SSR渲染的话 

   

#### 通过渲染函数生成虚拟DOM（template - 渲染函数 - 虚拟DOM（vnode）- 真实的DOM

tempalte：

```js
<a href = "http://www.baidu.com">百度</a>
```

渲染函数：使用h函数生成对应的虚拟节点

```js
 h('a',{ props: {href: 'http://www.baidu.com'}, '百度'})
```

虚拟DOM：

```js
{ sel: 'a', data: { props: {href: 'http://www.baidu.com'}}, text: "百度"}
```

真实DOM：

```js
<a href = "http://www.baidu.com">百度</a>
```

简单的h函数生成虚拟DOM

```js
// vnode.js 返回虚拟节点
export default function(sel, data, children, text, elm) {
    // sel 选择器 、data 属性、children 子节点、text 文本内容、elm 虚拟节点绑定的真实 DOM 节点
    const key = data.key
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}


// h.js h函数 生成vnode（虚拟DOM）
import vnode from './vnode'/* 返回的vnode */
// 情况①：h('div', {}, '文字')
// 情况②：h('div', {}, [])
// 情况③：h('div', {}, h())
/*
  c 参数是文字说明是没有子节点
  c 参数是数组说明存在子节点数组
  c 参数数h（）对象说明是一个节点
*/
export default function (sel, data, c) {
  // 判断是否传入三个参数
  if (arguments.length !== 3) throw Error('传入的参数必须是三个参数')
  // 判断c的类型
  if (typeof c === 'string' || typeof c === 'number') {
    // 情况①
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 情况②
    // 遍历
    let children = []
    for (let i = 0; i < c.length; i++) {
      // 子元素必须是h函数
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw Error('数组中有一项不是h函数')
      }
      // 收集子节点 不需要执行 因为数组里面已经执行h函数来
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 直接将子节点放到children中
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw Error('传入的参数格式不对')
  }
}
```

虚拟DOM转化成真实DOM

createElement 然后再插入到对应的节点中 appendchild/inserrtBefore 

#### DIff算法-diff过程就是pacth函数的调用

​	key是当前节点的唯一标识 告诉diff算法 更改前后是同一个DOM节点

​	只有是同一个虚拟节点（选择器sel 和key是否相同） diff算法才进行精细化比较 否则就暴力删除 插入新的节点

​	只进行同层比较 不会进行跨层比较 一旦跨层后就暴力删除旧的 插入新的节点

#### Patch函数-判断是否是用一个节点 是的话进行精细化比较 不是则暴力删除 插入新的节点

通过appendchild inserrtBefore 进行上树的效果



新旧节点判断

- 是同一个节点 

​		比较新旧节点 调用updateChildren方法更新

​	updateChildren方法是将新旧节点都提取处理 使用**双指针**进行**四种优化策略**循环比较

- 不是同一个节点 将旧节点删除 插入新的虚拟节点 使用createElement函数创建真实的DOM

