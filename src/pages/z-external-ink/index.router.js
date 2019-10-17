import Layout from '@ttkv/packages/layout'
export default {
  path: '/external-link',
  component: Layout,
  children: [
    {
      path: 'https://github.com/fx-mobile',
      meta: { title: 'External Link', icon: 'link' }
    }
  ]
}