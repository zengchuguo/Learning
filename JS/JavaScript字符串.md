- `indexOf(str,position = 0)`

查找从position后第一次出现的下标位置的索引 区分大小写 没有找到输出 -1

- `lastIndexOf(str)`

和indexOf相似 从后往前查找

- `charAt(i)`

获得输入下标的字符 如果取不到该值 返回一个字符串

- `charCodeAt(i)`

获取输入下标的字符 如果取不到 返回NAN

- `includes(str,position = 0)`

判断当前字符串position后是否含有另一个字符串（true/false）

- `match（str/regexp）`执行速度相对慢一点

匹配一个字符串或一个正则表达式 如果没有 返回null

- `search（str/regexp）`

类似于 test 如果取不到 返回 -1 

- `startswith（str）` （不支持正则

判断当前字符串是否以某个子字符串开头 （true/false）

- `endsWith（str）`

判断当前字符串是否以某个子字符串结尾 （true/false）

- `trim（）`

清除字符串前后的空格

- `trimStart（）`

清除字符串前面的空格

- `trimEnd（）`

清除字符串侯后面的空格

- `str.replace(regexp|substr, newSubStr|function)`

字符串替换元素

- `repeat（number）`

重复字符串

- `concat（str）`

拼接字符串 不会影响原来的字符串

- `padStart（number，str）`

以str开始填充当前字符串长度到number

- `padEnd（number，str）`

以str结尾填充当前字符串长度到number

- `split（str）`

使用str来分割字符串 组成一个字符串数组

- `toUpperCase（）`

设置成大写 不会影响原来字符串

- `toLowerCase（）`

设置成小写 不会影响原来的字符串

- `substr（number1，number2）`

以number1开头 获取长度number2的字符串

- `subString（number1，number2）`

以number1开头 获取number2结尾前的字符串

