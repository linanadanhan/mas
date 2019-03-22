/**
 * Created by shencq on 2017/12/11.
 */

/**
 * 页面模块
 * @type {Object}
 */
export default [
  {
    name: '表格widget',
    method: 'widgetTable',
    path: '/cos3-portal-manager/widget/widgetTable',
    type: 'get'
  }, {
    name: '柱状图widget',
    method: 'widgetBar',
    path: '/cos3-portal-manager/widget/widgetBar',
    type: 'get'
  }, {
    name: '饼状图widget',
    method: 'widgetPie',
    path: '/cos3-portal-manager/widget/widgetPie',
    type: 'get'
  }, {
    name: 'echartsMap数据',
    method: 'widgetMap',
    path: '/cos3-area-tool/getJsonByCode',
    type: 'get'
  }, {
    name: '根据省或市的名称得到行政区划',
    method: 'getCodeByName',
    path: '/cos3-area-tool/getCodeByName',
    type: 'get'
  },
  {
    name: '获取业务组件列表数据',
    method: 'getBusinessComponentList',
    path: '/cos3-portal-manager/businessComponent/getBusinessComponentList',
    type: 'get'
  },
  {
    name: '更新业务组件状态',
    method: 'updateComponentStatus',
    path: '/cos3-portal-manager/businessComponent/updateComponentStatus',
    type: 'get'
  },
  {
    name: '保存业务组件信息',
    method: 'saveBusinessCompInfo',
    path: '/cos3-portal-manager/businessComponent/saveBusinessCompInfo',
    type: 'post'
  },
  {
    name: '删除业务组件',
    method: 'delBusinessComp',
    path: '/cos3-portal-manager/businessComponent/delBusinessComp',
    type: 'get'
  },
  {
    name: '根据主键获取单笔业务组件信息',
    method: 'getBusinessCompById',
    path: '/cos3-portal-manager/businessComponent/getBusinessCompById',
    type: 'get'
  },
  {
    name: '保存业务组件配置数据',
    method: 'saveBusinessCompConf',
    path: '/cos3-portal-manager/businessComponent/saveBusinessCompConf',
    type: 'get'
  },
  {
    name: '根据业务组件ID获取业务组件配置信息',
    method: 'getBusinessCompConfInfo',
    path: '/cos3-portal-manager/businessComponent/getBusinessCompConfInfo',
    type: 'get'
  },
  {
    name: '复制业务组件配置信息',
    method: 'copyBusinessCompConf',
    path: '/cos3-portal-manager/businessComponent/copyBusinessCompConf',
    type: 'get'
  },
  {
    name: '获取部件包记录信息',
    method: 'getComponentPackageList',
    path: '/cos3-portal-manager/component/getComponentPackageList',
    type: 'get'
  },
  {
    name: '部件包安装',
    method: 'installComponent',
    path: '/cos3-portal-manager/import/installComponent',
    type: 'get'
  },
  {
    name: '获取系统所有mapping请求信息',
    method: 'getMappingList',
    path: '/cos3-portal-manager/antPatterns/getMappingList',
    type: 'get'
  },
  {
    name: '根据主键ID获取单笔mapping信息',
    method: 'getMappingById',
    path: '/cos3-portal-manager/antPatterns/getMappingById',
    type: 'get'
  },
  {
    name: '校验请求URL是否唯一',
    method: 'isUniqueMapping',
    path: '/cos3-portal-manager/antPatterns/isUniqueMapping',
    type: 'get'
  },
  {
    name: '保存mapping请求',
    method: 'saveMapping',
    path: '/cos3-portal-manager/antPatterns/saveMapping',
    type: 'post'
  },
  {
    name: '删除mapping请求',
    method: 'deleteMapping',
    path: '/cos3-portal-manager/antPatterns/deleteMapping',
    type: 'get'
  },
  {
    name: '获取所有本地部件包信息',
    method: 'getPartPackageList',
    path: '/cos3-portal-manager/component/getPartPackageList',
    type: 'get'
  },
  {
    name: '获取应用列表信息',
    method: 'getAppList',
    path: '/cos3-portal-manager/app/getAppList',
    type: 'get'
  },
  {
    name: '保存应用信息',
    method: 'saveAppInfo',
    path: '/cos3-portal-manager/app/saveAppInfo',
    type: 'post'
  },
  {
    name: '删除应用信息',
    method: 'delApp',
    path: '/cos3-portal-manager/app/delApp',
    type: 'get'
  },
  {
    name: '校验应用代码是否已存在',
    method: 'isUniquAppCode',
    path: '/cos3-portal-manager/app/isUniquAppCode',
    type: 'get'
  },
  {
    name: '根据主键ID获取单笔应用信息',
    method: 'getAppInfoById',
    path: '/cos3-portal-manager/app/getAppInfoById',
    type: 'get'
  },
  {
    name: '更新应用状态',
    method: 'updateAppStatus',
    path: '/cos3-portal-manager/app/updateAppStatus',
    type: 'get'
  },
  {
    name: '获取页面模版列表信息',
    method: 'getPageTempList',
    path: '/cos3-portal-manager/pageTemp/getPageTempList',
    type: 'get'
  }, {
    name: '保存页面模版信息',
    method: 'savePageTempInfo',
    path: '/cos3-portal-manager/pageTemp/savePageTempInfo',
    type: 'post'
  }, {
    name: '删除页面模版信息',
    method: 'delPageTemp',
    path: '/cos3-portal-manager/pageTemp/delPageTemp',
    type: 'get'
  }, {
    name: '校验页面模版代码是否已存在',
    method: 'isUniquPageTempCode',
    path: '/cos3-portal-manager/pageTemp/isUniquPageTempCode',
    type: 'get'
  }, {
    name: '根据主键ID获取单笔页面模版信息',
    method: 'getPageTempInfoById',
    path: '/cos3-portal-manager/pageTemp/getPageTempInfoById',
    type: 'get'
  }, {
    name: '获取应用未关联的页面模版信息',
    method: 'getNoSelectedPageTemp',
    path: '/cos3-portal-manager/appRelTemp/getNoSelectedPageTemp',
    type: 'get'
  }, {
    name: '获取应用已关联页面模版信息',
    method: 'getHasSelectedPageTemp',
    path: '/cos3-portal-manager/appRelTemp/getHasSelectedPageTemp',
    type: 'get'
  }, {
    name: '保存应用关联页面模版信息',
    method: 'saveAppRelPageTemp',
    path: '/cos3-portal-manager/appRelTemp/saveAppRelPageTemp',
    type: 'post'
  }, {
    name: '获取页面模版配置信息',
    method: 'getPageTempConfInfo',
    path: '/cos3-portal-manager/pageTemp/getPageTempConfInfo',
    type: 'get'
  }, {
    name: '保存页面模版配置',
    method: 'savePageTempConf',
    path: '/cos3-portal-manager/pageTemp/savePageTempConf',
    type: 'get'
  }, {
    name: '复制应用',
    method: 'copyAppInfo',
    path: '/cos3-portal-manager/app/copyAppInfo',
    type: 'post'
  }, {
    name: '导出应用',
    method: 'exportApp',
    path: '/cos3-portal-manager/app/exportApp',
    type: 'get'
  }, {
    name: '导入应用',
    method: 'importApp',
    path: '/cos3-portal-manager/app/importApp',
    type: 'get'
  }
]
