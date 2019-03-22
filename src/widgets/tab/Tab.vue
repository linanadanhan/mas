<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<template slot="title">
			<separator v-if="dragWidget" class="separator" :page="params.tabs" :params="params" :i="1" j="0"></separator>
			<template v-for="(tab, tabIndex) in (params.tabs ? params.tabs : [])">
				<div class="tab-box" :key="tabIndex" :draggable='editMode > 0' @dragstart.stop="dragstart($event,1,tabIndex,tab)" @dragend.stop="dragend($event,1,tabIndex,tab)" @click="handleTabClick(tabIndex,tab)">
					<badge :class="{'active-tab': tabActive == tabIndex}" :name="params.badge">
						<div class="tab-title-box">
							<i class="iconfont" :class="tab.icon"></i>
							<span class="tab-title">{{tab.name}}</span>
							<i class="iconfont tab-delete icon-shanchu4" v-if="editMode" @click.stop="handleDeleteTab(tab,tabIndex)"></i>
						</div>
					</badge>
					<separator v-if="dragWidget" class="separator" :page="params.tabs" :params="params" :key="'separator-' + tabIndex" :i="tabIndex+1" :j="tabIndex+1"></separator>
				</div>
			</template>
		</template>
		<div class="widget">
			<layout class="widget" :page="params.layoutPage ? params.layoutPage: params.tabs[tabActive]"></layout>
		</div>
	</decorator>
</template>

<script>
	import _ from 'underscore'
	export default {
		name: 'tab-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				tabActive: 0
			}
		},
		computed: {
			rootPage() {
				return this.$store.getters.page
			},
			dragWidget() {
				return this.$store.getters.dragWidget
			},
			editMode() {
				return this.$store.getters.editMode
			},
			delWidgets() {
				return this.$store.getters.delWidgets
			},
			diyMode() {
				return this.$store.getters.diyMode
			}
		},
		created() {
			if (this.params.tabActive) {
        if (this.params.tabActive > this.params.tabs.length) {
          this.tabActive = 0
        } else {
          this.tabActive = this.params.tabActive
          this.params.layoutPage = this.params.tabs[this.tabActive]
        }
			} else {
			  this.tabActive = 0
			}
		},
		methods: {
			handleDeleteTab(tab, index) {
				this.$confirm('是否确定删除该tab数据', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_.each(tab.widgets, (ng) => {
						_.each(ng, (item) => {
							this.$store.dispatch('update_widget_delete', item.id)
							this.delAllWidgetIds(item.id)
						})
					})
					this.params.tabs.splice(index, 1)
					this.$api_site_saveProfileConf({
						data: {
							pageUuId: this.page.pageUuId,
							widgetUuId: this.widget.id,
							diyMode: this.diyMode,
							json: JSON.stringify(this.params),
							delWidgetIds: _.keys(this.delWidgets).join(',')
						}
					})
				}).catch(() => {})
				// 删除后默认定位到第一个页签上
				this.params.tabActive = 0
			},
			delAllWidgetIds(widgetId) { // 删除widget下的所有widget
				if(this.page.widgetParams && this.page.widgetParams.hasOwnProperty(widgetId)) {
					let widgetObj = this.page.widgetParams[widgetId]
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
			dragstart(event, i, j, tab) {
				if(this.params.tabs.length != 0) {
					// 删除单个tabs
					this.params.tabs.splice(j, 1)
					// 保存 tabs中 widgets
					this.$store.dispatch('update_drag_widget', {
						widget: tab
					})
					this.params.tab = tab
					this.params.tabJ = j
					if (j > 0) {
					  this.params.tabActive = j - 1
					}
				} else {
					// 删除整个tabs widget
					this.page.widgets[this.i].splice(this.j, 1)
					this.$store.dispatch('update_drag_widget', {
						widget: this.widget
					})
				}
			},
			dragend(event, i, j, tab) {
				if(this.$store.getters.dragWidget !== null) {
					if(this.params.tabs.length != 0) {
						// 还原单个tabs
						this.params.tabs.splice(this.params.tabJ, 0, this.params.tab)
						this.params.tabActive = this.j
					} else {
						// 还原整个tabs widget
						this.page.widgets[this.i].splice(this.j, 0, this.widgets)
						this.params.tabActive = 0
					}
					this.$store.dispatch('update_drag_widget', null)
				}
			},
			handleTabClick(index, obj) {
				this.tabActive = index
				if(!obj.id) return
				this.params.layoutPage = obj
			}
		},
		watch: {
			'params': {
				handler: function(newVal, oldVal) {
					if(this.params.layoutPage) {
						this.params.layoutPage = this.params.tabs[0]
					}
					if (this.params.tabActive) {
					  console.info(this.params.tabActive > this.params.tabs.length)
					  if (this.params.tabActive > this.params.tabs.length) {
					    this.tabActive = 0
					    this.params.layoutPage = this.params.tabs[0]
					  } else {
					    this.tabActive = this.params.tabActive
              this.params.layoutPage = this.params.tabs[this.tabActive]
					  }
          } else {
            this.tabActive = 0
          }
					this.$nextTick(function() {
						if(this.editMode && newVal) {
							if(this.params) { //复制其他属性
								for(var key in this.params) {
									if(key !== 'tabs') {
										newVal[key] = this.params[key]
									}
								}
							}
							if(newVal.layoutPage) {
								delete newVal.layoutPage
							}
							this.$api_site_saveProfileConf({
								data: {
									pageUuId: this.page.pageUuId,
									widgetUuId: this.widget.id,
									diyMode: this.diyMode,
									json: JSON.stringify(newVal),
									delWidgetIds: _.keys(this.delWidgets).join(',')
								}
							})
						}
					})
				},
				deep: true
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
	
	.nested-tool-bar {
		text-align: right;
		padding: 10px;
	}
	
	.tab-box {
		float: left;
	}
	
	.el-badge {
		float: left;
		cursor: pointer;
		margin-left: 8px;
		margin-right: 8px;
	}
	
	.el-badge .iconfont {
		line-height: inherit;
	}
	
	.tab-box .active-tab {
		border-bottom: 3px solid;
	}
	
	.tab-title-box {
		position: relative;
	}
	
	.tab-title-box:hover .tab-delete {
		display: block;
	}
	
	.el-badge .tab-delete {
		display: none;
		position: absolute;
		top: -5px;
		right: -5px;
		font-size: 12px;
		line-height: initial;
		z-index: 999;
		background: #fff;
	}
</style>