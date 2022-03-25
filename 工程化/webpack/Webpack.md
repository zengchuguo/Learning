# Webpack

webpack的打包指令 

config中配置

vue处理

- vue-loader css-loader vue-template-compiler

CSS处理

- css-load二处理CSS
- style-loader移植到html `MiniCssExtractPlugin.loader`
- postcss-loader 兼容性
- `mini-css-webpack-plugin`样式改名 直接生成打包好的CSS 样式抽离

Less

npm i -D less less-loader

SCSS

或者使用postcess-loader解析模块

- `npm i -D sass-loader css-loader style-loader node-sass`
- 在module配置

![image-20220220235049846](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220220235049846.png)

Loader

include exclude test 测试需要配置模块

![image-20220221114541694](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220221114541694.png)

resolve

​	alias 需要地址名称 

​	extentsions 对导入语句不清楚文件类型

Plugin

​	接受一个数组 对数组的每一项都是使用的Plugin实例

DevServer

​	hot 代码热更新

​	inline

​	contentBase 设置服务器的当前文件根目录

​	headers 设置HTTP的响应头

​	host port 监听域名端口

​	allowedHosts 白名单

​	disableHostCheck

​	https 服务使用 可设置key cert ca

​	compress 启用Gzip

UglifyJs Plugin

​	压缩JS代码

CommonsChunkPlugin

​	提取不同文件的通用部分 节省带宽

```javascript
new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      // (the commons chunk name)

      filename: "commons.js",
      // (the filename of the commons chunk)
    })
```

ProvidePlugin

​	自动加载模块不需要到处inport require

Babel

ES5

![image-20220220235305923](E:\学习心得\前端\view\image-20220220235305923.png)

`webpack-dev-server`实时监听打包变化 并进行一定操作



### 打包优化

#### 开发者

speed-measure-webpack-plugin 

​	会和mini-css-exteact-plugin冲突 

优化resolve

​	alias 配置文件名

​	extensions 导入文件 不清楚类型 优先从左向右解析模块

​	modules 打包的位置设定

​	externals 导入一些例如JQ等 webpack会忽略其打包 （对需要资源采用CDN

​	缩小解析模块的位置 include exclude

​	thread-loader 的多线程打包

​	babel-loader 缓存 

​			缓存位置node_modules/.cache/babel-loader

​			 cacheDirectory：true

​	cache-loader 对其他资源的缓存

​		use：['cache-loader', *// 获取前面 loader 转换的结果*]

​	持久化缓存

	const config = {
		 cache: {
	    type: 'filesystem',
	  },
	};
happyPack

​	打包多线程

模块热替换

​	

#### 生成者 

打包结果分析

​	webpack-bundle-analyzer 显示打包结果大小等数据

压缩CSS

​	optimize-css-assets-webpack-plugin 

​	cssnano

清除没用的CSS

​	purgecss-webpack-plugin

压缩JS	

​	'terser-webpack-plugin' webpack5内置的

​	UglifyJS / ES

tree-shaking 针对与ES6

CDN加速

​	publicPath 

提取公共样式

​	CommonsChunkPlugin

按需加载

Prepack 代码运行速度

Scope Hoisting	ES6

​	分析模块之间依赖  打包体积小 

##### vue

npm i -D vue-loader vue-template-compiler vue-style-loader npm i -S vue

## hash

​	hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从源服务器上拉取对应数据，进而更新本地缓存

### hash

​	和整个项目的构建有关 项目的文件发生改变 整个文件的hash都会改变 并且公用一个hash

### chunkhash

​	根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值 

### contenthash

​	如果index.js 导入使用index.css 后 index.js 发生改变 index.css不改变  





- **optimization**

生产环境优化压缩css，html，js一些文件可以在optimization.minimizer中添加此插件

```
cnpm i html-minimizer-webpack-plugin css-minimizer-webpack-plugin terser-webpack-plugin -D

  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin(), // 压缩html
      new CssMinimizerPlugin(), // // 压缩css
      new TerserWebpackPlugin({ // 压缩js
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true, // 移除console
            drop_debugger: true // 移除debugger
          },
          format: {
            comments: false  // 移除注释
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all', // 这表明将选择哪些 chunk 进行优化
      name: 'chunks'  // 拆分 chunk 的名称
    }
  },
```
