<template>
	<div>
		<component v-bind:is="widgetComponent" :fm="data.fm" :widget="data.widget" :params="data.params" :page="data.page" :i="data.i" :j="data.j"></component>
	</div>
</template>

<script>
	import _ from 'underscore'
	import Widgets from 'widgets'
	
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data'],
		data() {
			return {
				widgetComponent: '',
			}
		},
		methods: {
		},
		created() {
			// this.data.params.decorator = 'none' // 加载表单设计器时强制给无边框修饰器
			this.data.params.widgetHeight = ''
			this.widgetComponent = Widgets['table-designer'].widget
		}
	}
</script>

<style scoped>
</style>