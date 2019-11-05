import { Message } from '@ttk/vue-ui'
import { store, router, constantRoutes, concatRouter, generateRouter, postAwait } from '@ttkv'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@ttkv/lib/utils/auth'
import getPageTitle from '@ttkv/lib/utils/get-page-title'

// 扫描业务代码中views里的.router.js文件，并返回路由数组
function getRouters() {
  const routerFiles = require.context('@/pages', true, /\.router\.js$/)
  const modules = routerFiles.keys().map((key) => routerFiles(key).default)
  return modules
}
const routers = getRouters()
concatRouter(routers)
router.addRoutes(constantRoutes)
// store.dispatch('tax_permission/appendRoutes', constantRoutes)

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
      let _router = await store.dispatch('tax_permission/getRoutes')

      if (!_router || _router.length <= 0) {
        let res
        if (process.env.NODE_ENV === 'development') {
          const url = `${process.env.VUE_APP_BASE_API}/back/functionService/querySecFunctionNav?appId=${10001006}`
          res = await postAwait(url, { depId: "44" }) // 获取服务端的路由表
        } else {
          // 如果需要动态路由，使用这个逻辑
          res = await store.dispatch('tax_user/fetchNav');
        }
        _router = generateRouter(res.body) // 使用@ttk/vue格式化路由
        router.addRoutes(_router) // 使用vue-router动态添加路由

        store.dispatch('tax_permission/appendRoutes', _router) // 添加到菜单列表、左侧菜单渲染就是根据这个来做渲染的。
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
