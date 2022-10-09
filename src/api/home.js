// 提供首页相关api
import request from '@/utils/request'
/**
 *
 * @param {Integer}limit-品牌个数
 * @returns Promise
 */

export const findBrand = (limit = 6) => {
    return request('/home/brand', 'get', { limit })
}
/**
 * 获取广告图
 * @param
 * @returns Promise
 */
export const findBanner = () => {
    return request('/home/banner', 'get')
}
/**
 *获取新鲜好物
 * @param
 * @returns Promise
 */
export const findNew = () => {
    return request('home/new', 'get')
}
/**
 *获取人气推荐
 * @param
 * @returns Promise
 */
export const findHot = () => {
    return request('home/hot', 'get')
}
/**
 * 获取商品列表
 * @returns Promise
 */
export const findGoods = () => {
    return request('home/goods', 'get')
}
/**
 * 获取最新专题
 * @returns Promise
 */

export const findSpecial = () => {
    return request('home/special', 'get')
}
