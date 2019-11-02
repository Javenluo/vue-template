import Layout from '@/components/lvbu/layout'
export default {
  path: '/nested',
  component: Layout,
  // redirect: '/nested/menu1/menu1-1',
  // name: 'Nested',
  meta: {
    title: 'Nested Routes',
    icon: 'fsicon-weibiaoti25'
  },
  children: [
    {
      path: 'menu1',
      // 注意：页面中添加<router-view />组件记得实现嵌套路由
      component: () => import('@/pages/nested/menu1/index'),
      name: 'Menu1',
      meta: { title: 'Menu 1' },
      children: [
        {
          path: 'menu1-1',
          // 如果父级菜单无需组件，可以渲染一个空容器
          component: {
            render: c => c("router-view")
          },
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1' },
          children: [
            {
              path: 'menu1-1-1',
              component: () => import('@/pages/nested/menu1/menu1-1'),
              name: 'menue1-1-1',
              meta: { title: 'Menu 1-1-1' }
            },
            {
              path: 'menu1-1-2',
              component: () => import('@/pages/nested/menu1/menu1-1'),
              name: 'menue1-1-2',
              meta: { title: 'Menu 1-1-2' }
            }
          ]
        }
      ]
    },
    {
      path: 'menu2',
      component: () => import('@/pages/nested/menu2'),
      name: 'Menu2',
      meta: { title: 'Menu 2' },
      children: [
        {
          path: 'menu2-1',
          component: () => import('@/pages/nested/menu2/page'),
          name: 'Menu2-1',
          meta: { title: 'Menu 2-1' }
        }, {
          path: 'menu2-2',
          component: () => import('@/pages/nested/menu2/page'),
          name: 'Menu2-2',
          meta: { title: 'Menu 2-2' }
        }
      ]
    }
  ]
}