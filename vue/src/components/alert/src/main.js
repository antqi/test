import Alert from './index.vue'
import Vue from 'vue'

const AlertConstructor = Vue.extend(Alert)

export default function alert(options) {
  // const vm = new Vue({
  //   render(h) {
  //     return h(Alert, { props: this.options })
  //   },
  // }).$mount()

  const alertInstance = new AlertConstructor({
    data: options,
    el: document.createElement('div'),
  })

  // console.log(alertInstance.$el)
  document.body.appendChild(alertInstance.$el)

  alertInstance.remove = function() {
    alertInstance.$el.remove()
    alertInstance.$destroy()
  }
  alertInstance.show()
}
