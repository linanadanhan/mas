<template>
	<div>
		<widget :widget="nestWidget" :page="page"></widget>
	</div>
</template>

<script>
	import _ from 'underscore'
	import Widgets from 'widgets'
	import {object} from 'utils'
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data', 'dialog'],
		data() {
			return {
				nestWidget: {
      				id: this.$_.now(),
					name: 'workflow/widgets/flowdo'
				},
				params: {
					decorator: 'none',
					procParams: this.data
				},
				page: {}
			}
		},
		methods: {
		},
		created() {
			this.data.src = '1'
			console.info(this.data)
			this.$store.dispatch('update_widget_params', {rootPage: this.rootPage, widgetId: this.nestWidget.id, params: this.params})
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