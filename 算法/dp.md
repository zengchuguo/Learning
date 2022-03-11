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

