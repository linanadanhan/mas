<template>
  <div class="port">
    <template v-for="(row, rindex) in config.rows">
      <el-row class="row" :key="`row-${rindex}`" align="middle">
        <el-col v-for="(col, cindex) in row.columns" :span="col.span" :key="`col-${rindex}-${cindex}`" class="cell">
          <col-dropzone v-if="cindex === 0" :cols="row.columns" :index="0" :context="context" :model="model"></col-dropzone>
            <component 
              :widget="widget"
              :is="`form-${col.type}`" 
              :config="col" :model="model" 
              :context="context" 
              :rules="rules" 
              :rindex="rindex" 
              :cindex="cindex" 
              :rows="config.rows" 
              class="cellMain">
            </component>
          <col-dropzone :cols="row.columns" :index="cindex + 1" :context="context" :model="model"></col-dropzone>
        </el-col>
      </el-row>
      <row-dropzone :rows="config.rows" :index="rindex + 1" :key="`zone-${rindex}`" :context="context" :model="model"></row-dropzone>
    </template>
  </div>
</template>
<script>
	import _ from 'underscore'		
  import RowDropzone from './RowDropzone.vue'
  import ColDropzone from './ColDropzone.vue'
  import Panel from '../items/Panel.vue'
  import Input from '../items/Input.vue'
  import InputNumber from '../items/InputNumber.vue'
  import Select from '../items/Select.vue'
  import Radio from '../items/Radio.vue'
  import Checkbox from '../items/Checkbox.vue'
  import DatePicker from '../items/DatePicker.vue'
  import DatePickerRange from '../items/DatePickerRange.vue'
  import TimePicker from '../items/TimePicker.vue'
  import Slider from '../items/Slider.vue'
  import Switch from '../items/Switch.vue'
  import Upload from '../items/Upload.vue'
  import UploadHead from '../items/UploadHead.vue'
  import Email from '../items/Email.vue'
  import Editor from '../items/Editor.vue'
  import Explain from '../items/Explain.vue'
  import Button from '../items/Button.vue'
  import Attribute from '../items/Attribute.vue'
  import List from '../items/List.vue'
  import Video from '../items/Video.vue'
  export default {
//  name: 'form-layout',
    props: ['page', 'params', 'widget','config', 'model', 'context', 'formPosition', 'configAll','rules'],
    components: {
      'col-dropzone': ColDropzone,
      'row-dropzone': RowDropzone,
      'form-panel': Panel,
      'form-input': Input,
      'form-input-number': InputNumber,
      'form-select':Select,
      'form-radio':Radio,
      'form-checkbox':Checkbox,
      'form-date-picker':DatePicker,
      'form-time-picker':TimePicker,
      'form-slider':Slider,
      'form-switch':Switch,
      'form-upload':Upload ,
      'form-upload-head':UploadHead ,
      'form-email':Email ,
      'form-explain':Explain ,
      'form-date-picker-range':DatePickerRange,
      'form-button':Button ,
      'form-editor':Editor,
      'form-attribute':Attribute,
      'form-list':List,
      'form-video':Video
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
     
    }
  }
</script>

<style scoped>
.form-column {
  width: 100%;
  border: 1px solid red;
}
.port {
  min-height: 50px;
}
.port >>>.port{
  padding-right:20px;
}

.cell{display: flex;}
.cellMain{flex: 1;}

</style>