export class EventBus {
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
    if (!fn) { // 解绑所有
      this.hashMap[key] = []
    } else { // 解绑指定 fn
      const list = this.hashMap[key]
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