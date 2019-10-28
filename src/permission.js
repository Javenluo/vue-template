import { Message } from '@ttk/vue-ui'
import { store, router, constantRoutes } from '@ttkv'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@ttkv/lib/utils/auth'
import getPageTitle from '@ttkv/lib/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 免登录白名单
const whiteList = ['/login', '/404'];
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已经登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = localStorage.getItem('userInfo')
      let _router = await store.dispatch('tax_user/getNav')
      if (_router.length <= 0) {
        _router = await store.dispatch('tax_user/fetchNav')
        // const ttkrouter = generateRouter(_router)
        router.addRoutes(_router)
        store.dispatch('tax_permission/appendRoutes', _router)
      }
      if (hasGetUserInfo && _router) {
        if (store.tax_user && !store.tax_user.info) await store.commit('tax_user/TAX_SET_USER_INFO_FROM_LOCAL')
        next()
      } else {
        store.commit("tax_user/TAX_SET_TOKEN", '')
        try {
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('tax_user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果当前访问路径在免登陆白名单中，将继续访问。
      next()
    } else {
      if (!constantRoutes.some(item => item.path === '/login')) {
        console.error('路由"/login"未定义, 请先定义路由')
      } else {
        next(`/login?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
