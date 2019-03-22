<template>
	<div class="widget">
		<el-form ref="form" :model="form" label-width="140px">
			<el-form-item prop="sysFormFlag" label="系统类">
				<el-select v-model="form.sysFormFlag" placeholder="请选择系统类表格" @change="handleSysFormFlagChange">
					<el-option v-for="item in formFlagOptions" :key="item.formFlag" :label="item.formName" :value="item.formFlag">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="cusFormFlag" label="个人类">
				<el-select v-model="form.cusFormFlag" placeholder="请选择个人类表格" @change="handleCusFormFlagChange">
					<el-option v-for="item in formFlagOptions" :key="item.formFlag" :label="item.formName" :value="item.formFlag">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'demo-widget-config-a',
		title: '常用链接设置',
		props: ['data', 'form'],
		data() {
			return {
				formFlagOptions: []
			}
		},
		methods: {
			getFormFlagOptions() {
				this.$api_form_getAllFormTemp({
					data: {
						formType: '1'
					},
					fn: data => this.initWidgetTable(data)
				})
			},
			initWidgetTable: function(data) {
				this.formFlagOptions = data
			},
			handleSysFormFlagChange(val) {
				this.form.sysFormFlag = val
			},
			handleCusFormFlagChange(val) {
				this.form.cusFormFlag = val
			}
		},
		mounted() {
			this.getFormFlagOptions()
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
</style>