### `BFC`

`BFC`立的空间（布局环境） 让空间内的子元素不会影响到外面的布局

触发`BFC`

1. `overflow：hidden`
2. `display：inline-block inline-flex`
3. `display：flex`
4. `display：table-cell`
5. `position：absolute`
6. `position：fixed`
7. float 不为 none

`BFC`规则

- 是一个块级元素 不会和 float box 重叠
- 垂直方向的距离有margin决定 相邻的标签外边距会重叠 上下发生塌陷
- 计算`BFC`高度 浮动元素也参与其中

作用

- 让父元素包含子浮动元素 不会造成元素塌陷
- 两三栏布局



高度塌陷

父元素没有设置大小 子元素浮动 子元素会跳出父元素边界

### 常规流 浮动 绝对定位

浮动 位于当前行的开头或末尾 导致常规流环绕在他的周围

绝对定位 不影响常规流

