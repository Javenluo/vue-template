import Layout from '@ttkv/packages/layout'
export default {
  path: '/',
  name: 'home',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: '/home',
      component: () => import('@/pages/1-home'),
      name: 'Home',
      meta: { title: 'Home', icon: 'document' }
    }
  ]
}