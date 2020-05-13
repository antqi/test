##   Promise是什么 （what）

### 理解

##### 抽象表达

​     Promise是JS中进行异步编程的新的解决方案（旧的是什么？）

##### 具体表达

     1. 从语法上来说：Promise是一个构造函数
        2. 从功能上来说：promise对象用来封装一个异步操作并可以获取其结果

##### 旧的JS异步编程方案

​	纯回调机制-callback

### promise的状态改变

> 初始值是pending；只有两种改变；且一个Promise对象只能改变一次；
>
> 无论变为成功还是失败，都会有一个结果数据；
>
> 成功的结果数据一般称为value ，失败的结果数据一般称为reason

- pending （初始化）未确定的
- pending 变为 resolved 成功
- pending 变为 rejected 失败

### promise的基本流程

``` mermaid
graph TD
A[new Promise] --> |pendding| B{执行异步操作}
B --> |成功了,执行resolve| C[promise对象: resolved状态]
B --> |失败了,执行reject| D[promise对象: rejected状态]
C --> E[then 回调onResolved]
D --> F[then/catch 回调onRejected]
E --> G[新的promise对象]
F --> G[新的promise对象]
```



### promise的基本使用

``` javascript
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

```



 ## 为什么要使用Promise (why)



  ## 如何使用 (how)

