/**
 * Created by shencq on 2017/12/11.
 */

/**
 * 页面模块
 * @type {Object}
 */
export default [
  {
    name: '获取站点信息',
    method: 'siteInfo',
    path: '/cos3-portal-manager/site/siteInfo',
    type: 'get'
  }, {
    name: '获取站点页面列表',
    method: 'pages',
    path: '/cos3-portal-manager/site/pages',
    type: 'get'
  }, {
    name: '获取页面信息',
    method: 'pageInfo',
    path: '/cos3-portal-manager/site/pageInfo',
    type: 'get'
  }, {
    name: '保存页面信息',
    method: 'savePage',
    path: '/cos3-portal-manager/site/saveWidgetInstance',
    type: 'get'
  }, {
    name: '删除页面个性化信息',
    method: 'resetPage',
    path: '/cos3-portal-manager/site/resetPage',
    type: 'get'
  }, {
    name: '获取主题列表',
    method: 'themeList',
    path: '/cos3-portal-manager/site/getThemeList',
    type: 'get'
  }, {
    name: '获取布局列表',
    method: 'layoutList',
    path: '/cos3-portal-manager/layout/layoutList',
    type: 'get'
  }, {
    name: '获取页面Widget列表',
    method: 'widgetList',
    path: '/cos3-portal-manager/site/pagewidges',
    type: 'get'
  }, {
    name: '保存用户自定义主题',
    method: 'saveCustomTheme',
    path: '/cos3-portal-manager/customTheme/saveCustomTheme',
    type: 'get'
  }, {
    name: '页面切换布局',
    method: 'changeLayout',
    path: '/cos3-portal-manager/customLayout/changeLayout',
    type: 'get'
  }, {
    name: '保存系统偏好设置',
    method: 'saveProfileConf',
    path: '/cos3-portal-manager/site/saveProfileConfByPost',
    type: 'post'
  }, {
    name: '获取所有修饰器数据',
    method: 'getAllDecorateList',
    path: '/cos3-portal-manager/decorate/getAllDecorateList',
    type: 'get'
  }, {
    name: '获取个性化页面菜单数据',
    method: 'getDiyPageTree',
    path: '/cos3-portal-manager/diyPage/getDiyPageTree',
    type: 'get'
  },
  {
    name: '获取系统页面菜单数据',
    method: 'getSysPageTree',
    path: '/cos3-portal-manager/page/getSysPageTree',
    type: 'get'
  },
  {
    name: '校验个性化页面path是否已存在',
    method: 'isExitPagePath',
    path: '/cos3-portal-manager/diyPage/isExitPagePath',
    type: 'get'
  },
  {
    name: '保存个性化站点页面信息',
    method: 'saveDiySitePage',
    path: '/cos3-portal-manager/diyPage/saveDiySitePage',
    type: 'post'
  },
  {
    name: '根据主键获取个性化站点页面信息',
    method: 'getDiySitePageInfoById',
    path: '/cos3-portal-manager/diyPage/getDiySitePageInfoById',
    type: 'get'
  },
  {
    name: '获取所有布局信息',
    method: 'getAllLayOutList',
    path: '/cos3-portal-manager/layout/getAllLayOutList',
    type: 'get'
  },
  {
    name: '删除个性化站点页面',
    method: 'delDiySitePage',
    path: '/cos3-portal-manager/diyPage/delDiySitePage',
    type: 'get'
  },
  {
    name: '保存拖动个性化站点页面',
    method: 'saveDiySitePageTree',
    path: '/cos3-portal-manager/diyPage/saveDiySitePageTree',
    type: 'post'
  },
  {
    name: '复制个性化站点页面',
    method: 'copyDiyPage',
    path: '/cos3-portal-manager/diyPage/copyDiyPage',
    type: 'get'
  },
  {
    name: '恢复站点默认页',
    method: 'resetDefSitePage',
    path: '/cos3-portal-manager/diyPage/resetDefSitePage',
    type: 'get'
  },
  {
    name: '添加系统站点页面',
    method: 'addSysSitePage',
    path: '/cos3-portal-manager/diyPage/addSysSitePage',
    type: 'post'
  },
  {
    name: '查询业务组件未授权用户',
    method: 'getNoAuthPerson',
    path: '/cos3-portal-manager/portalAuth/getNoAuthPerson',
    type: 'get'
  },
  {
    name: '查询业务组件已授权用户',
    method: 'getAuthPerson',
    path: '/cos3-portal-manager/portalAuth/getAuthPerson',
    type: 'get'
  },
  {
    name: '保存业务组件用户授权信息',
    method: 'saveAuthUser',
    path: '/cos3-portal-manager/portalAuth/saveAuthUser',
    type: 'post'
  },
  {
    name: '查询系统角色分类信息',
    method: 'getRoleTypes',
    path: '/cos3-portal-manager/role/getRoleTypes',
    type: 'get'
  },
  {
    name: '查询未授权的角色信息',
    method: 'getNoAuthRole',
    path: '/cos3-portal-manager/portalAuth/getNoAuthRole',
    type: 'get'
  },
  {
    name: '查询已授权的角色信息',
    method: 'getAuthRole',
    path: '/cos3-portal-manager/portalAuth/getAuthRole',
    type: 'get'
  },
  {
    name: '保存业务组件角色授权信息',
    method: 'saveAuthRole',
    path: '/cos3-portal-manager/portalAuth/saveAuthRole',
    type: 'post'
  }, {
    name: '获取某个站点的系统指引页面',
    method: 'querySiteHelp',
    path: '/cos3-portal-manager/pageHelp/querySiteHelp',
    type: 'get'
  }, {
    name: '保存不再提示信息',
    method: 'saveSitePageHelpHide',
    path: '/cos3-portal-manager/pageHelp/saveSitePageHelpHide',
    type: 'post'
  }, {
    name: '获取某个页面的系统指引页面',
    method: 'queryPageHelp',
    path: '/cos3-portal-manager/pageHelp/queryPageHelp',
    type: 'get'
  }, {
    name: '获取widget分类树信息',
    method: 'getCategoryWidgetTree',
    path: '/cos3-portal-manager/site/getCategoryWidgetTree',
    type: 'get'
  }, {
    name: '获取对应分类下的widget列表数据',
    method: 'getWidgetListByCategory',
    path: '/cos3-portal-manager/site/getWidgetListByCategory',
    type: 'get'
  }, {
    name: '根据域名获取站点信息及租户信息',
    method: 'getSiteInfoByDomain',
    path: '/getSiteInfoByDomain',
    type: 'get'
  }, {
    name: '校验站点信息',
    method: 'checkSite',
    path: '/cos3-portal-manager/site/checkSite',
    type: 'get'
  }, {
    name: '保存为页面模版',
    method: 'savePageTemp',
    path: '/cos3-portal-manager/pageTemp/savePageTempInfo',
    type: 'post'
  }, {
    name: '获取所有页面模版列表',
    method: 'getPageTempOptions',
    path: '/cos3-portal-manager/pageTemp/getAllPageTempList',
    type: 'get'
  }
]
