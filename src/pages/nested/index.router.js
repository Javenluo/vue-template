import Layout from '@/components/lvbu/layout'
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
        },
        {
          path: 'menu1-3',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3' }
        },
        {
          path: 'menu1-4',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-4',
          meta: { title: 'Menu 1-4' }
        },
        {
          path: 'menu1-5',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-5',
          meta: { title: 'Menu 1-5' }
        },
        {
          path: 'menu1-6',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-6',
          meta: { title: 'Menu 1-6' }
        },
        {
          path: 'menu1-7',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-7',
          meta: { title: 'Menu 1-7' }
        },
        {
          path: 'menu1-8',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-8',
          meta: { title: 'Menu 1-8' }
        },
        {
          path: 'menu1-9',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-9',
          meta: { title: 'Menu 1-9' }
        },
        {
          path: 'menu1-10',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-10',
          meta: { title: 'Menu 1-10' }
        },
        {
          path: 'menu1-11',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-11',
          meta: { title: 'Menu 1-11' }
        },
        {
          path: 'menu1-12',
          component: () => import('@/pages/nested/menu1/menu1-1'),
          name: 'Menu1-12',
          meta: { title: 'Menu 1-12' }
        }
      ]
    }
  ]
}