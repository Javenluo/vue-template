import Vue from 'vue'
// import { concatRouter, resetRouter } from '@ttkv'

import TaxGroupUI from '@ttk/vue-ui'
import locale from '@ttk/vue-ui/lib/locale/lang/zh-CN' // lang i18n

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './styles.scss'

import '@/permission' // permission control
import { SingletonApp, registerFun } from '@ttkv'
import Layout from '@/components/lvbu/layout'

/**
 * MockJs 会编译到生成环境。
 * 请在上线前删除! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(TaxGroupUI, { locale })
Vue.config.productionTip = false

registerFun('testFun', (str) => {
  console.log('这是一个注册函数的示例', str)
})

// // 扫描业务代码中views里的.router.js文件，并返回路由数组
// function getRouters() {
//   const routerFiles = require.context('@/pages', true, /\.router\.js$/)
//   const modules = routerFiles.keys().map((key) => routerFiles(key).default)
//   return modules
// }
// const routers = getRouters()
// concatRouter(routers)
// resetRouter()

const app = SingletonApp.getInstance()
app.setLayout(Layout);
app.start()
app.testFun('试一试函数注入')

// import('./store/login').then(loginModule => {
//   store.registerModule('login', loginModule)
// })