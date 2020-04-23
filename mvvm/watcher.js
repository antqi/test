// 订阅者
class Watcher {}

Watcher.prototype = {
  get() {
    Dep.target = this
    this.value = data[value] // 触发Observer 监听属性
    Dep.target = null
  },
}
