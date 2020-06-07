/*
 * @Author: antqi
 * @Email: hi.antqi@gmail.com
 * @Date: 2020-06-06 16:46:06
 * @Last Modified by: antqi
 * @Last Modified time: 2020-06-07 09:30:34
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
      // 只处理一次
      if (_self.status !== _self.STATUS.PENDING) {
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

    function reject(reason) {
      // 只处理一次
      if (_self.status !== _self.STATUS.PENDING) {
        return
      }

      //修改状态
      _self.status = _self.STATUS.REJECTED
      //保存值
      _self.data = reason

      for (let i = 0; i < _self.callbackQueue.length; i++) {
        if (_self.callbackQueue[i].onRejected) {
          setTimeout(function () {
            _self.callbackQueue[i].onRejected(_self.data)
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

  /**
   * @desc
   * - 两种情况
   *  - 先指定回调函数，后改变状态
   *  - 先改变状态，后指定回调函数
   * - 返回一个新的promise对象
   * @param {Function}  onFulfilled 成功的回调函数
   * @param {Function}  onRejected 失败的回调函数
   * @return 新的promise对象，实现链式调用
   */
  Promise.prototype.then = function (onFulfilled, onRejected) {
    const _self = this
    onFulfilled =
      typeof onFulfilled === 'function'
        ? onFulfilled
        : function (value) {
            return value
          }

    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : function (reason) {
            throw reason
          }

    return new Promise(function (resolve, reject) {
      function callbackHandler(callback) {
        try {
          const result = callback(_self.data)
          if (result instanceof Promise) {
            // result是Promise
            result.then(resolve, reject)
          } else {
            // result 是普通值
            resolve(result)
          }
        } catch (error) {
          // 执行抛出异常
          reject(error)
        }
      }

      if (_self.status === _self.STATUS.FULFILLED) {
        // fulfilled
        setTimeout(function () {
          callbackHandler(onFulfilled)
        })
      } else if (_self.status === _self.STATUS.REJECTED) {
        // rejected
        setTimeout(function () {
          callbackHandler(onRejected)
        })
      } else {
        // pending，将指定回调函数追加到队列
        _self.callbackQueue.push({
          onFulfilled,
          onRejected,
        })
      }
    })
  }

  /**
   * @desc 指定失败的回调函数
   * @param {Function} onRejected 失败的回调的函数
   * @return 新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    console.log(onRejected)
    return this.then(undefined, onRejected)
  }

  Promise.prototype.finally = function (onFinally) {}

  Promise.resolve = function (value) {}

  Promise.reject = function (reason) {}

  Promise.all = function (promises) {}

  Promise.race = function (promises) {}

  env.Promise = Promise
})(window)
