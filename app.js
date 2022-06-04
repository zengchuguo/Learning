/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permuteUnique = function (nums) {
  nums.sort((a, b) => {
    return a - b;
  });
  const n = nums.length;
  const res = [];
  const f = (arr, i) => {
    if (i === n) {
      res.push([...arr]);
    }
    else {
      for (let k = i; k < n; k++) {
        if (k !== i && nums[k] === nums[k - 1]) {
          continue;
        }
        arr.push(nums[k]);
        [nums[i], nums[k]] = [nums[k], nums[i]];
        f(arr, i + 1);
        [nums[i], nums[k]] = [nums[k], nums[i]];
        arr.pop();
      }
    }
  };
  f([], 0);
  return res;
};
console.log(permuteUnique([0,0,0,0,0,1]))