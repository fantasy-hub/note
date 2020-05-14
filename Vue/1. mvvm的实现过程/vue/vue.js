class Vue extends EventTarget {
    constructor(options) {
        super()
        this.options = options
        this.observe(this.options)                  // 为data的属性添加监听器
        this.compile()
    }

    observe({data}) {
        console.log(data, 'observe');
        Object.keys(data).forEach(key => {
            this.defineProperty(data, key, data[key])
        })
    }

    defineProperty(data, key, value) {
        let _this = this
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value
            },
            set(newValue) {
                console.log('set...');
                let event = new CustomEvent(key, {
                    detail: newValue
                })
                _this.dispatchEvent(event)
            }
        })
    }

    compile() {
        console.log(this.options, 'compile');
        let $el = document.querySelector(this.options.el)
        let childNodes = $el.childNodes
        // console.log(childNodes, 'childNodes');
        this.compileNodes(childNodes)
    }

    compileNodes(childNodes) {
        childNodes.forEach(node => {                
            switch (node.nodeType) {
                // 节点（嵌套结构）
                case 1:
                    node.childNodes.length > 0 && this.compileNodes(node.childNodes)

                    let attrs = node.attrbutes;
                    [...attrs].forEach(attr => {
                        let attrName = attr.attrName
                        let attrValue = attr.value
                        attrName = attrName.substr(2)
                        switch (attrName) {
                            case 'model':
                                node.value = this.options.data[attrValue]
                                node.addEventListener('input', e => {
                                    this.options.data[attrValue] = e.target.value
                                })
                        }
                    })
                    break
                // 文本节点
                case 3:
                    let reg = /\{\{\s*(\S+)\s\}\}/g
                    let textContent = node.textContent
                    let test = reg.test(textContent)
                    if (test) {
                        // 初次渲染 将data的变量进行替换
                        let $1 = RegExp.$1
                        node.textContent = textContent.replace(reg, this.options.data[$1])

                        // 为data中的属性添加事件监听，在数据改变时触发自定义事件
                        this.addEventListener($1, e => {
                            let newValue = e.detail
                            let oldValue = this.options.data[$1]
                            let reg = new RegExp(oldValue, 'g')
                            node.textContent = node.textContent.replace(reg, newValue)
                        })
                    }
                    break
            }
        })
    }
}