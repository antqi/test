const uniq = require('uniq')
const data = require('./module2')

module.exports = function () {
  uniq(data.arr)
  console.log('run module3:' + data.arr)
}
