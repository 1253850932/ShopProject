<template>
    <div class="cart-sku" ref="target">
        <div class="attrs" @click="toggle()">
            <span class="ellipsis">{{ attrsText }}</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="layer" v-if="show">
            <div v-if="!goods" class="loading"></div>
            <GoodsSku @change="changeSku" v-if="goods" :skuId="skuId" :goods="goods" />
            <XtxButton @click="submit" v-if="goods" type="primary" size="mini" style="margin-left: 60px">确认</XtxButton>
        </div>
    </div>
</template>
<script>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { getSpecsAndSkus } from '@/api/cart'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
export default {
    name: 'CartSku',
    props: {
        attrsText: {
            type: String,
            default: ''
        },
        skuId: {
            type: String,
            default: ''
        }
    },
    components: { GoodsSku },
    setup(props, { emit }) {
        const show = ref(false)
        const goods = ref(null)
        const loading = ref(true)
        // 打开
        const open = () => {
            show.value = true
            getSpecsAndSkus(props.skuId).then(data => {
                goods.value = data.result
                loading.value = false
            })
        }
        // 关闭
        const close = () => {
            show.value = false
            goods.value = null
            loading.value = true
        }
        // 点击切换
        const toggle = () => {
            show.value ? close() : open()
        }
        const target = ref(null)
        // 点击其它地方关闭
        onClickOutside(target, () => {
            close()
        })

        // 监听sku改变的函数 记录sku信息
        const currentSku = ref(null)
        const changeSku = sku => {
            currentSku.value = sku
        }
        // 点击确认后，更改后的sku信息提交给父组件（购物车组件）
        const submit = () => {
            // 当currentSku有值，且skuId和默认的skuId不同
            if (currentSku.value && currentSku.value.skuId && currentSku.value.skuId !== props.skuId) {
                emit('change', currentSku.value)
                close()
            }
        }
        return { show, toggle, target, loading, goods, changeSku, submit }
    }
}
</script>
<style scoped lang="less">
.cart-sku {
    height: 28px;
    border: 1px solid #f5f5f5;
    padding: 0 6px;
    position: relative;
    margin-top: 10px;
    display: inline-block;
    .attrs {
        line-height: 24px;
        display: flex;
        span {
            max-width: 230px;
            font-size: 14px;
            color: #999;
        }
        i {
            margin-left: 5px;
            font-size: 14px;
        }
    }
    .layer {
        position: absolute;
        left: -1px;
        top: 40px;
        z-index: 10;
        width: 400px;
        border: 1px solid @xtxColor;
        box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        padding: 20px;
        &::before {
            content: '';
            width: 12px;
            height: 12px;
            border-left: 1px solid @xtxColor;
            border-top: 1px solid @xtxColor;
            position: absolute;
            left: 12px;
            top: -8px;
            background: #fff;
            transform: scale(0.8, 1) rotate(45deg);
        }
        .loading {
            height: 224px;
            background: url(../../../assets/images/loading.gif) no-repeat center;
        }
    }
}
</style>
