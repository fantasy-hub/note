### JSONP为什么不支持POST请求？
JSONP的最基本的原理是：动态添加一个`<script>`标签，而script标签的src属性是没有跨域的限制的。这样说来，这种跨域方式其实与ajax XmlHttpRequest协议无关了。
可以说jsonp的方式原理上和`<script src="http://跨域/...xx.js"></script>`是一致的，因为他的原理实际上就是 使用js的script标签 进行传参，那么必然是get方式的了，和浏览器中敲入一个url一样

发生回流
页面首次渲染
浏览器窗口大小变化
元素位置变化
元素内容变化
元素大小变化
添加或删除dom元素
激活css伪类
查询dom的属性或调用方法