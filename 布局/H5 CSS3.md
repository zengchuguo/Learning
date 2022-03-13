### CSS3

- 边框

| 属性                                                         | 说明                                           |
| ------------------------------------------------------------ | ---------------------------------------------- |
| [border-image](https://link.juejin.cn/?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-border-image.html) | 设置所有边框图像的速记属性。                   |
| [border-radius](https://link.juejin.cn/?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-border-radius.html) | 一个用于设置所有四个边框- *-半径属性的速记属性 |
| [box-shadow](https://link.juejin.cn/?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-box-shadow.html) | 附加一个或多个下拉框的阴影                     |

- 背景

| 顺序                                                         | 描述                     |
| ------------------------------------------------------------ | ------------------------ |
| [background-clip](https://link.juejin.cn/?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-background-clip.html) | 规定背景的绘制区域。     |
| [background-origin](https://link.juejin.cn/?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-background-origin.html) | 规定背景图片的定位区域。 |
| [background-size](https://link.juejin.cn/?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-background-size.html) | 规定背景图片的尺寸。     |

- 渐变
- 文本效果

| 属性                                                         | 描述                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| [hanging-punctuation](https://link.juejin.cn?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-hanging-punctuation.html) | 规定标点字符是否位于线框之外。                          |
| [punctuation-trim](https://link.juejin.cn?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-punctuation-trim.html) | 规定是否对标点字符进行修剪。                            |
| text-align-last                                              | 设置如何对齐最后一行或紧挨着强制换行符之前的行。        |
| text-emphasis                                                | 向元素的文本应用重点标记以及重点标记的前景色。          |
| [text-justify](https://link.juejin.cn?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-text-justify.html) | 规定当 text-align 设置为 "justify" 时所使用的对齐方法。 |
| [text-outline](https://link.juejin.cn?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-text-outline.html) | 规定文本的轮廓。                                        |
| [text-overflow](https://link.juejin.cn?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-text-overflow.html) | 规定当文本溢出包含元素时发生的事情。                    |
| [text-shadow](https://link.juejin.cn?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-text-shadow.html) | 向文本添加阴影。                                        |
| [text-wrap](https://link.juejin.cn?target=http%3A%2F%2Fwww.runoob.com%2Fcssref%2Fcss3-pr-text-wrap.html) | 规定文本的换行规则。                                    |

- 转换和变形
  - 例如2D 转化成 3D效果
- 过渡属性（transition
- 动画（animation
- 媒体查询——增添其中的关键字
  - and
  - or
  - not

### H5

- 语义化标签

| 标签                  | 描述                             |
| --------------------- | -------------------------------- |
| <header></header>     | 定义了文档的头部区域             |
| <footer></footer>     | 定义了文档的尾部区域             |
| <nav></nav>           | 定义文档的导航                   |
| <section></section>   | 定义文档中的节（section、区段）  |
| <article></article>   | 定义页面独立的内容区域           |
| <aside></aside>       | 定义页面的侧边栏内容             |
| <detailes></detailes> | 用于描述文档或文档某个部分的细节 |
| <summary></summary>   | 标签包含 details 元素的标题      |
| <dialog></dialog>     | 定义对话框，比如提示框           |

- 表单——（时间（日期 周 年 等等）

| 输入类型       | 描述                         |
| -------------- | ---------------------------- |
| color          | 主要用于选取颜色             |
| date           | 从一个日期选择器选择一个日期 |
| datetime       | 选择一个日期（UTC 时间）     |
| datetime-local | 选择一个日期和时间 (无时区)  |
| email          | 包含 e-mail 地址的输入域     |
| month          | 选择一个月份                 |
| number         | 数值的输入域                 |
| range          | 一定范围内数字值的输入域     |
| search         | 用于搜索域                   |
| tel            | 定义输入电话号码字段         |
| time           | 选择一个时间                 |
| url            | URL 地址的输入域             |
| week           | 选择周和年                   |

- 表单属性
  - placehoder 属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。
  - required 属性，是一个 boolean 属性。要求填写的输入域不能为空
  - pattern 属性，描述了一个正则表达式用于验证<input> 元素的值。
  - min 和 max 属性，设置元素最小值与最大值。
  - step 属性，为输入域规定合法的数字间隔。
  - height 和 width 属性，用于 image 类型的 <input> 标签的图像高度和宽度。
  - autofocus 属性，是一个 boolean 属性。规定在页面加载时，域自动地获得焦点。
  - multiple 属性 ，是一个 boolean 属性。规定<input> 元素中可选择多个值。　

- 视频和音频——(audio video)
- Canvas 绘画
- 地理定位——Geolocation
- 拖放API
  - `ondragstart` 	  触发拖动时就会执行
  - `ondrag`                  触发拖动后拖动元素过程触发
  - `ondragend`            拖动结束后触发
  - `ondragenter`        当拖动的元素进入绑定的元素区域里就会触发
  - `ondragover `          当拖动的元素在放置的元素区域里移动就会触发
  - `ondrop `                   当拖动的元素在放置的元素区域里释放就会触发
- 本地存储等
- WebSocket 跨域通信

