/**
 * 自定义Promise函数模块 (ES5)
 */

;(function (params) {
  /**
   * Promise
   * @param {Function} excutor 执行器函数
   */
  function Promise(excutor) {
    let _self = this
    _self.STATUS = {
      PENDING: 'pending',
      RESOLVED: 'resolved',
      REJECTED: 'rejected',
    }
    _self.status = _self.STATUS.PENDING // 指定promise对象的出事状态
    _self.data = undefined // 给promise对象一个用于存储结果数据的属性
    _self.callbacks = [] // 每个元素的结构：{ onResolved(){}, onRejected(){} }

    function resolve(value) {
      // 状态只能改一次
      if (_self.status !== _self.STATUS.PENDING) {
        return
      }

      // 改状态为resolved
      _self.status = _self.STATUS.RESOLVED
      // 保存value数据
      _self.data = value

      // 如果有待执行的callback函数, 立即异步执行指定回调函数onResolved
      if (_self.callbacks.length) {
        setTimeout(() => {
          // 放入队列执行所有成功的回调
          _self.callbacks.forEach((callbacksObj) => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      // 状态只能改一次
      if (_self.status !== _self.STATUS.PENDING) {
        return
      }

      // 改状态为rejected
      _self.status = _self.STATUS.REJECTED
      // 保存value数据
      _self.data = reason

      // 如果有待执行的callback函数, 立即异步执行指定回调函数onRejected
      if (_self.callbacks.length) {
        setTimeout(() => {
          // 放入队列执行所有失败的回调
          _self.callbacks.forEach((callbacksObj) => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }

    // 立即同步执行执行器
    try {
      excutor(resolve, reject)
    } catch (error) {
      // 执行器抛出异常，则为promise对象状态为rejected
      reject(error)
    }
  }

  /**
   * Promise原型对象的then，并返回一个新的promise对象
   * @param {Function} onResolved 指定成功的回调函数
   * @param {Function} onRejected 指定失败的回调函数
   * @return {Promise} promise 新的promise对象
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    // 将指定的回调函数保存起来
    this.callbacks.push({
      onResolved,
      onRejected,
    })

    // 当前状态还是pending状态时，回调函数调用则在改拜年状态时调用，也就是resole reject函数
    // 若先改变状态，后指定回调函数
    if (this.status !== this.STATUS.PENDING) {
      if (this.callbacks.length) {
        setTimeout(() => {
          if (this.status === this.STATUS.RESOLVED) {
            onResolved(this.data)
          } else {
            onRejected(this.data)
          }
        })
      }
    }

    // 并返回promise
    return this
  }

  /**
   * Promise原型对象的catch，并返回一个新的promise对象
   * @param {Function} onRejected 指定失败的回调函数
   * @return {Promise} promise 新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    console.log(this.status)
  }

  /**
   * Promise函数对象resolve,并返回一个指定成功的promise
   * @param {any} value 执行成功的值
   */
  Promise.resolve = function (value) {}

  /**
   * Promise函数对象reject,并返回一个指定失败的promise
   * @param {reason} reason 执行失败的数据
   */
  Promise.reject = function (reason) {}

  /**
   * Promise函数对象all,返回一个promise数组，当所有Promise成功的时才成功，否则失败
   */
  Promise.all = function (promises) {}

  /**
   * Promise函数对象race，返回一个promise数组，其结果状态由第一个完成的promise决定
   */
  Promise.race = function (promises) {}

  // 向外暴露
  params.Promise = Promise
  // console.log(param.Promise)
})(window)
