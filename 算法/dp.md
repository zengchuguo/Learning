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
  const arr = []
  let begin = 0,
    maxleng = 0
  /* 只有一个字符时 就是回文串 */
  for (let i = 0; i < n; i++) arr[[i, i]] = true
  /* i是字符串的长度 j是开始字符位置 m是结束字符位置 */
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < n; j++) {
      let m = i + j - 1

      if (m > n) break
      if (s.charAt(j) != s.charAt(m)) {
        arr[[j, m]] = false
      } else {
        /* 保持m-j的值是 保证不会有j>=m的可能 */
        if (m - j < 3) arr[[j, m]] = true
        else arr[[j, m]] = arr[[j + 1, m - 1]]
      }
      if (arr[[j, m]] && i > maxleng) {
        maxleng = i
        begin = j
      }
    }
  }
  if (maxleng === begin) return s.charAt(0)
  return s.substring(begin, maxleng + begin)
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

