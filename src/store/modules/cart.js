// 购物车模块
export default {
    namespaced: true,
    state() {
        return {
            // 购物车商品列表
            list: []
        }
    },
    mutations: {
        // 加入购物车
        insertCart(state, payload) {
            // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
            // 线上：比上面多 isCollect 有用 discount 无用 两项项信息
            // 插入数据规则
            // 1。先找下是否有相同的商品
            // 2。如果有相同的商品，查询他的数量，累加到payload上，在保存到最新位置，原来的商品需要删除
            // 3。如果没有相同商品，保存到最新位置即可
            const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
            if (sameIndex > -1) {
                // 拿取相同商品
                const count = state.list[sameIndex].count
                payload.count += count
                // 删除原来
                state.list.splice(sameIndex, 1)
            }
            // 追加新的
            state.list.unshift(payload)
        },
        // 修改购物车商品
        updateCart(state, goods) {
            // goods中字段有可能不完整，goods有的信息才去修改。
            // 1. goods中必需又skuId，才能找到对应的商品信息
            const updateGoods = state.list.find(item => item.skuId === goods.skuId)
            for (const key in goods) {
                // 布尔类型 false 值需要使用
                if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
                    updateGoods[key] = goods[key]
                }
            }
        },
        // 删除购物车商品
        deleteCart(state, skuId) {
            const index = state.list.findIndex(item => item.skuId === skuId)
            state.list.splice(index, 1)
        }
    },
    actions: {
        // 加入购物车
        insertCart(crx, payload) {
            return new Promise((resolve, reject) => {
                // crx.rootState 拿到根状态
                // crx.State 拿到局部状态
                if (crx.rootState.user.profile.toke) {
                    // 已登录
                } else {
                    // 未登录
                    crx.commit('insertCart', payload)
                    resolve()
                }
            })
        },
        // 修改购物车 （选中状态，数量)
        updateCart(crx, goods) {
            // 必须传入skuId  可选： selected count
            return new Promise((resolve, reject) => {
                // crx.rootState 拿到根状态
                // crx.State 拿到局部状态
                if (crx.rootState.user.profile.toke) {
                    // 已登录
                } else {
                    // 未登录
                    crx.commit('updateCart', goods)
                    resolve()
                }
            })
        },
        // 删除购物车
        deleteCart(crx, payload) {
            return new Promise((resolve, reject) => {
                // crx.rootState 拿到根状态
                // crx.State 拿到局部状态
                if (crx.rootState.user.profile.toke) {
                    // 已登录
                } else {
                    // 未登录
                    // 单条删除payload 就是skuID
                    crx.commit('deleteCart', payload)
                    resolve()
                }
            })
        }
    },
    getters: {
        // 有效商品列表
        validList(state) {
            return state.list.filter(item => item.stock > 0 && item.isEffective)
        },
        // 有效商品件数
        validTotal(state, getters) {
            return getters.validList.reduce((p, c) => p + c.count, 0)
        },
        // 有效商品总金额
        validAmount(state, getters) {
            return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
        },
        // 无效商品列表
        inValidList(state) {
            console.log(state.list.filter(goods => goods.stock <= 0 || !goods.isEffective))
            return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
        },
        // 已选商品列表
        selectedList(state, getters) {
            return getters.validList.filter(item => item.selected)
        },
        // 已选商品总件数
        selectedTotal(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.count, 0)
        },
        // 已选商品总金额
        selectedAmount(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
        },
        // 是否全选
        isCheckedAll(state, getters) {
            return getters.selectedList.length !== 0 && getters.validList.length === getters.selectedList.length
        }
    }
}
