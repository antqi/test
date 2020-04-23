var updater = {
  textUpdater: (node, value) => {
    console.log('1111')
    node.textContent = typeof value == undefined ? '' : value
  },
}
