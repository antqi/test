(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],2:[function(require,module,exports){
const module1 = require('./js/module1')
const module2 = require('./js/module2')
const module3 = require('./js/module3')

const eleNum1 = document.querySelector('#num1')
const eleNum2 = document.querySelector('#num2')
const eleRes = document.querySelector('#result')

document.querySelector('#calc').addEventListener('click', function () {
  const btnELe = this
  btnELe.innerText = '计算中...'
  eleRes.innerHTML = ''

  try {
    setTimeout(function () {
      var res = module1(eleNum1.value, eleNum2.value)
      btnELe.innerText = '重新计算'

      eleRes.innerHTML = isNaN(res) ? '请输入数字' : res
    }, 1500)
  } catch (error) {
    btnELe.innerText = '重新计算'
    eleRes.innerHTML = error.message + '请输入数字'
  }
})

module3()

},{"./js/module1":3,"./js/module2":4,"./js/module3":5}],3:[function(require,module,exports){
/**
 * 两数相加
 * @param {Number} x
 * @param {Number} y
 * @return x+y
 */
function add(x, y) {
  console.log('run module2 add()')
  return Number(x) + Number(y)
}

module.exports = add

},{}],4:[function(require,module,exports){
exports.num1 = 4
exports.num2 = 5
exports.arr = [1, 4, 6, 7, 7, 6]

},{}],5:[function(require,module,exports){
const uniq = require('uniq')
const data = require('./module2')

module.exports = function () {
  uniq(data.arr)
  console.log('run module3:' + data.arr)
}

},{"./module2":4,"uniq":1}]},{},[2]);
