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
