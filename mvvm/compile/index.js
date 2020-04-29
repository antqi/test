/**
 * 简易模版编译器
 * 1、解析模版指令，将变量中的模版转换成变量
 * 2、渲染视图
 * 3、将每个指令对应的节点绑定到对应的函数
 * 4、添加监听数据的监听者，收到通知更新视图
 */
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = el instanceof Node ? el : document.querySelector(el)

    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el)
      this.init()
      this.$el.appendChild(this.$fragment)
    }
  }

  init() {
    this.compileElement(this.$fragment)
  }

  node2Fragment(el) {
    let fragments = document.createDocumentFragment(),
      child

    while ((child = el.firstChild)) {
      fragments.appendChild(child)
    }

    return fragments
  }

  // 遍历所有的节点及子节点，进行扫描编译。调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新还书进行绑定
  compileElement(el) {
    let childNodes = el.childNodes
    let textModelReg = /\{\{(.*)\}\}/
    childNodes.forEach((node) => {
      // dom元素节点
      if (this.isElementNode(node)) {
        this.compile(node)
      }
      // 文本节点
      else if (this.isTextNode(node) && textModelReg.test(node.textContent)) {
        this.compileText(node, RegExp.$1)
      }

      // 遍历子节点
      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node)
      }
    })
    // console.log(childNodes)
  }

  // 文班编译
  compileText(node, key) {
    // console.log(node.textContent, key)
    // console.log(key, '-----', this.$vm.$data[key])
    // node.textContent = this.$vm.$data[key]
    compileUtil.text(node, this.$vm, key)
  }

  compile(node) {
    console.log('编译Node ', node)
  }

  isElementNode(el) {
    return el.nodeType !== 3
  }

  isTextNode(el) {
    return el.nodeType === 3
  }
  textUpdater() {}
}
