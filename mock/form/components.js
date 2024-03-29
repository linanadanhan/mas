export default {
  'status': 200,
  'data': [{
    'type': '表单组件',
    'components': [{
      'name': 'text',
      'label': '文本',
      'type': 'input',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': '我是文本',
      'disabled': false,
      'readonly': false,
      'likeQry': false,
      'componentType': 'text',
      'rowNumber': 4,
      'unit': '',
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'counter',
      'label': '计数器',
      'type': 'input-number',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': 1,
      'min': 0,
      'max': 100,
      'step': 1,
      'disabled': false,
      'controlsPosition': '',
      'unit': '',
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'selection',
      'label': '下拉选择',
      'type': 'select',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': '选项一',
      'disabled': false,
      'dataSource': '1',
      'dicKey': '',
      'dicOptions': [],
      'options': [{
        'value': '0',
        'label': '选项1'
      }, {
        'value': '1',
        'label': '选项2'
      }],
      'unit': ''
    }, {
      'name': 'radio',
      'label': '单选框',
      'type': 'radio',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': 1,
      'disabled': false,
      'options': [{
        'value': 1,
        'label': '选项一'
      }, {
        'value': 2,
        'label': '选项二'
      }]
    }, {
      'name': 'checkbox',
      'label': '多选框',
      'type': 'checkbox',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': ['选项一'],
      'disabled': false,
      'options': [{
        'label': '选项一'
      }, {
        'label': '选项二'
      }],
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'date',
      'label': '日期',
      'type': 'date-picker',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': '',
      'disabled': false,
      'readonly': false,
      'unit': '',
      'dateInterval': 'isBegin',
      'componentType': 'date',
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'date_range',
      'label': '日期范围',
      'type': 'date-picker-range',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': '',
      'disabled': false,
      'readonly': false,
      'componentType': 'daterange',
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'time',
      'label': '时间',
      'type': 'time-picker',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'disabled': false,
      'readonly': false,
      'defaultFormValue': '',
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'slider',
      'label': '滑块',
      'type': 'slider',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'disabled': false,
      'defaultFormValue': 0,
      'min': 0,
      'max': 100,
      'step': 1
    }, {
      'name': 'switch',
      'label': '开关',
      'type': 'switch',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': false,
      'disabled': false,
      'activeText': '',
      'inactiveText': ''
    }, {
      'name': 'upload',
      'label': '上传文件',
      'type': 'upload',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': [],
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'upload',
      'label': '上传图片',
      'type': 'upload-head',
      'images': false,
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': '',
      'imgWidth': '85',
      'imgHeight': '105',
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }, {
      'name': 'email',
      'label': '邮箱',
      'type': 'email',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'defaultFormValue': '',
      'rule': [{
        'required': false,
        'message': '此项不能为空',
        'trigger': 'blur'
      }, {
        'pattern': '1',
        'message': '测试正则表达式0-9数字',
        'trigger': 'change'
      }]
    }, {
      'name': 'editor',
      'label': '富文本编辑',
      'type': 'editor',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'editorHeight': 200,
      'disabled': false
    }, {
      'name': 'video',
      'label': '上传视频',
      'type': 'video',
      'span': 24,
      'iconCls': 'el-icon-edit',
      'videoHeight': 200,
      'disabled': false
    }]
  }, {
    'type': '布局字段',
    'components': [{
      'name': 'explain',
      'label': '表头说明',
      'noFormItem': true,
      'type': 'explain',
      'span': 24,
      'defaultFormValue': '表头说明',
      'fontSize': '18',
      'bottom': 0,
      'top': 0,
      'instructions': '这是表头的说明文字',
      'formHeadAlign': 'left',
      'color': '#000',
      'iconCls': 'el-icon-edit'
    }, {
      'name': 'panel',
      'label': '多栏布局',
      'card': false,
      'showHead': true,
      'cardShadow': 'always',
      'type': 'panel',
      'defaultFormValue': '标题',
      'rows': [],
      'span': 24,
      'iconCls': 'el-icon-edit'
    }, {
      'name': 'attribute',
      'label': '属性展示',
      'type': 'attribute',
      'defaultFormValue': '这里是字段属性值',
      'color': '#000',
      'background': '#eee',
      'span': 24,
      'iconCls': 'el-icon-edit'
    }, {
      'name': 'list',
      'label': '列表',
      'type': 'list',
      'defaultFormValue': [{
        'text': '示例文件.xlsx'
      }],
      'download': false,
      'preview': false,
      'span': 24,
      'iconCls': 'el-icon-edit'
    }]
  }, {
    'type': '操作按钮',
    'components': [{
      'name': 'btn',
      'label': '按钮',
      'type': 'button',
      'iconCls': 'el-icon-edit',
      'span': 24,
      'noFormItem': true,
      'defaultFormValue': '按钮',
      'style': 'primary',
      'eventType': '0',
      'default': '0',
      'size': 'mini',
      'textAlign': 'left',
      'eventTypes': [{
        'key': '0',
        'value': '保存'
      }, {
        'key': '2',
        'value': '查询'
      }, {
        'key': '1',
        'value': '重置'
      }],
      'group': [{
        'name': 'primary'
      }, {
        'name': 'success'
      }, {
        'name': 'danger'
      }, {
        'name': 'default'
      }, {
        'name': 'text'
      }, {
        'name': 'info'
      }, {
        'name': 'warning'
      }]
    }]
  }]
}
