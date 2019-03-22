<template>
	<div>
		<component v-bind:is="widgetComponent" :fm="data.fm" :widget="data.widget" :params="data.params" :page="data.page" :i="data.i" :j="data.j"></component>
	</div>
</template>

<script>
	import _ from 'underscore'
	import Widgets from 'widgets'
	import {object} from 'utils'
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
		computed: {
	   	  rootPage () {
	        return this.$store.getters.page
	      }
	    },
		created() {
			// this.data.params.decorator = 'none' // 加载表单设计器时强制给无边框修饰器
			this.$store.dispatch('update_widget_params', {rootPage: this.rootPage, widgetId: this.data.widget.id, params: object.deepcopy(this.data.params)})
			this.widgetComponent = Widgets['form-designer'].widget
		}
	}
</script>

<style scoped>
</style>