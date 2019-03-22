<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<el-container class="widget">
			<transition name="slide">
				<el-aside width="270px" v-show="changeAside" class="aside">
					<el-tabs v-model="context.tableActiveTab" type="card" @tab-click="handleTabClick">
						<el-tab-pane label="表格" name="table">
							<tab-table :context="context" :config="config" />
						</el-tab-pane>
						<el-tab-pane label="列" name="column">
							<tab-column :context="context" :config="config" />
						</el-tab-pane>
						<el-tab-pane label="工具栏" name="tool">
							<tab-tool :context="context" :config="config" />
						</el-tab-pane>
					</el-tabs>
				</el-aside>
			</transition>
			<el-main>
				<i class="btn el-icon-d-arrow-left" :class="{'el-icon-d-arrow-right':isLeft}" @click="switchAside"></i>
				<editor-table v-if="showEditTable" :page="page" :params="params" :widget="widget" :config="config" :context="context" :permission="permission" :permissionMap="permissionMap" :fm="fm" />
			</el-main>
		</el-container>
	</decorator>
</template>

<script>
	import TabTable from './page/TabTable.vue'
	import TabColumn from './page/TabColumn.vue'
	import TabTool from './page/TabTool.vue'
	import EditorTable from './page/EditorTable.vue'
	export default {
		name: 'table-designer-widget',
		props: ['page', 'params', 'widget', 'i', 'j', 'fm'],
		components: {
			'tab-table': TabTable,
			'tab-column': TabColumn,
			'tab-tool': TabTool,
			'editor-table': EditorTable
		},
		apis: [{
			name: 'load_config',
			path: 'table/getConfig',
			type: 'get'
		}],
		created() {
			this.getInitConfig()
		},
		data() {
			return {
				showEditTable: false,
				isLeft: false,
				changeAside: true,
				config: {
					'rows': [{
						'id': 1,
						'label': '字段',
						'children': []
					}],
					'table': {
						'resource': '',				// 数据源
						'dataSourceType': 'table',		// 数据源类型【表格:table,视图:view】
						'viewParamsOpts':[],	// 动态视图参数集合
						'size': 'mini',				// 表格大小
						'checkbox': false,		// 表格是否有复选框
						'orderNumber': false,	// 表格是否有序号
						'border': true,		// 表格是否有边框
						'stripe': true,		// 表格是否有斑马纹（偶数行默认灰色）
						'fixedHead': false,		// 是否固定表头
						'theadStyle': {
							'bgStyle': '#f5f7fa',  // 表头背景颜色
							'colorStyle': '#909399',  // 表头文字颜色
							'borderStyle': '#ebeef5'  // 表头边框颜色
						},
						'evenRowStyle': {
							'bgStyle': '#fff',  // 偶数行背景颜色
							'colorStyle': '#606266',  // 偶数行文字颜色
							'borderStyle': '#ebeef5'  // 偶数行边框颜色
						},
						'oddRowStyle': {
							'bgStyle': '#fff',  // 奇数行背景颜色
							'colorStyle': '#606266',  // 奇数行文字颜色
							'borderStyle': '#ebeef5'  // 奇数行边框颜色
						}
					},
					'tool': {
						'page': true,
						'type': [{
								'default': true,
								'isCheck': false,
								'type': '2',
								'name': 'toolBarAdd',
								'text': '新增',
								'formFlag': '',
								'script': ''
							},
							{
								'default': true,
								'isCheck': false,
								'type': '0',
								'name': 'toolBarBatDel',
								'text': '批量删除',
								'formFlag': '',
								'script': ''
							},
							{
								'default': true,
								'isCheck': false,
								'type': '3',
								'name': 'toolBarStop',
								'text': '停用',
								'formFlag': '',
								'script': ''
							},
							{
								'default': true,
								'isCheck': false,
								'type': '4',
								'name': 'toolBarStart',
								'text': '启用',
								'formFlag': '',
								'script': ''
							},
							{
								'default': true,
								'isCheck': false,
								'type': '5',
								'name': 'toolBarImp',
								'text': '导入',
								'formFlag': '',
								'script': ''
							},
							{
								'default': true,
								'isCheck': false,
								'type': '6',
								'name': 'toolBarExp',
								'text': '导出',
								'formFlag': '',
								'script': ''
							}, {
								'default': true,
								'isCheck': false,
								'type': '7',
								'name': 'toolBarCol',
								'text': '收藏',
								'formFlag': '',
								'script': ''
							}
						],
						'isRowClick': false,
						'rowClickType': 'view',
						'viewFormFlag': ''
					}
				},
				context: {
					tableActiveTab: 'column',
					column: {},
					feildList: [],
					columnName: ''
				},
				permission: [],
				permissionMap: {}
			}
		},
		methods: {
			getInitConfig() {
				let options = {
					data: {
						formFlag: this.fm ? this.fm.C_FORM_FLAG : null
					}
				}
				this.$api_form_getTabelConfInfo(options).then(res => {
					if(res && res.id != null) {
						var data = JSON.parse(res.confJson)
						this.config.table = data.table
						this.config.rows = data.rows
						if(data.tool) {
							this.config.tool = data.tool
							this.getFormCfgJson()
						}
						if(res.permissionJson) {
							this.permission = JSON.parse(res.permissionJson)
						}
						if (res.permissionMap) {
						    this.permissionMap = JSON.parse(res.permissionMap)
						}
						// 初始化数据表字段
						if(this.config.table.resource) {
							let options = {
								data: {
									tableName: this.config.table.resource,
									dataSourceType: this.config.table.dataSourceType
								}
							}
							this.$api_form_getTableFeild(options).then((data1) => {
								if(data1) {
									this.$set(this.context, 'feildList', data1)
								} else {
									this.$set(this.context, 'feildList', [])
								}
							})
						}
						// 查询平台所有权限组集合
						this.$api_form_getAllPermissionGroup().then((data) => {
							if(data) {
								this.$set(this.context, 'permissionGroupOptions', data)
							}
						})
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {
					this.showEditTable = true
				})
			},
			switchAside() {
				this.changeAside = !this.changeAside
				this.isLeft = !this.isLeft
			},
			handleTabClick(name, path) {
				this.context.columnName = ''
			},
			getFormCfgJson(){
		    	let viewFormFlag = ''
		    	let toolType = this.config.tool.type
		    	for(let i=0;i<toolType.length;i++){
		    		if(toolType[i].type=='2'){
		    			viewFormFlag = toolType[i].formFlag
		    			break
		    		}
		    	}
				if(viewFormFlag!=''){
					let options = {
			            data: {formFlag: viewFormFlag}
			        }
				  	this.$api_form_getFormConfInfo(options).then(res=>{
				        this.config.addFormCfg = JSON.parse(res.confJson)
			        }).catch(err=>{
			          console.info(err)
			        }).finally(()=>{
			        })
				}
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
	
	.aside {
		padding: 5px;
    border-right: 1px solid #e4e7ed;
    background: #fff;
    overflow-y: auto;
    height: 100%;
	}
	
	>>>.el-tabs__header {
		margin-bottom: 0px;
	}
	
	>>>.el-tab-pane {
		padding: 15px 5px;
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
	
	>>>.el-main {
		padding: 10px 20px;
		position: relative;
		min-height: 400px;
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