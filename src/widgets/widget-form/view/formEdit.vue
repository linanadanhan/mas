<template>
	<el-form ref="form" :rules="rules" :model="form" label-width="100px">
		<el-form-item prop="formFlag" label="模版标识">
			<el-input v-model="form.formFlag"></el-input>
		</el-form-item>
		<el-form-item prop="formName" label="模版名称">
			<el-input v-model="form.formName"></el-input>
		</el-form-item>
		<el-form-item prop="ywType" label="业务类型">
			<el-select v-model="form.formYwType" placeholder="请选择业务类型">
				<el-option v-for="item in formYwOptions" :key="item.VALUE" :label="item.LABEL" :value="item.VALUE">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item prop="formType" label="模版类型">
		  <el-select v-model="form.formType" filterable placeholder="请选择模版类型">
			<el-option label="表单" value="0"></el-option>
			<el-option label="表格" value="1"></el-option>
			<el-option label="树" value="2"></el-option>
		  </el-select>
		</el-form-item>
		<el-form-item prop="status" label="状态">
		  <el-select v-model="form.status" filterable placeholder="请选择状态">
		  	<el-option label="启用" value="1"></el-option>
			<el-option label="停用" value="0"></el-option>
		  </el-select>
		</el-form-item>
	</el-form>
</template>
<script>
	import _ from 'underscore'
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data'],
		data() {
            // 校验表单标识唯一性
			var validateFormFlag = (rule, value, callback) => {
				if(value) {
					if(!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
						callback(new Error('不能输入中文！'));
					}
					let options = {
						data: {id: this.form.id, formFlag: value}
					}
					this.$api_form_isExitFormFlag(options).then(res => {
						if (res) {
							callback(new Error('表单标识已存在！'));
						} else {
							callback();
						}
					}).catch(err => {
					}).finally(() => {
					})
				} else {
					callback();
				}
			}			
			return {
				size: 'small',
				operatorIds: [],
				formYwOptions: [],
				form: {
					id: '',
					formFlag: '',
					formName: '',
					formType: '',
					formYwType: '',
					status: ''
				},
				rules: {
		          formFlag: [
		            {required: true, message: '必填 ', trigger: 'change'},
		            {min: 1, max: 50, message: '长度在 1到 50个字符', trigger: 'change'},
		            {validator: validateFormFlag, trigger: 'blur'}
		          ],
		          formName: [
		            {required: true, message: '必填 ', trigger: 'blur'},
		            {min: 1, max: 1000, message: '长度在 1到 200个字符', trigger: 'change'}
		          ],
		          formType: [
		          	{required: true, message: '必填 ', trigger: 'blur'}
		          ],
		          status: [
		          	{required: true, message: '必填 ', trigger: 'blur'}
		          ]
		        },
			}
		},
		methods: {
			initForm(){
				this.form = {
					id: '',
					formFlag: '',
					formName: '',
					formType: '',
					formYwType: '',
					status: ''
				};
			},
			getFormTempById(id) {
				let options = {
					data: {id: id}
				}
				this.$api_form_getFormTempById(options).then(res => {
					this.form = res
				}).catch(err => {
				}).finally(() => {
				})				
			},
			getFormYwOptions() {
				let options = {
					data: {
						dicKey: 'form_yw_type'
					}
				}
				this.$api_form_getDicItemByKey(options).then((data) => {
					if(data) {
						 this.formYwOptions = data
					}
				})
			}
		},
		created() {
			this.getFormYwOptions();
			this.initForm();
			if (this.data) {// 修改模式
				this.form.id = this.data;
				this.getFormTempById(this.data);
			}
		}
	}
</script>

<style scoped>
</style>