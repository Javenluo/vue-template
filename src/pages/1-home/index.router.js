import Layouts from '@/components/lvbu/layout'
export default {
  path: '/',
  component: Layouts,
  redirect: '/home',
  children: [
    {
      path: '/home',
      component: () => import('@/pages/1-home'),
      name: 'Home',
      meta: { title: 'Home', icon: 'fsicon-home', affix: true }
    }
  ]
}