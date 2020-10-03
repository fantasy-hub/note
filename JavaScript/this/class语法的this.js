class Animal {
    constructor() {
        this.speak = this.speak.bind(this)
    }

    speak() {
        console.log(this);
        return this;
    }
    static eat() {
        return this;
    }
}

let obj = new Animal();
obj.speak(); // Animal {}
let speak = obj.speak;
speak(); // undefined

// undefined 的原因是：
// class 语法内部默认使用严格模式
// 严格模式下函数内部的this是undefined
// let speak = obj.speak = function () { console.log(this); return this; }
// 所以执行speak(), this是undefined