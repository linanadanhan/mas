<template>
	<el-form ref="form" :rules="rules" :model="form" label-width="70px">
		<el-form-item label="中文表名" prop="C_TEXT">
			<el-input v-model="form.C_TEXT" clearable></el-input>
		</el-form-item>
		<!--<el-form-item label="类型" prop="C_TYPE">
			<el-select v-model="form.C_TYPE" placeholder="请选择类型">
				<el-option v-for="item in typeOptions" :key="String(item.value)" :label="item.label" :value="String(item.value)">
				</el-option>
			</el-select>
		</el-form-item>-->
	</el-form>
</template>
<script>
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['page', 'params', 'widget','data'],
		data() {
			return {
				typeOptions: [],
				form: {
					C_TEXT: '',
					C_TYPE: '00'
				},
				rules: {
		          C_TEXT: [
		            {min: 1, max: 50, message: '长度在 1到 50个字符', trigger: 'change'}
		          ]
		        },
			}
		},
		methods: {
			getTypeOptions() {
			  let options = {
	            data: {dicKey: 'table_type'}
	          }
	          this.$api_form_getDicItemByKey(options).then((data)=>{
	            if (data) {
	            	this.typeOptions = JSON.parse(JSON.stringify(data).toLowerCase())
	            }
	          })				
			},
			loadData() {
				//获取类型下拉选单值
				this.getTypeOptions();				
			},
			saveData() {
				this.$refs.form.validate((valid) => {
					if(valid) {
						this.$emit('closeAndFresh',this.form);
					}
				});
			}
		},
		created() {
		}
	}
</script>

<style scoped>
</style>