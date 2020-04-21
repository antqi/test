class QVue {
  constructor(options) {
    this.el = options.el ? document.querySelector(options.el) : document.body
    this.$data = options.data
    this.observe(this.$data)
  }

  // 代理data
  observe(data) {
    if (!data || typeof data !== 'object') {
      return
    }

    Object.keys(data).forEach((key) => {
      this._defineReactive(data, key, data[key])
    })
  }

  _defineReactive(data, key, value) {
    // 当对象为对象的时候
    this.observe(data[key])
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        console.warn('getter', value)
        return value
      },
      set(newVal) {
        console.warn('setter', value, newVal)
        value = newVal
      },
    })
  }
  // 解析模版
}
