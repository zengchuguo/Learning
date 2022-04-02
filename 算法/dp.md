#### 300.最长递增子序列

给你一个整数数组 `nums` ，找到其中最长严格递增子序列的长度。

```javascript
var lengthOfLIS = function(nums) {
    const arr = []
    const n = nums.length
    let maxans = -1
    for(let i = 0;i < n;i++){
        arr[i] = 1
        for(let j = 0;j < i;j++)
            if(nums[j] < nums[i])
                arr[i] = Math.max(arr[j] + 1,arr[i])
        maxans = Math.max(maxans,arr[i]) 
    }
    return maxans
};
console.log(lengthOfLIS([0,1,0,3,2,3]));

```

#### [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

难度中等4811

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

 思路：

​	遇到这种题 第一思路是dp 所以要有状态转移式

​	dp[i,j] 表示字符串从 i 到 j 是否满足回文串

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const n = s.length
  if (n < 2) return s
  const dp = new Array(n).fill(0).map(i => {
    return new Array(n).fill(true)
  })
  let _max = 0
  let start = 0
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < n; j++) {
      let m = j + i - 1
      if (m >= n) break
      if (s.charAt(m) == s.charAt(j)) {
        dp[j][m] = dp[j + 1][m - 1]
      } else {
        dp[j][m] = false
      }
      if (i > _max && dp[j][m]) {
        _max = i
        start = j
      }
    }
  }
  return s.substr(start, _max) ? s.substr(start, _max) : s.charAt(0)
}
```

#### [53. 最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

思路：

​	dp[i] = dp[i-1] >=0 ? dp[i - 1] + d[i] : d[i]

二：	dp[i] = max（  dp[i - 1] + d[i] : d[i] ）

```javascript
var maxSubArray = function (nums) {
  let sum = 0
  let ans = nums[0]
  for (let i of nums) {
    if (sum >= 0) sum += i
    else sum = i
    ans = Math.max(sum, ans)
  }
  return ans
}
```

#### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

给你一个整数数组 `coins` ，表示不同面额的硬币；以及一个整数 `amount` ，表示总金额。

计算并返回可以凑成总金额所需的 **最少的硬币个数** 。如果没有任何一种硬币组合能组成总金额，返回 `-1` 。

```javascript
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = []
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    dp[i] = amount
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        /* dp[i - coins[j]] + 1 意思 当前的钱 减去一张coins[j]的值  */
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
      }
    }
  }
  console.log(dp)
  return dp[amount] === amount ? -1 : dp[amount]
}
```

#### [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

思路：

1.

​	`dp[i] 表示截获 i 房屋 能得到的最大值`

2.

​	`dp【i】表示到达 房屋 i 时能得到最大利益`

​	`dp[i] = max( dp[j] + nums[i] ,   dp [i - 1])     0< j < i -2`

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) return nums[0]
  if (nums.length === 2) return Math.max(nums[0], nums[1])
  const n = nums.length
  const ans = []
  for (let i = 0; i < n; i++) {
    if (i < 2) ans[i] = nums[i]
    else {
      ans[i] = nums[i]
      for (let j = 0; j <= i - 2; j++) {
        ans[i] = Math.max(ans[j] + nums[i], ans[i])
      }
    }
  }
  return Math.max.call(null, ...ans)
}

/* 思路dp */
var rob = function (nums) {
  if (nums.length === 1) return nums[0]
  if (nums.length === 2) return Math.max(nums[0], nums[1])
  const n = nums.length
  const ans = []
  ans[0] = nums[0]
  ans[1] = Math.max(nums[1], ans[0])
  for (let i = 2; i < n; i++) {
    ans[i] = Math.max(ans[i - 2] + nums[i], ans[i - 1])
  }
  return ans[n - 1]
}
```

#### [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 **围成一圈** ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警** 。

思路：

​	dp 思路和上一题基本保持一致

​	由于是头尾相连 

​		因此第一个偷的话 最后一个就不能偷

​		因此第一个不偷的话 最后一个可偷

​	所以 分别对这两种情况上的分析

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length
  if (n == 1) return nums[0]
  if (n == 2) return Math.max(nums[0], nums[1])
  const ans = []
  const f = function (start, end) {
    for (let i = start; i <= end; i++) {
      if (i == start) ans[i] = nums[i]
      else if (i == start + 1) ans[i] = Math.max(nums[i], nums[i - 1])
      else ans[i] = Math.max(ans[i - 2] + nums[i], ans[i - 1])
    }
    return ans[end]
  }
  return Math.max(f(0, n - 2), f(1, n - 1))
}
```

#### [279. 完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

给你一个整数 `n` ，返回 *和为 `n` 的完全平方数的最少数量* 。

思路：

​	dp[ i ] 表示在当前 i 的使用的次数

、转换方程 dp[ i ] = Min d[ i - j * j ]  ( 1 < j * j < i)

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = []
  dp[0] = 0
  for (let i = 1; i <= n; i++) {
    let _min = 99999
    for (let j = 1; j * j <= i; j++) _min = Math.min(_min, dp[i - j * j])
    dp[i] = _min + 1
  }
  return dp[n]
}
```

#### [91. 解码方法](https://leetcode-cn.com/problems/decode-ways/)

一条包含字母 `A-Z` 的消息通过以下映射进行了 **编码** ：

```
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

要 **解码** 已编码的消息，所有数字必须基于上述映射的方法，反向映射回字母（可能有多种方法）。例如，`"11106"` 可以映射为：

- `"AAJF"` ，将消息分组为 `(1 1 10 6)`
- `"KJF"` ，将消息分组为 `(11 10 6)`

思路：

​	dp【i】 代表在当前i位置 有多少种可能

​	dp【i】 = dp【i-1】+dp【i-2】（dp【i-1】代表占用i为个位数 【i-2】i作为十位数的个位数两种情况的计算

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const n = s.length
  let dp = new Array(n + 1).fill(0)
  if (s.charAt(0) == '0') return 0
  dp[0] = 1
  for (let i = 1; i <= n; i++) {
    let a = s.charAt(i - 1) - '0'
    let b = i - 2 >= 0 ? (s.charAt(i - 2) - '0') * 10 + a : 0
    if (a > 0 && a <= 9) {
      dp[i] = dp[i - 1]
    }
    if (b >= 10 && b <= 26) dp[i] += dp[i - 2]
  }
  return dp[n]
}
```

