# ovs_project

## vue 元素创建
vue在元素创建之后必须延迟一会才会有过渡效果
```js
  onMounted(() => {
            // 过渡效果在元素创建之后不会有效果，必须延迟一会加上才会触发
            setTimeout(() => {
                fade.value = true
            }, 0)
        })
```

## vue组件函数式调用
> 提供一个能够显示xtx-message组件的函数  
>>    这个函数将来：导入直接使用，也可以挂载在vue实例原型上  
>>    import Message from 'Message.js' 使用Message ({type:'error',text:'提示文字'})  
> this.$message({type:'error',text:'提示文字'})  


1. 导入消息提醒组件  
`import { createVNode, render } from 'vue'`
2. 准备一个装载组件的DOM容器  
```js
	const div = document.createElement('div')
	div.setAttribute('class', 'xtx-message-container')
	document.body.appendChild(div)
```
3. 将组件编译为虚拟节点（dom）  
*createVNode (组件，属性对象（props)*
`const vnode = createVNode(XtxMessage, { type, text })`
4. 将虚拟节点渲染在容器中  
*render(虚拟节点，DOM容器)*
`render(vnode, div)`


## emits的选项声明
    // 1.在拥有根元素的组件中，触发自定义事件，有没有emits都可以
    // 2.在组件渲染代码片段中，根据vue3.0规范，需要声明 emits 来触发自定义的事件
    // 3.提倡：在定义了自定义事件中，都需要在emits选项声明下
    `emits: ['change']`