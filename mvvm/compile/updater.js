var updater = {
  textUpdater: (node, value) => {
    node.textContent = typeof value == undefined ? '' : value
  },
}
