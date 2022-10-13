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
 * 合并购物车
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
/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
export const insertCart = ({ skuId, count }) => {
    return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const deleteCart = ids => {
    return request('/member/cart', 'get', { ids })
}
