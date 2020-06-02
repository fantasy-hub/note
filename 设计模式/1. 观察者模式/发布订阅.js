class Events {
    constructor() {
        this.callbacks = []
    }

    // 订阅
    $on(callback) {
        this.callbacks.push(callback)
    }

    // 发布
    $emit(data) {
        this.callbacks.forEach(cb => cb(data))
    }
}

let e = new Events()

e.$on(function (data) { 
    console.log(data);
})

e.$emit('第一个完成了')
e.$emit('第二个完成了')