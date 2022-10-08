import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
const routes = [
    // 一级路由布局
    {
        path: '/',
        component: () => import('@/views/Layout'),
        children: [
            {
                path: '/',
                component: () => import('@/views/home/index')
            },
            {
                path: '/category/:id',
                component: () => import('@/views/category')
            },
            {
                path: '/category/sub/:id',
                component: () => import('@/views/category/sub')
            },
            {
                path: '/product/:id',
                component: () => import('@/views/goods/index')
            },
            {
                path: '/cart',
                component: () => import('@/views/cart/index')
            },
            {
                path: '/member/checkout',
                component: () => import('@/views/member/pay/checkout')
            }
        ]
    },
    { path: '/login', component: () => import('@/views/login/index') }
]

const router = createRouter({
    // 使用hash方式实现路由
    history: createWebHashHistory(),
    routes,
    // 每次切换路由的时候滚动到页面顶部
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
})
router.beforeEach((to, from, next) => {
    // 用户信息
    const { token } = store.state.user.profile
    // 跳转去member开头的地址却没有登录
    if (to.path.startsWith('/member') && !token) {
        next({ path: '/login', query: { redirectUrl: to.fullPath } })
    }
    next()
})
export default router
