/**
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

//  递归方式
function fun1(n) {
  if (n < 2) {
    return n
  }

  while (n > 0) {
    const first = fun1(n - 1)
    const second = fun1(n - 2)
    --n
    return first + second
  }
}

// 缓存方式
function fun2(n) {
  let cache = [0]
  let count = 0

  while (count <= n) {
    if (count < 2) {
      cache[count] = count
    } else {
      cache[count] = cache[count - 1] + cache[count - 2]
    }
    count++
  }
  console.table(cache)
  return cache[n]
}

const n = 46

// console.time(`递归${n}`)
// console.log('结果：', fun1(n))
// console.timeEnd(`递归${n}`)

console.time(`缓存${n}`)
console.log('\n结果：', fun2(n))
console.timeEnd(`缓存${n}`)
