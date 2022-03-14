### 请求报文

请求行 + 请求头部 + 空行 + 请求体

请求行：请求方式 + 请求路径 + 请求协议版本

### 响应报文

响应行 + 响应头部 + 空行 + 响应体

响应行： 请求协议版本 + 状态码 + 状态码描述

### 请求方式

get 请求资源

put  修改数据

post 传输实体的主体

head 用法和get一样 但不返回报文主体

delete 删除资源

trace 获得资源的请求-响应路径

options 获取资源支持的方法

connect 建立连接隧道 用于代理服务器

### get和post

get存在缓存

get参数附带在URL后

get的一次性发送 post第一次先将head发送 在得到100后在发送body部分

### 状态码

- **1xx**: 表示目前是协议处理的中间状态，还需要后续操作。
- **2xx**: 表示成功状态。
- **3xx**: 重定向状态，资源位置发生变动，需要重新请求。
- **4xx**: 请求报文有误。
- **5xx**: 服务器端发生错误。

100

101 Switching Protocols 

200  

204 No Content

206 Partical Content 部分资源的请求

301 永久重定位

302 临时重定位

303 see Other 希望资源请求方式为get

304 Not Modified

400 Bad Request 请求报文存在语法错误

401 表示发送的请求需要有通过 HTTP 认证

403 Forbidden

404 找不到目标资源

405 Method Not Allowed: 请求方法不被服务器端允许。

406 Not Acceptable: 资源无法满足客户端的条件。

408 Request Timeout: 服务器等待了太长时间。

409 Conflict: 多个请求发生了冲突。

413 Request Entity Too Large: 请求体的数据过大。

414 Request-URI Too Long: 请求行里的 URI 太大。

429 Too Many Request 客户端发送的请求过多。

431 Request Header Fields Too Large 请求头的字段内容太大。

500 服务器端在执行请求时发生了错误

501 Not Implemented 客户端请求的功能

502 Bad Gateway 服务器自身是正常的 但访问出错了 不清楚错误

503 服务器暂时处于超负载或正在进行停机维护

### 版本变化

1.1 和 1.0 

- 持久化连接 
- 加入缓存处理 强缓存和协商缓存（cahe-Control）
- 管道机制 **Content-length** 声明本次响应的那次的
- 新增请求方法 put delete option
- 头信息新增了 Host 字段 用来指定服务器的域名

2.0 和 1.1

- 2.0 采用二进制传输形成帧形式 1.1 采用明文
- 多路复用
- 头部压缩 
  - 头部信息使用 `gzip` 和 `comprss` 压缩后发送 
  - 客户端和服务端都维护一张头部信息表 所有字段优惠存入表中 生成一个索引号 只发送索引号就可
- 服务器推送：服务器未经请求 主动向客户端发送资源

### 压缩方式

- `gzip`: 当今最流行的压缩格式

- `deflate`: 另外一种著名的压缩格式

- `br`: 一种专门为 HTTP 发明的压缩算法

  ```
  // 发送端
  Content-Encoding: gzip
  // 接收端
  Accept-Encoding: gzip
  
  ```

### Get Post区别

- get支持缓存 post不支持
- get请求参数携带带URL后 有大小的限制（2083） post 携带在body
- get URL编码解析（只能接受ASCll字符） post多种编码解析
- get一般只进行一次请求和响应 post会有两次请求和响应（火狐除外） 首先会发送header头部 再得到服务器的100（continue）后 在发送body
- get是幂等的，而post不是。(`幂等`表示执行相同的操作，结果也是相同的)

### Accept字段

| 客户端                                   | 服务端                                |
| ---------------------------------------- | ------------------------------------- |
| `accept-encoding: gzip ,deflate, br`     | `content-encoding: gzip ,deflate, br` |
| `accept-Language: zh-CN, zh, en`         | `content-Language: zh-CN, zh, en`     |
| `content-Type: text/html; charset=utf-8` | `accept-Charset: charset=utf-8`       |

### Access-Control-Allow字段

​	主要使用于跨域处理

### Cookie字段

​	由于HTTP是无状态的 基于此出现保存状态（向同一个域名下发送请求 都会携带相同的Cookie	

​	服务器`Set-Cookie`写入Cookie

```javascript
// 请求头
Cookie: a=xxx;b=xxx
// 响应头
Set-Cookie: a=xxx
set-Cookie: b=xxx
```

