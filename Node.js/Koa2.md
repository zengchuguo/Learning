### 背景

Express基于ES5 不能处理到异步（回调）

# Koa2笔记

## Koa2 介绍 

koa是Express的下一代基于Node.js的web框架，目前有1.x和2.0两个版本。

### 历史

#### Express

Express是第一代最流行的web框架，它对Node.js的http进行了封装，用起来如下：

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
```

虽然Express的API很简单，但是它是基于ES5的语法，要实现异步代码，只有一个方法：回调。如果异步嵌套层次过多，代码写起来就非常难看：

```js
app.get('/test', function (req, res) {
    fs.readFile('/file1', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        }
        fs.readFile('/file2', function (err, data) {
            if (err) {
                res.status(500).send('read file2 error');
            }
            res.type('text/plain');
            res.send(data);
        });
    });
});
```

虽然可以用async这样的库来组织异步代码，但是用回调写异步实在是太痛苦了！

#### koa 1.0

随着新版Node.js开始支持ES6，Express的团队又基于ES6的generator重新编写了下一代web框架koa。和Express相比，koa 1.0使用generator实现异步，代码看起来像同步的：

```js
var koa = require('koa');
var app = koa();

app.use('/test', function *() {
    yield doReadFile1();
    var data = yield doReadFile2();
    this.body = data;
});

app.listen(3000);
```

用generator实现异步比回调简单了不少，但是generator的本意并不是异步。Promise才是为异步设计的，但是Promise的写法……想想就复杂。为了简化异步代码，ES7（目前是草案，还没有发布）引入了新的关键字`async`和`await`，可以轻松地把一个function变为异步模式：

```js
async function () {
    var data = await fs.read('/file1');
}
```

这是JavaScript未来标准的异步代码，非常简洁，并且易于使用。

#### koa2

koa团队并没有止步于koa 1.0，他们非常超前地基于ES7开发了koa2，和koa 1相比，koa2完全使用Promise并配合`async`来实现异步。

koa2的代码看上去像这样：

```js
app.use(async (ctx, next) => {
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});
```

## Koa2 快速入门

**环境搭建:**

1. 安装node

   因为node.js v7.6.0开始完全支持async/await，所以node.js环境都要7.6.0以上

2. 安装koa2

   ```js
   npm i koa2 --save
   ```

**Koa 初窥:**

```js
const Koa = require('koa2')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
```

## Koa2 路由

**基本使用:**

​	路由是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。
​	通俗的讲：路由就是根据不同的URL地址，加载不同的页面实现不同的功能。

```js
npm install --save koa-router
```

```js
const Koa = require('koa2');
const router = require('koa-router')();  //注意：引入的方式
const app = new Koa();
router.get('/', function (ctx, next) {
	ctx.body="Hello koa";
})
router.get('/news',(ctx,next)=>{
	ctx.body="新闻page"
});
app.use(router.routes()); //作用：启动路由
app.listen(3000,()=>{
	console.log('starting at port 3000');
});
```

**Get传值:**	

在Koa2中GET传值通过request接收，但是接收的方法有两种：query和querystring。

​		query：返回的是格式化好的参数对象。
​		querystring：返回的是请求字符串。

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', function (ctx, next) {
	ctx.body="Hello koa";
})
router.get('/newscontent',(ctx,next)=>{
	let url =ctx.url;
		//从request中获取GET请求
		let request =ctx.request;
		let req_query = request.query;
		let req_querystring = request.querystring;
		//从上下文中直接获取
		let ctx_query = ctx.query;
		let ctx_querystring = ctx.querystring;
		ctx.body={
      url,
      req_query,
      req_querystring,
      ctx_query,
      ctx_querystring
	}
});
app.use(router.routes()); //作用：启动路由
app.listen(3000);
```

**动态路由:**

```js
//请求方式   http://域名/product/4
router.get('/product/:aid',async (ctx)=>{
   console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
   ctx.body='这是商品页面';
})
```

## Koa2 中间件

中间件是 Koa 一个重要的概念，它是一个执行的链条，整个链条组成了一个运行的周期，这样说有点抽象，我们看代码理解。

```js
const koa = require('koa2')
const app = new koa()

// 访问权限
app.use(async (ctx, next) => {
  console.log('权限验证通过...')
  await next() // 执行下一个中间件
})

// 日志记录
app.use(async (ctx, next) => {
  console.log('日志记录完成...')
  await next() // 执行下一个中间件
})

// 响应处理
app.use(async (ctx, next) => {
  ctx.response.status = 200
  ctx.response.body = 'hi, koa'
  await next()
})

app.listen(3000)
```

​	每一个中间件负责特定的小模块，互相配合，组合成一条完整的业务通道。中间件的功能也为 Koa 项目的扩展提供了很大的便利性，因为一些特定成熟的功能可以抽象成一个个模块共享出来，比如 `路由模块`、`模版引擎` ... 让我们可以站在巨人的肩膀，直接在项目中导入使用这些成熟的模块。

​	中间件函数中另外一个参数 `ctx`，是一个环境上下文参数，解决了中间件之间的依赖问题，是中间件之间的全局变量。

```js
app.use(async (ctx, next) => {
  ctx.a = 1
  await next() 
})

app.use(async (ctx, next) => {
  console.log(ctx.a) // 1
  await next()
})
```

##  Koa2 静态资源中间件

**安装:**

```js
npm install --save koa-static
```

```js
const static_ = require('koa-static')

app.use(static_(
    path.join(__dirname, './public')
))
```

## Koa2 请求数据

**get:**

​	在koa2中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，query返回是格式化好的参数对象，querystring返回的是请求字符串，由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径。

**1.是从上下文中直接获取**
   请求对象ctx.query，返回如 { a:1, b:2 }

   请求字符串 ctx.querystring，返回如 a=1&b=2

**2.是从上下文的request对象中获取**

  请求对象ctx.request.query，返回如 { a:1, b:2 }

  请求字符串 ctx.request.querystring，返回如 a=1&b=2

**post:**
​	对于POST请求的处理，koa2没有封装获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req，将POST表单数据解析成query string（例如：a=1&b=2&c=3），再将query string 解析成JSON格式（例如：{"a":"1", "b":"2", "c":"3"}）

**koa-bodyparser:**

​	对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

```js
// npm install --save koa-bodyparser

const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
 
app.use(async ctx => { 
  ctx.body = ctx.request.body;
});
```

## Koa2 模版引擎

适用于 koa 的模板引擎选择非常多，比如 jade、ejs、art-template等。

**art-template** 是一个简约、超快的模板引擎。

它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

art-template支持ejs的语法，也可以用自己的类似Vue数据绑定的语法.

**安装:**

```js
npm install --save art-template
npm install --save koa-art-template
```

**使用:**

```js
const Koa = require('koa');
const render = require('koa-art-template');
const app = new Koa();

render(app, {
  root: path.join(__dirname, '/'),  // 视图的位置
  extname: '.html', // 后缀名 如：index.html
  debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});

app.use(async function (ctx) {
  await ctx.render('user',{list:123});
});

app.listen(8080);
```

## Koa2 cookie和session

**cookie:**

```js
ctx.cookies.set(name, value, [options])
ctx.cookies.get('name');

/**
  maxAge              一个数字表示从 Date.now() 得到的毫秒数
  expires cookie      过期的 Date
  path cookie         路径, 默认是'/'
  domain cookie       域名
  secure             安全 cookie   默认false，设置成true表示只有 https可以访问
  httpOnly           是否只是服务器可访问 cookie, 默认是 true
  overwrite          一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同     名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
**/
```

**session:**

```js
npm install koa-session --save
```

```js
const session = require('koa-session');
```

```js
app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

设置值 ctx.session.username = "张三";
获取值 ctx.session.username
```

## Koa2 操作MySQL

**安装:**

```js
npm install --save mysql
```

```js
// 创建数据库会话
const mysql      = require('mysql')
const connection = mysql.createConnection({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '123456',   // 数据库密码
  database : 'my_database'  // 选中数据库
})
 
// 执行sql脚本对数据库进行读写 
connection.query('SELECT * FROM my_table',  (error, results, fields) => {
  if (error) throw error
  // connected! 
  
  // 结束会话
  connection.end()
});
```

## Koa2 操作MongoDB

**安装:**

```js
npm install mongodb --save
```

```js
var MongoClient = require('mongodb').MongoClient;
// 定义数据库连接的地址 以及配置数据库
// koa数据库的名称
var url = 'mongodb://localhost:27017/';
var dbName = 'koa'
// nodejs连接数据库
MongoClient.connect(url,function(err,client){
  const db = client.db(dbName);  // 数据库db对象
})
// 操作数据库
MongoClient.connect(url,function(err,db){
  db.collection('user').insertOne({"name":"张三"},function(err,result){
    db.close() //关闭连接
  })
})
```

## Koa2 RESTful Api接口

**首先看看为什么要用Koa2设计RESTful Api接口？**

​	Koa2属于Nodejs的框架，Nodejs最擅长的就是大数据，非阻塞式IO。所以nodejs最擅长的一个快就是写接口。

网络应用程序，分为前端和后端两个部分。当前的发展趋势，就是前端设备层出不穷（手机、平板、桌面电脑、其他专用设备......）。

因此，必须有一种统一的机制，方便不同的前端设备与后端进行通信。这导致API构架的流行，甚至出现"API First"的设计思想。RESTful API是目前比较成熟的一套互联网应用程序的API设计理论

**一个好的Koa2 RESTful Api接口设计必须考虑以下几点**

1.协议：建议使用更安全的https协议

2.域名：

​		尽量部署在专属域名下面，比如https://a.itying.com   https://api.itying.com

3.应该将api的版本号放入URl中：

​	(1)比如： https://a.itying.com/api1/newslist  https://a.itying.com/api2/newslist 
​	(2)比如:  https://a1.itying.com   https://a2.itying.com

4.路径：

​	在RESTful架构中，每个网址代表一种资源（resource），所以网址中建议不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。

5.http请求数据的方式：（7个HTTP方法：GET/POST/PUT/DELETE/PATCH/HEAD/OPTIONS）

​	 GET（SELECT）：从服务器取出资源（一项或多项）。
 	POST（CREATE）：在服务器新建一个资源。
​	 PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
 	DELETE（DELETE）：从服务器删除资源。

​	HEAD：获取资源的元数据。
​	OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。
​    PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。

## Koa2 使用JWT鉴权

![](https://tva1.sinaimg.cn/large/008eGmZEly1gn96x2vbohj30e209ldg6.jpg)

**1. jsonwebtoken**

这个插件提供了生成jwt，校验jwt，解码jwt的能力。在项目中，我们仅需要使用生成jwt，和解码jwt的能力。就可以了。

生成token

```js
const jsonwebtoken = require('jsonwebtoken');

const USER = {
  username: 'tiedan',
  password: '123456',
  id: 100
}

const SECRET = 'tiedan666'; //随意输入

const token = jsonwebtoken.sign(
          { name: USER.username, id: USER.id },  // 加密userToken
          SECRET,
          { expiresIn: '1h' }
        )
```

这样就生成了一串字符串，token现在的值是：

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemhhbmdzYW4iLCJpZCI6MTAwLCJpYXQiOjE1ODg1MTM2NTksImV4cCI6MTU4ODUxNzI1OX0.jFXifMFFizqRUK0V5clFql4VrtrQiTaD_wpsogNi6TY"
```

如果我想要获取这上面的信息，不需要知道秘钥，直接使用jsonwebtoken这个插件就可以了。

```js
const jsonwebtoken = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemhhbmdzYW4iLCJpZCI6MTAwLCJpYXQiOjE1ODg1MTM2NTksImV4cCI6MTU4ODUxNzI1OX0.jFXifMFFizqRUK0V5clFql4VrtrQiTaD_wpsogNi6TY"

console.log(jsonwebtoken.decode(token)); // { name: 'tiedan', id: 100, iat: 1588511684, exp: 1588515284 }
```

**2. koa-jwt 中间件的使用**

这个中间件提供了一个校验方法，可以在项目中全局校验，两行代码就搞定了。

```js
const koa = require('koa');
const koajwt = require('koa-jwt');
const app = new koa();

const SECRET = 'tiedan666'; // demo，可更换

app.use(koajwt({ secret: SECRET }).unless({
  // 登录接口不需要验证
  path: [/^\/api\/login/]
}));
```

我们发送请求的时候把刚才生成的token放到请求头`Authorization`上，如果这个token里的秘钥，等于koajwt里第一个参数中的secret属性，那么就可以通过用户验证，否则返回401错误。

如果想自定义处理这个错误，可以在上方添加中间件用`next().catch()`对401错误进行捕获

```js
const koa = require('koa');
const koajwt = require('koa-jwt');
const app = new koa();

const SECRET = 'tiedan666'; // demo，可更换

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      // 自定义返回结果
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
});

app.use(koajwt({ secret: SECRET }).unless({
  // 登录接口不需要验证
  path: [/^\/api\/login/]
}));
```

