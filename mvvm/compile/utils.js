var compileUtil = {
  text(node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },
  bind(node, vm, exp, type) {
    const updaterFn = updater[`${type}Updater`]
  },
  _getVmVal() {},
}
