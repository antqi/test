// 订阅器，收集订阅者，数据变动触发notify，并调用订阅者的update方法去更新视图
class Dep {
  constructor() {
    this.subscribers = []

    // 收集订阅者
    this.addSub = (subscriber) => {
      this.subscribers.push(subscriber)
    }

    // 通知
    this.notify = () => {
      this.subscribers.forEach((sub) => {
        sub.update()
      })
    }
  }
}
