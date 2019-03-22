<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<widget :widget="nestWidget" :page="page"></widget>
		</div>
	</decorator>
</template>

<script>
	export default {
		name: 'receipt-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				nestWidget: {
					id: this.$_.now(),
					name: 'appFactory/widgets/form-browser'
				}
			}
		},
		methods: {},
		computed: {
			rootPage() {
				return this.$store.getters.page
			}
		},
		created() {
			if(this.params) {
				if(this.params.formType === '0') {
					this.nestWidget.name = 'appFactory/widgets/form-browser'
				} else {
					this.nestWidget.name = 'appFactory/widgets/table-browser'
				}
				this.params.readonlyAll = true
				this.$store.dispatch('update_widget_params', {
					rootPage: this.rootPage,
					widgetId: this.nestWidget.id,
					params: this.params
				})
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
</style>