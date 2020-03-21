function test(title, fn) {
  try {
    console.group(title)
    fn()
  } catch (error) {
    console.error(title, error.message)
  } finally {
    console.groupEnd(title)
  }
}

function expect(ret) {
  return {
    toBe(arg) {
      if (ret !== arg) {
        throw new Error(`预期和实际不符，预期：${arg}，但是得到了${ret}`)
      } else {
        console.log('通过测试')
      }
    }
  }
}

test('测试数字加法', () => {
  expect(add(1, 3)).toBe(3)
})
test('测试数字加法', () => {
  expect(add(1, 3)).toBe(4)
})
