<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-button style="float: right; padding: 0" type="text" @click="resetDefault">恢复默认</el-button>
				<el-button type="text" style="float: right; padding: 0" @click="addSysPage">添加系统页 |</el-button>
			</div>
			<div class="text item">
				<div class="mainLeft">
					<el-tree :data="dataTree"
						default-expand-all 
						highlight-current 
						ref="tree" 
						@node-click="handleNodeClick" 
						:expand-on-click-node=false 
						node-key="id" 
						:props="defaultProps" 
						@node-drag-start="handleDragStart" 
						@node-drag-enter="handleDragEnter" 
						@node-drag-leave="handleDragLeave" 
						@node-drag-over="handleDragOver" 
						@node-drag-end="handleDragEnd" 
						@node-drop="handleDrop" 
						draggable 
						:allow-drop="allowDrop" 
						:allow-drag="allowDrag">
						<span class="custom-tree-node" slot-scope="{ node, data }">
			        		<span>{{ node.label }}</span>
							<span>
								<el-dropdown trigger="click" size="small">
							      <span class="el-dropdown-link">
							        <i class='el-icon-more show'></i>
							      </span>
								  <el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.native="addNode(data)">添加</el-dropdown-item>
									<el-dropdown-item v-if="data.attributes.isSystem == 'false'" @click.native="delNode(node, data)">删除</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
							</span>
						</span>
					</el-tree>
				</div>
				<div class="mainRight">
					<el-tabs v-model="activeName" @tab-click="handleTabClick">
						<el-tab-pane v-if="showPageInfoTabs" label="基本信息" name="first">
							<el-form ref="addForm" :model="addForm" :rules="rules" label-width="115px">
								<el-row>
									<el-col :span="12">
										<el-form-item label="页面名称" prop="name">
											<el-input v-model="addForm.name"></el-input>
											<el-checkbox v-model="addForm.isMenu" size="small">作为菜单项</el-checkbox>
											<el-checkbox v-model="addForm.isLink" size="small">外部链接</el-checkbox>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="页面path" prop="path">
											<el-input :disabled="true" v-model="addForm.path"></el-input>
											{{addForm.cascade}}{{addForm.path}}
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="主题样式" prop="themeStyle">
											<el-select :disabled="addForm.isMenu || addForm.isLink" v-model="addForm.themeStyle" placeholder="请选择主题样式">
												<el-option v-for="item in themeStyleOptions" :key="item.VALUE" :label="item.LABEL" :value="item.VALUE">
												</el-option>
											</el-select>
										</el-form-item>
										
									</el-col>
									<el-col :span="12">
										<el-form-item label="页面布局" prop="layoutCode">
											<el-select :disabled="addForm.isMenu || addForm.isLink || addForm.isSystem" v-model="addForm.layoutCode" placeholder="请选择页面布局">
												<el-option v-for="item in layoutOptions" :key="item.code" :label="item.name" :value="item.code">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item label="导航菜单栏隐藏">
											<el-select :disabled="addForm.isMenu || addForm.isLink" v-model="addForm.navHidden" filterable>
												<el-option label="否" value="0"></el-option>
												<el-option label="是" value="1"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="链接地址">
											<el-input :disabled="!addForm.isLink" v-model="addForm.linkUrl"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<div class="dialog-footer" style="text-align: right;">
								<el-button plain type="primary" size="mini" @click="savePageData">确 定</el-button>
								<el-button plain type="primary" size="mini" @click="copyPageData">复制</el-button>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script>
	export default {
		name: 'diy-page',
		props: ['data'],
		data() {
			var validatePagePath = (rule, value, callback) => {
				if(value) {
					if(!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
						callback(new Error('不能输入中文！'));
					} else {
						let options = {
							data: {
								path: value, 
								id: this.addForm.id,
								cascade: this.addForm.cascade,
								siteCode: this.site.name
							}
						}
						this.$api_site_isExitPagePath(options).then(res => {
							if (res) {
								callback(new Error('页面path已存在！'));
							} else {
								callback();
							}
						}).catch(err => {
						}).finally(() => {
						})
					}
				} else {
					callback();
				}
			}
			return {
				dataTree: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				activeName: 'first',
				showPageInfoTabs: false,
				addPageDialog: false,
				addForm: {
					id: '',
					parentId: '',
					siteCode: '',
					name: '',
					themeCode: '',
					themeCodeImg: '',
					layoutCode: '',
					layoutCodeImg: '',
					openSelf: '0',
					navHidden: '0',
					allowWidget: '0',
					allowLayout: '0',
					isMenu: false,
					themeStyle:'standard',
					path: '',
					cascade: '',
					sortNo: 1,
					isSystem: false,
					linkUrl: ''
				},
				themeStyleOptions: [],
				layoutOptions: [],
				currentNode: {},
				rules: {
					name: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 200,
							message: '长度在 1到 200个字符',
							trigger: 'blur'
						}
					],
					path: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '长度在 1到 50个字符',
							trigger: 'blur'
						}
					]
				}
				
			}
		},
		components: {
		},
		computed: {
		  site() {
	        return this.$store.getters.site
	      }
		},
		methods: {
			resetDefault() {// 恢复系统默认页
				this.$confirm('此操作将恢复为系统默认, 是否继续', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						data: {
							siteCode: this.site.name
						}
					}
					this.$api_site_resetDefSitePage(params).then(res => {
						this.$message({
							'message': '恢复成功！',
							'type': 'success'
						})
						this.getTreeData()
					}).catch(err => {
						this.$message({
							'message': '恢复失败！',
							'type': 'error'
						});
					}).finally(() => {
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消恢复默认'
					})
				})
			},
			addSysPage() {// 添加系统页
				let dlg = this
				let body = require('./SysPage.vue')
				let options = {
					title: '系统页面',
					width: '30%',
					heigth: '40%',
					that: this,
					body: body.default,
					data: {
						siteCode: this.site.name
					},
					buttons: [{
						text: '取消',
						handle: function(options, dlg) {
							dlg.close()
						}
					}, {
						type: 'primary',
						text: '确定',
						handle: function(options, dlg) {
							let currentNode = dlg.$refs.body.currentNode
							if(Object.keys(currentNode).length == 0) {
								dlg.$message.error('请选择要添加的系统页面!');
							} else {
								dlg.$confirm('此操作会将之前已添加过的系统页面进行覆盖更新, 是否继续', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
								    let param = {
								    	"siteCode": options.that.site.name,
								    	"currentNode": JSON.stringify(currentNode)
								    }
									dlg.$refs.body.$api_site_addSysSitePage({data: param}).then(res => {
										dlg.$message({
											'message': '添加成功！',
											'type': 'success'
										})
										options.that.getTreeData()
										dlg.close()
									}).catch(err => {
										dlg.$message({
											'message': '添加失败！',
											'type': 'error'
										});
									}).finally(() => {
									})
								}).catch(() => {
									dlg.$message({
										type: 'info',
										message: '已取消添加'
									})
								})
							}
						}
					}]
				}
				this.$dialog(options)
			},
			getTreeData() {// 获取个性化菜单树数据
				let options = {
					data: {
						siteCode: this.site.name
					}
				}
				this.$api_site_getDiyPageTree(options).then((data)=>{
		            if (data) {
		            	this.dataTree = data
		            }
		        })
				this.showPageInfoTabs = false
			},
			addNode(data) {// 添加节点
				let dlg = this
				let body = require('./AddPageForm.vue')
				let options = {
					title: '新增页面',
					width: '40%',
					heigth: '40%',
					that: this,
					body: body.default,
					data: {
						data: data,
						siteCode: this.site.name
					},
					buttons: [{
						text: '取消',
						handle: function(options, dlg) {
							dlg.close()
						}
					}, {
						type: 'primary',
						text: '确定',
						handle: function(options, dlg) {
							let form = dlg.$refs.body.addForm
							dlg.$refs.body.$refs.addForm.validate((valid) => {
								if(valid) {
									form.path = Date.now()
									form.isSystem = false
									dlg.$refs.body.$api_site_saveDiySitePage({
										data: form
									}).then(res => {
										options.that.getTreeData()
										dlg.$message({
											'message': '新增成功！',
											'type': 'success'
										})
										dlg.close()
									}).catch(err => {
										console.info(err)
										dlg.$message({
											type: 'error',
											message: '新增页面失败!'
										})
									}).finally(() => {
									})
								}
							})
						}
					}]
				}
				this.$dialog(options)
			},
			delNode(node, data) {// 删除节点
				this.$confirm('此操作将删除该该页面及其下所有子页面, 是否继续', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						data: {
							id: data.id,
							parentId: data.parentId,
							siteCode: this.site.name
						}
					}
					this.$api_site_delDiySitePage(params).then(res => {
						this.$message({
							'message': '删除成功！',
							'type': 'success'
						})
						this.getTreeData()
					}).catch(err => {
						this.$message({
							'message': '删除失败！',
							'type': 'error'
						});
					}).finally(() => {
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})			
			},
			handleDragStart(node, ev) {
				//console.log('drag start', node);
			},
			handleDragEnter(draggingNode, dropNode, ev) {
				//console.log('tree drag enter: ', dropNode.label);
			},
			handleDragLeave(draggingNode, dropNode, ev) {
				//console.log('tree drag leave: ', dropNode.label);
			},
			handleDragOver(draggingNode, dropNode, ev) {
				//console.log('tree drag over: ', dropNode.label);
			},
			handleDragEnd(draggingNode, dropNode, dropType, ev) {
				//console.log('tree drag end: ', dropNode && dropNode.label, dropType);
			},
			handleDrop(draggingNode, dropNode, dropType, ev) {
				// 拖拽成功完成时触发的事件
				console.info('handleDrop', draggingNode, dropNode, dropType)
				// 校验拖动后的页面path是否已存在放后台校验
			    let parentId
			    if (dropType === 'before' || dropType === 'after') {
			    	parentId = dropNode.data.parentId
			    }else {
			    	parentId = dropNode.data.id
			    }
			    
			    let param = {
			    	"siteCode": this.site.name,
			    	"draggingNode": JSON.stringify(draggingNode.data),
			    	"dataTree": JSON.stringify(this.dataTree),
			    	"parentId": parentId
			    }
			    //保存拖动后的页面tree
		    	this.$api_site_saveDiySitePageTree({data: param}).then(res => {
					this.$message({
						'message': '拖动页面成功!',
						'type': 'success'
					})
				}).catch(err => {
					this.$message({
						'message': '拖动页面失败!',
						'type': 'error'
					});
				}).finally(() => {
					this.getTreeData()
				})
			},
			allowDrop(draggingNode, dropNode, type) {
				//公开页面和私有页面前后不能插入
				if(dropNode.data.id === '1' || dropNode.data.id === '2') {
					return type != 'prev' && type != 'next'
				} else {
					return true;
				}
			},
			allowDrag(draggingNode) {
				//校验公开页面和私有页面节点不能移动
				if(draggingNode.data.id === '2' || draggingNode.data.id === '1') {
					this.$message({
						type: 'info',
						message: '该节点不能拖动！'
					});
					return false
				} else {
					return true
				}
			},
			handleNodeClick(data) { //点击树节点
				this.currentNode = data
				this.initForm()
				//根据页面ID获取页面信息 排除公共页面和私有页面两节点
				if(data.parentId != 0) {
					let options = {
						data: {
							'id': data.id,
							'siteCode': this.site.name
						}
					}
					this.$api_site_getDiySitePageInfoById(options).then(res => {
						this.addForm = res
						this.$refs['addForm'].resetFields()
						this.showPageInfoTabs = true
					}).catch(err => {
						console.info(err)
					}).finally(() => {})
					this.addForm.cascade = this.currentNode.attributes.cascade
					this.activeName = "first"
					this.showPageInfoTabs = true
				} else {
					this.addForm.cascade = '/';
					this.activeName = "first";
					this.showPageInfoTabs = false;
				}
			},
			initForm() {
				this.addForm = {
					id: '',
					parentId: '',
					siteCode: '',
					name: '',
					themeCode: '',
					themeCodeImg: '',
					layoutCode: '',
					layoutCodeImg: '',
					openSelf: '0',
					navHidden: '0',
					allowWidget: '0',
					allowLayout: '0',
					isMenu: false,
					themeStyle:'standard',
					path: '',
					cascade: '',
					isSystem: false,
					sortNo: 1
				}
			},
			handleTabClick(tab, event){
				if (tab.name == "first") {
					this.activeName = "first";
					this.handleNodeClick(this.currentNode);
				}
			},
			savePageData() {// 保存页面信息
				if(Object.keys(this.currentNode).length == 0) {
					this.$message.error('请选择父页面!');
				} else {
					this.$refs.addForm.validate((valid) => {
						if(valid) {
							if(this.addForm.id == '') {
								this.addForm.parentId = this.currentNode.id;
								this.addForm.siteCode = this.siteCode;
							}
							this.$api_site_saveDiySitePage({
								data: this.addForm
							}).then(res => {
								this.$message({
									'message': '保存页面成功!',
									'type': 'success'
								})
								// 刷新个性化站点页面tree
								this.getTreeData()
								
							}).catch(err => {
								console.info(err)
								this.$message({
									type: 'error',
									message: '保存页面失败!'
								})
							}).finally(() => {
							})
						}
					});
				}				
			},
			copyPageData() {// 复制页面信息
				this.$prompt('请输入复制页面名称', '', { inputPattern:/^\S+$/,inputErrorMessage: '复制页面名称不能为空！', closeOnClickModal: false, closeOnPressEscape: false }).then((result) => {
					let params = {
						id: this.currentNode.id,
						siteCode: this.site.name,
						name: result.value
					}
					this.$api_site_copyDiyPage({data: params}).then(res => {
						this.$message({
								message: '复制成功',
								type: 'success'
						})
						this.getTreeData()
					}).catch(err => {
						console.info(err)
						this.$message({
							message: '复制页面失败:' + err,
							type: 'error'
						})
					}).finally(() => {})
		    	})
			},
			getThemeStyleList() {// 获取主题样式下拉列表数据
				let options = {
					data: {
						'dicKey': 'theme_styles'
					}
				}
				this.$api_form_getDicItemByKey(options).then(res => {
					if (res) {
						this.themeStyleOptions = res
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			},
			getLayOutList() {// 获取布局下拉列表数据
				this.$api_site_getAllLayOutList().then(res => {
					if (res) {
						this.layoutOptions = res
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			}
		},
		created() {
			// 查询个性化站点页面数据
			this.getTreeData()
			// 获取主题样式列表数据
			this.getThemeStyleList()
			// 获取布局列表数据
			this.getLayOutList()
		}
	}
</script>

<style scoped>
    >>>.el-dialog__body{padding: 10px 20px;}
    
    >>>.el-card__header {
	    padding: 15px 10px 30px 0px;
	    border-bottom: 1px solid #ebeef5;
	    box-sizing: border-box;
	}
	
	.box-card {
		height: 520px;
	}
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	
	.show {
		display: none;
	}
	
	>>>.custom-tree-node:hover .show {
		display: block;
	}
	
	.el-icon-more {
		padding: 2px 10px;
		box-sizing: border-box;
	}
	
	.mainLeft{width: 200px;height: 440px;overflow:auto;background: #f6f7fb;float: left;}
	.mainLeft .el-tree{background: #f6f7fb;}
	.mainRight{flex: 1;overflow-y: auto;padding:0 10px;height: 440px;}
</style>