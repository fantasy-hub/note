#### vue的事件派发与监听：
由父组件派发父组件监听

#### vue的节点的创建与挂在的顺序：
1. 创建节点时自上而下
2. 挂在节点时自下而上（父组件在mounted生命周期时，子组件已经挂在完成，父组件可以拿到子组件的实例）

#### .sync 与 v-model 的区别
`v-model`
```
<Input v-model="value" />
// 等同于
<Input :value="value" @input="$emit('input', $event.target.value)">
```
`.sync`
```
<Custom :userinfo.sync="value" />
// 等同于
<Custom :userinfo="value" @input="$emit('update:user', $event)">
```

#### 递归组件
递归组件的`name`属性必须设置