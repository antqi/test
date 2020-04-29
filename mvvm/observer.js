// let mvvm
// 1、代理data，监听数据变化
function observe(data, vm) {
  if (!data || typeof data !== 'object') {
    return
  }
  // mvvm = vm
  proxyData.bind(vm)
  defineReactive.bind(vm)

  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
    // console.log(typeof this, typeof vm)
    if (vm) {
      // console.log(vm)
      proxyData(key)
    }
  })
}

function defineReactive(data, key, value) {
  var dep = new Dep()
  // 当对象为对象的时候，监听子属性
  observe(data[key])

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      // console.warn('getter', value)
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

// 代理属性到实例
function proxyData(key) {
  console.log(this)

  // function a() {}

  // console.warn(typeof a)

  // Object.defineProperty(mvvm, key, {
  //   get() {
  //     return mvvm.$data[key]
  //   },
  //   set(newVal) {
  //     mvvm.$data[key] = newVal
  //   },
  // })
}
