import Layout from '@/components/lvbu/layout'
export default {
  path: '/icons',
  component: Layout,
  redirect: '/index',
  children: [
    {
      path: '/index',
      component: () => import('@/pages/z-icons'),
      name: 'icons',
      meta: { title: 'Icons', icon: 'fsicon-tupian' }
    }
  ]
}