/*
 * @Author: antqi
 * @Email: hi.antqi@gmail.com
 * @Date: 2020-06-06 16:46:06
 * @Last Modified by: antqi
 * @Last Modified time: 2020-06-06 16:55:11
 * @Description: promise-version 2
 */

!(function (env) {
  function Promise(executor) {
    // 同步执行executor

    function resolve() {}
    function reject() {}

    executor(resolve, reject)
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
