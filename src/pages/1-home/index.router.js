import Layout from '@ttkv/packages/layout'
export default {
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: '/home',
      component: () => import('@/pages/1-home'),
      name: 'Home',
      meta: { title: 'Home', icon: 'fsicon-home' }
    }
  ]
}