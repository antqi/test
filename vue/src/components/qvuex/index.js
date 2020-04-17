let Vue

class Store {
  constructor(options) {
    this.state = new Vue({
      data: options.state,
    })

    this.mutations = options.mutations
    this.actions = options.actions
    this.handlerGetters(options.getters)
    // this.getters = this.handlerGetters(options.getters)
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch
  }

  handlerGetters(getters) {
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(getters, key, {
        get: () => {
          // 只读
          return getters[key](this.state)
        },
      })
    })
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
