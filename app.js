/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
 var addBinary = function(a, b) {
  const al = a.length
  const bl = b.length
  const n = Math.max(al, bl)
  const res = []
  let e = 0
  for(let i = 0;i < n; i++){
      let at = i < al ? Number(a.charAt(al - 1 - i)) : 0
      let bt = i < bl ? Number(b.charAt(bl - 1 - i)) : 0
      console.log(at,bt,e)
      res[i] = (at + bt + e) % 2
      e = Math.floor((at + bt + e) / 2)
  }
  if(e != 0){
      res.unshift(e)
  }
  return res.join('')
};
console.log(addBinary('1','111'))