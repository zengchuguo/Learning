### 传统布局

传统布局主要依靠的是display+position+float属性

盒子模型margin border padding content

怪异盒子margin width height（border padding content）

### Flex布局

![image-20220226191644460](E:\学习心得\前端\view\image-20220226191644460.png)

![image-20220226191537174](E:\学习心得\前端\view\image-20220226191537174.png)

### Grid

属性

grid-template-columns 属性， grid-template-rows 属性 设置每一列行的大小

​	fr设置后者的大小是前者的两倍

grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性

​	设置行与行之间的间隔 	列之间间隔   后者是前两者的缩写

grid-template-areas

​	设置一个区域由单个或多个单元格组成

 grid-auto-flow

​	设置布局的方式 默认是 row  可修改成 column

**单元属性**

justify-items 属性， align-items 属性， place-items 属性

​	设置成单元内容 左中右形式 start | end | center | stretch  后者是前者的缩写

justify-content 属性， align-content 属性， place-content 属性

​	设置全部的单元格在容器上的排列情况  后者是前者的缩写

`grid-column-start`属性：左边框所在的垂直网格线

`grid-column-end`属性：右边框所在的垂直网格线

`grid-row-start`属性：上边框所在的水平网格线

`grid-row-end`属性：下边框所在的水平网格线
