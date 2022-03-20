### XHR

​	通过对XMLHttpRequest对象和服务器交互数据 使用JSON XML HTML Text文本发送和加接受数据

```javascript
if (window.XMLHttpRequest) { // model browser
  xhr = new XMLHttpRequest()
} else if (window.ActiveXObject) { // IE 6 and older
  xhr = new ActiveXObject('Microsoft.XMLHTTP')
}
xhr.open('POST', url, true)
xhr.send(data)
xhr.onreadystatechange = function () {
  try {
    // 处理响应
    if (xhr.readyState === 4) {
      // 请求正常
      if (xhr.status === 200) {
        // 处理响应
      } else {
        // 请求遇到一些问题，处理异常
      }
    } else {
      // 还处于未准备好的状态
    }
  } catch (e) {
    // 通信错误的事件中（例如服务器宕机）
    alert('Caught Exception: ' + e.description)
  }
}
```

### ajax

​	基于JQ对XHR的封装 

### fetch

​	

### axios https://www.kancloud.cn/yunye/axios/234845

​	基于promise的HTTP库 对XHR的封装

优点：

​	提供并发请求 

​	提供请求响应拦截

​	自动转化成JSON数据

```javascript
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

### axios二次封装

目的：在每一次发起HTTP请求 都要设置响请求头等等操作 重复写代码 

