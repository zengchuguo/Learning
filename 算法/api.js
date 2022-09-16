/**
 * 
 * @param {string} s1 
 * @param {string} s2 
 */
const f = (s1, s2) => {
    const n1 = s1.length
    const n2 = s2.length
    const res = []
    let i = n1 - 1, j = n2 - 1
    while (i >= 0 || j >= 0) {
        const a = i >= 0 ? s1.charAt(i) - '0' : 1
        const b = j >= 0 ? s2.charAt(j) - '0' : 1
        res.push(a * b)
        i--
        j--
    }
    console.log(res)
    let e = 0
    for (let k = 0; k < res.length || e != 0; k++) {
        const t = res[k]
        res[k] = t % 10
        e = Math.floor(t / 10)
    }
    return res.reverse().join('')
}
console.log(f('11', '11'))