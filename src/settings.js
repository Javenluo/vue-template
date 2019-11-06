
module.exports = {
  title: '税局',

  /**
   * @type {boolean} true | false
   * @description 显示右侧菜单
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 显示标签
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 固定头部，未兼容
   */
  // fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 在菜单上显示搜索
   */
  sidebarSearch: true,

  /**
   * @type {boolean} true | false
   * @description 是否开启动态路由，对接开放平台可开启，开启后路由表会自动添加到本地路由后面
   */
  dynamicRouter: true,

  fixedMenue: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: ['production', 'development']
}
