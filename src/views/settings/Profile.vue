<template>
	<el-form ref="form" :model="form" :rules="rules" label-width="80px">
		<el-form-item label="Widget">
			{{data.widget.name}}
		</el-form-item>
		<el-form-item prop="decorator" label="修饰器">
			<el-select v-model="form.decorator" placeholder="请选择修饰器">
				<el-option v-for="item in decoratorOptions" :key="item.code" :label="item.name" :value="item.code">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item prop="widgetHeight" label="高度">
			<el-input v-model="form.widgetHeight" placeholder="请输入widget高度"></el-input>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data', 'form'],
		profiles: {
			decorator: 'default',
			widgetHeight: ''
		},
		data() {
			var validateNumber = (rule, value, callback) => {
				if(value && !/^\d*$/.test(value)) {
					callback(new Error('必须是数字！'));
				} else {
					callback();
				}
			};
			return {
				decoratorOptions: [],
				rules: {
					title: [{
						min: 1,
						max: 20,
						message: '长度在 1 到 20 个字符',
						trigger: 'blur'
					}],
					widgetHeight: [{
						validator: validateNumber,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			getDecoratorOptions() { // 获取所有平台修饰器数据
				this.$api_site_getAllDecorateList().then((data) => {
					if(data) {
						this.decoratorOptions = data
					}
				})
			}
		},
		created() {
			this.getDecoratorOptions()
		}
	}
</script>

<style scoped>

</style>