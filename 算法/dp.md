### 300.最长递增子序列

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

