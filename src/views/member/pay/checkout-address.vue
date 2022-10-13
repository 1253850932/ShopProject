<template>
    <div class="checkout-address">
        <div class="text">
            <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
            <ul>
                <li>
                    <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}</li>
                <li><span>收货地址：</span>{{ showAddress.fullLocation.replace(/ /g, '') }}{{ showAddress.address }}号</li>
            </ul>
            <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
        </div>
        <div class="action">
            <XtxButton class="btn" @click="openDialog()">切换地址</XtxButton>

            <XtxButton class="btn" @click="openAddressEdit()">添加地址</XtxButton>
            <!-- 添加地址 -->
        </div>
    </div>
    <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
        <div class="text item" v-for="item in list" :key="item" :class="{ active: selectedAddress && item.id === selectedAddress.id }" @click="selectedAddress = item">
            <ul>
                <li>
                    <span>收<i />货<i />人：</span>{{ item.receiver }}
                </li>
                <li><span>联系方式：</span>{{ item.contact }}</li>
                <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}</li>
            </ul>
        </div>
        <template v-slot:footer>
            <XtxButton @click="dialogVisible = false" type="gray" style="margin-right: 20px">取消</XtxButton>
            <XtxButton @click="confirmAddress()" type="primary">确认</XtxButton>
        </template>
    </XtxDialog>
    <!-- 收货地址添加组件 -->
    <AddressEdit ref="addressEdit" @on-success="successHandler" />
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './components/address-edit.vue'
export default {
    name: 'CheckoutAddress',
    components: { AddressEdit },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    // 1.在拥有根元素的组件中，触发自定义事件，有没有emits都可以
    // 2.在组件渲染代码片段中，根据vue3.0规范，需要声明 emits 来触发自定义的事件
    // 3.提倡：在定义了自定义事件中，都需要在emits选项声明下
    emits: ['change'],
    setup(props, { emit }) {
        // 显示的地址
        const showAddress = ref(null)
        if (props.list.length) {
            const defaultAddress = props.list.find(item => item.isDefault === 1)
            if (defaultAddress) {
                showAddress.value = defaultAddress
                console.log(showAddress)
            } else {
                // eslint-disable-next-line vue/no-setup-props-destructure
                showAddress.value = props.list[0]
            }
        }
        // 对话框显示隐藏
        const dialogVisible = ref(false)
        // 打开对话框
        const openDialog = () => {
            dialogVisible.value = true
            selectedAddress.value = null
        }
        // 确认地址
        const confirmAddress = () => {
            dialogVisible.value = false
            showAddress.value = selectedAddress.value
            // 默认通知一个地址ID给父组件
            emit('change', showAddress.value?.id)
        }
        // 选择的地址
        const selectedAddress = ref(null)
        // 添加收货地址组件
        const addressEdit = ref(null)
        const openAddressEdit = addAddress => {
            addressEdit.value.open()
        }

        // 成功
        const successHandler = formData => {
            const address = props.list.find(item => item.id === formData.id)
            if (address) {
                for (const key in address) {
                    address[key] = address[key]
                }
            }
            const json = JSON.stringify(formData) // 需要克隆下，不然使用的是对象的引用
            props.list.unshift(JSON.parse(json))
        }
        return { dialogVisible, showAddress, selectedAddress, openDialog, confirmAddress, openAddressEdit, addressEdit, successHandler }
    }
}
</script>
<style scoped lang="less">
.checkout-address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;
        .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
        }
        > ul {
            flex: 1;
            padding: 20px;
            li {
                line-height: 30px;
                span {
                    color: #999;
                    margin-right: 5px;
                    > i {
                        width: 0.5em;
                        display: inline-block;
                    }
                }
            }
        }
        > a {
            color: @xtxColor;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
        }
    }
    .action {
        width: 420px;
        text-align: center;
        .btn {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;
            &:first-child {
                margin-right: 10px;
            }
        }
    }
}
.xtx-dialog {
    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;
        &.item {
            border: 1px solid #f5f5f5;
            margin-bottom: 10px;
            cursor: pointer;
            &.active,
            &:hover {
                border-color: @xtxColor;
                background: lighten(@xtxColor, 50%);
            }
            > ul {
                padding: 10px;
                font-size: 14px;
                line-height: 30px;
            }
        }
    }
}
</style>
