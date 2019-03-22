<template>
	<div class="broser-layout">
		<el-row v-for="(row, rindex) in config.rows" :key="`row-${rindex}`" align="middle">
			<el-col v-for="(col, cindex) in row.columns" v-if="filter(col)" :span="col.span" :key="`col-${rindex}-${cindex}`">
				<component 
					:is="`el-${col.type}`" 
					:config="filterAttr(col)" 
					:model="model"
					:widget="widget">
				</component>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import _ from 'underscore'
	import Panel from '../components/Panel.vue'
	import Input from '../components/Input.vue'
	import InputNumber from '../components/InputNumber.vue'
	import Select from '../components/Select.vue'
	import Radio from '../components/Radio.vue'
	import Checkbox from '../components/Checkbox.vue'
	import DatePicker from '../components/DatePicker.vue'
	import DatePickerRange from '../components/DatePickerRange.vue'
	import TimePicker from '../components/TimePicker.vue'
	import Slider from '../components/Slider.vue'
	import Switch from '../components/Switch.vue'
	import Upload from '../components/Upload.vue'
	import UploadHead from '../components/UploadHead.vue'
	import Email from '../components/Email.vue'
	import Editor from '../components/Editor.vue'
	import Explain from '../components/Explain.vue'
	import Button from '../components/Button.vue'
	import Attribute from '../components/Attribute.vue'
	import List from '../components/List.vue'
	import Video from '../components/Video.vue'

	export default {
		props: ['widget','config', 'model', 'params', 'permission', 'context'],
		components: {
			'el-panel': Panel,
			'el-input': Input,
			'el-input-number': InputNumber,
			'el-select': Select,
			'el-radio': Radio,
			'el-checkbox': Checkbox,
			'el-date-picker': DatePicker,
			'el-time-picker': TimePicker,
			'el-slider': Slider,
			'el-switch': Switch,
			'el-upload': Upload,
			'el-upload-head': UploadHead,
			'el-email': Email,
			'el-editor': Editor,
			'el-explain': Explain,
			'el-date-picker-range': DatePickerRange,
			'el-button': Button,
			'el-attribute': Attribute,
			'el-list': List,
			'el-video': Video
		},
		data() {
			return {}
		},
		created() {
			this.model.config = this.config
		},
		methods: {
			filter(col) {
				if(this.params && this.params.viewMode && col.type === 'button') {
					return false
				} else {
					// 按钮权限过滤
					if(col.type === 'button') {
						if(this.permission[col.name]) {
							if(this.context && this.context.readonlyAll) {
								return false
							} else {
								return true
							}
						} else {
							return false
						}
					} else {
						if(this.context && this.context.dataAuthObj && this.context.dataAuthObj.hasOwnProperty(col.name)) {
							let dataControl = this.context.dataAuthObj[col.name]
							if(dataControl.hidden) {
								return false
							} else {
								return true
							}
						}else{
							return true
						}
					}
				}
			},
			filterAttr(col) { // 控制栏位数据显示权限
				if(this.context && this.context.readonlyAll) {
					col.readonly = true
				} else {
					if(this.context && this.context.dataAuthObj && this.context.dataAuthObj.hasOwnProperty(col.name)) {
						let dataControl = this.context.dataAuthObj[col.name]
						if(dataControl.readonly) {
							col.readonly = true
						} else {
							col.readonly = false
						}
						if(dataControl.disabled) {
							col.disabled = true
						} else {
							col.disabled = false
						}
					}
				}
				return col
			}
		}
	}
</script>

<style scoped>
	.form-column {
		width: 100%;
		border: 1px solid red;
	}
	
	.cell {
		display: flex;
	}
	
	.cellMain {
		flex: 1;
	}
	
	.broser-layout {
		min-height: 58px;
	}
</style>