/**
 * 基础实现
 * 先实现对象方法可以被正常调用
 */
Function.prototype.Mycall = function (context) {
    // console.log(context, '\n', this)
    context[this] = this
    context[this]()
    delete context[this]
}
// let person1 = {
//     name: 'tom',
//     say() {
//         console.log(this, this.name)
//     }
// }
// let person2 = {
//     name: 'jerry'
// }
// person1.say.Mycall(person2)
function CakeFactory(width, height) {
    this.width = width
    this.height = height
}
let cake = {
    name: 'cake'
}
CakeFactory.Mycall(cake)
console.log(cake);


/**
 * 进阶实现
 * 实现构造函数的属性继承
 */
Function.prototype.Mycall = function () {
    // console.log(context, '\n', this)
    const args = [...arguments]
    const context = args.shift()
    context[this] = this
    context[this](...args)
    delete context[this]
}
function CakeFactory(width, height) {
    this.width = width
    this.height = height
}
let cake = {
    name: 'cake'
}
CakeFactory.Mycall(cake, 100, 50)
console.log(cake);


/**
 * 进阶实现
 * 考虑返回值
 */
Function.prototype.Mycall = function () {
    // console.log(context, '\n', this)
    const args = [...arguments]
    const context = args.shift()
    let result

    context[this] = this
    result = context[this](...args)
    delete context[this]
    
    return result
}
function CakeFactory(width, height) {
    this.width = width
    this.height = height

    return {
        age: 110
    }
}
let cake = {
    name: 'cake'
}
const result = CakeFactory.Mycall(cake, 100, 50)
console.log(result);
console.log(cake)