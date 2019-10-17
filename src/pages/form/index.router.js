import Layout from '@ttkv/packages/layout'
export default {
  path: '/form',
  name: 'form',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/pages/form'),
      name: 'Form',
      meta: { title: 'Fomr', icon: 'fsicon-weibiaoti25' }
    }
  ]
}