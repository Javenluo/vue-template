import Layout from '@/components/lvbu/layout'
export default {
  path: '/tree',
  name: '树',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/pages/tree'),
      name: 'Fomr',
      meta: { title: '树', icon: 'fsicon-tree-dot' }
    }
  ]
}