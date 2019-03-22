<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<el-row style="margin-bottom: 10px;">
				<div style="float: left;">
          <el-button plain size="mini" type="primary" @click="addMapping">新增</el-button>
        </div>
				<el-input style="float: right;margin-top:0;width:150px;margin-right: 0px;" size="mini" placeholder="请输入关键字" icon="search" v-model="search">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
				</el-input>
			</el-row>
			<el-row class="pannel-box">
				<el-table ref="multipleTable" :data="tableData" v-loading.fullscreen.lock="loading" border style="width: 100%" highlight-current-row >					
					<el-table-column type="index" :index="indexMethod" width="80" align="center">
					</el-table-column>
					<el-table-column prop="C_PATH" label="请求URL">
					</el-table-column>
					<el-table-column prop="C_SERVER" label="服务">
					</el-table-column>
					<el-table-column prop="C_DETAILS" label="说明">
					</el-table-column>
					<el-table-column prop="C_ALLOW" :formatter="formFormatAllow" label="允许公开访问">
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-dropdown trigger="click" placement="bottom-start" @command="(command) => handleCommand(command, scope.row)">
								<div style="width: 60px;"><i class="el-icon-more"></i></div>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="0">修改</el-dropdown-item>
									<el-dropdown-item command="1">删除</el-dropdown-item>
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
		name: 'ant-patterns',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				total: 0,
				pageSize: 10,
				currentPage: 1,
				search: '',
				tableData: [],
				loading: false
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
			searchTableData() { // 搜索mapping信息
				this.$api_widget_getMappingList({
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
			addMapping() {// 新增Mapping请求
				let dlg = this
				let body = require('./view/AntPatternsEdit.vue')
				let options = {
					title: '新增',
					body: body.default,
					that: dlg,
					width: '800px',
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
									this.loading = true
									dlg.$refs.body.$api_widget_saveMapping({
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
										this.loading = false
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
				}
			},
			update (row) {// 修改
				let dlg = this
				let body = require('./view/AntPatternsEdit.vue')
				let options = {
					title: '编辑',
					body: body.default,
					that: dlg,
					width: '800px',
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
									this.loading = true
									dlg.$refs.body.$api_widget_saveMapping({
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
									}).finally(() => {
										this.loading = false
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
					this.$api_widget_deleteMapping(options).then(res => {
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
			formFormatAllow(row, column) { //  允许公开访问格式化
				if(row.C_ALLOW == '0') {
					return "否"
				} else if(row.C_ALLOW == '1') {
					return "是"
				}
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