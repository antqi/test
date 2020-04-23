class QVue {
  constructor(options) {
    this.$el = options.el ? document.querySelector(options.el) : document.body
    this.$data = options.data
    observe(this.$data)
    const compile = new Compile(this.$el, this)
  }
}
