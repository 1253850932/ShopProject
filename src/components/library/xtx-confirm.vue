<template>
    <div class="xtx-confirm" :class="{ fade }">
        <div class="wrapper" :class="{ fade }">
            <div class="header">
                <h3>{{ title }}</h3>
                <a href="JavaScript:;" class="iconfont icon-close-new" @click="cancel"></a>
            </div>
            <div class="body">
                <i class="iconfont icon-warning"></i>
                <span>{{ text }}</span>
            </div>
            <div class="footer">
                <XtxButton size="mini" type="gray" @click="cancel">取消</XtxButton>
                <XtxButton size="mini" type="primary" @click="confirm">确认</XtxButton>
            </div>
        </div>
    </div>
</template>
<script>
// 当前组件不是在APP下进行渲染，无法使用APP下的环境（全局组件，全局指令，原型属性函数）
import XtxButton from '@/components/library/xtx-button'
import { ref, onMounted } from 'vue'
export default {
    name: 'XtxConfirm',
    props: {
        title: {
            type: String,
            default: '温馨提示'
        },
        text: {
            type: String,
            default: ''
        },
        cancelCallBack: {
            type: Function
        },
        confirmCallBack: {
            type: Function
        }
    },
    components: { XtxButton },
    setup(props) {
        const fade = ref(false)
        onMounted(() => {
            // 过渡效果在元素创建之后不会有效果，必须延迟一会加上才会触发
            setTimeout(() => {
                fade.value = true
            }, 0)
        })
        // 取消
        const cancel = () => {
            //
            props.cancelCallBack()
        }
        // 确认
        const confirm = () => {
            props.confirmCallBack()
        }
        return {
            cancel,
            confirm,
            fade
        }
    }
}
</script>
<style scoped lang="less">
.xtx-confirm {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8888;
    background: rgba(0, 0, 0, 0);
    &.fade {
        transition: all 0.5s;
        background: rgba(0, 0, 0, 0.5);
    }
    .wrapper {
        width: 400px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        opacity: 0;
        &.fade {
            transition: all 0.5s;
            transform: translate(-50%, -50%);
            opacity: 1;
        }
        .header,
        .footer {
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
        }
        .body {
            padding: 20px 40px;
            font-size: 16px;
            .icon-warning {
                color: @priceColor;
                margin-right: 3px;
                font-size: 16px;
            }
        }
        .footer {
            text-align: right;
            .xtx-button {
                margin-left: 20px;
            }
        }
        .header {
            position: relative;
            h3 {
                font-weight: normal;
                font-size: 18px;
            }
            a {
                position: absolute;
                right: 15px;
                top: 15px;
                font-size: 20px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #999;
                &:hover {
                    color: #666;
                }
            }
        }
    }
}
</style>
