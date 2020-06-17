;(function (env, calc) {
  var num1 = 1
  var num2 = 3

  function showResult() {
    console.log(calc.add(num1, num2))
  }

  env.APP = {
    showResult,
  }
})(window, calc)
