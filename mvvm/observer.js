// 1、代理data，监听数据变化
function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }

  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, value) {
  var dep = new Dep()
  // 当对象为对象的时候，监听子属性
  this.observe(data[key])

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      console.warn('getter', value)
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(newVal) {
      console.warn('setter', value, newVal)
      // 去更新通知订阅者更新视图
      value = newVal
    },
  })
}
