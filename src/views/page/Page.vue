<template>
	<theme></theme>
</template>

<script>
  import _ from 'underscore'
  import logo from '../../assets/logo-sm.png'
  import {gbs} from 'config'
	export default {
		name: 'page',
		data() {
			return {
				path: this.$route.path,
				query: this.$route.query
			}
		},
		computed: {
			widgets() {
				let page = this.$store.getters.page
				if(page) {
					return page.widgets
				}
			},
			dragWidget() {
				return this.$store.getters.dragWidget
			},
			editMode() {
				return this.$store.getters.editMode
			},
			diyMode() {
				return this.$store.getters.diyMode
			},
			page(){
				return this.$store.getters.page
			},
			createdWidgets() {
				return this.$store.getters.createdWidgets
			},
			delWidgets() {
				return this.$store.getters.delWidgets
			}
		},
		methods: {
			initPageInfo: function(data) {
				document.title = data.title
				data.path = this.path || ""
				this.$store.dispatch('update_page', data)
				this.$store.dispatch('update_widget_original')
			},
			initFavicon() {// 初始化浏览器favicon图标
				let site = this.$store.getters.site
        if (site && site.logo) {
          document.querySelector("link[rel*='icon']").href = gbs.fileServiceUrl + '/file/download/' + site.logo
        }
			}
		},
		watch: {
			widgets: {
				handler: function(newVal, oldVal) {
					if(this.editMode) {
						console.log('page saved', this.diyMode)
						console.info(this.path)
						console.info(_.keys(this.delWidgets).join(','))
						this.$nextTick(() => {
							//保存页面信息 sn
							this.$api_site_savePage({
							data: {
									pageUuId: this.page.pageUuId,
									widgets: JSON.stringify(newVal),
									diyMode: this.diyMode,
									widgetIds: _.keys(this.createdWidgets).join(','),
									delWidgetIds: _.keys(this.delWidgets).join(',')
								}
							})
						})
					}
				},
				deep: true
			}
		},
		created() {
		  // 初始化浏览器favicon图标
		  this.initFavicon()
			let edit = this.query.hasOwnProperty('edit')
			this.$store.dispatch('update_page_edit_mode', edit)
			this.$store.dispatch('update_page_diy_mode', false)
			let data = {
				path: this.path
			}
			if(edit) {
				data.default = true
			}
			this.$api_site_pageInfo({
				data,
				fn: data => this.initPageInfo(data)
			})
		},
		beforeRouteUpdate(to, from, next) {
			this.path = to.path
			this.$store.dispatch('update_page_edit_mode', to.query.hasOwnProperty('edit'))
			this.$store.dispatch('update_page_diy_mode', false)
			this.$api_site_pageInfo({
				data: {
					path: this.path
				},
				fn: data => this.initPageInfo(data)
			})
			next()
		}
	}
</script>
