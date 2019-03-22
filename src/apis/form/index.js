/**
 * Created by shencq on 2017/12/11.
 */

/**
 * 页面模块
 * @type {Object}
 */
export default [
  {
    name: '分页获取表单模版列表',
    method: 'getFormTempInfo',
    path: '/cos3-app-manager/form/getFormTempInfo',
    type: 'get'
  },
  {
    name: '获取所有表单模版',
    method: 'getAllFormTemp',
    path: '/cos3-app-manager/form/getAllFormTemp',
    type: 'get'
  },
  {
    name: '表单模版数据保存',
    method: 'saveFormTempInfo',
    path: '/cos3-app-manager/form/saveFormTempInfo',
    type: 'post'
  },
  {
    name: '表单模版数据删除',
    method: 'delFormTempInfo',
    path: '/cos3-app-manager/form/delFormTempInfo',
    type: 'get'
  },
  {
    name: '根据主键获取单笔表单模版数据',
    method: 'getFormTempById',
    path: '/cos3-app-manager/form/getFormTempById',
    type: 'get'
  },
  {
    name: '根据模版标识获取单笔表单模版数据',
    method: 'getFormTempByFormFlag',
    path: '/cos3-app-manager/form/getFormTempByFormFlag',
    type: 'get'
  },
  {
    name: '校验表单标识是否已存在',
    method: 'isExitFormFlag',
    path: '/cos3-app-manager/form/isExitFormFlag',
    type: 'get'
  },
  {
    name: '获取表单配置可添加组件',
    method: 'getFormComponent',
    path: '/cos3-app-manager/form/getFormComponent',
    type: 'get'
  },
  {
    name: '保存表单配置信息',
    method: 'saveFormConfInfo',
    path: '/cos3-app-manager/form/saveFormConfInfo',
    type: 'post'
  },
  {
    name: '获取表单配置信息',
    method: 'getFormConfInfo',
    path: '/cos3-app-manager/form/getFormConfInfo',
    type: 'get'
  },
  {
    name: '获取表格配置信息',
    method: 'getTabelConfInfo',
    path: '/cos3-app-manager/form/getTabelConfInfo',
    type: 'get'
  },
  {
    name: '获取树配置信息',
    method: 'getTreeConfInfo',
    path: '/cos3-app-manager/form/getTreeConfInfo',
    type: 'get'
  },
  {
    name: '获取所有数据表信息',
    method: 'getDataTables',
    path: '/cos3-app-manager/form/table/tbl_tables/queryAll',
    type: 'get'
  },
  {
    name: '获取数据表的所有字段属性',
    method: 'getTableFeild',
    path: '/cos3-app-manager/form/table/getTableFeild',
    type: 'get'
  },
  {
    name: '保存表单数据信息',
    method: 'saveFormData',
    path: '/cos3-app-manager/form/saveFormData',
    type: 'post'
  },
  {
    name: '删除表单数据信息',
    method: 'delFormData',
    path: '/cos3-app-manager/form/delFormData',
    type: 'get'
  },
  {
    name: '根据主键ID获取表单数据信息',
    method: 'getFormDataInfoById',
    path: '/cos3-app-manager/form/getFormDataInfoById',
    type: 'get'
  },
  {
    name: '获取所有数据字典标识',
    method: 'getDicOptions',
    path: '/cos3-app-manager/form/getDicOptions',
    type: 'get'
  },
  {
    name: '获取数据字典数据项',
    method: 'getDicItemByKey',
    path: '/cos3-app-manager/form/getDicItemByKey',
    type: 'get'
  },
  {
    name: '获取所有table列表数据',
    method: 'getTableDataInfo',
    path: '/cos3-app-manager/form/getTableDataInfo',
    type: 'get'
  },
  {
    name: '分页获取所有table列表数据',
    method: 'getTablePageInfo',
    path: '/cos3-app-manager/form/getTablePageInfo',
    type: 'get'
  },
  {
    name: '获取Tree的数据',
    method: 'getTreeDataInfo',
    path: '/cos3-app-manager/form/getTreeDataInfo',
    type: 'get'
  },
  {
    name: '根据节点获取Tree的数据',
    method: 'getTreeDataInfoByNode',
    path: '/cos3-app-manager/form/getTreeDataInfoByNode',
    type: 'get'
  },
  {
    name: '获取对应Tree模版的配置信息',
    method: 'getTreeConfInfo',
    path: '/cos3-app-manager/form/getTreeConfInfo',
    type: 'get'
  },
  {
    name: '导入文件数据',
    method: 'importData',
    path: '/cos3-app-manager/form/importData',
    type: 'get'
  },
  {
    name: '更新数据表状态(停用、启用)',
    method: 'updateFormStatus',
    path: '/cos3-app-manager/form/updateFormStatus',
    type: 'get'
  },
  {
    name: '导出Table数据',
    method: 'exportTableInfo',
    path: '/cos3-app-manager/form/exportTableInfo',
    type: 'get'
  },
  {
    name: '获取文件内容信息',
    method: 'getFileNodesById',
    path: '/cos3-file-manager/file/getFileNodesById',
    type: 'get'
  },
  {
    name: '获取所有权限组信息',
    method: 'getAllPermissionGroup',
    path: '/cos3-portal-manager/perssionGroup/getAllPermissionGroup',
    type: 'get'
  },
  {
    name: '批量保存业务接入数据',
    method: 'batchSaveAccess',
    path: '/cos3-app-manager/form/batchSaveAccess',
    type: 'post'
  },
  {
    name: '批量保存常用业务办理数据',
    method: 'batchSaveBusinessEntrance',
    path: '/cos3-app-manager/form/batchSaveBusinessEntrance',
    type: 'post'
  },
  {
    name: '删除对应数据表数据',
    method: 'delTableData',
    path: '/cos3-app-manager/form/delTableData',
    type: 'get'
  },
  {
    name: '根据指定条件获取表单数据',
    method: 'getFormDataInfoByCondition',
    path: '/cos3-app-manager/form/getFormDataInfoByCondition',
    type: 'get'
  },
  {
    name: '获取动态视图的所有参数',
    method: 'getViewParamsOpts',
    path: '/cos3-app-manager/form/getViewParamsOpts',
    type: 'get'
  },
  {
    name: '获取选择机构下人员树列表--选人--迁移',
    method: 'getPersonTreeByOrgIds',
    path: '/cos3-portal-manager/selPerson/getPersonTreeByOrgIds',
    type: 'get'
  },
  {
    name: '获取当前所有机构下的用户信息',
    method: 'getPersonListByAllOrgs',
    path: '/cos3-portal-manager/selPerson/getPersonListByAllOrgs',
    type: 'get'
  },
  {
    name: '获取自定义群组下的人员树列表',
    method: 'getPersonTreeByGroupIds',
    path: '/cos3-portal-manager/personnelGroup/getPersonTreeByGroupIds',
    type: 'get'
  },
  {
    name: '获取角色下的人员树列表',
    method: 'getPersonTreeByRoleIds',
    path: '/cos3-portal-manager/selPerson/getPersonTreeByRoleIds',
    type: 'get'
  },
  {
    name: '获取岗位下的人员树列表',
    method: 'getPersonTreeByPostIds',
    path: '/cos3-portal-manager/positionManage/getPersonTreeByPostIds',
    type: 'post'
  },
  {
    name: '左侧-获取拼音下的人员树列表',
    method: 'getPersonTreeByLetters',
    path: '/cos3-portal-manager/selPerson/getPersonTreeByLetters',
    type: 'get'
  },
  {
    name: '获取用户自定义群组信息列表',
    method: 'getPersonGroupOpts',
    path: '/cos3-portal-manager/personnelGroup/getPersonGroupOpts',
    type: 'get'
  },
  {
    name: '保存用户自定义分组数据',
    method: 'savePersonGroup',
    path: '/cos3-portal-manager/personnelGroup/savePersonGroup',
    type: 'post'
  },
  {
    name: '删除用户自定义群组数据',
    method: 'delPersonGroup',
    path: '/cos3-portal-manager/personnelGroup/delPersonGroup',
    type: 'get'
  },
  {
    name: '查询平台所有或指定角色',
    method: 'getAllRolesByIds',
    path: '/cos3-portal-manager/selPerson/getAllRolesByIds',
    type: 'get'
  },
  {
    name: '查询所有岗位信息',
    method: 'getAllPostOpts',
    path: '/cos3-portal-manager/positionManage/getAllPostOpts',
    type: 'get'
  },
  {
    name: '获取Tree关联表数据',
    method: 'getTreeRelationData',
    path: '/cos3-app-manager/form/getTreeRelationData',
    type: 'get'
  },
  {
    name: '修改模板状态',
    method: 'updateTempStatus',
    path: '/cos3-app-manager/form/updateTempStatus',
    type: 'get'
  },
  {
    name: '选人左侧机构树',
    method: 'getAsideOrgTree',
    path: '/cos3-portal-manager/selPerson/getOrgTree',
    type: 'get'
  },
  {
    name: '选人左侧扩展人员',
    method: 'getExPersons',
    path: '/cos3-portal-manager/selPerson/getExPersons',
    type: 'get'
  },
  {
    name: '获取平台所有纬度',
    method: 'getDimensionList',
    path: '/cos3-portal-manager/selPerson/getDicItemListByDicKey',
    type: 'get'
  },
  {
    name: '表单验证属性唯一',
    method: 'checkUnique',
    path: '/cos3-app-manager/form/unique',
    type: 'get'
  }, {
    name: '删除树节点数据信息',
    method: 'delTreeNode',
    path: '/cos3-app-manager/form/delTreeNode',
    type: 'get'
  },
  {
    name: '根据条件查询角色信息',
    method: 'getRolesByTypeAndDemensionAndName',
    path: '/cos3-portal-manager/role/getRolesByTypeAndDemensionAndName',
    type: 'get'
  },
  {
    name: '根据条件查询部门信息',
    method: 'getDepByNameAndDimension',
    path: '/cos3-portal-manager/org/getDepByNameAndDimension',
    type: 'get'
  }
]
