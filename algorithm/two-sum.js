/**
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 */

function fun1(nums, target) {
  // 遍历次数 arr.length*2
  let res

  for (let i = 0; i < nums.length; i++) {
    if (res) {
      break
    }
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] + nums[j] === target && i !== j) {
        res = [i, j]
      }
    }
  }

  return res
}

function fun2(nums, target) {
  let res
  let comp = {}

  for (let i = 0; i < nums.length; i++) {
    comp[nums[i]] = i
  }

  for (let i = 0; i < nums.length; i++) {
    if (comp[target - nums[i]] && i != comp[target - nums[i]]) {
      res =
        comp[target - nums[i]] > i
          ? [i, comp[target - nums[i]]]
          : [comp[target - nums[i]], i]
    }
  }

  return res
}

let arr = [3, 3, 11, 15]
const sum = 6

console.time('暴力')
console.log(fun1(arr, sum))
console.timeEnd('暴力')

console.time('非暴力')
console.log(fun2(arr, sum))
console.timeEnd('非暴力')
