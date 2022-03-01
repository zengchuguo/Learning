# Webpack

webpack的打包指令 

config中配置

CSS处理

- css-load二处理CSS
- style-loader移植到html `MiniCssExtractPlugin.loader`
- postcss-loader 兼容性
- `mini-css-webpack-plugin`样式改名 直接生成打包好的CSS

Less

npm i -D less less-loader

SCSS

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

![image-20220220235305923](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220220235305923.png)

`webpack-dev-server`实时监听打包变化 并进行一定操作

##### vue

npm i -D vue-loader vue-template-compiler vue-style-loader npm i -S vue

单页面打包和多页

