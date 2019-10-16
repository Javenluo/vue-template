import Layout from '@ttkv/packages/layout'
export default {
  path: '/form',
  name: 'form',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/form'),
      name: 'Fomr',
      meta: { title: 'Fomr', icon: 'document' }
    }
  ]
}