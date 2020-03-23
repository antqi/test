/**
 *  两个元素和等于 7
 */

function fun1(arr, sum) {
  // 遍历次数 arr.length*2
  let res = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        res.push([arr[i], arr[j]])
      }
    }
  }

  return res
}

function fun2(arr, sum) {
  let res = []
  let numKey = {}

  for (let i = 0; i < arr.length; i++) {
    numKey[arr[i]] = arr[i]
  }

  for (let i = 0; i < arr.length; i++) {
    if (numKey[sum - arr[i]] && res.indexOf(arr[i]) < 0) {
      res.push([arr[i], numKey[sum - arr[i]]])
    }
  }

  return res
}

let arr = [1, 2, 4, 3, 6]
const sum = 7

console.time('暴力')
console.table(fun1(arr, sum))
console.timeEnd('暴力')

console.time('非暴力')
console.table(fun2(arr, sum))
console.timeEnd('非暴力')
