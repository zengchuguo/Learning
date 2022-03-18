#### 工作原理

1. 将`vue`文件 切割成`template script styles`三部分
2. `template `通过 `compile `生成 `render  staticRenderFns`
3. 获得`script`返回的配置项对象
4. `styles`部分 通过`css-loader MiniCSSExtractPlugin/vue-style-loader`
5. 使用vue-loader 提供的方法 合并配置项对象` render  staticRenderFns `

