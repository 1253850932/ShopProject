// 用户相关的接口
import request from '@/utils/request'

/**
 * 账号密码登录
 * @param {String} account  账号
 * @param {String} password 密码
 * @returns promise
 */
export const userAccountLogin = ({ account, password }) => {
    return request('/login', 'post', { account, password })
}

/**
 * 获取手机号的短信验证码-登录-PC
 * @param {String} mobile  手机号
 * @returns
 */

export const userMobileLoginMsg = mobile => {
    return request('/login/code', 'get', { mobile })
}

/**
 * 手机短信登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns Promise
 */

export const userMobileLogin = ({ mobile, code }) => {
    return request('/login/code', 'post', { mobile, code })
}
