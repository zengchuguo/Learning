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

