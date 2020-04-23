var compileUtil = {
  text(node, vm, exp) {
    console.log('1', node.textContent, vm, exp)
    this.bind(node, vm, exp, 'text')
  },
  bind(node, vm, exp, type) {
    const updaterFn = updater[`${type}Updater`]
    // this._getVmVal(vm, exp)git
    updaterFn(node, this._getVmVal(vm, exp))
  },
  _getVmVal(vm, exp) {
    let val = vm.$data
    exp.split('.').forEach((key) => {
      val = val[key]
    })

    return val
  },
}
