import Layout from '@ttkv/packages/layout'
export default {
  path: '/tree',
  name: 'tree',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/tree'),
      name: 'Fomr',
      meta: { title: '树', icon: 'document' }
    }
  ]
}