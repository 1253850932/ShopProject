// 提供一个能够显示xtx-confirm组件的函数

import { createVNode, render } from 'vue'

// 1。导入消息提醒组件
import XtxConfirm from './xtx-confirm.vue'
// 3。准备一个装载消息提示组件的DOM容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm')
document.body.appendChild(div)

// 返回的是promise对象，点取消销毁组件，点确认销毁组件
export default ({ title, text }) => {
    // 2。将消息提示组件编译位虚拟节点(dom节点)

    return new Promise((resolve, reject) => {
        const confirmCallBack = () => {
            // 销毁组件
            render(null, div)
            resolve()
        }

        const cancelCallBack = () => {
            // 销毁组件
            render(null, div)
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(new Error('点击取消'))
        }

        const vnode = createVNode(XtxConfirm, { title, text, confirmCallBack, cancelCallBack })
        render(vnode, div)
    })
}
// 4。将虚拟节点渲染在容器中
