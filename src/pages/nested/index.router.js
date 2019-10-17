import Layout from '@ttkv/packages/layout'
export default {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: 'Nested Routes',
    icon: 'fsicon-weibiaoti25'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/pages/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menu 1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-2',
          meta: { title: 'Menu 1-2' }
        }
      ]
    }
  ]
}