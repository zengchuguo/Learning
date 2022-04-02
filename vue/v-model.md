#### 本质

​	一种语法糖 对组件输入数据的绑定的效果(props emit)

#### input

![image-20220327235929912](E:\学习心得\前端\view\image-20220327235929912.png)

#### 副作用

​	当父组件向子组件传递父组件本身没有的数据时候 会给父组件动态添加一个响应式数据

#### 开发

基于利用model接受父传递的数据 事件名

```js
<template>
<div>
  我们是TI{{ name }}冠军
  <el-button @click="playDota2(1)">加</el-button>
  <el-button @click="playDota2(-1)">减</el-button>
</div>
</template>
<script>
export default {
  props: {
    ame: {
      type: Number,
      default: 8
    }
  },
  model: { // 自定义v-model的格式
    prop: 'name', // 代表 v-model 绑定的prop名
    event: 'test' // 代码 v-model 通知父组件更新属性的事件名
  },
  methods: {
    playDota2(step) {
      const newYear = this.ame + step
      this.$emit('test', newYear)
    }
  }
}
</script>
```

```js
// template中
<dota v-model="ti"></dota>
// script中
export default {
  data() {
    return {
      ti: 8
    }
  }
}
```

