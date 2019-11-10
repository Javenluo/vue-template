// // import { concatRouter, resetRouter } from '@ttkv'

import setting from "@/settings"
import TaxGroupUI, { MessageBox, Message } from '@ttk/vue-ui'
import locale from '@ttk/vue-ui/lib/locale/lang/zh-CN' // lang i18n
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './styles.scss'

import '@/permission' // permission control
import { Vue, SingletonApp, registerFun, store, service } from '@ttkv'
import Layout from '@/components/lvbu/layout'

// axios 请求拦截处理
service.interceptors.response.use(
  response => {
    const res = response.data.head
    // if the custom code is not 20000, it is judged as an error.
    if (res.errorCode !== "0") {
      Message({
        message: res.errorMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 100100000018: 登陆超时; 50012: Other clients logged in; 50014: Token expired;
      if (res.errorCode === "100100000018" || res.errorCode === 50012 || res.errorCode === 50014) {
        // to re-login
        MessageBox.confirm(res.errorMsg, '登录确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('tax_user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.errorMsg || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
/**
 * MockJs 会编译到生成环境。
 * 请在上线前删除! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.use(TaxGroupUI, { locale })
Vue.config.productionTip = false

registerFun('testFun', (str) => {
  console.log('这是一个注册函数的示例', str)
})

// 动态路由需要将开放平台设置的code与页面做映射，如果你不需要动态路由，可以删除
const pageMap = {
  '/org-manage/menu-manager/index': () => import('@/pages/org-manage/menu-manager/index.vue'),
  '/org-manage/user-dep-manager/index': () => import('@/pages/org-manage/menu-manager/index.vue'),
  '/org-manage/org-manager/index': () => import('@/pages/org-manage/menu-manager/index.vue'),
  '/org-manage/post-manager/index': () => import('@/pages/org-manage/menu-manager/index.vue')
}
const app = SingletonApp.getInstance()
app.config({
  setting,
  layout: Layout,
  pageMap
})
store.dispatch('tax_user/fetchNav')
app.start()
app.testFun('试一试函数注入')