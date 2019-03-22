<template>
	<el-form ref="form" :rules="rules" :model="form" label-width="100px">
		<el-form-item prop="C_SERVER" label="服务">
			<el-input v-model="form.C_SERVER" :readonly="form.C_ID !=''"></el-input>
		</el-form-item>
		<el-form-item prop="C_PATH" label="请求URL">
			<el-input v-model="form.C_PATH"></el-input>
		</el-form-item>
		<el-form-item prop="C_DETAILS" label="说明">
			<el-input type="textarea" v-model="form.C_DETAILS"></el-input>
		</el-form-item>
		<el-form-item prop="C_ALLOW" label="允许公开访问">
			<el-select v-model="form.C_ALLOW" filterable placeholder="请选择">
				<el-option label="是" v-bind:value='true'></el-option>
				<el-option label="否" v-bind:value='false'></el-option>
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
			// 校验mapping标识唯一性
			var validatePath = (rule, value, callback) => {
				if(value) {
					if(!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
						callback(new Error('不能输入中文！'));
					}
					let options = {
						data: {id: this.form.C_ID, path: value, server: this.form.C_SERVER}
					}
					this.$api_widget_isUniqueMapping(options).then(res => {
						if (res) {
							callback(new Error('请求URL已存在！'));
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
				form: {
					C_ID: '',
					C_PATH: '',
					C_SERVER: '',
					C_DETAILS: '',
					C_ALLOW: false
				},
				rules: {
					C_PATH: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 255,
							message: '长度在 1到 255个字符',
							trigger: 'blur'
						},
						{
							validator: validatePath, 
							trigger: 'blur'
						}
					],
					C_SERVER: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
					  {
              min: 1,
              max: 255,
              message: '长度在 1到 255个字符',
              trigger: 'blur'
						}
					]
				},
			}
		},
		methods: {
			initForm() {
				this.form = {
					C_ID: '',
					C_PATH: '',
					C_SERVER: '',
					C_DETAILS: '',
					C_ALLOW: false
				};
			},
			getMappingById(id) {
				let options = {
					data: {
						id: id
					}
				}
				this.$api_widget_getMappingById(options).then(res => {
					this.form = res
				}).catch(err => {}).finally(() => {})
			}
		},
		created() {
			this.initForm();
			if(this.data) { // 修改模式
				this.form.C_ID = this.data;
				this.getMappingById(this.data);
			}
		}
	}
</script>

<style scoped>

</style>