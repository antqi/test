/**
 * 如何改变promise的状态？ resolve  reject  throw
 */
function changeStatus() {
  new Promise((resolve, reject) => {
    // resolve(1)
    // reject(1)
    // throw 1
  }).then(
    (value) => {
      console.log('onResolved:', value)
    },
    (reason) => {
      console.log('onRejected:', reason)
    }
  )
}

// changeStatus()

/**
 * 一个promise指定多个成功/失败回调函数，会调用吗？会。
 */
function multi() {
  const p = new Promise((resolve, reject) => {
    // resolve(1)
    // reject(1)
    throw 1
  })

  p.then(
    (value) => {
      console.log('onResolved 1:', value)
    },
    (reason) => {
      console.log('onRejected 1:', reason)
    }
  )

  p.then(
    (value) => {
      console.log('onResolved 2:', value)
    },
    (reason) => {
      console.log('onRejected 2:', reason)
    }
  )
}

// multi()

/**
 * 改变promise状态和指定回调函数谁先谁后？
 */
function changeOrder() {
  // 先回调函数后状态
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('先指定回调后改状态')
    }, 20)
  }).then(
    (value) => {
      console.log('onResolved', value)
    },
    (reason) => {
      console.log('onRejected', reason)
    }
  )

  // 先改状态后指定回调函数方式一
  new Promise((resolve, reject) => {
    resolve('先改状态后指定回调函数方式一')
  }).then(
    (value) => {
      console.log('onResolved', value)
    },
    (reason) => {
      console.log('onRejected', reason)
    }
  )

  // 先改状态后指定回调函数方式二
  const p = new Promise((resolve, reject) => {
    resolve('先改状态后指定回调函数方式二')
  })

  setTimeout(() => {
    p.then(
      (value) => {
        console.log('onResolved', value)
      },
      (reason) => {
        console.log('onRejected', reason)
      }
    )
  }, 10)
}

// changeOrder()

/**
 * promise.then( ) 返回的新promise的结果状态由什么决定？
 *  由then指定的【回调函数的结果】决定
 */
function resultStatus() {
  // 如果抛出异常，新的promise变为rejected，reason为抛出异常
  // new Promise((resolve, reject) => {
  //   const title = '如果抛出异常'
  //   // resolve(title)
  //   // reject(title)
  //   throw title
  // })
  //   .then(
  //     (value) => {
  //       console.log('onResolved 结果状态1:', value)
  //       throw 'onResolved1 抛出了一个异常'
  //     },
  //     (reason) => {
  //       console.log('onRejected 结果状态1:', reason)
  //       throw 'onRejected1 抛出了一个异常'
  //     }
  //   )
  //   .then(
  //     (value) => {
  //       console.log('onResolved 结果状态2:', value)
  //     },
  //     (reason) => {
  //       console.log('onRejected 结果状态2:', reason)
  //     }
  //   )
  // 如果返回的是非promise的任意值，新的promise变为resolved，value为返回的值
  // new Promise((resolve, reject) => {
  //   const title = '如果返回的是非promise的任意值'
  //   // resolve(title)
  //   reject(title)
  //   // throw title
  // })
  //   .then(
  //     (value) => {
  //       console.log('onResolved 结果状态1:', value)
  //       return 'onResolved1 1'
  //     },
  //     (reason) => {
  //       console.log('onRejected 结果状态1:', reason)
  //       return 'onRejected1 1'
  //     }
  //   )
  //   .then(
  //     (value) => {
  //       console.log('onResolved 结果状态2:', value)
  //     },
  //     (reason) => {
  //       console.log('onRejected 结果状态2:', reason)
  //     }
  //   )
  // 如果返回的是另一个新的promise，此promise的结果就会成为新promise的结果
  new Promise((resolve, reject) => {
    const title = '如果返回的是另一个新的promise'
    // resolve(title)
    reject(title)
    // throw title
  })
    .then(
      (value) => {
        console.log('onResolved 结果状态1:', value)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('onResolved1的Promise')
          }, 100)
        })
      },
      (reason) => {
        console.log('onRejected 结果状态1:', reason)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('onRejected1的Promise')
          }, 100)
        })
      }
    )
    .then(
      (value) => {
        console.log('onResolved 结果状态2:', value)
      },
      (reason) => {
        console.log('onRejected 结果状态2:', reason)
      }
    )
}
// resultStatus()

/**
 * promise如何串连多个操作任务
 *  - 串连多个同步 或 异步任务
 *  - 同步: return  任意数据
 *  - 异步: return  new Promise()
 */
function mutilTasks(params) {
  new Promise((resolve, reject) => {
    resolve(1)
  })
    .then(
      (value) => {
        console.log('value 1', value)
        return 'value1'
      },
      (reason) => {
        console.log('reason 1', reason)
        return Promise.reject('reason1')
      }
    )
    .then(
      (value) => {
        console.log('value 2', value)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('异步的value2')
          }, 1000)
        })
      },
      (reason) => {
        console.log('reason 2', reason)
      }
    )
    .then((value) => {
      console.log('value 3', value)
    })
}
// mutilTasks()

/**
 * 异常传透
 */
function transferError() {
  // 当使用promise的then链式调用时，可以在最后指定失败的回调
  new Promise((resolve, reject) => {
    throw '开始就抛出了异常'
  })
    .then((value) => value) // 不写reason，相当于指定了默认：reason=> throw reason
    .then((value) => value)
    .then((value) => value)
    .catch((error) => {
      console.log('最后catch的接收', error)
    })

  // 前面任何出了差错，都会传到最后指定的失败回调函数
  new Promise((resolve, reject) => {
    resolve(0)
  })
    .then((value) => value)
    .then((value) => {
      throw 'onResolved2 抛出了异常'
    })
    .then((value) => value)
    .catch((error) => {
      console.log('最后catch的接收', error)
    })
    .then((value) => {
      console.log('最后一个then ', value)
    })
}
// transferError()

/**
 * 中断promise链
 */
function breakPromiseLink() {
  // 在回调函数返回一个pending状态的promise对象
  new Promise((resolve, reject) => {
    resolve(1)
  })
    .then((value) => {
      console.log('onRejected 1')
    })
    .then((value) => {
      return new Promise(() => {}) // 中断
    })
    .then((value) => value)
    .catch((error) => {
      console.log('catch', error)
    })
    .then((value) => {
      console.log('最后一个then ', value)
    })
}
breakPromiseLink()
