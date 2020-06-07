/*
 * @Author: antqi
 * @Email: hi.antqi@gmail.com
 * @Date: 2020-06-06 16:46:06
 * @Last Modified by: antqi
 * @Last Modified time: 2020-06-07 13:23:48
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
            _self.callbackQueue[i].onFulfilled(_self.data)
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

    // 只执行一次
    // if (_self.status === _self.STATUS.PENDING) {
    //   return
    // }

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
        // pending，将指定回调函数追加到队列,注意这里也需要处理结果状态
        _self.callbackQueue.push({
          onFulfilled: function () {
            callbackHandler(onFulfilled)
          },
          onRejected: function () {
            callbackHandler(onRejected)
          },
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
    return this.then(undefined, onRejected)
  }

  /**
   * @desc 指定Promise结束后调用的回调函数
   * @param {Function} onFinally Promise结束后调用的回调函数
   * @return fa
   */
  Promise.prototype.finally = function (onFinally) {
    const _self = this

    try {
      return _self.then(function () {
        onFinally()
        return _self.data
      })
    } catch (error) {
      return _self.then(undefined, onFinally)
    }
  }

  /**
   * @desc 执行给定一个指定值的Promise
   * @param {any} vlaue 任意值
   * @return 返回一个解析值的Promise对象
   */
  Promise.resolve = function (value) {
    const _self = this

    return new Promise(function (resolve, reject) {
      try {
        if (value instanceof Promise) {
          // 指定的值为Promise
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      } catch (error) {
        // 执行抛出异常：执行失败，结果值为error
        reject(error)
      }
    })
  }

  /**
   * @desc 指定一个给定失败值的Promise
   * @param {any} reason 失败的值
   * @return 新的Promise
   */
  Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
      reject(reason)
    })
  }

  /**
   * @desc 指定并执行多个promise/一般值
   * @param {Array} promises [promise,promise,...]
   * @return 返回一个新的Promise对象，该Promise对象的结果值有两种
   *  - 全部执行成功，返回[result1,result2,...]，结果按指定的promise顺序排列
   *  - 有一个执行失败，返回失败的结果值
   */
  Promise.all = function (promises) {
    const _self = this
    let res = new Array(promises.length)

    return new Promise(function (resolve, reject) {
      let count = 0

      promises.forEach(function (p, index) {
        p.then(
          function (value) {
            count++
            res[index] = value

            if (count === promises.length) {
              resolve(res)
            }
          },
          function (reason) {
            reject(reason)
          }
        )
      })
    })
  }

  /**
   * @desc 指定多个promise对象，并执行
   * @param {Array} promises Promise对象或一般值
   * @return 返回一个新的Promise，新的Promise结果值逻辑
   *  - 返回最快执行的结果
   */
  Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
      promises.forEach(function (p, index) {
        p.then(resolve, reject)
      })
    })
  }

  env.Promise = Promise
})(window)
