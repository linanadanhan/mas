import Mock from 'mockjs'
import Components from './components'
import DataBrowser from './dataBrowser'
import tree from './tree'
Mock.mock(/form\/components/, Components)
Mock.mock(/form\/dataBrowser/, DataBrowser)
Mock.mock(/form\/tree/, tree)
Mock.mock(/form\/getFormConfInfo/, {
  status: 200,
  data: {
    id: 10,
    createBy: 1,
    createTime: '2018-04-20 18:27:30',
    updateTime: '2018-04-22 19:12:34',
    deleted: false,
    modelJson:
      '{"EXPLAIN1":"培训计划申请","DATE1":"","DATE_RANGE1":"","DATENAN":"","TITLE":"我是文本","DEPARTMENT":"我是文本","TEACHER":"我是文本","PLANTIME":"我是文本","STUDENTS":"我是文本"}',
    confJson:
    {
      'formLabelPosition': '',
      'tableType': '00',
      'formlabelWidth': 100,
      'size': 'small',
      'tableLabel': '培训计划申请表',
      'rows': [{
        'columns': [{
          'instructions': '',
          'color': '#000',
          'bottom': 10,
          'defaultFormValue': '表头说明',
          'label': '表头说明',
          'type': 'explain',
          'noFormItem': true,
          'top': 10,
          'formHeadAlign': 'left',
          'name': 'EXPLAIN1',
          'fontSize': 24,
          'iconCls': 'el-icon-edit',
          'span': 24
        }]
      }, {
        'columns': [{
          'likeQry': false,
          'componentType': 'text',
          'defaultFormValue': '我是文本',
          'rule': [{
            'trigger': 'blur',
            'message': '此项不能为空',
            'required': false
          }],
          'label': '培训主题',
          'type': 'input',
          'unit': '',
          'readonly': false,
          'name': 'TITLE',
          'disabled': false,
          'iconCls': 'el-icon-edit',
          'rowNumber': 4,
          'span': 24
        }]
      }, {
        'columns': [{
          'likeQry': false,
          'componentType': 'text',
          'defaultFormValue': '我是文本',
          'rule': [{
            'trigger': 'blur',
            'message': '此项不能为空',
            'required': false
          }],
          'label': '讲师',
          'type': 'input',
          'unit': '',
          'readonly': false,
          'name': 'TEACHER',
          'disabled': false,
          'iconCls': 'el-icon-edit',
          'rowNumber': 4,
          'span': 12
        }, {
          'likeQry': false,
          'componentType': 'text',
          'defaultFormValue': '我是文本',
          'rule': [{
            'trigger': 'blur',
            'message': '此项不能为空',
            'required': false
          }],
          'label': '培训部门',
          'type': 'input',
          'unit': '',
          'readonly': false,
          'name': 'DEPARTMENT',
          'disabled': false,
          'iconCls': 'el-icon-edit',
          'rowNumber': 4,
          'span': 12
        }]
      }, {
        'columns': [{
          'likeQry': false,
          'componentType': 'text',
          'defaultFormValue': '我是文本',
          'rule': [{
            'trigger': 'blur',
            'message': '此项不能为空',
            'required': false
          }],
          'label': '培训时间',
          'type': 'input',
          'unit': '',
          'readonly': false,
          'name': 'PLANTIME',
          'disabled': false,
          'iconCls': 'el-icon-edit',
          'rowNumber': 4,
          'span': 24
        }]
      }, {
        'columns': [{
          'likeQry': false,
          'componentType': 'text',
          'defaultFormValue': '我是文本',
          'rule': [{
            'trigger': 'blur',
            'message': '此项不能为空',
            'required': false
          }],
          'label': '参训对象',
          'type': 'input',
          'unit': '',
          'readonly': false,
          'name': 'STUDENTS',
          'disabled': false,
          'iconCls': 'el-icon-edit',
          'rowNumber': 4,
          'span': 24
        }]
      }, {
        'columns': [{
          'index': '@integer',
          'editorHeight': 200,
          'name': 'DESCRIPTION',
          'disabled': false,
          'label': '培训说明',
          'type': 'editor',
          'iconCls': 'el-icon-edit',
          'span': 24
        }]
      }, {
        'columns': [{
          'name': 'VIDEO',
          'label': '上传视频',
          'type': 'video',
          'span': 24,
          'iconCls': 'el-icon-edit',
          'disabled': false,
          'autoPlay': true,
          'controls': true,
          'loop': false,
          'width': 200,
          'videoSize': 10,
          'reourceUrl': '',
          'videoSuffix': ['mp4', 'ogg', 'avi', 'flv', 'wmv'],
          'videoSuffixList': ['mp4', 'ogg', 'avi', 'flv', 'wmv']
        }]
      }],
      'dataSource': 'T_D_00082',
      'dataSourceType': 'table'
    },
    ruleJson:
      '{"TITLE":[{"required":false,"message":"此项不能为空","trigger":"blur"}],"DEPARTMENT":[{"required":false,"message":"此项不能为空","trigger":"blur"}],"TEACHER":[{"required":false,"message":"此项不能为空","trigger":"blur"}],"PLANTIME":[{"required":false,"message":"此项不能为空","trigger":"blur"}],"STUDENTS":[{"required":false,"message":"此项不能为空","trigger":"blur"}]}',
    formatCreateTime: '2018-04-20 18:27:30',
    formatUpdateTime: '2018-04-22 19:12:34'
  }
})
Mock.mock(/form\/getTabelConfInfo/, {
  status: 200,
  data: {
    id: 10,
    createBy: 1,
    createTime: '2018-04-20 18:27:30',
    updateTime: '2018-04-22 19:12:34',
    deleted: false,
    modelJson: '',
    confJson: `
    {
      "rows": [{
        "children": [{
          "children": [],
          "prop": "C_SYS_NAME",
          "id": 1001,
          "label": "系统名称"
        }, {
          "children": [],
          "prop": "C_SYS_CODE",
          "id": 1002,
          "label": "系统代码"
        }, {
          "children": [],
          "prop": "C_ACCESS_URL",
          "id": 1003,
          "label": "访问地址"
        }, {
          "children": [],
          "prop": "C_STATUS",
          "id": 1004,
          "label": "状态"
        }, {
          "prop": "name61005",
          "width": 60,
          "fixed": false,
          "id": 1005,
          "label": "操作",
          "type": [{
            "default": true,
            "isCheck": true,
            "formFlag": "fm01",
            "name": "修改",
            "type": "1",
            "script": ""
          }, {
            "default": true,
            "isCheck": false,
            "formFlag": "",
            "name": "查看",
            "type": "2",
            "script": ""
          }, {
            "default": true,
            "isCheck": true,
            "formFlag": "",
            "name": "删除",
            "type": "0",
            "script": ""
          }, {
            "default": true,
            "isCheck": false,
            "formFlag": "",
            "name": "下载",
            "type": "3",
            "script": ""
          }]
        }],
        "id": 1,
        "label": "字段"
      }],
      "table": {
        "resource": "",
        "dataSourceType": "table",
        "viewParamsOpts":[],
        "size": "mini",
        "checkbox": false,
        "orderNumber": false,
        "border": true,
        "stripe": true,
        "fixedHead": false,
        "theadStyle": {
          "bgStyle": "#f5f7fa",
          "colorStyle": "#909399",
          "borderStyle": "#ebeef5"
        },
        "evenRowStyle": {
          "bgStyle": "#fff",
          "colorStyle": "#606266",
          "borderStyle": "#ebeef5"
        },
        "oddRowStyle": {
          "bgStyle": "#fff",
          "colorStyle": "#606266",
          "borderStyle": "#ebeef5"
        }
      },
      "tool": {
        "page": true,
        "type": [{
          "default": true,
          "isCheck": true,
          "formFlag": "fm01",
          "name": "新增",
          "type": "2",
          "script": ""
        }, {
          "default": true,
          "isCheck": true,
          "formFlag": "",
          "name": "批量删除",
          "type": "0",
          "script": ""
        }, {
          "default": true,
          "isCheck": true,
          "formFlag": "",
          "name": "停用",
          "type": "3",
          "script": ""
        }, {
          "default": true,
          "isCheck": true,
          "formFlag": "",
          "name": "启用",
          "type": "4",
          "script": ""
        }, {
          "default": true,
          "isCheck": false,
          "formFlag": "",
          "name": "导入",
          "type": "5",
          "script": ""
        }, {
          "default": true,
          "isCheck": false,
          "formFlag": "",
          "name": "导出",
          "type": "6",
          "script": ""
        }, {
          "default": true,
          "isCheck": false,
          "formFlag": "",
          "name": "收藏",
          "type": "7",
          "script": ""
        }]
      }
    }
    `,
    ruleJson: '',
    permissionJson:
      '[{"name":"新增","text":"新增","permissionGroup":""},{"name":"批量删除","text":"批量删除","permissionGroup":""},{"name":"停用","text":"停用","permissionGroup":""},{"name":"启用","text":"启用","permissionGroup":""},{"name":"修改","text":"修改","permissionGroup":""},{"name":"删除","text":"删除","permissionGroup":""}]',
    permissionMap:
      '{"修改":true,"新增":true,"启用":true,"停用":true,"批量删除":true,"删除":true}',
    formatCreateTime: '2018-04-20 18:27:30',
    formatUpdateTime: '2018-04-22 19:12:34'
  }
})
Mock.mock(/form\/getFormComponent/, {
  status: 200,
  data: {
    id: 1,
    createBy: 1,
    createTime: '2018-04-20 10:28:05',
    json: `
        [{
        "type": "表单组件",
        "components": [{
          "name": "text",
          "label": "文本",
          "type": "input",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": "我是文本",
          "disabled": false,
          "readonly": false,
          "likeQry": false,
          "componentType": "text",
          "rowNumber": 4,
          "unit": "",
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "counter",
          "label": "计数器",
          "type": "input-number",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": 1,
          "min": 0,
          "max": 100,
          "step": 1,
          "disabled": false,
          "controlsPosition": "",
          "unit": "",
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "selection",
          "label": "下拉选择",
          "type": "select",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": "选项一",
          "disabled": false,
          "dataSource": "1",
          "dicKey": "",
          "dicOptions": [],
          "options": [{
            "value": "0",
            "label": "选项1"
          }, {
            "value": "1",
            "label": "选项2"
          }],
          "unit": ""
        }, {
          "name": "radio",
          "label": "单选框",
          "type": "radio",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": 1,
          "disabled": false,
          "options": [{
            "value": 1,
            "label": "选项一"
          }, {
            "value": 2,
            "label": "选项二"
          }]
        }, {
          "name": "checkbox",
          "label": "多选框",
          "type": "checkbox",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": ["选项一"],
          "disabled": false,
          "options": [{
            "label": "选项一"
          }, {
            "label": "选项二"
          }],
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "date",
          "label": "日期",
          "type": "date-picker",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": "",
          "disabled": false,
          "readonly": false,
          "unit": "",
          "dateInterval": "isBegin",
          "componentType": "date",
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "date_range",
          "label": "日期范围",
          "type": "date-picker-range",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": "",
          "disabled": false,
          "readonly": false,
          "componentType": "daterange",
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "time",
          "label": "时间",
          "type": "time-picker",
          "span": 24,
          "iconCls": "el-icon-edit",
          "disabled": false,
          "readonly": false,
          "defaultFormValue": "",
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "slider",
          "label": "滑块",
          "type": "slider",
          "span": 24,
          "iconCls": "el-icon-edit",
          "disabled": false,
          "defaultFormValue": 0,
          "min": 0,
          "max": 100,
          "step": 1
        }, {
          "name": "switch",
          "label": "开关",
          "type": "switch",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": false,
          "disabled": false,
          "activeText": "",
          "inactiveText": ""
        }, {
          "name": "upload",
          "label": "上传文件",
          "type": "upload",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": [],
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "upload",
          "label": "上传图片",
          "type": "upload-head",
          "images": false,
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": "",
          "imgWidth": "85",
          "imgHeight": "105",
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }]
        }, {
          "name": "email",
          "label": "邮箱",
          "type": "email",
          "span": 24,
          "iconCls": "el-icon-edit",
          "defaultFormValue": "",
          "rule": [{
            "required": false,
            "message": "此项不能为空",
            "trigger": "blur"
          }, {
            "pattern": "1",
            "message": "测试正则表达式0-9数字",
            "trigger": "change"
          }]
        }, {
          "name": "editor",
          "label": "富文本编辑",
          "type": "editor",
          "span": 24,
          "iconCls": "el-icon-edit",
          "editorHeight": 200,
          "disabled": false
        }, {
          "name": "video",
          "label": "上传视频",
          "type": "video",
          "span": 24,
          "iconCls": "el-icon-edit",
          "disabled": false,
          "autoPlay": true,
          "controls": true,
          "loop": false,
          "width": 200,
          "videoSize": 10,
          "reourceUrl": "",
          "videoSuffix": ["mp4","ogg","avi","flv","wmv"],
          "videoSuffixList": ["mp4","ogg","avi","flv","wmv"]
        }]
      }, {
        "type": "布局字段",
        "components": [{
          "name": "explain",
          "label": "表头说明",
          "noFormItem": true,
          "type": "explain",
          "span": 24,
          "defaultFormValue": "表头说明",
          "fontSize": "18",
          "bottom": 0,
          "top": 0,
          "instructions": "这是表头的说明文字",
          "formHeadAlign": "left",
          "color": "#000",
          "iconCls": "el-icon-edit"
        }, {
          "name": "panel",
          "label": "多栏布局",
          "card": false,
          "showHead": true,
          "cardShadow": "always",
          "type": "panel",
          "defaultFormValue": "标题",
          "rows": [],
          "span": 24,
          "iconCls": "el-icon-edit"
        }, {
          "name": "attribute",
          "label": "属性展示",
          "type": "attribute",
          "defaultFormValue": "这里是字段属性值",
          "color": "#000",
          "background": "#eee",
          "span": 24,
          "iconCls": "el-icon-edit"
        }, {
          "name": "list",
          "label": "列表",
          "type": "list",
          "defaultFormValue": [{
            "text": "示例文件.xlsx"
          }],
          "download": false,
          "preview": false,
          "span": 24,
          "iconCls": "el-icon-edit"
        }]
      }, {
        "type": "操作按钮",
        "components": [{
          "name": "btn",
          "label": "按钮",
          "type": "button",
          "iconCls": "el-icon-edit",
          "span": 24,
          "noFormItem": true,
          "defaultFormValue": "按钮",
          "style": "primary",
          "eventType": "0",
          "default": "0",
          "size": "mini",
          "textAlign": "left",
          "eventTypes": [{
            "key": "0",
            "value": "保存"
          }, {
            "key": "2",
            "value": "查询"
          }, {
            "key": "1",
            "value": "重置"
          }],
          "group": [{
            "name": "primary"
          }, {
            "name": "success"
          }, {
            "name": "danger"
          }, {
            "name": "default"
          }, {
            "name": "text"
          }, {
            "name": "info"
          }, {
            "name": "warning"
          }]
        }]
      }]
    `,
    formatCreateTime: '2018-04-20 10:28:05',
    formatUpdateTime: ''
  }
})
Mock.mock(/form\/saveFormConfInfo/, {
  status: 200,
  data: null
})
Mock.mock(/form\/getFormTempInfo/, {
  status: 200,
  data: null
})
Mock.mock(/form\/saveFormTempInfo/, {
  status: 200,
  data: null
})
Mock.mock(/form\/delFormTempInfo/, {
  status: 200,
  data: null
})
Mock.mock(/form\/getFormTempById/, {
  status: 200,
  data: null
})
Mock.mock(/form\/isExitFormFlag/, {
  status: 200,
  data: null
})
Mock.mock(/form\/table\/tbl_tables\/queryAll/, {
  status: 200,
  data: [
    {
      C_ID: 8,
      C_NAME: 'cos_sys_personnel',
      C_TEXT: '人员信息表',
      C_DISABLED: 0,
      C_DELETED: 0,
      C_FILECOLUMNS: '',
      C_EXT_TABLE: '',
      C_SUBTABLES: '',
      C_CATALOG: ''
    }
  ]
})
Mock.mock(/form\/table\/getTableFeild/, {
  status: 200,
  data: [
    'C_ID',
    'C_NAME',
    'C_LOGIN_NAME',
    'C_STATUS',
    'C_UUID',
    'C_SORT_NO',
    'C_PASSWORD_POLICY',
    'C_PASSWORD',
    'C_MOBILE_PHONE',
    'C_EMAIL',
    'C_IS_MOBILE_ACCESS',
    'C_LAST_LOGIN',
    'C_LAST_LOGIN_CLIENT_IP',
    'C_LAST_LOGIN_FAILED',
    'C_ID_CARD',
    'C_SEX',
    'C_BIRTH',
    'C_PHONE',
    'C_ADDRESS',
    'C_HEAD_IMG',
    'C_AEAD_TIME',
    'C_UPDATE_BY',
    'C_UPDATE_TIME',
    'C_CREATE_BY',
    'C_CREATE_TIME',
    'C_DELETED',
    'C_AREA_CASCADE',
    'C_TENANT_CODE'
  ]
})
Mock.mock(/perssionGroup\/getAllPermissionGroup/, {
  status: 200,
  data: null
})
Mock.mock(/form\/getTableDataInfo/, {
  status: 200,
  data: [{ 'C_YW_NAME': '百度', 'C_DESC': 'Tangram-有个性的数字化工作平台' },
  { 'C_YW_NAME': '新浪', 'C_DESC': 'Tangram-有个性的数字化工作平台' },
  { 'C_YW_NAME': '搜狐', 'C_DESC': 'Tangram-有个性的数字化工作平台' },
  { 'C_YW_NAME': '优酷', 'C_DESC': 'Tangram-有个性的数字化工作平台' },
  { 'C_YW_NAME': '网易', 'C_DESC': 'Tangram-有个性的数字化工作平台' },
  { 'C_YW_NAME': '阿里巴巴', 'C_DESC': 'Tangram-有个性的数字化工作平台' },
  { 'C_YW_NAME': '腾讯', 'C_DESC': 'Tangram-有个性的数字化工作平台' },
  { 'C_YW_NAME': '门户', 'C_DESC': 'Tangram-有个性的数字化工作平台' }]
})
Mock.mock(/form\/saveFormData/, {
  status: 200,
  data: null
})
Mock.mock(/form\/getFormDataInfoById/, {
  status: 200,
  data: {
    C_ID: 9,
    C_NAME: '测试sn',
    C_LOGIN_NAME: 'cssn',
    C_STATUS: null,
    C_UUID: null,
    C_SORT_NO: 1,
    C_PASSWORD_POLICY: 0,
    C_PASSWORD: null,
    C_MOBILE_PHONE: '13164680748',
    C_EMAIL: '1026971073@qq.com',
    C_IS_MOBILE_ACCESS: null,
    C_LAST_LOGIN: null,
    C_LAST_LOGIN_CLIENT_IP: null,
    C_LAST_LOGIN_FAILED: null,
    C_ID_CARD: '4210100033430021212',
    C_SEX: '0',
    C_BIRTH: '2018-04-23 00:00:00',
    C_PHONE: null,
    C_ADDRESS: null,
    C_HEAD_IMG: '',
    C_AEAD_TIME: null,
    C_UPDATE_BY: null,
    C_UPDATE_TIME: 1524463172000,
    C_CREATE_BY: null,
    C_CREATE_TIME: 1524463172000,
    C_DELETED: false,
    C_AREA_CASCADE: null,
    C_TENANT_CODE: null
  }
})
Mock.mock(/form\/getDicOptions/, {
  status: 200,
  data: [
    { C_KEY: 'orgType_catalog', C_NAME: '组织机构类型' },
    { C_KEY: 'theme_styles', C_NAME: '主题样式' },
    { C_KEY: 'org_dimension', C_NAME: '机构维度' },
    { C_KEY: 'org_post', C_NAME: '岗位' }
  ]
})
Mock.mock(/form\/getDicItemByKey/, {
  status: 200,
  data: [
    { value: '0', label: '公司' },
    { value: '1', label: '部门' },
    { value: '2', label: '单位' }
  ]
})
Mock.mock(/form\/getTablePageInfo/, {
  status: 200,
  data: null
})
Mock.mock(/form\/getAllFormTemp/, {
  status: 200,
  data: null
})
Mock.mock(/form\/getTreeConfInfo/, {
  status: 200,
  data: {
    id: 10,
    createBy: 1,
    createTime: '2018-04-20 18:27:30',
    updateTime: '2018-04-22 19:12:34',
    deleted: false,
    modelJson: '',
    confJson:
      '{"accordion":false,"showCheckbox":true,"draggable":false,"indent":16,"isFilterText":false,"lazy":true,"defaultExpandAll":false,"highlightCurrent":true,"dataSource":"FUNCTIONSECTION","dataSourceType":"table","expandOnClickNode":true,"showHandleBtn":true}',
    ruleJson: '',
    permissionJson: '',
    permissionMap: '',
    formatCreateTime: '2018-04-20 18:27:30',
    formatUpdateTime: '2018-04-22 19:12:34'
  }
})
Mock.mock(/form\/getTreeDataInfo/, {
  status: 200,
  data: [
    {
      id: '4738',
      parentId: '0',
      code: 'null',
      text: '501 机关工资福利支出',
      state: 'open',
      iconCls: 'null',
      checked: false,
      attributes: {
        C_ID: '4738',
        C_PARENT_ID: '0',
        C_TEXT: '501 机关工资福利支出'
      },
      children: [
        {
          id: '4615',
          parentId: '4738',
          code: 'null',
          text: '50101 工资津补贴',
          state: 'open',
          iconCls: 'null',
          checked: false,
          attributes: {
            C_ID: '4615',
            C_PARENT_ID: '4738',
            C_TEXT: '50101 工资津补贴'
          },
          children: null,
          level: 0,
          cascade: 'null',
          leaf: true
        },
        {
          id: '4853',
          parentId: '4738',
          code: 'null',
          text: '50102 社会保险缴费',
          state: 'open',
          iconCls: 'null',
          checked: false,
          attributes: {
            C_ID: '4853',
            C_PARENT_ID: '4738',
            C_TEXT: '50102 社会保险缴费'
          },
          children: null,
          level: 0,
          cascade: 'null',
          leaf: true
        },
        {
          id: '4873',
          parentId: '4738',
          code: 'null',
          text: '50103 住房公积金',
          state: 'open',
          iconCls: 'null',
          checked: false,
          attributes: {
            C_ID: '4873',
            C_PARENT_ID: '4738',
            C_TEXT: '50103 住房公积金'
          },
          children: null,
          level: 0,
          cascade: 'null',
          leaf: true
        },
        {
          id: '4874',
          parentId: '4738',
          code: 'null',
          text: '50199 其他工资福利支出',
          state: 'open',
          iconCls: 'null',
          checked: false,
          attributes: {
            C_ID: '4874',
            C_PARENT_ID: '4738',
            C_TEXT: '50199 其他工资福利支出'
          },
          children: null,
          level: 0,
          cascade: 'null',
          leaf: true
        },
        {
          id: '4893',
          parentId: '4738',
          code: 'null',
          text: '50104 test',
          state: 'open',
          iconCls: 'null',
          checked: false,
          attributes: {
            C_ID: '4893',
            C_PARENT_ID: '4738',
            C_TEXT: '50104 test'
          },
          children: null,
          level: 0,
          cascade: 'null',
          leaf: true
        },
        {
          id: '4894',
          parentId: '4738',
          code: 'null',
          text: '50105 test05',
          state: 'open',
          iconCls: 'null',
          checked: false,
          attributes: {
            C_ID: '4894',
            C_PARENT_ID: '4738',
            C_TEXT: '50105 test05'
          },
          children: [
            {
              id: '4895',
              parentId: '4894',
              code: 'null',
              text: '5010501 test0501',
              state: 'open',
              iconCls: 'null',
              checked: false,
              attributes: {
                C_ID: '4895',
                C_PARENT_ID: '4894',
                C_TEXT: '5010501 test0501'
              },
              children: null,
              level: 0,
              cascade: 'null',
              leaf: true
            }
          ],
          level: 0,
          cascade: 'null',
          leaf: false
        }
      ],
      level: 0,
      cascade: 'null',
      leaf: false
    },
    {
      id: '4896',
      parentId: '0',
      code: 'null',
      text: '502 测试科目',
      state: 'open',
      iconCls: 'null',
      checked: false,
      attributes: { C_ID: '4896', C_PARENT_ID: '0', C_TEXT: '502 测试科目' },
      children: [
        {
          id: '4897',
          parentId: '4896',
          code: 'null',
          text: '50201 测试科目01',
          state: 'open',
          iconCls: 'null',
          checked: false,
          attributes: {
            C_ID: '4897',
            C_PARENT_ID: '4896',
            C_TEXT: '50201 测试科目01'
          },
          children: null,
          level: 0,
          cascade: 'null',
          leaf: true
        }
      ],
      level: 0,
      cascade: 'null',
      leaf: false
    }
  ]
})
