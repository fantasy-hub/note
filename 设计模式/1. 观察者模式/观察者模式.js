// 被观察对象
class Subject {
    constructor(name) {
        this.name = name
        this.state = 'happy'
        this.observers = []             // 存放观察者们
    }

    // 订阅：被观察者提供一个接收观察者的方法 (将观察者注册到被观察者身上)
    attach(observer) {
        this.observers.push(observer)
    }

    // 发布：更改被观察者的状态
    setState(newState) {
        this.state = newState

        // 当状态更新时，告知每个观察者
        this.observers.forEach(o => o.update(this.state))
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name
    }

    update(subject) {
        console.log(`${this.name}说：${subject.name}的心情${subject.state}`);
    }
}

let subject = new Subject('宝宝')
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
let o3 = new Observer('爷爷')

subject.attach(o1)
subject.attach(o2)

subject.setState('sad')



// 改写观察者
class Observer {
    constructor(name, subject) {
        this.name = name

        subject.attach(this)
    }

    update(state) {
        console.log(`${this.name}说：${subject.name}的心情${subject.state}`);
    }
}

let subject = new Subject('宝宝')
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
let o3 = new Observer('爷爷')

subject.setState('sad')