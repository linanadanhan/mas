<template>
  <div>
    <component v-bind:is="widgetComponent" :widget="data.widget" :params="data.params" :page="data.page" :i="data.i" :j="data.j"></component>
  </div>
</template>
<script>
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
			this.data.params.decorator = 'none' // 加载表单设计器时强制给无边框修饰器
			this.widgetComponent = Widgets['form-browser'].widget
		}
	}
</script>

<style scoped>
</style>