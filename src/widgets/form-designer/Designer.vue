<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<el-container class="widget" :style="{height:containerHeight}">
			<transition name="slide">
				<el-aside ref="aside" width="270px" v-show="changeAside" class="aside" >
					<el-tabs v-model="context.activeTab" type="card" @tab-click="hiddenCurrent">
						<el-tab-pane label="表单" name="form">
							<tab-form :context="context" :config="config" />
						</el-tab-pane>
						<el-tab-pane label="添加" name="add">
							<tab-add :context="context" :rules="rules" :model="model" />
						</el-tab-pane>
						<el-tab-pane label="属性" name="column">
							<tab-column :context="context" :model="model" :config="config" :rules="rules" />
						</el-tab-pane>
					</el-tabs>
				</el-aside>
			</transition>
			<el-main>
				<i class="btn el-icon-d-arrow-left" :class="{'el-icon-d-arrow-right':isLeft}" @click="switchAside"></i>
				<editor 
				:widget="widget"
				:context="context" 
				:model="model" 
				:config="config" 
				:permission="permission" 
				:rules="rules" 
				:fm="fm" 
				@closeAndFresh="closeAndFresh"></editor>
			</el-main>
		</el-container>
	</decorator>
</template>

<script>
	import FormTab from './pages/FormTab.vue'
	import ColumnTab from './pages/ColumnTab.vue'
	import AddTab from './pages/AddTab.vue'
	import Editor from './pages/Editor.vue'
	export default {
		name: 'form-designer-widget',
		props: ['page', 'params', 'widget', 'i', 'j', 'fm'],
		components: {
			'tab-form': FormTab,
			'tab-column': ColumnTab,
			'tab-add': AddTab,
			'editor': Editor
		},

		data() {
			return {
				containerHeight:'',
				isLeft: false,
				changeAside: true,
				model: {},
				config: {
					formLabelPosition: '',
					formlabelWidth: '100',
					size: 'small',
					dataSourceType: 'table',
					dataSource: '',
					rows: []
				},
				rules: {},
				context: {
					activeTab: 'add',
					columnTab: '', //columnTab配置组件页面
					column: {}, //columnTab配置组件页面中每个属性的集合
					item: null, //拖动的组件对象
					rowIndex: null,
					colIndex: null,
					itemNumber: 0,
					editor:{}
				},
				permission: []
			}
		},
		created() {
			let options = {
				data: {
					formFlag: this.fm ? this.fm.C_FORM_FLAG : null
				}
			}
			this.$api_form_getFormConfInfo(options).then(res => {
				if(res && res.id) {
					this.model = JSON.parse(res.modelJson)
					this.config = res.confJson
					this.rules = JSON.parse(res.ruleJson)
					if (res.permissionJson) {
						this.permission = JSON.parse(res.permissionJson)
					}
					if (this.config.dataSource) {
			          let options = {
			            data: {tableName: this.config.dataSource, dataSourceType: this.config.dataSourceType}
					  }
					  this.context.config = this.config
			          // 查询所有表字段
			          this.$api_form_getTableFeild(options).then((data)=>{
			            if (data) {
			            	this.$set(this.context,'feildList',data)
			            }else {
			            	this.$set(this.context,'feildList',[])
			            }
			          })
			          // 查询平台所有权限组集合
			          this.$api_form_getAllPermissionGroup().then((data)=>{
			            if (data) {
			            	this.$set(this.context,'permissionGroupOptions',data)
			            }
			          })
			      	}
				}
			}).catch(err => {
				console.info(err)
			}).finally(() => {})

		},
		mounted() {
			this.containerHeight=document.documentElement.clientHeight-185+'px';
		},
		methods: {
			hiddenCurrent() {
				this.context.rowIndex = null
				this.context.colIndex = null
			},
			switchAside() {
				this.changeAside = !this.changeAside
				this.isLeft = !this.isLeft
			},
			site() {
				return this.$store.getters.site
			},
			closeAndFresh() {
				let options = {
					data: {
            formFlag: this.fm ? this.fm.C_FORM_FLAG : null
					}
				}
				this.$api_form_getFormConfInfo(options).then(res => {
					if(res && res.id) {
						this.model = JSON.parse(res.modelJson)
						this.config = JSON.parse(res.confJson)
						this.rules = JSON.parse(res.ruleJson)
						this.permission = JSON.parse(res.permissionJson)
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			}
		}
	}
</script>

<style scoped>

	.aside {
		padding: 5px;
		border-right: 1px solid #e4e7ed;
		background: #fff;
		overflow-y: auto;
		height:100%;
	}

	.marginLeft {
		margin-left: 250px;
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

	>>>.el-tabs__header {
		margin-bottom: 0px;
	}

	>>>.el-main {
		padding: 10px 20px;
		position: relative;
		height:100%;
		overflow: auto;
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
