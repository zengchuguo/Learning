### `BFC`

`BFC`立的空间（布局环境） 让空间内的子元素不会影响到外面的布局

#### 触发`BFC`

1. 根元素
2. `overflow：hidden` 或  不为 none
3. `display：inline-block inline-flex table-cell`  不为 block content
4. `display：flex`
5. `position：absolute fixed`
6. float 不为 none

#### `BFC`规则

- 是一个块级元素 不会和 float box 重叠
- 垂直方向的距离有margin决定 相邻的标签外边距会重叠 上下发生塌陷
- 计算`BFC`高度 浮动元素也参与其中（目的：解决高度塌陷

#### 作用

- 让父元素包含子浮动元素 不会造成高度塌陷

- 两三栏布局 （基于 `BFC ` 并不会和 float 元元素重叠

  [两栏三栏布局]: E:\学习心得\前端\布局\两栏三栏布局.md

- margin重叠 

### 常规流 浮动 绝对定位

​	浮动 位于当前**行的开头或末尾**  导致常规流环绕在他的周围

​	绝对定位 不影响常规流

### 高度塌陷

​	父元素的内容没有被子元素撑起来

```html
<div class="parent">
    <div class="child">child1</div>
    <div class="child">child2</div>
 </div>

<style>
.parent {
	background-color: antiquewhite;
}
.child {
	margin: 10px;
	width: 100px;
	height: 100px;
	background-color: aquamarine;
	float: left;
}
</style>
```

![image-20220310130338589](E:\学习心得\前端\view\image-20220310130338589.png)

能很明显看出 parent 元素的内容高度塌陷

解决方案： 将父元素设置成BFC

```html
.parent {
	background-color: antiquewhite;
	overflow: hidden; <!-- 设置成BFC -->
}
```

![image-20220310130628631](E:\学习心得\前端\view\image-20220310130628631.png)

### margin重叠 

兄弟之前的垂直 margin 会有重叠

计算方式：

- 都是正数 取最大的
- 都是负数 取绝对值最大的
- 一正一负 取两者相加的结果					

```html
<div class="left">child1</div>
<div class="right">child2</div>

.left{
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  border: 1px solid red;
}
.right{
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border: 1px solid red;
}
```

![image-20220310132207241](E:\学习心得\前端\view\image-20220310132207241.png)

很明显看到两个 div 之间的间隔只有 20px 并不是 20 + 10 的形式

解决方案：设置一个`BFC` 包裹着right（基于 `BFC` 子元素布局不影响到外部的布局

```html
<div class="left">child1</div>
<div class="content">
  <div class="right">child2</div>
</div>

.left {
	width: 100px;
	height: 100px;
	margin-bottom: 20px;
	border: 1px solid red;
	overflow: hidden;
}
.right {
	width: 100px;
	height: 100px;
	margin-top: 10px;
	border: 1px solid red;
	overflow: hidden;
}
.content {
	overflow: hidden;
}

```

 

