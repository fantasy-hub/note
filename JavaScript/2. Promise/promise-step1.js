/**
 * @step1
 * 1. 实现将resolve回调的内容，处理成微任务
 * 2. 对Promise的第一个then的回调加入任务队列
 * 
 */
class Promise {
    constructor(handler) {
        // PENDING, RESOLVED, REJECTED
        this.state = 'PENDING'
        
        // 任务队列：在调用resolve方法时，FIFO先进先出
        this.resolvedHandler = []
        this.rejectedHandler = []

        handler(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve(value) {
        // 状态一经改变，就不能再修改
        if (this.state !== 'PENDING') return

        this.state = 'RESOLVED'

        this.observe(() => {
            let handler
            
            // 每个独立的promise只处理一次任务，所以注册的任务队列的回调取出后就不在需要了
            while (handler = this.resolvedHandler.shift()) {
                handler(value)
            }
        })
    }

    _reject(value) {
        if (this.state !== 'PENDING') return

        this.state = 'REJECTED'

        this.observe(() => {
            let handler

            while (handler = this.rejectedHandler.shift()) {
                handler(value)
            }
        })
    }

    observe(callback) {
        let ob = new MutationObserver(() => {
            callback()

            ob.disconnect()
            ob = null
        })
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute('_dispatch', Math.random())
    }

    then(resolvedHandler, rejectedHandler) {
        /**
         * then 方法不会立即执行传入的函数，而是等待当前Promise调用resolve或reject方法再调用
         * 解决方法：
         * 1. 先把then方法传入的回调保存在任务队列，在Promise调用resolve方法再取出任务队列的回调去执行 - 事件注册
         * 2. 返回一个promise，实现链式调用
         * 3. 将上一次的返回值作为参数传给resolve。让下一个then得到上一次的返回值
         */
        return new Promise((resolve, reject) => {
            // 此处的value，是执行this._resolve.bind(this)时 传给handler(value)的值
            this.resolvedHandler.push((value) => {
                if (typeof resolvedHandler === 'function') {
                    value = resolvedHandler(value)

                    // 上一个then返回的是Promise的实例
                    if (value instanceof Promise) {
                        return value.then(resolve, reject)
                    }

                    // 上一个then返回的是带有then方法的对象
                    if (typeof value === 'object' && value.then) {
                        return value.then()
                    }
                }
                resolve(value)
            })

            this.rejectedHandler.push((value) => {
                if (typeof rejectedHandler === 'function') {
                    value = rejectedHandler(value)

                    if (value instanceof Promise) {
                        return value.then(resolve, reject)
                    }

                    if (typeof value === 'object' && value.then) {
                        return value.then()
                    }
                }
                reject(value)
            })
        })    
    }
}