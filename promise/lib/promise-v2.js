/*
 * @Author: antqi
 * @Email: hi.antqi@gmail.com
 * @Date: 2020-06-06 16:46:06
 * @Last Modified by: antqi
 * @Last Modified time: 2020-06-06 17:35:49
 * @Description: promise-version 2 for broswer
 */

!(function (env) {
  function Promise(executor) {
    const _self = this
    // 同步执行executor
    _self.STATUS = {
      PENDING: 'pending',
      FULFILLED: 'fulfilled',
      REJECTED: 'rejected',
    }
    _self.status = _self.STATUS.PENDING // 初始化状态
    _self.data = null // 结果值
    _self.callbackQueue = [] // 回调函数队列

    function resolve(value) {
      // 只处理FULFILLED，并只处理一次
      if (_self.status !== _self.STATUS.FULFILLED) {
        return
      }

      //修改状态
      _self.status = _self.STATUS.FULFILLED
      //保存值
      _self.data = value

      for (let i = 0; i < _self.callbackQueue.length; i++) {
        if (_self.callbackQueue[i].onFulfilled) {
          setTimeout(function () {
            _self.callbackQueue.onFulfilled(_self.data)
          }, 0)
        }
      }
    }

    function reject() {
      // 只处理REJECTED，并只处理一次
      if (_self.status !== _self.STATUS.REJECTED) {
        return
      }

      //修改状态
      _self.status = _self.STATUS.REJECTED
      //保存值
      _self.data = value

      for (let i = 0; i < _self.callbackQueue.length; i++) {
        if (_self.callbackQueue[i].onRejected) {
          setTimeout(function () {
            _self.callbackQueue.onRejected(_self.data)
          }, 0)
        }
      }
    }

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
