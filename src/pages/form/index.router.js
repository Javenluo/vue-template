import Layout from '@ttkv/packages/layout'
export default {
  path: '/form',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/pages/form'),
      name: 'form',
      meta: { title: 'Fomr', icon: 'document' }
    }
  ]
}