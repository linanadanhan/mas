<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<iframe ref="iframe" :height="params.widgetHeight ? (params.widgetHeight> 30 ? params.widgetHeight-30 : 100) : 100" :src="linkSrc" frameborder="0" framespacing="0" width="100%">
			</iframe>
		</div>
	</decorator>
</template>

<script>
	export default {
		name: 'iframe-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				linkSrc: ''
			}
		},
		created() {
			if (this.params.iframeUrl){
				this.linkSrc = this.params.iframeUrl
			}
		},
		watch: {
		},
		computed: {
		},
		methods: {
		},
		mounted() {
			
		}
	}
</script>

<style scoped="scoped">
	.widget {
		min-height: 50px;
	}
</style>