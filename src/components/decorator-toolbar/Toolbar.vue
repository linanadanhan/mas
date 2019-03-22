<template>
	<span v-if="editMode && !widgetParams.widgetinwidget">
  	<slot></slot>
  	<i class="iconfont icon-shezhi" @click="settings" :title="title"></i>
    <i class="iconfont icon-shanchu4" @click="del" title="删除"></i>
  </span>
	<span v-else>
    <slot></slot>
    <i class="iconfont icon-zuidahua" v-if="!page.maximized & !minimized & widgetParams.openMax && !widgetParams.widgetinwidget"  @click="max" title="最大化"></i>
    <i class="iconfont icon-huanyuan" v-if="page.maximized || minimized"  @click="restore" title="还原"></i>
    <i class="iconfont icon-zuixiaohua" v-if="!page.maximized & !minimized & widgetParams.openMin"  @click="min" title="最小化"></i>
  </span>
</template>

<script>
	import Widgets from 'widgets'
	import _ from 'underscore'
	import { object } from 'utils'

	export default {
		name: 'decorator-toolbar',
		props: ['page', 'widget', 'i', 'j', 'minimized'],
		data() {
			return {}
		},
		computed: {
			editMode() {
				return this.$store.getters.editMode
			},
			diyMode() {
				return this.$store.getters.diyMode
			},	
			widgetParams() {
				return this.getWidget(this).$options.propsData.params
			},
			title() {
				return this.$store.getters.diyMode ? '偏好设置' : '系统设置'
			},
			rootPage() {
				return this.$store.getters.page
			}
		},
		methods: {
			max: function() {
				this.$store.dispatch('update_widget_maximized', this.widget)
			},
			getWidget(node) {
				return (node.$attrs.isWidget) ? node : this.getWidget(node.$parent) 
			},
			restore: function() {
				if(this.page.maximized) {
					this.$store.dispatch('update_widget_original')
				}
				if(this.minimized) {
					this.$emit('update:minimized', false)
				}
			},
			min: function() {
				this.$emit('update:minimized', true)
			},
			del: function() {
				this.$confirm('此操作将删除该部件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('update_widget_delete', this.widget.id)
					let params = this.rootPage.widgetParams[this.widget.id]
					console.info(params, this.widget, this.page)
					this.delAllWidgetIds(this.widget.id)
					this.page.widgets[this.i].splice(this.j, 1)
					//删除widget时触发自己业务逻辑处理
					let loader = Widgets[this.widget.name]['widget']
					if(typeof loader === 'function') {
						loader().then(data => {
							if(data.default.methods && data.default.methods.del && typeof data.default.methods.del === "function") {
								data.default.methods.del(this, this.widget.id)
							}
						})
					}
				}).catch(() => {})
			},
			delAllWidgetIds(widgetId) { // 删除widget下的所有widget
				if(this.rootPage.widgetParams && this.rootPage.widgetParams.hasOwnProperty(widgetId)) {
					let widgetObj = this.rootPage.widgetParams[widgetId]
					if(widgetObj.nestedPage && widgetObj.nestedPage.widgets) {
						_.each(widgetObj.nestedPage.widgets, (ng) => {
							_.each(ng, (item) => {
								if(item.name == 'nested' || item.name == 'tab') {
									this.delAllWidgetIds(item.id)
								}
								this.$store.dispatch('update_widget_delete', item.id)
							})
						})
					}
					if(widgetObj.tabs) {
						_.each(widgetObj.tabs, (ng) => {
							if(ng.widgets) {
								_.each(ng.widgets, (ng1) => {
									_.each(ng1, (item) => {
										if(item.name == 'nested' || item.name == 'tab') {
											this.delAllWidgetIds(item.id)
										}
										this.$store.dispatch('update_widget_delete', item.id)
									})
								})
							}
						})
					}
				}
			},
			settings: function() {
				let type = this.diyMode ? 'profile' : 'config'
				let options = {
					title: this.title,
					data: {
						params: this.rootPage.widgetParams[this.widget.id],
						widget: this.widget,
						diyMode: this.diyMode,
						rootPage: this.rootPage
					},
					buttons: [{
						text: '取消',
						handle: function(options, dialog, body) {
							dialog.close()
						}
					}, {
						text: '保存',
						type: 'primary',
						handle: function(options, dialog, body) {
							save(options, dialog, body)
						}
					}]
				}
				if(/\//.test(this.widget.name)) {
					this.$require(this.widget.name, type)().then(tabs => {
						openTabs.call(this, tabs, options)
					}).catch(() => {
						openTabs.call(this, [], options)
					})
				} else {
					let loader = Widgets[this.widget.name][type]
					if(typeof loader === 'function') {
						loader().then(data => {
							openTabs.call(this, data.default, options)
						})
					} else {
						openTabs.call(this, [], options)
					}
				}
			}
		}
	}

	function openTabs(tabs, options) {
		tabs = tabs || []
		let basic = require(this.diyMode ? 'views/settings/Profile.vue' : 'views/settings/Config.vue')
		options.body = [basic.default].concat(tabs)
		if(this.diyMode) {
			let template = {}
			_.each(options.body, (tab, key) => {
				_.extend(template, tab.profiles)
			})
			options.form = object.pickcopy(options.data.params, template, template)
		} else {
			options.form = object.deepcopy(options.data.params)
		}
		options.data.activeName = tabs.length > 0 ? tabs[0].name : basic.default.name
		this.$dialog(options)
	}

	function save(options, dialog, body) {
		let validates = _.chain(body).mapObject((value, key) => {
			if(value && value.length === 1 && value[0].$refs.form && value[0].$refs.form.validate) {
				return value[0].$refs.form
			}
		}).map((value, key) => {
			if(!value) {
				return
			}
			return new Promise((resolve, reject) => {
				value.validate().then((data) => {
					resolve({
						tabName: key,
						state: data
					})
				}).catch((data) => {
					reject({
						tabName: key,
						state: data
					})
				})
			})
		}).value().filter(value => value != null)
		// 校验所有Tab中的表单
		Promise.all(validates).then((data) => {
			// 校验通过
			if(options.data.diyMode) {
				dialog.$_.extend(options.data.params, options.form)
				console.log('profile saved', options.data.params)
			} else {
				console.log('params saved', options.form)
				options.data.params = options.form
			}
			dialog.$api_site_saveProfileConf({
				data: {
					pageUuId: options.data.rootPage.pageUuId,
					widgetUuId: options.data.widget.id,
					diyMode: options.data.diyMode,
					json: JSON.stringify(options.data.params)
				}
			})
			dialog.close()
			dialog.$store.dispatch('update_widget_params', {
				rootPage: options.data.rootPage,
				widgetId: options.data.widget.id,
				params: options.data.params
			})
		}, (data) => {
			// 校验失败，定位到其中一个错误的Tab页
			options.data.activeName = data.tabName
			return false
		})
	}
</script>