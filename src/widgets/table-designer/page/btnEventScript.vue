<template>
	<el-form ref="form" :model="form" label-width="10px">
		<el-form-item prop="content" label="">
			<el-input type="textarea" :rows="5" v-model="form.content"></el-input>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data'],
		data() {
			return {
				operatorIds: [],
				form: {
					content: ''
				}
			}
		},
		methods: {
			loadData() {
				
			},
			saveData() {
				
			}
		},
		created() {
		}
	}
</script>

<style scoped>
</style>