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

#### [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)

小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 `root` 。

除了 `root` 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 **两个直接相连的房子在同一天晚上被打劫** ，房屋将自动报警。

给定二叉树的 `root` 。返回 **\*在不触动警报的情况下** ，小偷能够盗取的最高金额* 。

思路：

​	dp的思想 只不过 f 函数代表的是当前的root获得的最大值

​	使用数组【】 0 代表没有偷 1代表偷了

​	因此计算root的最大值时候 

​		采用 当前root偷 则left right 不偷的最大值 //当前root不偷 则left right 偷和不偷的最大值 

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    const f = (root, ans) => {
        if (root == null)
            return [0, 0]
        const l = f(root.left)
        const r = f(root.right)
        const selected = root.val + l[0] + r[0]
        const noselected = Math.max(l[0], l[1]) + Math.max(r[0], r[1])
        return [noselected, selected]
    }
    const ans = f(root)
    return Math.max(...ans)
};
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

#### [139. 单词拆分](https://leetcode-cn.com/problems/word-break/)

给你一个字符串 `s` 和一个字符串列表 `wordDict` 作为字典。请你判断是否可以利用字典中出现的单词拼接出 `s` 

**注意：**不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

 思路：

​	dp【i】代表的是在 i 位置下能否取得结果

​	在中间设置一个 j 表示 在dp【j】之前是否都在成立 而且 j-i 的字符串是否在字典中

​		在则设置成true 否不设置

```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const dp = new Array(s.length)
  dp[0] = true
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[s.length] ?? false
}
```

#### [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

给你一个整数数组 `prices` ，其中 `prices[i]` 表示某支股票第 `i` 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 **最多** 只能持有 **一股** 股票。你也可以先购买，然后在 **同一天** 出售。返回 *你能获得的 \**最大** 利润* 。

思路；

​	dp【i】【】 代表在第 i 天能得到的最大值 

​	0 代表当前 i 天没有股票 1 代表则是有

​	每次计算当前的dp时 只需要考虑当前状态和上一级状态之间的关系

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const n = prices.length
    const dp = new Array(n).fill(0).map(item => { return new Array(2).fill(0) })
    /* 0 代表没有股票 1代表有 */
    dp[0][1] = -prices[0]
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
    return dp[n - 1][0]
}
```

#### [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

给定一个数组，它的第 `i` 个元素是一支给定的股票在第 `i` 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 **两笔** 交易。

**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

 思路：

​	题目和上一题差不多 多个对交易次数的限制

​	需要多设置一个状态表示 当前已经交易的次数

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const n = prices.length
    const dp = new Array(n).fill(0).map(item => {
        return new Array(3).fill(0).map(ele => {
            return new Array(2).fill(0)
        })
    })
    /* 
        初始值的设定
        交易一次 代表是当前或之前已经买了 就算是卖出都算在一次交易中
        dp[0][0][0] 
        dp[0][0][1] 如果持有股 但交易数为0 不符合自己设定的题目
        dp[0][1][0] 交易一次 计算max（不做处理， 将持有的股卖出）
        dp[0][1][1] 交易一次 计算max（不做处理， 买入一个新股）
        dp[0][2][0] 交易两次 计算max（不做处理， 将交易两次的持有股给卖出）
        dp[0][2][1] 交易两次 计算max（不做处理， 将交易一次且没有股 再买入新股）
    */
    dp[0][1][1] = -prices[0]
    /* 特殊点 */
    dp[0][2][1] = Number.MIN_SAFE_INTEGER
    for (let i = 1; i < n; i++) {
        dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][1][1] + prices[i])
        dp[i][1][1] = Math.max(dp[i - 1][1][1], -prices[i])
        dp[i][2][0] = Math.max(dp[i - 1][2][0], dp[i - 1][2][1] + prices[i])
        dp[i][2][1] = Math.max(dp[i - 1][2][1], dp[i - 1][1][0] - prices[i])
    }
    return Math.max(dp[n - 1][1][0], dp[n - 1][2][0])
}
```

