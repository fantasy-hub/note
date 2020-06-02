class Events {
    constructor() {
        this.callbacks = []
    }

    // 订阅
    $on(callback) {
        this.callbacks.push(callback)
    }

    // 发布：将要发布的信息 告知订阅过的函数们
    $emit(data) {
        this.callbacks.forEach(cb => cb(data))
    }
}

let e = new Events()

e.$on(function (data) { 
    console.log('第一次订阅：' + data);
})

e.$on(function (data) {
    console.log('第二次订阅：' + data);
    console.log('---------------');
})

e.$emit('第一个完成了')
e.$emit('第二个完成了')