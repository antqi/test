;(function () {
  var message = 'APP Say Hi'

  function foo() {
    console.log(message)
  }

  window.APP = {
    foo,
  }
})()
