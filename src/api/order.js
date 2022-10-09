// 提供支付页的API
import request from '@/utils/request'

/**
 * 获取结算信息
 * @returns
 */
export const findCheckoutInfo = () => {
    return request('/member/order/pre', 'get')
}
