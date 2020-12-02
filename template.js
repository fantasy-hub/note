let p = new Promise((resolve, reject) => {
    resolve('end')
})
console.log('start');

class Promise {
    constructor(handler) {
        this.state = 'PENDING'
        this.resolvedHandler = []
        this.rejectedHandler = []

        handler(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve(value) {
        if (this.state !== 'PENDING') return
        this.state = 'FULFILLED'
        this.observe(() => {
            let handler
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
        document.body.setAttribute('micro-task', Math.random())
    }

    then(resolvedHandler, rejectedHandler) {
        
    }
}