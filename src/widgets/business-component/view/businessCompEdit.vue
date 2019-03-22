<template>
	<el-form ref="form" :rules="rules" :model="form" label-width="100px">
		<el-form-item prop="name" label="部件名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item prop="category" label="部件分类">
      <el-input v-model="form.category" placeholder="分类格式如：分类/分类1"></el-input>
    </el-form-item>
		<el-form-item prop="desc" label="部件描述">
			<el-input v-model="form.desc" type="textarea" :rows="3"></el-input>
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
		  var categoryCheck = (rule, value, callback) => {
        if (value && !(/^\S+(\/\S+)*$/).test(value)) {
          return callback(new Error('请输入正确的格式！'))
        } else {
          callback()
        }
      }
			return {
				size: 'small',
				form: {
					id: '',
					name: '',
					desc: '',
					category: '',
					status: ''
				},
				rules: {
					name: [{
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
					category: [
					  {
              min: 0,
              max: 200,
              message: '长度在 0到 200个字符',
              trigger: 'blur'
            },
            {
              validator: categoryCheck, 
              trigger: 'blur'
            }
					],
					desc: [{
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
					status: [{
						required: true,
						message: '必填 ',
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			initForm() {
				this.form = {
					id: '',
					name: '',
					category: '',
					desc: '',
					status: ''
				};
			},
			getYwCompById(id) {
				let options = {
					data: {
						id: id
					}
				}
				this.$api_widget_getBusinessCompById(options).then(res => {
					this.form = res
				}).catch(err => {}).finally(() => {})
			}
		},
		created() {
			this.initForm();
			if(this.data) { // 修改模式
				this.form.id = this.data;
				this.getYwCompById(this.data);
			}
		}
	}
</script>

<style scoped>

</style>