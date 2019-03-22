<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div v-if="!showDesign" class="widget">
			<el-row style="margin-bottom: 10px;">
				<div style="float: left;">
					<el-button plain size="mini" type="primary" @click="addApp">新增</el-button>
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
					<el-table-column prop="C_CODE" label="模版标识">
					</el-table-column>
					<el-table-column prop="C_NAME" label="模版名称">
					</el-table-column>
					<el-table-column prop="C_LAYOUT_NAME" label="模版布局">
					</el-table-column>
					<el-table-column prop="C_DESC" label="模版描述">
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-dropdown trigger="click" placement="bottom-start" @command="(command) => handleCommand(command, scope.row)">
								<div style="width: 60px;">
									<i class="el-icon-more"></i>
								</div>
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
	name: 'page-template',
	props: ['page', 'params', 'widget', 'i', 'j'],
	data () {
		return {
			total: 0,
			pageSize: 10,
			currentPage: 1,
			search: '',
			tableData: [],
			multipleSelection: [],
			showDesign: false, // 设计部件模式
			selRow: {},
			nestedPage: {
				decorator: "none",
				layout: "default",
				widgets: []
			},
			layout: {
				page: this.nestedPage,
				layout: 'default'
			}
		}
	},
	methods: {
		handleSearch () {
			this.currentPage = 1;
			this.searchTableData();
		},
		handleSizeChange (val) { // 分页查询
			this.pageSize = val;
			this.searchTableData();
		},
		handleCurrentChange (val) { // 分页查询
			this.currentPage = val;
			this.searchTableData();
		},
		indexMethod (index) {
			return (this.currentPage - 1) * this.pageSize + index + 1
		},
		searchTableData () { // 搜索页面模版信息
			this.$api_widget_getPageTempList({
				data: {
					search: this.search,
					page: this.currentPage,
					size: this.pageSize
				},
				fn: data => this.initWidgetTable(data)
			})
		},
		initWidgetTable: function (data) { // 初始化table数据
			this.tableData = data.rows
			this.total = data.total
		},
		addApp () { // 新增页面模版
			let dlg = this
			let body = require('./view/PageTempEdit.vue')
			let options = {
				title: '新增页面模版',
				body: body.default,
				that: this,
				buttons: [{
					text: '取消',
					handle: function (options, dlg) {
						dlg.close()
					}
				}, {
					type: 'primary',
					text: '确定',
					handle: function (options, dlg) {
						let form = dlg.$refs.body.form
						dlg.$refs.body.$refs.form.validate((valid) => {
							if (valid) {
								dlg.$refs.body.$api_widget_savePageTempInfo({
									data: form
								}).then(res => {
									dlg.$refs.body.$message({
										'message': '保存成功！',
										'type': 'success'
									})
									options.that.handleSearch()
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
		dblclick (row) { // 列表双击事件
			this.handleCommand('0', row);
		},
		handleCommand (command, row) { // 列表操作列
			if (command == '1') { // 删除
				this.del(row)

			} else if (command == '0') { // 修改
				this.update(row)

			} else if (command == '2') { // 设计 TODO
				this.design(row)

			}
		},
		del (row) { // 删除应用
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
				this.$api_widget_delPageTemp(options).then(res => {
					this.handleSearch()
					this.$message({
						'message': '删除成功！',
						'type': 'success'
					});
				}).catch(err => {
					this.$message({
						'message': '删除失败！',
						'type': 'error'
					});
				}).finally(() => { })
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		update (row) { // 修改
			let dlg = this
			let body = require('./view/PageTempEdit.vue')
			let options = {
				title: '编辑页面模版',
				body: body.default,
				data: row.C_ID,
				that: this,
				buttons: [{
					text: '取消',
					handle: function (options, dlg) {
						dlg.close()
					}
				}, {
					type: 'primary',
					text: '确定',
					handle: function (options, dlg) {
						let form = dlg.$refs.body.form
						dlg.$refs.body.$refs.form.validate((valid) => {
							if (valid) {
								dlg.$refs.body.$api_widget_savePageTempInfo({
									data: form
								}).then(res => {
									dlg.close()
									dlg.$refs.body.$message({
										'message': '保存成功！',
										'type': 'success'
									})
									options.that.handleSearch()
								}).catch(err => {
									console.info(err)
								}).finally(() => { })
							} else {
								dlg.$message('请确认表单是否填写完整！');
							}
						});
					}
				}]
			}
			this.$dialog(options)
		},
		handleSelectionChange (val) { // 列表选中
			this.multipleSelection = val
			if (val.length > 0 && val.length == 1) {
				this.enabledBtn = false
			} else {
				this.enabledBtn = true
			}
		},
		handleConf () {// 配置
			this.$store.dispatch('update_page_edit_mode', true)
			this.$store.dispatch('update_page_diy_mode', false)
			this.$store.dispatch('update_page_conf_mode', true)
		},
		handleBack () { // 返回
			this.showDesign = false
			this.handleSearch()
		},
		design (row) {
			this.selRow = row
			this.showDesign = true
			this.getPageTempConfInfo(row)
		},
		getPageTempConfInfo (row) { // 获取页面模版配置数据
			var params = {
				layout: row.C_LAYOUT_CODE,
				code: row.C_CODE,
				pageUuId: this.page.pageUuId
			};
			this.$api_widget_getPageTempConfInfo({
				data: params
			}).then(res => {
				let data = JSON.parse(res)
				console.info(data)
				// 更新widget参数本地store
				for (var key in data.widgetParams) {
					this.$store.dispatch('update_widget_params', {
						rootPage: this.rootPage,
						widgetId: key,
						params: data.widgetParams[key]
					})
				}
				// 页面widget实例信息
				this.nestedPage = data.nestedPage
			}).catch(err => {
				console.info(err)
			}).finally(() => { })
		},
		handleSave () { // 保存
			let nestedWidgets = this.nestedPage.widgets

			this.$api_widget_savePageTempConf({
				data: {
					code: this.selRow.C_CODE,
					json: JSON.stringify(nestedWidgets)
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
			}).finally(() => { })
		}
	},
	computed: {
		rootPage() {
			return this.$store.getters.page
		}
	},
	beforeDestroy() {
		this.$store.dispatch('update_page_conf_mode', false)
	},
	created () {
		this.handleSearch()
	}
}
</script>

<style scoped>
.widget {
  min-height: 50px;
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

>>> .el-main {
  padding: 10px 20px;
  position: relative;
  min-height: 400px;
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