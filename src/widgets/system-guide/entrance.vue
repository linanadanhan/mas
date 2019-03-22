<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<el-button @click="showGuide">系统引导</el-button>
	</decorator>
</template>

<script>
	export default {
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				
			}
		},
		methods: {
			showGuide() {
				let body = require('./SystemGuide.vue')
				let title = '系统引导'
				let dlg = this
				let options = {
					title: title,
					width: '700px',
					body: body.default,
					data: {
						
					},
					'before-close': function(done){
						done()
					},
					buttons: [{
							text: '关闭',
							handle: function(options, dlg) {
								options.visible = false
							}
						}, {
							type: 'primary',
							text: '不再显示',
							handle: function(options, dlg) {
								options.visible = false
							}
						}]
				}
				this.$dialog(options)
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
	
</style>