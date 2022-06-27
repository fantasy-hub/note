class EventBus {
  constructor() {
    this.hashMap = {}
  }
  $on(key, fn, isOnce = false) {
    const map = this.hashMap
    if (!map[key]) map[key] = []
    map[key].push({
      fn,
      isOnce
    })
  }
  $once(key, fn) {
    this.$on(key, fn, true)
  }
  $off(key, fn) {
    if (this.hashMap[key] == null) return
    if (!fn) { // 解绑所有
      this.hashMap[key] = []
    } else { // 解绑指定 fn
      this.hashMap[key] = this.hashMap[key].filter(item => item.fn != fn)
    }
  }
  $emit(key, ...values) {
    const list = this.hashMap[key]
    if (list == null) return
    for (let i = 0; i < this.hashMap[key].length; i++) {
      const {
        fn,
        isOnce
      } = list[i]
      fn(...values)
      if (isOnce) {
        list.splice(i, 1)
        i--
      }
    }
  }
}

const e = new EventBus()

function fn1(value) {
  console.log('fn1', value);
}

function fn2(value) {
  console.log('fn2', value);
}

function fn3(value) {
  console.log('fn3', value);
}

e.$on('change', fn1)
e.$on('change', fn2)
e.$once('change', fn3)

e.$emit('change', 'ok') // 触发 fn1 fn2 fn3，卸载 fn3
e.$off('change', fn2) // 卸载 fn2
e.$emit('change', 'not ok') // 触发 fn1