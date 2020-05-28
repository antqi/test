/*
 * @Author: antqi
 * @Email: hi.antqi@gmail.com
 * @Date: 2020-05-28 14:34:58
 * @Last Modified by: antqi
 * @Last Modified time: 2020-05-28 23:17:05
 * @Description: 自定义Promise class版本
 */

;(function (param) {
  class Promise {
    constructor(excutor) {
      let _self = this
      // 状态常量
      _self.STATUS = {
        PENDING: 'pending',
        RESOLVED: 'resolved',
        REJECTED: 'rejected',
      }
      _self.status = _self.STATUS.PENDING // 初始化状态
      _self.data // 当前状态下的data值
      _self.callbacks = [] // 回调函数队列，每个元素的结构：{ onResolved(){}, onRejected(){} }

      function resolve(value) {
        // 状态只能修改一次
        if (_self.status === _self.STATUS.RESOLVED) {
          return
        }
        _self.status = _self.STATUS.RESOLVED
        _self.data = value

        if (_self.status === _self.STATUS.RESOLVED) {
          _self.callbacks.forEach(function (callback) {
            // 异步执行成功的回调：onResolved
            setTimeout(function () {
              callback.onResolved(value)
            })
          })
        }
      }

      function reject(reason) {
        // 状态只能修改一次
        if (_self.status === _self.STATUS.REJECTED) {
          return
        }
        _self.status = _self.STATUS.REJECTED
        _self.data = reason

        if (_self.status === _self.STATUS.REJECTED) {
          _self.callbacks.forEach(function (callback) {
            // 异步执行失败的回调：onRejected
            setTimeout(function () {
              callback.onRejected(reason)
            })
          })
        }
      }

      try {
        // excutor， 立即同步执行执行器函数
        excutor(resolve, reject)
      } catch (error) {
        // 执行期函数抛出异常，则执行失败的回调函数
        reject(error)
      }
    }

    /**
     * @desc 指定成功与失败的回调函数
     * @param {Function} onResolved 成功的回调函数
     * @param {Function} onRejected 失败的回调函数
     * @return Promise对象
     */
    then(onResolved, onRejected) {
      let _self = this

      // 没有指定回调函数的时候
      onResolved =
        typeof onResolved === 'function'
          ? onResolved
          : function (value) {
              return value
            }
      onRejected =
        typeof onRejected === 'function'
          ? onRejected
          : function (reason) {
              throw reason
            }

      // 返回一个新的Promise
      return new Promise((resolve, reject) => {
        function handler(callback) {
          try {
            const result = callback(_self.data)

            if (result instanceof Promise) {
              // result是一个Promise
              result.then(resolve, reject)
            } else {
              // result是普通值
              resolve(result)
            }
          } catch (error) {
            // onRejected抛出异常，则新的promise结果为error
            reject(error)
          }
        }

        if (_self.status === _self.STATUS.RESOLVED) {
          // 当前状态是resolved，立即异步执行成功的回调函数
          setTimeout(handler(onResolved))
        } else if (_self.status === _self.STATUS.REJECTED) {
          // 当前状态是rejeted，立即异步执行失败的回调函数
          setTimeout(handler(onRejected))
        } else {
          // 当天状态是pending，将指定的回调函数存储到callbacks
          _self.callbacks.push({
            onResolved: function () {
              handler(onResolved)
            },
            onRejected: function () {
              handler(onRejected)
            },
          })
        }
      })
    }

    /**
     * @desc 指定失败的回调函数
     * @param {Function} onRejected 失败的回调函数
     * @return Promise对象
     */
    catch = function (onRejected) {
      return this.then(undefined, onRejected)
    }

    /**
     * @desc 静态方法resolve，理解为快捷指定成功回调函数的方法
     * @param {any} value 指定任意返回的值
     * @return  被解析过Promise对象
     */
    static resolve = function (value) {
      return new Promise(function (resolve, reject) {
        try {
          if (value instanceof Promise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        } catch (error) {
          reject(error)
        }
      })
    }

    /**
     * @desc 静态方法reject，理解为快捷指定失败回调函数的方法
     * @param {any} reason 指定任意返回的值
     * @return  带有特定被拒绝原因的Promise对象
     */
    static reject = function (reason) {
      return new Promise(function (resolve, reject) {
        reject(reason)
      })
    }

    /**
     * @desc 启动多个异步任务并发运行 ，并组合返回的结果
     * @param {Array｜String} promises 多个promise或值组成的数组
     * @return 一个新的Promise，只有所有的Promise都成功才成功，只要有一个失败了就直接失败
     */
    static all = function (promises) {
      let values = new Array(promises.length)
      let count = 0
      return new Promise(function (resolve, reject) {
        promises.forEach(function (promise, index) {
          Promise.resolve(promise).then(
            function (value) {
              count++
              values[index] = value
              if (count === promises.length) {
                resolve(values)
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
     * @desc 启动多个异步任务并发运行 ，第一个解决或拒绝的promise的结果状态组成的新的promise
     * @param {Array｜String} promises 多个promise或值组成的数组
     * @return 一个新的promise ，第一个解决或拒绝的promise的结果状态就是最终的结果状态
     */
    static race = function (promises) {
      return new Promise(function (resolve, reject) {
        promises.forEach(function (p) {
          Promise.resolve(p).then(
            function (value) {
              resolve(value)
            },
            function (reason) {
              reject(reason)
            }
          )
        })
      })
    }

    /**
     * @desc 定时返回promise以及值
     */
    static resolveDelay = function (value, time) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (value instanceof Promise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        }, time)
      })
    }

    /**
     * @desc 定时返回promise拒绝原因
     */
    static rejectDelay = function (reason, time) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          reject(reason)
        }, time)
      })
    }
  }
  // function Promise(excutor) {

  // }

  // 向外暴露
  param.Promise = Promise
})(window)
