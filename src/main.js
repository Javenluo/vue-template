import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import TaxGroupUI from '@ttk/vue-ui'
import locale from '@ttk/vue-ui/lib/locale/lang/zh-CN' // lang i18n

import './styles.scss'

import '@/permission' // permission control
import { start } from '@ttkv'

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

start()
