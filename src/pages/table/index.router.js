import Layout from '@/components/lvbu/layout'
export default {
  path: '/table',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/pages/table'),
      name: 'table',
      meta: { title: 'Table', icon: 'fsicon-btn-table' }
    }
  ]
}