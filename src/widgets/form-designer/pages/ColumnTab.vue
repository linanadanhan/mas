<template>
	<div>
		<div class="tabsetting" v-if="context.columnTab ? true : false">
			<el-collapse v-model="actives">
				<el-collapse-item name="1" title="基本设置" v-if="!context.column.noFormItem">
					<el-form ref="form" :model="context.column" :rules="formRules" label-width="70px" size="mini">
						<el-form-item label="标签名">
							<el-input v-model="context.column.label" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="字段名" prop="name">
							<el-select allow-create filterable v-model="context.column.name" placeholder="请选择属性名" size="mini" @change="handleChangeAttrName">
								<el-option v-for="item in context.feildList" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
							<!--<el-input :value="context.column.name" size="mini" @change="handleChangeAttrName"></el-input>-->
						</el-form-item>
						<el-form-item label="列宽" class="col-span-width">
							<el-input-number v-model="context.column.span" @change="handleChangeColSpan" :min="1" :max="24" size="mini"></el-input-number>
						</el-form-item>
					</el-form>
				</el-collapse-item>
				<component :is="context.columnTab" :context="context" :model="model" :config="config" :rules="rules"></component>
			</el-collapse>
		</div>
		<div class="colunm-text-message" v-else>没有选中项！</div>
	</div>
</template>

<script>
	import SetInput from '../columnTab/SetInput.vue'
	import SetRadio from '../columnTab/SetRadio.vue'
	import SetSelect from '../columnTab/SetSelect.vue'
	import SetCheckbox from '../columnTab/SetCheckbox.vue'
	import SetInputNumber from '../columnTab/SetInputNumber.vue'
	import SetSwitch from '../columnTab/SetSwitch.vue'
	import SetDatePicker from '../columnTab/SetDatePicker.vue'
	import SetDatePickerRange from '../columnTab/SetDatePickerRange.vue'
	import SetTimePicker from '../columnTab/SetTimePicker.vue'
	import SetSlider from '../columnTab/SetSlider.vue'
	import SetUpload from '../columnTab/SetUpload.vue'
	import SetUploadHead from '../columnTab/SetUploadHead.vue'
	import SetExplain from '../columnTab/SetExplain.vue'
	import SetPanel from '../columnTab/SetPanel.vue'
	import SetEmail from '../columnTab/SetEmail.vue'
	import SetEditor from '../columnTab/SetEditor.vue'
	import SetButton from '../columnTab/SetButton.vue'
	import SetAttribute from '../columnTab/SetAttribute.vue'
	import SetList from '../columnTab/SetList.vue'
	import SetVideo from '../columnTab/SetVideo.vue'
	export default {
		components: {
			'set-input': SetInput,
			'set-select': SetSelect,
			'set-radio': SetRadio,
			'set-checkbox': SetCheckbox,
			'set-input-number': SetInputNumber,
			'set-switch': SetSwitch,
			'set-date-picker': SetDatePicker,
			'set-date-picker-range': SetDatePickerRange,
			'set-time-picker': SetTimePicker,
			'set-slider': SetSlider,
			'set-upload': SetUpload,
			'set-upload-head': SetUploadHead,
			'set-explain': SetExplain,
			'set-panel': SetPanel,
			'set-email': SetEmail,
			'set-editor': SetEditor,
			'set-button': SetButton,
			'set-attribute': SetAttribute,
			'set-list': SetList,
			'set-video': SetVideo
		},
		props: ['page', 'params', 'widget','context', 'model', 'config', 'rules'],
		data() {
			var validateAttrName = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('属性不能为空'));
				}
				if(this.checkAttrName(value)) {
					return callback(new Error('属性名已存在'));
				}
			}
			return {
				actives: ['1', '2', '3'],
				oldAttrName: '',
				attrName: '',
				formRules: {
					name: [{
						validator: validateAttrName,
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			handleChangeColSpan(val) {
				console.log(val)
			},
			checkRepeatAttrName(name) {
				return name in this.model
			},
			checkAttrNameExsitInTable(name) {// 校验输入的属性名是否为表字段
				if (this.config.dataSource) {
					if (this.context.feildList) {
						let obj = this.context.feildList.find((item)=> {
					        return item == name
					    })
						if (obj) {
							return true
						}else {
							return false
						}
					}else {
						return false
					}
				}else{
					return true
				}
			},
			handleChangeAttrName(val) {
				val = val.toUpperCase()
				//属性名正则不能以数字开头或包含中文以及特殊字符
				let res = /^[a-zA-Z][a-zA-Z0-9]*$/
				if(this.context.attrFlag) {
					this.attrName = this.context.attrName
				} else {
					this.attrName = this.oldAttrName
				}
				if(val == '' || val == null) {
					this.$notify.error({
						title: '提示',
						message: '属性名不能为空',
						position: 'top-left',
						showClose: true,
						duration: 3000
					});
					this.context.column.name = this.attrName
					return
				} else if(this.checkRepeatAttrName(val)) {
					this.$notify.error({
						title: '提示',
						message: '属性名已存在',
						position: 'top-left',
						showClose: true,
						duration: 3000
					});
					this.context.column.name = this.attrName
					return
				}else if (!this.checkAttrNameExsitInTable(val)){
					this.$notify.error({
						title: '提示',
						message: '属性名不存在于数据源中',
						position: 'top-left',
						showClose: true,
						duration: 3000
					});
					this.context.column.name = this.attrName
					return					
				}
				this.context.attrFlag = false
				this.context.column.name = val
				this.$set(this.model, val, this.model[this.attrName])
				this.$set(this.context.column, 'name', val)
				delete this.model[this.attrName]
				this.$set(this.rules, val, this.rules[this.context.attrName])
				delete this.rules[this.context.attrName]
				this.oldAttrName = val
			},
			checkAttrName(name) {}
		},
		created() {}
	}
</script>

<style scoped>
	.tabsetting {
		padding: 0;
		box-sizing: border-box;
	}
	
	.el-collapse {
		border-bottom: 0;
		border-top: 0;
	}
	
	>>>.el-collapse-item__wrap {
		border-bottom: 0;
	}
	
	>>>.el-collapse-item__header {
		border-bottom: 0;
	}
	
	.el-form-item {
		margin-bottom: 12px;
	}
	
	>>>.el-form-item__content {
		position: relative
	}
	
	.attr-name-tip {
		position: absolute;
		left: 0;
		top: 22px;
		color: red;
		font-size: 12px;
	}
	
	.col-span-width .el-input-number {
		width: 100%;
	}
	
	.colunm-text-message {
		text-indent: 75px;
		line-height: 100px
	}
	>>>.el-form-item__label,>>>.el-radio__label,>>>.el-checkbox__label{ font-size: 12px}
</style>