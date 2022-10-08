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
 * @param {Array} cartList  - 本地购物车数组
 * @returns
 */

export const mergeLocalCart = cartList => {
    return request(' /member/cart/merge', 'post', cartList)
}
