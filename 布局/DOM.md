### 获取DOM操作

document.getElementById()

document.getElementByClassName()

document.getElementByTagName()

document.querySelector()（css选择器）只能获得第一个元素

document.querySelectorAll()

### 获得元素位置

引起回流：

clientWidth = 内部width + 左右padding不包括垂直滚动条、边框和外边距

clientHeight = 内部height + 上下padding表示元素内部的高度，包含内边距，但不包括水平滚动条、边框和外边距

HTMLElement.clientLeft相当于border-left的宽度HTMLElement.clientTop`相当于border-top的宽度

offsetWidth offsetHeight 获得元素在包括border padding content大小

offsetLeft offsetTop offsetRight offsetbuttom 获得该元素的相对于父的定位位置

scroll 滑动

 

getBoundingclientRect（） 返回一个对象 相对于视口 不是绝对位置 left top会改变

Window.getComputedStyle()



 ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56ea066a9fde469a8a5dfd86021b3fe7~tplv-k3u1fbpfcp-watermark.awebp)



### CSS选择器优先级

`!important>行内样式>ID选择器>类、伪类、属性>元素、伪元素>继承>通配符`

###### 属性

[attribute=value] 选择满足value的元素

[attribute~=value] 选择包含value**单词**的元素

[attribute^=value] 选择开头包含value的元素

[attribute$=value] 选择结尾包含value的元素

[attribute*=value] 选择包含value子串的元素

[attribute|=value] 选择开头只包含value唯一的元素

###### 伪类

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/310652ad0bf040cda0b17b4054cecaa1~tplv-k3u1fbpfcp-watermark.awebp)

:nth-child(n) 孩子选择器

:nth-of-type(n) 同类型的第n个元素

element:first-child 选择父元素element的第一个子元素。 等同 :nth-child(1)

element:last-child 选择父元素element的最后一个子元素。
element:first-of-type 同类型的第一个子元素

element:last-of-type 同类型的最后一个子元素
element:only-child 选择了父元素 element 唯一的子元素



a:link 没有访问的状态

a:active 连接正在被点击状态

a:hover鼠标放置状态

a:visited 已经访问过的状态

：focus 获得焦点

：disabled 禁用的input

：check 被选中的input

###### 伪元素

::first-line 第一行

::first-letter 第一个字符

::before 元素前插入内容

::after 元素后插入内容

::selection 元素被选中

###### 兄弟选择器

element>element 选择父元素为element 的所有为element 的子元素

element +element  选择在element 元素会后的element 元素

element ~element  选择在element 元素后所有element 元素

通配符 *