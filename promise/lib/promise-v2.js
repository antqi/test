/*
 * @Author: antqi
 * @Email: hi.antqi@gmail.com
 * @Date: 2020-06-06 16:46:06
 * @Last Modified by: antqi
 * @Last Modified time: 2020-06-06 17:18:36
 * @Description: promise-version 2
 */

!(function (env) {
  function Promise(executor) {
    // 同步执行executor
    this.STATUS = {
      PENDING: 'pending',
      FULFILLED: 'fulfilled',
      REJECTED: 'rejected',
    }
    this.status = this.STATUS.PENDING // 初始化状态
    this.data = null // 结果值
    this.callbackQueue = [] // 回调函数队列

    function resolve() {}
    function reject() {}

    try {
      executor(resolve, reject)
    } catch (error) {
      // 执行异常时，状态为rejected
      reject(error)
    }
  }

  Promise.prototype.then = function (onFulfilled, onRejected) {}

  Promise.prototype.catch = function (onRejected) {}

  Promise.prototype.finally = function (onFinally) {}

  Promise.resolve = function (value) {}

  Promise.reject = function (reason) {}

  Promise.all = function (promises) {}

  Promise.race = function (promises) {}

  env.Promise = Promise
})(window)
