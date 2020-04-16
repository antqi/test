let Vue

class Store {
  constructor(options) {
    console.log(options)
    this.state = new Vue({
      data: options.state,
    })

    this.mutations = options.mutations
    // this.getters = options.getters
    this.actions = options.actions

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch
  }

  commit(type, args) {
    this.mutations[type](this.state, args)
  }

  dispatch(type, args) {
    return this.actions[type](this, args)
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // console.log(this.$options.store.state)
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}
export default {
  Store,
  install,
}
