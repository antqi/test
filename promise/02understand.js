const p = new Promise((resolve, reject) => {
  const time = Date.now()
  // 执行异步任务
  if (time % 2 === 0) {
    // 成功
    resolve(`偶数: ${time}`)
  } else {
    // 失败
    reject(`奇数: ${time}`)
    // throw new Error(`奇数: ${time}`)
  }
})

p.then(
  (value) => {
    // 接收成功的value数据
    console.log(value)
  },
  (reason) => {
    // 接收失败的reason数据
    console.warn(reason)
  }
)
// .catch((error) => {
// 会优先then 中的reason
// console.error('catch', error)
// })
// .finally(() => {
//   console.log('33333')
// })
