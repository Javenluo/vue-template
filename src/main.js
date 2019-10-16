import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import TaxGroupUI from '@ttk/vue-ui'
// import '@ttk/vue-ui/lib/theme-chalk/index.css'
import locale from '@ttk/vue-ui/lib/locale/lang/en' // lang i18n

import './styles.scss'
// import '@/styles/index.scss' // global css
// import '@/icons' // icon

import '@/permission' // permission control
// eslint-disable-next-line no-unused-vars
import { start } from '@ttkv'
// import { start } from '@ttkv/src'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
// Vue.prototype.$taxApp = taxApp;
// Vue.use(taxApp)
// set ElementUI lang to EN
Vue.use(TaxGroupUI, { locale })

Vue.config.productionTip = false

start()
