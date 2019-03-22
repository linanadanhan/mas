export default {
  'status': 200,
  'data': {
    model: {
      'counter0': 40,
      'selection0': '选项一',
      'radio0': 1,
      'checkbox0': ['选项一'],
      'date0': '',
      'slider0': 0,
      'switch0': false,
      'upload1': [],
      'text2': '12',
      'date1': ''
    },
    config: {
      'formLabelPosition': '',
      'formlabelWidth': 100,
      'size': 'medium',
      'rows': [{
        'columns': [{
          'name': 'panel1',
          'label': '',
          'noFormItem': true,
          'type': 'panel',
          'rows': [{
            'columns': [{
              'name': 'text2',
              'label': '文本',
              'type': 'input',
              'span': 24,
              'iconCls': 'el-icon-edit',
              'defaultFormValue': '我是文本',
              'disabled': false,
              'readonly': false,
              'componentType': 'text',
              'unit': '分',
              'rule': [{
                'required': false,
                'message': '此项不能为空',
                'trigger': 'blur'
              }]
            }]
          }, {
            'columns': [{
              'name': 'date1',
              'label': '日期',
              'type': 'date-picker',
              'span': 24,
              'iconCls': 'el-icon-edit',
              'defaultFormValue': '',
              'disabled': false,
              'readonly': false,
              'componentType': 'date',
              'rule': [{
                'required': false,
                'message': '此项不能为空',
                'trigger': 'blur'
              }]
            }]
          }],
          'span': 18,
          'iconCls': 'el-icon-edit'
        }, {
          'name': 'upload1',
          'label': '上传头像',
          'type': 'upload-head',
          'span': 6,
          'iconCls': 'el-icon-edit',
          'defaultFormValue': [],
          'rule': [{
            'required': false,
            'message': '此项不能为空',
            'trigger': 'blur'
          }]
        }]
      }, {
        'columns': [{
          'name': 'counter0',
          'label': '计数器',
          'type': 'input-number',
          'span': 18,
          'iconCls': 'el-icon-edit',
          'defaultFormValue': 40,
          'min': 0,
          'max': 100,
          'step': 1,
          'disabled': false,
          'unit': '个',
          'controlsPosition': '',
          'rule': [{
            'required': false,
            'message': '此项不能为空',
            'trigger': 'blur'
          }]
        }]
      }, {
        'columns': [{
          'name': 'selection0',
          'label': '下拉选择',
          'type': 'select',
          'span': 12,
          'iconCls': 'el-icon-edit',
          'defaultFormValue': '选项一',
          'disabled': false,
          'unit': '人',
          'options': [{
            'value': '0',
            'label': '选项1'
          }, {
            'value': '1',
            'label': '选项2'
          }]
        }, {
          'name': 'radio0',
          'label': '单选框',
          'type': 'radio',
          'span': 12,
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
        }]
      }, {
        'columns': [{
          'name': 'date0',
          'label': '日期',
          'type': 'date-picker',
          'span': 12,
          'iconCls': 'el-icon-edit',
          'defaultFormValue': '',
          'disabled': false,
          'readonly': false,
          'componentType': 'date',
          'rule': [{
            'required': false,
            'message': '此项不能为空',
            'trigger': 'blur'
          }]
        }, {
          'name': 'checkbox0',
          'label': '多选框',
          'type': 'checkbox',
          'span': 12,
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
        }]
      }, {
        'columns': [{
          'name': 'slider0',
          'label': '滑块',
          'type': 'slider',
          'span': 12,
          'iconCls': 'el-icon-edit',
          'disabled': false,
          'defaultFormValue': 0,
          'min': 0,
          'max': 100,
          'step': 1
        }, {
          'name': 'switch0',
          'label': '开关',
          'type': 'switch',
          'span': 12,
          'iconCls': 'el-icon-edit',
          'defaultFormValue': false,
          'disabled': false,
          'activeText': '',
          'inactiveText': ''
        }]
      }]
    },
    rules: {
      'text2': [{
        'required': true,
        'message': '此项不能为空',
        'trigger': 'blur'
      }],
      'counter0': [{
        'required': true,
        'message': '此项不能为空',
        'trigger': 'blur'
      }],
      'checkbox0': [{
        'required': true,
        'message': '此项不能为空',
        'trigger': 'blur'
      }],
      'date0': [{
        'required': true,
        'message': '此项不能为空',
        'trigger': 'blur'
      }],
      'upload1': [{
        'required': true,
        'message': '此项不能为空',
        'trigger': 'blur'
      }],
      'date1': [{
        'required': true,
        'message': '此项不能为空',
        'trigger': 'blur'
      }]
    }
  }
}
