/**
 * Created by shencq on 2017/12/15.
 */

export default {
  // 弹出窗口
  dialogs: [],
  // 当前站点名称
  site: '',
  // 当前页面组
  group: '',
  // 当前页面地址
  path: '',
  // 站点基本信息池,key:site.name
  sites: {},
  // 导航栏数据
  // 页面组的主导航栏数据池,key: site.pageGroup
  navs: {},
  // 当前主导航栏高亮菜单
  topNav: '',
  // 页面组的次导航栏数据池,key:主导航栏页面路径
  subnavs: {},

  // 页面数据和相应组件的缓存对象，目前没有使用缓存，也没有清理
  // 页面数据池
  pageDatas: {},
  // 页面组件池
  pageComponents: {
    themes: {},
    layouts: {},
    decorators: {},
    widgets: {}
  },
  // 最大化的Widget对象
  maximized: null,
  // 页面是否处于编辑模式
  pageEditMode: false,
  // 页面是否处于DIY模式
  pageDiyMode: false,
  // 页面是否处于配置模式
  pageConfMode: false,
  // 被拖动的Widget对象
  dragWidget: null,
  // 当前页面显示的Widget集合
  createdWidgets: {},
  // 当前页面删除的widget集合
  delWidgets: {}
}
