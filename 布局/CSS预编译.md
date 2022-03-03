#### SCSS

优势：

- 设置变量
- 嵌套
  - 存在 `&`表示当前的DOM的描述
- 插槽 #{$ 具体属性 }

#### Less

优势

- @ 设置变量

#### @mixin

```css
@mixin demo-box($width, $factor, $radius){
  width: ($width + $radius) * $factor;
  height: ($width + $radius) * $factor;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* mixin使用（使用@include引用） */

.demo-1 {
    @include demo-box(90px, 1, 10px);
}
/* 编译后形成的css：应该就这样 */

.demo-1 {
    width: (90px + 10px) * 1;
    height: (90px + 10px) * 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

