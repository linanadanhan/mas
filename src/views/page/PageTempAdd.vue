<template>
	<div>
		<el-form :model="form" ref="form" :rules="rules" label-width="80px">
			<el-form-item prop="code" label="模版标识">
				<el-input v-model="form.code"></el-input>
			</el-form-item>
			<el-form-item prop="name" label="模版名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item prop="desc" label="模版描述">
				<el-input v-model="form.desc" type="textarea" :rows="3"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'page-temp-add',
	props: ['data'],
	data () {
		//模版标识唯一性校验
		var validateCode = (rule, value, callback) => {
			if (value) {
				if (!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
					callback(new Error('不能输入中文！'));
				}
				let options = {
					data: { id: this.form.id, code: value }
				}
				this.$api_widget_isUniquPageTempCode(options).then(res => {
					if (res) {
						callback(new Error('模版标识已存在！'));
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
			form: {
				id: '',
				code: '',
				name: '',
				layoutCode: 'default',
				desc: '',
				status: '1'
			},
			rules: {
				code: [
					{
						required: true,
						message: '必填 ',
						trigger: 'blur'
					},
					{
						min: 1,
						max: 50,
						message: '长度在 1到 50个字符',
						trigger: 'blur'
					},
					{
						validator: validateCode,
						trigger: 'blur'
					}
				],
				name: [{
					required: true,
					message: '必填 ',
					trigger: 'blur'
				},
				{
					min: 1,
					max: 100,
					message: '长度在 1到 100个字符',
					trigger: 'blur'
				}
				],
				desc: [
					{
						min: 1,
						max: 200,
						message: '长度在 1到 200个字符',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		initForm () { //  初始化表单
			this.form = {
				id: '',
				code: '',
				name: '',
				desc: ''
			}
		}
	},
	mounted () {
		this.initForm();
	},
	created () {
	}
}
</script>

<style>
</style>