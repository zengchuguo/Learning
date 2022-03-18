### DOM（文档对象模型

​	DOM把整个页面规划成由节点层级构成的文档

### BOM（浏览器对象模型

核心：window 存在五种属性：

- documents

- Frames
- History
  - 保存用户的上网历史记录 
  - `go()`  前往目标页面
  - `forward()`  向前跳转页面
  - `back()` 向后跳转页面
  - `length` 获得历史记录数
- Location
  - 获取当前URL信息

| 属性名   | 例子                                                         | 说明                                |
| -------- | ------------------------------------------------------------ | ----------------------------------- |
| hash     | #12345                                                       | utl中#后面的字符，没有则返回空串    |
| host     | [www.baidu.com:80](https://link.juejin.cn?target=http%3A%2F%2Fwww.baidu.com%3A80) | 服务器名称和端口号                  |
| hostname | [www.baidu.com](https://link.juejin.cn?target=http%3A%2F%2Fwww.baidu.com) | 域名，不带端口号                    |
| href     | [www.baidu.com:8080/web/javascr…](https://link.juejin.cn?target=http%3A%2F%2Fwww.baidu.com%3A8080%2Fweb%2Fjavascript%2Ftest.js%2312345%3Fa%3D10%26b%3D20) | 完整url                             |
| pathname | web/javascript/test.js                                       | 服务器下面的文件路径                |
| port     | 8080                                                         | url的端口号，没有则为空             |
| protocol | http                                                         | 使用的协议                          |
| search   | ?a=10&b=20                                                   | url的查询字符串，通常为？后面的内容 |

- Navigator
  - 获取当前浏览器的属性 类型等
- Screen
  - 获得客户端显示屏幕大小