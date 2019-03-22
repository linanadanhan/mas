<template>
	<el-form ref="form" :rules="rules" :model="form" label-width="130px">
		<el-form-item prop="name" label="客户名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item prop="code" label="客户标识">
			<el-input :readonly="form.id !=''" v-model="form.code"></el-input>
		</el-form-item>
		<el-form-item prop="domain" label="域名">
			<el-input v-model="form.domain"></el-input>
		</el-form-item>
		<el-form-item prop="onlineUser" label="在线用户数">
			<el-input v-model="form.onlineUser"></el-input>
		</el-form-item>
		<el-form-item prop="dbType" label="数据库类型">
			<el-select v-model="form.dbType" filterable placeholder="请选择数据库类型">
				<el-option label="Oracle" value="Oracle"></el-option>
				<el-option label="Mysql" value="Mysql"></el-option>
			</el-select>
    </el-form-item>
		<el-form-item prop="dsUrl" label="数据库地址">
			<el-input v-model="form.dsUrl" :placeholder="form.dbType == 'Mysql' ? 'jdbc:mysql://[ip]:[port]/[database]?useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull' : 'jdbc:oracle:thin:@[ip]:[port]:[sid]'"></el-input>
		</el-form-item>
		<el-form-item prop="dbDialect" label="数据库schema">
			<el-input v-model="form.dbDialect"></el-input>
		</el-form-item>
		<el-form-item prop="dsUserName" label="数据库用户名">
			<el-input v-model="form.dsUserName"></el-input>
		</el-form-item>
		<el-form-item prop="dsPassword" label="数据库密码">
			<el-input type="password" v-model="form.dsPassword"></el-input>
		</el-form-item>
		<el-form-item prop="dsMaxActive" label="数据库最大连接数">
			<el-input v-model="form.dsMaxActive"></el-input>
		</el-form-item>
		<el-form-item prop="dsMinIdle" label="连接数初始数量">
			<el-input v-model="form.dsMinIdle"></el-input>
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
			// 校验租户标识唯一性
			var validateCode = (rule, value, callback) => {
				if(value) {
					if(!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
						callback(new Error('不能输入中文！'));
					}
					let options = {
						data: {id: this.form.id, code: value}
					}
					this.$api_user_isUniqueCustomerCode(options).then(res => {
						if (res) {
							callback(new Error('租户标识已存在！'));
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

			// 校验域名唯一性
			var validateDomain = (rule, value, callback) => {
				if(value) {
					if(!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
						callback(new Error('不能输入中文！'));
					}
					let options = {
						data: {id: this.form.id, domain: value}
					}
					this.$api_user_isUniqueDomain(options).then(res => {
						if (res) {
							callback(new Error('域名已存在！'));
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
					id: '',
					name: '',
					code: '',
					onlineUser: '5',
					dbType: 'Mysql',
					dsUrl: '',
					dbDialect: '',
					dsUserName: '',
					dsPassword: '',
					dsMaxActive: '5',
					dsMinIdle: '1',
					domain:''
				},
				rules: {
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
					code: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
					  {
              min: 1,
              max: 20,
              message: '长度在 1到 20个字符',
              trigger: 'blur'
						},
						{
							validator: validateCode, 
							trigger: 'blur'
						}
					],
					dsUrl: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 200,
							message: '长度在 1到 200个字符',
							trigger: 'blur'
						}
					],
					dbDialect: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '长度在 1到 50个字符',
							trigger: 'blur'
						}
					],
					dsUserName: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1到 30个字符',
							trigger: 'blur'
						}
					],
					dsPassword: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1到 50个字符',
							trigger: 'blur'
						}
					],
					domain: [
						{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
					  {
              min: 1,
              max: 100,
              message: '长度在 1到 100个字符',
              trigger: 'blur'
						},
						{
							validator: validateDomain, 
							trigger: 'blur'
						}
					]
				},
			}
		},
		methods: {
			initForm() {
				this.form = {
					id: '',
					name: '',
					code: '',
					onlineUser: '5',
					dbType: 'Mysql',
					dsUrl: '',
					dbDialect: '',
					dsUserName: '',
					dsPassword: '',
					dsMaxActive: '5',
					dsMinIdle: '1'
				};
			},
			getCustomerById(id) {
				let options = {
					data: {
						id: id
					}
				}
				this.$api_user_getCustomerById(options).then(res => {
					this.form = res
				}).catch(err => {}).finally(() => {})
			}
		},
		created() {
			this.initForm();
			if(this.data) { // 修改模式
				this.form.id = this.data;
				this.getCustomerById(this.data);
			}
		}
	}
</script>

<style scoped>

</style>