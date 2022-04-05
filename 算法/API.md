#### [415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)

给定两个字符串形式的非负整数 `num1` 和`num2` ，计算它们的和并同样以字符串形式返回。

思路：

​	正常数的相加操作 **特点** 使用数组存储结果然后 调用API形式输出结果

```javascript
var addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0;
    const ans = [];
    while (i >= 0 || j >= 0 || add != 0) {
        const x = i >= 0 ? num1.charAt(i) - '0' : 0;
        const y = j >= 0 ? num2.charAt(j) - '0' : 0;
        const result = x + y + add;
        ans.push(result % 10);
        add = Math.floor(result / 10);
        i --;
        j --;
    }
    return ans.reverse().join('');
};
```

#### [31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)

整数数组的一个 **排列** 就是将其所有成员以序列或线性顺序排列。

- 例如，`arr = [1,2,3]` ，以下这些都可以视作 `arr` 的排列：`[1,2,3]`、`[1,3,2]`、`[3,1,2]`、`[2,3,1]` 

思路：

​	题目的意思 换种表达是计算出大于当前的数的值

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const n = nums.length
  if (n == 1) return nums
  let i = n - 2
  let m = n - 1
  
  /* 目的：后往前找第一个不是递增的值 （该值是需要进行替换 */
  while (i >= 0 && nums[i] >= nums[i + 1]) i--
    
  /* 替换在 i 以前的最小的数字情况（仅仅小于nums【i】的第一个值 */
  if (i >= 0) {
    while (nums[i] >= nums[m]) m--
    /* 最小值 和 下标 i 的交换 */
    ;[nums[m], nums[i]] = [nums[i], nums[m]]

    /* 然后将i的右边已经是递增 改写成递减 */
    i++
    for (let k = 0; k < (n - 1 - i) / 2; k++) {
      ;[nums[i + k], nums[n - 1 - k]] = [nums[n - 1 - k], nums[i + k]]
    }
  } 
 /* 说明当前数 是能表达的最大值 */
 else
    nums.sort((a, b) => {
      return a - b
    })
  return nums
}
```

#### [347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

给你一个整数数组 `nums` 和一个整数 `k` ，请你返回其中出现频率前 `k` 高的元素。你可以按 **任意顺序** 返回答案。

 思路：

​	一开始有使用到对象来存储数据后再转化成类数组操作 但在如果输入情况有-1下 会导致length属性排在前面

​	因此使用map 以及对其API合理运用

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map()
  const n = nums.length
  for (let [i, k] of nums.entries()) {
    /* 对于使用map 来存储数值 */
    map.set(k, (map.get(k) || 0) + 1)
  }
  let arr = Array.from(map).sort((a, b) => {
    return b[1] - a[1]
  })
  return arr.slice(0, k).map(item => {
    return item[0]
  })
}
```

#### [324. 摆动排序 II](https://leetcode-cn.com/problems/wiggle-sort-ii/)

给你一个整数数组 `nums`，将它重新排列成 `nums[0] < nums[1] > nums[2] < nums[3]...` 的顺序。

你可以假设所有输入数组都可以得到满足题目要求的结果。

 思路：

​	排序是必然的 然后从后面开始插入

​	获得中间值 `>> 1`

​	判断是否奇偶数`k & 1`

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function(nums) {
    // 拷贝一份排序好的nums数组
    const sort = nums.sort((a, b) => a - b).slice();
    /* j为总长度 i对n的一半 */
    let j = nums.length - 1, i = j >> 1, k = 0;
    while (k < sort.length) {
        // 判断k的奇偶,尾头尾头尾头的给nums[k]赋值
        nums[k] = (k & 1) ? sort[j--] : sort[i--];
        k++;
    }
};
```

