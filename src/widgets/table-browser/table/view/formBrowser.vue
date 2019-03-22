<template>
	<div>
		<component v-bind:is="widgetComponent" :widget="widget" :params="params" :page="page" :i="i" :j="j"></component>
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
				i: 0,
				j: 0,
				widget: {
					id: this.$_.now(),
					name: 'form-widget',
					hidden: true
				},
				params: {
					decorator: 'none',
					formFlag: '',
					primaryKey: '',
					widgetHeight: ''
				},
				page: {}
			}
		},
		methods: {
		},
		created() {
			this.page = object.deepcopy(this.data.page)
			this.params.formFlag = this.data.formFlag
			if (this.data.id) {
				this.params.primaryKey = this.data.id
			}else {
				this.params.primaryKey = null
			}
			if (this.data.viewMode){
				this.params.viewMode = this.data.viewMode
			}
			this.$store.dispatch('update_widget_params', {rootPage: this.rootPage, widgetId: this.widget.id, params: object.deepcopy(this.params)})
			this.widgetComponent = Widgets['form-browser'].widget
		},
	    computed: {
	   	  rootPage () {
	        return this.$store.getters.page
	      }
	    }
	}
</script>

<style scoped>
</style>