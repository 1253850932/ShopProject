import request from '@/utils/request'

/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品规格Sku
 * @returns Promise
 */
export const getSpecsAndSkus = skuId => {
    return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并
 * @param {Array<object>} cartList  - 本地购物车数组
 * @param {string} skuId  -skuId
 * @param {boolean} selected  -是否选中
 * @param {integer} count  -数量
 * @returns
 */
export const mergeLocalCart = cartList => {
    return request('/member/cart/merge', 'post', cartList)
}

export const findCartList = () => {
    return request('/member/cart', 'get')
}
