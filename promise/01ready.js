/***
 * Promise的理解与函数对象
 *
 * 1、区别实例对象与函数对象
 *  - new 产生的是实例对象
 *  - 将函数作为对象使用，称为函数对象
 */

function Fn() {} // 函数

const fn = new Fn() // Fn 是构造函数 （是不是构造函数看怎么用），fn是实例对象
Fn.bind() // 函数对象 Fn.prototype.bind
// fn.get() // 实例对象的使用

// $('#id') // 函数
// $.get('#id') // 函数对象 $.prototype.get

/**
 * 2、两种类型的回调函数
 *
 *  - 同步回调
 *    立即执行，完全执行完了才结束，不回放入回调队列中
 *    比如：数组遍历相关的回调函数 / Promise的excutor函数
 *
 *  - 异步回调
 *    不会立即执行，会放入回调队列中将来执行
 *    比如：定时器回调 / ajax回调 / Promise的成功｜失败回调
 */

// 1、同步回调
const arr = [1, 2, 3]

arr.forEach((item) => {
  console.log(item)
})

console.log('forEach end')

// 2、异步回调函数 会放入队列中将来执行
setTimeout(() => {
  console.log('timeout')
}, 0)
console.log('timeout end')

/**
 * JS中的error 处理
 *
 * RangeError
 *  创建一个error实例，表示错误的原因：数值变量或参数超出其有效范围。
 * ReferenceError
 *  创建一个error实例，表示错误的原因：无效引用。
 * SyntaxError
 *  创建一个error实例，表示错误的原因：eval()在解析代码的过程中发生的语法错误。
 * TypeError
 *  创建一个error实例，表示错误的原因：变量或参数不属于有效类型。
 *
 *  没有捕获error ,后面的代码不会执行; throw 会让后面的代码不能执行,但finally会·执行
 */

try {
  console.log(a)
} catch (error) {
  // console.error(error.message)
  // throw new Error('error 111')
} finally {
  console.log('error finally')
}

console.log('----')
