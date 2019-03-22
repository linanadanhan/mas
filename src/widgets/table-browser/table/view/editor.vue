<template>
	 <div class="widget" v-html="fileContent"></div>
</template>

<script>
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data'],
		data() {
			return {
				fileContent: '',
			}
		},
		methods: {
		},
		created() {
			console.info(this.data.fileContent)
			this.fileContent = this.data.fileContent
		}
	}
</script>

<style scoped>
</style>