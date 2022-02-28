#### 背景

http 天生的明文传输 不安全

#### https

在 HTTPS 中，使用`传输层安全性(TLS)`或`安全套接字层(SSL)`对通信协议进行加密。也就是 HTTP + SSL(TLS) = HTTPS

![HTTPS加解密流程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/29/17126e3d3922763b~tplv-t2oaga2asx-watermark.awebp)

key 是 客户端和服务端之间的对称钥匙

#### CA

![HTTPS中间人](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/29/17126e3d6f9ececf~tplv-t2oaga2asx-watermark.awebp)

核心原因是**客户端无法确认收到的公钥是不是真的是服务端发来的**

解决方案： 数字签名 使用私钥进行加密签名

