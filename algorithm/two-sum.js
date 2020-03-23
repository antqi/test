/**
 *  两个元素求和
 */

function fun1(arr, sum) {
  // 遍历次数 arr.length*2
  let res = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        res.push([arr[i], arr[j]])
        break
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
    if (numKey[sum - arr[i]] === sum - arr[i]) {
      res.push([arr[i], numKey[sum - arr[i]]])
    }
  }

  return res
}

let arr = [1, 4, 3, 5, 7, 8, 9, 2, 3, 6, 1, 4, 8, 2]
const sum = 13

console.time('暴力')
console.table(fun1(arr, sum))
console.timeEnd('暴力')

console.time('非暴力')
console.table(fun2(arr, sum))
console.timeEnd('非暴力')
