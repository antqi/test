class QVue {
  constructor(options) {
    this.$el = options.el ? document.querySelector(options.el) : document.body
    this.$data = options.data
    observe.bind(this)
    observe(this.$data, this)
    const compile = new Compile(this.$el, this)
  }
}
