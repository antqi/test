/*
 * @Author: antqi
 * @Email: hi.antqi@gmail.com
 * @Date: 2020-05-25 15:14:05
 * @Last Modified by: antqi
 * @Last Modified time: 2020-05-25 15:43:30
 * @Description: 自定义Promise ES5版本
 */

;(function (param) {
  function Promise(excotor) {
    function resolve() {}

    function reject() {}
    // excotor，执行器函数
    excotor(resolve, reject)
  }

  /**
   * @desc 指定成功与失败的回调函数
   * @param {Function} onResolved 成功的回调函数
   * @param {Function} onRejected 失败的回调函数
   * @return Promise对象
   */
  Promise.prototype.then = function (onResolved, onRejected) {}

  /**
   * @desc 指定失败的回调函数
   * @param {Function} onRejected 失败的回调函数
   * @return Promise对象
   */
  Promise.prototype.catch = function (onRejected) {}

  /**
   * @desc 静态方法resolve，理解为快捷指定成功回调函数的方法
   * @param {any} value 指定任意返回的值
   * @return  被解析过Promise对象
   */
  Promise.resolve = function (value) {}

  /**
   * @desc 静态方法reject，理解为快捷指定失败回调函数的方法
   * @param {any} reason 指定任意返回的值
   * @return  带有特定被拒绝原因的Promise对象
   */
  Promise.resolve = function (reason) {}

  /**
   * @desc 启动多个异步任务并发运行 ，并组合返回的结果
   * @param {Array｜String} promises 多个promise或值组成的数组
   * @return 一个新的Promise，只有所有的Promise都成功才成功，只要有一个失败了就直接失败
   */
  Promise.all = function (promises) {}

  /**
   * @desc 启动多个异步任务并发运行 ，第一个解决或拒绝的promise的结果状态组成的新的promise
   * @param {Array｜String} promises 多个promise或值组成的数组
   * @return 一个新的promise ，第一个解决或拒绝的promise的结果状态就是最终的结果状态
   */
  Promise.race = function (promises) {}

  // 向外暴露
  param.Promise = Promise
})(window)
