<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="100px">
		<el-form-item prop="code" label="应用标识">
			<el-input v-model="form.code"></el-input>
		</el-form-item>
		<el-form-item prop="name" label="应用名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    name: 'basic',
    title: '基本信息',
    props: ['data'],
    data() {
			// 校验app标识唯一性
			var validateCode = (rule, value, callback) => {
				if(value) {
					if(!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
						callback(new Error('不能输入中文！'));
					}
					let options = {
						data: {id: this.form.id, code: value}
					}
					this.$api_widget_isUniquAppCode(options).then(res => {
						if (res) {
							callback(new Error('应用标识已存在！'));
						} else{
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
					code: '',
					name: '',
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
					]
				}
      }
    },
    methods: {
      initForm() {
        this.form = {
					id: '',
					code: '',
					name: '',
					desc: '',
					status: '1'
        };
      }
    },
    created() {
      this.initForm();
    }
  }
</script>

<style scoped>
</style>
