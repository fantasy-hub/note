class KPromise {
    constructor(handler) {
        // PENDING，RESOLVED, REJECTED
        this.status = 'PENDING'

        // 数组：队列 - 先注册的，在调用resolve方法的时候，先执行的 FIFO
        this.resolvedHandler = []
        this.rejectedHandler = []

        handler(this._resolve.bind(this), this._reject.bind(this))
    }

    observe(callback) {
        let observer = new MutationObserver(() => {
            callback()
            observer.disconnect()
            observer = null
        })
        observer.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute('_dispatch', Math.random())
    }

    _resolve(value) {
        if (this.status !== 'PENDING') return

        this.status = 'RESOLVED'

        this.observe(() => {
            let handler
            while (handler = this.resolvedHandler.shift()) {
                handler(value)
            }
        })
    }

    _reject(value) {
        if (this.status !== 'PENDING') return

        this.status = 'REJECTED'

        this.observe(() => {
            let handler
            while (handler = this.rejectedHandler.shift) {
                handler(value)
            }
        })
    }

    then(resolvedHandler, rejectedHandler) {
        this.resolvedHandler.push(resolvedHandler)
        this.rejectedHandler.push(rejectedHandler)

        return new KPromise((resolve, reject) => {
            this.resolvedHandler.push(resolve)
            this.rejectedHandler.push(reject)
        })
    }
}