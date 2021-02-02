class Promise {
    constructor(handler) {
        this.state = 'PENDING'

        this.resolvedHandler = []
        this.rejectedHandler = []
        this.finallyHandler = []

        handler(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve(value) {
        if (this.state !== 'PENDING') return
        this.state = 'RESOLVED'

        this.observe(() => {
            let handler

            while (handler = this.resolvedHandler.shift()) {
                handler(value)
            }
        })
        this._finally(value)
    }

    _reject(value) {
        if (this.state !== 'PENDING') return
        this.state = 'REJECTED'

        this.observe(() => {
            let handler

            while (handler = this.rejectedHandler.shift()) {
                handler(value)
            }

            this._finally(value)
        })
    }

    _finally(value) {
        this.observe(() => {
            let handler

            while (handler = this.finallyHandler.shift()) {
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

        document.body.setAttribute('_promise', Math.random())
    }

    then(resolvedHandler, rejectedHandler) {
        // 任务收集
        return new Promise((resolve, reject) => {
            this.resolvedHandler.push((val) => {
                // console.log('val', val);
                val = resolvedHandler(val)
                
                if (val instanceof Promise) {
                    return val.then(resolve, reject)
                }

                if (typeof val === 'object' && val.then) {
                    return val.then()
                }

                resolve(val)
            })

            this.rejectedHandler.push(val => {
                val = rejectedHandler(val)

                if (val instanceof Promise) {
                    return val.then(resolve, reject)
                }

                if (typeof val === 'object' && val.then) {
                    return val.then()
                }

                reject(val)
            })
        })
    }

    static resolve(val) {
        return new Promise(resolve => {
            resolve(val)
        })
    }

    static reject(val) {
        return new Promise((resolve, reject) => {
            reject(val)
        })
    }

    static all(it) {
        let len = it.length
        let n = 0
        let values = []

        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                // 表示此时已经调用了resolve拿到了返回值
                it[i].then(val => {
                    n++
                    values[i] = val
                    n === len && resolve(values)
                })
            }
        })
    }

    static race(it) {
        let len = it.length
        let n = 0

        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                it[i].then(val => { resolve(val)})
                n++
            }
        })
    }
}