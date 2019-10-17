import Layout from '@ttkv/packages/layout'
export default {
  path: '/external-link',
  component: Layout,
  children: [
    {
      path: 'https://github.com/fx-mobile',
      meta: { title: '外部链接', icon: 'fsicon-jiebangnashuiren' }
    }
  ]
}