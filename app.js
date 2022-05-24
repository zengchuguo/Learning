/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    const res = []
    const f = (arr, i, j)=> {
    if(arr.length === n * 2){
      res.push(arr.join(''))
    }
    if(i < n){
      arr.push("(")
      f(arr,i + 1,j)
      arr.pop()
    }
    if(j < i){
      arr.push(")")
      f(arr,i,j + 1)
      arr.pop()
    }
  }
  f([],0,0)
  return res
};
console.log(generateParenthesis(3))