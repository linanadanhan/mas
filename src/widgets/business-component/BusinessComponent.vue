<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div v-if="!showDesign" class="widget">
		  <div class="text item">
        <div class="mainLeft">
          <el-tree :data="categoryTree"
            highlight-current 
            @node-click="handleNodeClick"
            ref="tree" 
            :expand-on-click-node=false
            :props="defaultProps">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label == '' ? '未分类' :  node.label}}</span>
            </span>
          </el-tree>
        </div>
        <div class="mainRight">
      <el-row style="margin-bottom: 10px;">
        <div style="float: left;">
          <el-button plain size="mini" type="primary" @click="addYwComp">新增</el-button>
          <el-button plain size="mini" type="primary" @click="updateStatus('1')">启用</el-button>
          <el-button plain size="mini" type="primary" @click="updateStatus('0')">停用</el-button>
          <el-dropdown trigger="click" style="padding-left: 10px;" placement="bottom-start" @command="auth">
            <el-button plain size="mini":disabled="enabledBtn" type="primary">
              授权<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">用户授权</el-dropdown-item>
              <el-dropdown-item command="1">角色授权</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-input style="float: right;margin-top:0;width:150px;margin-right: 0px;" size="mini" placeholder="请输入关键字" icon="search" v-model="search">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
        </el-input>
      </el-row>
      <el-row class="pannel-box">
        <el-table ref="multipleTable" :data="tableData" @row-dblclick="dblclick" border style="width: 100%" highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column type="index" :index="indexMethod" width="80" align="center">
          </el-table-column>
          <el-table-column prop="C_COMP_NAME" label="部件名称">
          </el-table-column>
          <el-table-column prop="C_COMP_DESC" label="部件描述">
          </el-table-column>
          <el-table-column prop="C_STATUS" label="状态" align="center" width="80" :formatter="formStatusFormat">
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-dropdown trigger="click" placement="bottom-start" @command="(command) => handleCommand(command, scope.row)">
                <div style="width: 60px;"><i class="el-icon-more"></i></div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0">修改</el-dropdown-item>
                  <el-dropdown-item command="1">删除</el-dropdown-item>
                  <el-dropdown-item command="2">设计</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-row>
        </div>
      </div>
		</div>
		<div v-else class="widget">
			<el-main>
				<div class="handle">
					<h2></h2>
					<div>
						<el-button plain size="mini" type="primary" @click="handleConf">配置</el-button>
						<el-button plain size="mini" type="primary" @click="handleSave">保存</el-button>
					</div>
				</div>
				<i class="btn el-icon-back" title="返回" @click="handleBack"></i>
				<layout class="widget" :page="nestedPage"></layout>
			</el-main>
		</div>
	</decorator>
</template>

<script>
	export default {
		name: 'business-component',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
			  currentNode: {},
			  categoryTree: [],
        defaultProps: {
          children: 'children',
          label: 'category'
        },
				selRow: {},
				showDesign: false, // 设计部件模式
				total: 0,
				pageSize: 10,
				currentPage: 1,
				search: '',
				tableData: [],
				multipleSelection: [],
				nestedPage: {
					decorator: "none",
					layout: "default",
					widgets: []
				},
				layout: {
					page: this.nestedPage,
					layout: 'default',
					portNum: 1
				},
				enabledBtn: true,
			}
		},
		methods: {
			handleSearch() {
        this.currentPage = 1;
        this.searchTableData();		    
		  },
		  getCategoryWidgetTree() {
		    this.$api_site_getCategoryWidgetTree({
          data: {
            model: 'diy'
          }
        }).then(res => {
          if(res) {
            this.categoryTree = JSON.parse(res)
            // 初始查询第一个节点下的数据
            this.currentNode = this.categoryTree[0]
            this.searchTableData()
          }
        }).catch(err => {
          console.info(err)
        }).finally(() => {})
		  },
		  handleNodeClick(data) { // 节点点击事件--根据分类查询对应下的widget
        this.tableData = []
        this.currentNode = data
        this.searchTableData()
      },
			handleSizeChange(val) { // 分页查询
				this.pageSize = val;
				this.searchTableData();
			},
			handleCurrentChange(val) { // 分页查询
				this.currentPage = val;
				this.searchTableData();
			},
			indexMethod(index) {
				return(this.currentPage - 1) * this.pageSize + index + 1
			},
			searchTableData() { // 搜索业务部件
			  let category = this.getPathByKey(this.currentNode.category, 'category', this.categoryTree)
				this.$api_widget_getBusinessComponentList({
					data: {
					  category: category,
						search: this.search,
						page: this.currentPage,
						size: this.pageSize
					},
					fn: data => this.initWidgetTable(data)
				})
			},
      getPathByKey(value, key, arr) { // 获取指定节点路径
        let temppath = [];
        try {
          function getNodePath(node){
              temppath.push(node.category)
              //找到符合条件的节点，通过throw终止掉递归
              if (node[key] === value) {
                throw ("GOT IT!")
              }
              if (node.children && node.children.length > 0) {
                  for (var i = 0; i < node.children.length; i++) {
                      getNodePath(node.children[i])
                  }
                //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                temppath.pop()
              }
              else {
                //找到叶子节点时，删除路径当中的该叶子节点
                temppath.pop()
              }
          }
          for (let i = 0; i < arr.length; i++) {
              getNodePath(arr[i])
          }
        } catch (e) {
            return temppath.join('/')
        }       
      },
			initWidgetTable: function(data) { // 初始化table数据
				this.tableData = data.rows
				this.total = data.total
			},
			addYwComp() { // 新增业务部件
				let dlg = this
				let body = require('./view/businessCompEdit.vue')
				let options = {
					title: '新增业务部件',
					body: body.default,
					that: this,
					buttons: [{
						text: '取消',
						handle: function(options, dlg) {
							dlg.close()
						}
					}, {
						type: 'primary',
						text: '确定',
						handle: function(options, dlg) {
							let form = dlg.$refs.body.form
							dlg.$refs.body.$refs.form.validate((valid) => {
								if(valid) {
									dlg.$refs.body.$api_widget_saveBusinessCompInfo({
										data: form
									}).then(res => {
										dlg.$refs.body.$message({
											'message': '保存成功！',
											'type': 'success'
										})
										options.that.getCategoryWidgetTree()
										dlg.close()
									}).catch(err => {
										console.info(err)
									}).finally(() => {
									})
								} else {
									dlg.$message('请确认表单是否填写完整！');
								}
							});
						}
					}]
				}
				this.$dialog(options)
			},
			updateStatus(status) { // 启/停用业务部件
				if(this.multipleSelection.length == 0) {
					this.$alert('您还没有选择要操作的数据!', '提示', {
						confirmButtonText: '确定',
						type: 'info',
						callback: action => {}
					});
					return;
				} else {
					var statusText = (status == '0') ? '停用' : '启用'
					this.$confirm('确定要' + statusText + '该项吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let checkedIds = [];
						let len = this.multipleSelection.length
						for(var i = 0; i < len; i++) {
							checkedIds.push(this.multipleSelection[i].C_ID);
						}
						var params = {
							ids: checkedIds.join(','),
							status: status

						};
						this.$api_widget_updateComponentStatus({
							data: params
						}).then(res => {
							this.$message({
								message: statusText + '成功！',
								type: 'success'
							});
							// 刷新列表
							this.getCategoryWidgetTree()
						}).catch(err => {
							console.info(err)
						}).finally(() => {})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消' + statusText + ''
						});
					});
				}
			},
			dblclick(row) { // 列表双击事件
				this.handleCommand('0', row);
			},
			handleCommand(command, row) { // 列表操作列
				if(command == '2') { // 设计
					this.design(row)
				} else if(command == '1') { // 删除
					this.del(row)

				} else if(command == '0') { // 修改
					this.update(row)
				}
			},
			design(row) {
				this.showDesign = true
				this.selRow = row
				this.getBusinessCompConfInfo()
			},
			getBusinessCompConfInfo() { // 获取业务部件配置数据
				var params = {
					compId: this.selRow.C_ID
				};
				this.$api_widget_getBusinessCompConfInfo({
					data: params
				}).then(res => {
					let data = JSON.parse(res)
					// 更新widget参数本地store
					for(var key in data.widgetParams) {
						this.$store.dispatch('update_widget_params', {
							rootPage: this.rootPage,
							widgetId: key,
							params: data.widgetParams[key]
						})
					}
					// 页面widget实例信息
					this.nestedPage = data.nestedPage
					console.info(this.nestedPage)

				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			},
			del(row) {
				this.$confirm('是否确定删除选中数据', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let options = {
						data: {
							'id': row.C_ID
						}
					}
					this.$api_widget_delBusinessComp(options).then(res => {
						this.getCategoryWidgetTree();
						this.$message({
							'message': '删除成功！',
							'type': 'success'
						});
					}).catch(err => {
						this.$message({
							'message': '删除失败！',
							'type': 'error'
						});
					}).finally(() => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			update(row) {
				let dlg = this
				let body = require('./view/businessCompEdit.vue')
				let options = {
					title: '编辑业务部件',
					body: body.default,
					data: row.C_ID,
					that: this,
					buttons: [{
						text: '取消',
						handle: function(options, dlg) {
							dlg.close()
						}
					}, {
						type: 'primary',
						text: '确定',
						handle: function(options, dlg) {
							let form = dlg.$refs.body.form
							dlg.$refs.body.$refs.form.validate((valid) => {
								if(valid) {
									dlg.$refs.body.$api_widget_saveBusinessCompInfo({
										data: form
									}).then(res => {
										dlg.close()
										dlg.$refs.body.$message({
											'message': '保存成功！',
											'type': 'success'
										})
										options.that.getCategoryWidgetTree()
									}).catch(err => {
										console.info(err)
									}).finally(() => {})
								} else {
									dlg.$message('请确认表单是否填写完整！');
								}
							});
						}
					}]
				}
				this.$dialog(options)
			},
			formStatusFormat(row, column) {
				if(row.C_STATUS == '0') {
					return "停用"
				} else if(row.C_STATUS == '1') {
					return "启用"
				}
			},
			handleDelYwComp() { // 删除业务部件
				this.$confirm('是否确定删除该业务部件', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						id: row.C_ID
					};
					this.$api_widget_delBusinessComp({
						data: params
					}).then(res => {
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						// 删除后刷新列表
						this.getCategoryWidgetTree()
					}).catch(err => {
						console.info(err)
					}).finally(() => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleSelectionChange(val) { // 列表选中
				this.multipleSelection = val
				if(val.length > 0 && val.length == 1) {
					this.enabledBtn = false
				} else {
					this.enabledBtn = true
				}
			},
			handleSave() { // 保存
				console.info(this.nestedPage.widgets)
				let nestedWidgets = this.nestedPage.widgets

				this.$api_widget_saveBusinessCompConf({
					data: {
						compId: this.selRow.C_ID,
						widgetIds: JSON.stringify(nestedWidgets)
					}
				}).then(res => {
					this.$message({
						message: '保存成功！',
						type: 'success'
					})
				}).catch(err => {
					console.info(err)
					this.$message({
						'message': '删除失败！',
						'type': 'error'
					})
				}).finally(() => {})
			},
			handleConf(){// 配置
				this.$store.dispatch('update_page_edit_mode', true)
        this.$store.dispatch('update_page_diy_mode', false)
        this.$store.dispatch('update_page_conf_mode', true)
			},
			handleBack() { // 返回
				this.showDesign = false
				this.getCategoryWidgetTree()
			},
			auth(command) {// 业务部件授权
				if(command == '0') {// 用户授权
					let dlg = this
					let body = require('./view/UserAuthForm.vue')
					let options = {
						title: '用户授权',
						width: '80%',
						heigth: '50%',
						that: this,
						body: body.default,
						data: {
							rows: this.multipleSelection[0]
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
								let havePerson = dlg.$refs.body.havePerson
								let params = new Set();
								if(havePerson && havePerson.length > 0) {
									for(let person of havePerson) {
										let para = {
											ywId: dlg.$refs.body.ywId,
											ywType: dlg.$refs.body.ywType,
											grantType: '1',
											grantId: person.C_ID
										}
										params.add(para);
									}
								} else { //当为空的时候，就只删除，不用保存
									let obj = {
										ywId: dlg.$refs.body.ywId,
										ywType: dlg.$refs.body.ywType,
										grantType: '1'
									}
									params.add(obj);
								}
								dlg.$refs.body.$api_site_saveAuthUser({data: params}).then(res => {
									options.that.getCategoryWidgetTree()
									dlg.$refs.body.$message({
										'message': '保存成功！',
										'type': 'success'
									})
									dlg.close()
								}).catch(err => {
									dlg.$refs.body.$message({
										'message': '保存失败！',
										'type': 'error'
									})
								}).finally(() => {})
							}
						}]
					}
					this.$dialog(options)
					
				} else {// 角色授权
					let dlg = this
					let body = require('./view/RolesAuthForm.vue')
					let options = {
						title: '角色授权',
						width: '80%',
						heigth: '50%',
						body: body.default,
						that: this,
						data: {
							rows: this.multipleSelection[0]
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
								let haveRole = dlg.$refs.body.haveRole
								let params = new Set();
								if(haveRole && haveRole.length > 0) {
									for(let role of haveRole) {
										let para = {
											ywId: dlg.$refs.body.ywId,
											ywType: dlg.$refs.body.ywType,
											grantType: '0',
											grantId: role.C_ID
										}
										params.add(para);
									}
								} else { //当为空的时候，就只删除，不用保存
									let obj = {
										ywId: dlg.$refs.body.ywId,
										ywType: dlg.$refs.body.ywType,
										grantType: '0'
									}
									params.add(obj);
								}
								dlg.$refs.body.$api_site_saveAuthRole({data: params}).then(res => {
									options.that.getCategoryWidgetTree()
									dlg.$refs.body.$message({
										'message': '保存成功！',
										'type': 'success'
									})
									dlg.close()
								}).catch(err => {
									dlg.$refs.body.$message({
										'message': '保存失败！',
										'type': 'error'
									})
								}).finally(() => {})
							}
						}]
					}
					this.$dialog(options)					
				}
			}
		},
		computed: {
			rootPage() {
				return this.$store.getters.page
			},
			diyMode() {
				return this.$store.getters.diyMode
			},
			editMode() {
				return this.$store.getters.editMode
			}
		},
		beforeDestroy() {
			this.$store.dispatch('update_page_conf_mode', false)
		},
		created() {
			this.getCategoryWidgetTree()
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
	
	.handle {
		height: 50px;
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 0px solid #e4e7ed;
	}
	
	.handle h2 {
		font-size: 18px;
		font-weight: normal;
	}
	
	.mainLeft{width: 170px;overflow:auto;background: #f6f7fb;float: left;height: 100%;}
  .mainLeft .el-tree{background: #f6f7fb;}
  .mainRight{flex: 1;overflow-y: auto;padding:0 10px;}
	
</style>