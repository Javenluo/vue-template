// 修改当前path为login可覆盖tax-group-app中的默认路由
export default {
  path: '/login',
  name: 'Login',
  component: () => import('@/pages/0-login')
}