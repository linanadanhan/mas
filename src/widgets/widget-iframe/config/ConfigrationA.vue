<template>
	<div class="widget">
		<el-form ref="form" :model="form" label-width="140px">
			<el-form-item prop="iframeUrl" label="iframe地址">
				<el-input v-model="form.iframeUrl" placeholder="请输入iframe地址"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'iframe-widget-config-a',
		title: 'iframe设置',
		props: ['data', 'form'],
		data() {
			return {
			}
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
</style>