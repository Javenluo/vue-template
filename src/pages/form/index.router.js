import Layout from '@/components/lvbu/layout'
export default {
  path: '/form',
  name: 'form',
  hidden: true, // 不在菜单中显示
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/pages/form'),
      name: 'Form',
      meta: { title: 'Form', icon: 'fsicon-weibiaoti25' }
    }
  ]
}