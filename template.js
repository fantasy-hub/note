Function.prototype.bind = function () {
    const self = this
    const args = Array.prototype.slice.call(arguments)
    const t = args.shift()

    return function () {
        self.apply(t, args)
    }
}