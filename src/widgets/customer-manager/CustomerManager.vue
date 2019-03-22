<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<el-row style="margin-bottom: 10px;">
				<div style="float: left;">
          <el-button plain size="mini" type="primary" @click="addCustomer">新增</el-button>
        </div>
				<el-input style="float: right;margin-top:0;width:150px;margin-right: 0px;" size="mini" placeholder="请输入关键字" icon="search" v-model="search">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
				</el-input>
			</el-row>
			<el-row class="pannel-box">
				<el-table ref="multipleTable" :data="tableData"  border style="width: 100%" highlight-current-row >					
					<el-table-column type="index" :index="indexMethod" width="80" align="center">
					</el-table-column>
					<el-table-column prop="C_NAME" label="客户名称">
					</el-table-column>
					<el-table-column prop="C_CODE" label="客户标识">
					</el-table-column>
					<el-table-column prop="C_DOMAIN" label="域名">
					</el-table-column>
					<el-table-column prop="C_ONLINE_USER" label="在线用户数">
					</el-table-column>
					<el-table-column prop="C_DB_TYPE" label="数据库类型">
					</el-table-column>
					<el-table-column prop="C_DSURL" label="数据库地址">
					</el-table-column>
					<el-table-column prop="C_DSDRIVERCLASSNAME" label="数据库驱动">
					</el-table-column>
					<el-table-column prop="C_DSUSERNAME" label="数据库用户名">
					</el-table-column>
					<el-table-column prop="C_DB_DIALECT" label="数据库Schema">
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-dropdown trigger="click" placement="bottom-start" @command="(command) => handleCommand(command, scope.row)">
								<div style="width: 60px;"><i class="el-icon-more"></i></div>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="0">修改</el-dropdown-item>
									<el-dropdown-item command="1">删除</el-dropdown-item>
									<!--<el-dropdown-item command="2">测试连接</el-dropdown-item>
									<el-dropdown-item command="3">初始化</el-dropdown-item>
									<el-dropdown-item command="4">重置管理员密码</el-dropdown-item>-->
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
	</decorator>
</template>

<script>
	export default {
		name: 'customer-manager',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				total: 0,
				pageSize: 10,
				currentPage: 1,
				search: '',
				tableData: []
			}
		},
		methods: {
		  handleSearch() {
        this.currentPage = 1;
        this.searchTableData();		    
		  },
			handleSizeChange(val) { // 分页查询
				this.pageSize = val;
				this.searchTableData();
			},
			handleCurrentChange(val) { // 分页查询
				this.currentPage = val;
				this.searchTableData();
			},
			searchTableData() { // 搜索租户信息
				this.$api_user_getCustomerList({
					data: {
						search: this.search,
						page: this.currentPage,
						size: this.pageSize
					},
					fn: data => this.initWidgetTable(data)
				})
			},
			initWidgetTable: function(data) { // 初始化table数据
				this.tableData = data.rows
				this.total = data.total
			},
			indexMethod(index) {
				return(this.currentPage - 1) * this.pageSize + index + 1
			},
			addCustomer() {// 新增租户
 				// 新增业务部件
				let dlg = this
				let body = require('./view/CustomerEdit.vue')
				let options = {
					title: '新增租户',
					body: body.default,
					that: dlg,
					width: '950px',
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
									dlg.$refs.body.$api_user_saveCustomer({
										data: form
									}).then(res => {
										dlg.$refs.body.$message({
											'message': '保存成功！',
											'type': 'success'
										})
										options.that.searchTableData()
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
					}, {
						type: 'primary',
						text: '测试连接',
						handle: function(options, dlg) {
							let form = dlg.$refs.body.form
							if (form.id == '') {
								dlg.$message('请先保存表单！');
								return
							}
							dlg.$refs.body.$refs.form.validate((valid) => {
								if(valid) {
									dlg.$refs.body.$api_user_testCustomerConn({
										data: form
									}).then(res => {
										dlg.$refs.body.$message({
											'message': '测试连接成功！',
											'type': 'success'
										})
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
			handleCommand(command, row) { // 列表操作列
				if(command == '0') { // 修改
					this.update(row)

				} else if(command == '1') { // 删除
					this.del(row)

				} else if (command == '2') { // 测试连接
					this.testConn(row)

				} else if (command == '3') { // 初始化
					this.initSchema(row)

				} else if (command == '4') { // 重置管理员密码
					this.initPassword(row)

				}
			},
			update (row) {// 修改
				let dlg = this
				let body = require('./view/CustomerEdit.vue')
				let options = {
					title: '编辑租户',
					body: body.default,
					that: dlg,
					width: '950px',
					data: row.C_ID,
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
									dlg.$refs.body.$api_user_saveCustomer({
										data: form
									}).then(res => {
										dlg.close()
										dlg.$refs.body.$message({
											'message': '保存成功！',
											'type': 'success'
										})
										options.that.searchTableData()
									}).catch(err => {
										console.info(err)
									}).finally(() => {})
								} else {
									dlg.$message('请确认表单是否填写完整！');
								}
							});
						}
					}, {
						type: 'primary',
						text: '测试连接',
						handle: function(options, dlg) {
							let form = dlg.$refs.body.form
							dlg.$refs.body.$refs.form.validate((valid) => {
								if(valid) {
									dlg.$refs.body.$api_user_testCustomerConn({
										data: form
									}).then(res => {
										dlg.$refs.body.$message({
											'message': '测试连接成功！',
											'type': 'success'
										})
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
			del (row) {// 删除
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
					this.$api_user_deleteCustomer(options).then(res => {
						this.searchTableData();
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
			testConn (row) {// 测试连接
		    let params = {
          data: row
        }
        this.$api_user_testCustomerConn({
          data: params
        }).then(res => {
          this.$message({
            'message': '测试连接成功！',
            'type': 'success'
          })
          this.searchTableData()
        }).catch(err => {
          console.info(err)
        }).finally(() => {
        })
			},
			initSchema (row) {// 初始化

			},
			initPassword (row) {// 重置管理员密码

			}
		},
		computed: {
		},
		created() {
			this.searchTableData()
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
</style>