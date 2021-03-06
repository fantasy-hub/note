class KPromise {
    /**
     * @发布 _resolve
     * @订阅 then catch finally
     */
    constructor(handler) {
        // PENDING，RESOLVED, REJECTED。状态一经改变就不能再修改
        this.status = 'PENDING';

        // 数组：队列 - 先注册的，在调用resolve方法的时候，先执行的 FIFO
        this.resolvedHandler = [];
        this.rejectedHandler = [];
        this.finallyHandler = [];

        handler(this._resolve.bind(this), this._reject.bind(this));

    }

    _resolve(value) {
        // setTimeout(() => {
        //     // console.log('_resolve');
        //
        //     let handler;
        //     // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不再需要了
        //     while(handler = this.resolvedHandler.shift()) {
        //         handler();
        //     }
        // }, 0);

        if (this.status !== 'PENDING') return;
        this.status = 'RESOLVED';
        this.observe(() => {
            let handler;
            // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不再需要了
            while (handler = this.resolvedHandler.shift()) {
                handler(value);
            }

            this._finally(value);
        });
    }

    _reject(value) {
        // console.log('_reject');
        if (this.status !== 'PENDING') return;
        this.status = 'REJECTED';
        this.observe(() => {
            let handler;
            // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不再需要了
            while (handler = this.rejectedHandler.shift()) {
                handler(value);
            }
            this._finally(value);
        });
    }

    _finally(value) {
        this.observe(() => {
            let handler;
            // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不再需要了
            while (handler = this.finallyHandler.shift()) {
                handler(value);
            }
        });
    }

    observe(callback) {
        // 将所有then订阅的函数 转换成微任务
        let ob = new MutationObserver(() => {
            // 订阅回调
            callback();
            ob.disconnect();
            ob = null;
        });
        // 设置发布条件
        ob.observe(document.body, {
            attributes: true
        });
        // 发布
        document.body.setAttribute('_kkb', Math.random());
    }

    then(resolvedHandler, rejectedHandler) {
        /**
         * then 方法并不会立即执行传入的函数
         * 而是需要等待当前KPromise调用 resolve 方法，确认前置任务以及执行成功了才调用
         * 为了满足这个需求，我们这里需要先把传入的 resolvedHandler 保存到一个指定的位置，在KPromise调用resolve方法以后再去执行 - 事件注册
         */
        // this.resolvedHandler.push( resolvedHandler );
        // this.rejectedHandler.push( rejectedHandler );

        return new KPromise((resolve, reject) => {
            // resolve();
            // this.resolvedHandler.push(resolve);

            this.resolvedHandler.push(val => {
                if (typeof resolvedHandler === 'function') {
                    val = resolvedHandler(val);

                    // 上一个then返回的是一个KPromise
                    if (val instanceof KPromise) {
                        /**
                        let p = new KPromise((resolve) => {
                            resolve('start')
                        })
                        p.then(res => {
                            return new KPromise((resolve, reject) => {
                                resolve(res)
                            })
                        }).then(res => {
                            console.log(res, 'success')
                        }, err => {
                            console.log(err, 'error')
                        })

                        此时的val.then 即 
                        return new KPromise((resolve, reject) => {
                            resolve(res)
                        })

                        所以then方法返回的KPromise回调，应该接在val.then()后执行
                         */
                        return val.then(resolve, reject);
                    }

                    // 上一个then返回的是一个带有then方法的对象: { then: function () {} }
                    if (typeof val === 'object' && val.then) {
                        // console.log('val,,,,,', val.then)
                        return val.then();
                    }
                }
                resolve(val);
            });

            this.rejectedHandler.push(val => {
                if (typeof rejectedHandler === 'function') {
                    val = rejectedHandler(val);

                    if (val instanceof KPromise) {
                        return val.then(resolve, reject);
                    }

                    if (typeof val === 'object' && val.then) {
                        // console.log('val,,,,,', val.then)
                        return val.then();
                    }
                }
                reject(val);
            });
        })
    }

    catch(rejectedHandler) {
        return this.then(undefined, rejectedHandler);
    }

    finally(finallyHandler) {
        this.finallyHandler.push(finallyHandler);
    }

    static resolve(val) {
        return new KPromise(resolve => {
            resolve(val);
        });
    }

    static all(it) {
        let len = it.length;
        let n = 0;
        let values = [];
        return new KPromise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                it[i].then(val => {
                    // 表示此时每个KPromise已经调用了resolve，拿到了返回值
                    n++;
                    values[i] = val;
                    if (n === len) {
                        resolve(values);
                    }
                });
            }
        });
    }

    static race(it) {
        let len = it.length;
        return new KPromise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                // KPromise的状态只可以变一次，所以拿到第一次改变后的值。后续的this._resolve不会再执行
                it[i].then(val => resolve(val))
            }
        })
    }
}