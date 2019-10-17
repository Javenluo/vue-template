// 修改当前path为login可覆盖tax-group-app中的默认路由
export default {
  path: '/temp',
  name: 'shop',
  component: () => import('@/pages/0-login')
}