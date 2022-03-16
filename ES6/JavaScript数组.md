# 数组扩展

- `...Array` 将一个数组转为参数序列
  - 作用：
    - 代替apply `Math.max(...[14.3.7])`
- spread rest的逆运算
- 数组作为参数传入参数 `function(...array)`
- 实现Iterator接口的对象能 使用扩展运算符转为 数组 `eg:[...class]`
- `Array.from(class)`转化成数组 
  - 能将有length属性的对象 转化成数组 不需要实现Iterator接口
  - 第二个参数类似**map方法**对元素处理后返回
- `Array.of（）`方法用于将一组值转化成数组 `Array.of(3,8) == [3,8]`
- `copyWithin()`
  - target（必选） 从什么位置开始替换 
  - start （可选 默认为0 读取的开始位置
  - end （可选 默认数组长度 读取的结束位置
- `find（callback）`返回**第一个** callback返回值为true的成员  诺无返回undefined
- `findIndex（callback）`返回符合成员的下标数组 使用`===` 导致对**NaN的误判**
- `fill（参数`）填充数组 参数1：填充数值 参数2：初始位置（默认0  参数3：终止位置（默认length-1
- `includes()` 查看是否含有此参数 
- 遍历器对象能使用`next（）`遍历
  - `entries（）`键值对的遍历
  - `keys（）` 建名遍历
  - `values（`）键值遍历
- 对空值不同方法不同的处理方式

### 类数组转化成数组

```javascript
const a = {
  0: 0,
  1: 1,
  2: 2,
  length: //要转化必须要有的属性
}

console.log([].slice.call(a))
/* 
  转化类数组对象 可遍历对象（Set Map）
  第二可选参数 类似于map函数
*/
console.log(Array.from(a))

console.log([].slice.call(a))

console.log([].concat.call(a))
```



# JavaScript 数组

- **join()**

  将数组进行拼接处理

  ```javascript
  var arr = [1,2,3];
  console.log(arr.join()); // 1,2,3
  console.log(arr.join("-")); // 1-2-3
  console.log(arr); // [1, 2, 3]（原数组不变）
  ```

- **push()和pop()**

  添加弹出 从尾部

- **shift() 和 unshift()**

  添加弹出 从头部

- **sort()**

  `Array.sort( (a,b) => { return a - b})`

- **reverse()**

  反转数组项的顺序。

- **concat()**

  ```javascript
  var arr = [1,3,5,7];
  var arrCopy = arr.concat(9,[11,13]);
  console.log(arrCopy); //[1, 3, 5, 7, 9, 11, 13]
  console.log(arr); // [1, 3, 5, 7](原数组未被修改)
  ```

- **slice()**

  得到数组的某一截(n-m)的数据  **slice(n,m)**

  ```javascript
  var arr = [1,3,5,7,9,11];
  var arrCopy = arr.slice(1);
  var arrCopy2 = arr.slice(1,4);
  var arrCopy3 = arr.slice(1,-2);//-2 + 6 =4
  var arrCopy4 = arr.slice(-4,-1);//-4 + 6 = 2,-1 + 6 = 5  
  
  console.log(arr); //[1, 3, 5, 7, 9, 11](原数组没变)
  console.log(arrCopy); //[3, 5, 7, 9, 11]
  console.log(arrCopy2); //[3, 5, 7]
  console.log(arrCopy3); //[3, 5, 7]
  console.log(arrCopy4); //[5, 7, 9]
  
  [].slice.call(arguments) //将arugments转化成数组
  ```

- **splice()**

  splice()：很强大的数组方法，它有很多种用法，可以实现删除、插入和替换。

  两个参数**（删除的位置，删除的个数）**是删除 三个参数t添加**（删除的位置，删除的个数--0代表不删除 只是插入，插入的数据）**

  - 删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。
  - 插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。例如，splice(2,0,4,6)会从当前数组的位置 2 开始插入4和6。
  - 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,4,6)会删除当前数组位置 2 的项，然后再从位置 2 开始插入4和6。
  - splice()方法始终都会返回一个数组，该数组中包含从原始数组中**删除的项**，如果没有删除任何项，则返回一个空数组。

  ```javascript
  var arr = [1,3,5,7,9,11];
  var arrRemoved = arr.splice(0,2);
  console.log(arr); //[5, 7, 9, 11]
  console.log(arrRemoved); //[1, 3]
  
  var arrRemoved2 = arr.splice(2,0,4,6);
  console.log(arr); // [5, 7, 4, 6, 9, 11]
  console.log(arrRemoved2); // []
  
  var arrRemoved3 = arr.splice(1,1,2,4);
  console.log(arr); // [5, 2, 4, 4, 6, 9, 11]
  console.log(arrRemoved3); //[7]
  ```

- **indexOf()和 lastIndexOf() （ES5新增）**

  indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。
  lastIndexOf：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。

- **forEach() （ES5新增） 后面都是不会修改原数组**

  ```javascript
  var arr = [1, 2, 3, 4, 5];
  arr.forEach(function(x, index, a){
      console.log(x + '|' + index + '|' + (a === arr));
  });
  
  // 输出为：
  // 1|0|true
  // 2|1|true
  // 3|2|true
  // 4|3|true
  // 5|4|true
  ```

- **map() （ES5新增）**参数为函数

  map()：指“映射”，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

  简单说就是修改数组的每一位的值

  ```javascript
  var arr2 = arr.map((item)=>
      return item*item;
  );
  ```

- **filter() （ES5新增）**参数为函数

  filter()：“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。

  (数组的元素，数组的index) => 形式得到

  **空字符匹配任何字符串都是真**

- **every() （ES5新增）**

  every()：判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true。

  数组的元素，数组的index) => 形式得到

- **some() （ES5新增）**

  some()：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。

- **reduce()和 reduceRight() （ES5新增）**参数为函数

  reduce能进行累加作用