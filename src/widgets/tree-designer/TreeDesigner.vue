<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<el-container class="widget">
			<transition name="slide">
				<el-aside width="250px" v-show="changeAside" class="aside">
					<set-tab v-if="showBrowser" :config="config" :nodeData='nodeData' :defaultProps='defaultProps' @updataTree="reloadTree" :data='data'></set-tab>
				</el-aside>
			</transition>
			<el-main>
				<div class="handle">
					<h2></h2>
					<el-button size="mini" type="primary" @click="handleSaveTreeConfig">保存</el-button>
				</div>
				<i class="btn el-icon-d-arrow-left" :class="{'el-icon-d-arrow-right':isLeft}" @click="switchAside"></i>
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
					<el-tab-pane label="树配置" name="first">
						<tree-browser v-if="showBrowser" :config="config" :data='data' :defaultProps='defaultProps' :nodeData='nodeData' @updataTree="reloadTree"></tree-browser>
					</el-tab-pane>
					<el-tab-pane label="权限配置" name="second">
						<permissionConf :permission="permission" :context="context"></permissionConf>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</decorator>
</template>

<script>
	import { object } from 'utils'
	import setTab from './page/setTab'
	import treeBrowser from './page/treeBrowser'
	import permissionConf from './permissionConf.vue'
	export default {
		name: 'tree-designer-widget',
		props: ['page', 'params', 'widget', 'i', 'j', 'fm'],
		components: {
			setTab,
			treeBrowser,
			permissionConf
		},
		created() {
			this.getTreeConf()
		},
		data() {
			return {
				showBrowser : false,
				activeName: 'first',
				changeAside: true,
				isLeft: false,
				data: [],
				defaultProps: {
					children: 'children',
					label: 'text',
					isLeaf: 'leaf'
				},
				filterText: '',
				config: {
					isFilterText: false,
					showCheckbox: false,
					highlightCurrent: true,
					accordion: false,
					draggable: false,
					defaultExpandAll: false,
					expandOnClickNode: true,
					lazy: false,
					indent: 16,
					showHandleBtn: true,
					dataSource: '',
					dataSourceType: 'table',
					relationTab: '',
					relationCol:'',
					showCol:'',
					cusParent: false,
					cusParentId: '0'
				},
				nodeData: {
					nodeInfo: {}
				},
				form: {
					id: '',
					modelJson: {},
					confJson: {},
					ruleJson: {},
					permissionJson: {}
				},
				permission: [],
				defaultBtn: [{
						'name': 'add',
						'text': '添加',
						'permissionGroup': ''
					},
					{
						'name': 'del',
						'text': '删除',
						'permissionGroup': ''
					}
				],
				context: {}
			}
		},
		methods: {
			switchAside() {
				this.changeAside = !this.changeAside
				this.isLeft = !this.isLeft
			},
			handleSaveTreeConfig() {
				console.log('config', this.config)
				console.log('data', this.data)

				this.form.id = this.fm ? this.fm.C_ID : ''
				this.form.formType = this.fm ? this.fm.C_FORM_TYPE : ''
				this.form.modelJson = JSON.stringify(this.data)
				this.form.confJson = JSON.stringify(this.config)
				this.form.ruleJson = JSON.stringify(this.form.ruleJson)
				this.form.permissionJson = JSON.stringify(this.permission)
				let options = {
					data: this.form
				}
				this.$api_form_saveFormConfInfo(options).then(res => {
					this.$message({
						'message': '保存成功！',
						'type': 'success'
					});
				}).catch(err => {
					this.$message({
						'message': '保存失败！',
						'type': 'error'
					});
				}).finally(() => {})
			},
			getTreeJson() {
				// 若数据源不为空则查询后台tree信息 
				if(this.config.dataSource && this.config.dataSource != '') {
					let options = {
						data: {
							tableName: this.config.dataSource,
							dataSourceType: this.config.dataSourceType
						}
					}
					this.$api_form_getTreeDataInfo(options).then(res => {
						if(res) {
							this.data = res
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {
						this.showBrowser = true
					})
				} else {
					this.data = []
					this.showBrowser = true
				}
				
			},
			getTreeConf() {
				// 查询树的配置信息
				let options = {
					data: {
						formFlag: this.fm ? this.fm.C_FORM_FLAG : null
					}
				}
				this.$api_form_getFormConfInfo(options).then(res => {
					if(res && res.id) {
						this.config = JSON.parse(res.confJson)
						if(res.permissionJson) {
							this.permission = JSON.parse(res.permissionJson)
						} else {
							this.permission = this.defaultBtn
						}
						//展开所有节点：lazy=false 加载树的所有数据
						if(this.config.lazy){
							if(this.config.defaultExpandAll){
				    			this.getTreeJson()
				    		}else{
				    			this.showBrowser = true
				    		}
						}else{
							this.getTreeJson()
						}
						
						
						// 查询平台所有权限组集合
						this.$api_form_getAllPermissionGroup().then((data) => {
							if(data) {
								this.$set(this.context, 'permissionGroupOptions', data)
							}
						})
					} else {
						this.permission = this.defaultBtn
						this.showBrowser = true
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			},
			handleTabClick(tab, event) {
				this.activeName = tab.name
			},
			reloadTree(){//一般用于重新填在settab里面的树，同步：加载整棵树，异步：加载第一层级树
				this.showBrowser = false
				if(this.config.lazy){
					if(this.config.defaultExpandAll){//同步
		    			this.getTreeJson()
		    		}else{//异步
		    		}
				}else{//同步
					this.getTreeJson()
				}
				setTimeout(() => {
				  	this.showBrowser = true
		       	}, 500);
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
	
	.aside {
		padding: 5px 5px;
		border-right: 1px solid #e4e7ed;
		box-sizing: border-box;
	}
	
	>>>.el-aside {
		overflow: initial;
	}
	
	.handle {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 0px solid #e4e7ed;
	}
	
	.handle h2 {
		font-size: 18px;
		font-weight: normal;
	}
	
	>>>.el-tabs__header {
		margin-bottom: 0px;
	}
	
	>>>.el-main {
		padding: 10px 40px;
		position: relative;
		min-height: 400px;
	}
	
	.btn {
		position: absolute;
		left: 0;
		top: 9px;
		font-size: 12px;
		padding: 4px 0px;
		background: #eee;
		cursor: pointer;
	}
	
	.btn:hover {
		background: #ddd;
	}
	
	>>>.el-tab-pane {
		padding: 5px;
	}
	
	.slide-enter-active {
		transition: all .1s ease;
	}
	
	.slide-leave-active {
		transition: all .1s ease;
	}
	
	.slide-enter,
	.slide-leave-to {
		transform: translateX(-300px);
	}
</style>