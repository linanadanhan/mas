<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page" v-loading="loading">
		<el-row style="margin-bottom: 10px;">
			<div style="float: left;">
				<el-button plain size="mini" type="primary" @click="addApp">新增</el-button>
				<el-button plain size="mini" type="primary" @click="updateStatus('1')">启用</el-button>
				<el-button plain size="mini" type="primary" @click="updateStatus('0')">停用</el-button>
			</div>
			<div style="float: left;padding-left: 10px;">
				<el-upload :on-success="uploadSuccess" :action="fileUploadUrl" :show-file-list="false" :before-upload="beforeUpload">
					<el-button plain size="mini" type="primary">导入</el-button>
				</el-upload>
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
				<el-table-column prop="C_CODE" label="应用标识">
				</el-table-column>
				<el-table-column prop="C_NAME" label="应用名称">
				</el-table-column>
				<el-table-column prop="C_DESC" label="应用描述">
				</el-table-column>
				<el-table-column prop="C_STATUS" label="状态" align="center" width="80" :formatter="formStatusFormat">
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
								<el-dropdown-item command="2">关联页面模版</el-dropdown-item>
								<el-dropdown-item command="3">复制</el-dropdown-item>
								<el-dropdown-item command="4">导出</el-dropdown-item>
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
	</decorator>
</template>

<script>
import { gbs } from 'config'
export default {
	name: 'app-manager',
	props: ['page', 'params', 'widget', 'i', 'j'],
	data () {
		return {
			total: 0,
			pageSize: 10,
			currentPage: 1,
			search: '',
			tableData: [],
			multipleSelection: [],
			loading: false,
			fileDownloadUrl: '',
			fileUploadUrl: ''
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
		searchTableData () { // 搜索app信息
			this.$api_widget_getAppList({
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
		addApp () { // 新增app
			let dlg = this
			let body = require('./view/AppEdit.vue')
			let options = {
				title: '新增应用',
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
								dlg.$refs.body.$api_widget_saveAppInfo({
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

			} else if (command == '2') { // 关联模版
				this.relPageTemp(row)

			} else if (command == '3') { // 复制
				this.copyApp(row)

			} else if (command == '4') { // 导出
				this.exportApp(row)
			}
		},
		relPageTemp (row) { // 关联页面模版
			let dlg = this
			let body = require('./view/RelPageTemp.vue')
			let options = {
				title: '关联页面模版',
				body: body.default,
				width: '80%',
				heigth: '50%',
				that: this,
				data: row,
				buttons: [{
					text: '取消',
					handle: function (options, dlg) {
						dlg.close()
					}
				}, {
					type: 'primary',
					text: '确定',
					handle: function (options, dlg) {
						let havePageTemp = dlg.$refs.body.havePageTemp
						let params = new Set();
						if (havePageTemp && havePageTemp.length > 0) {
							for (let pageTemp of havePageTemp) {
								let para = {
									pageTempCode: pageTemp.C_CODE,
									appCode: row.C_CODE
								}
								params.add(para);
							}
						} else { //当为空的时候，就只删除，不用保存
							let obj = {
								appCode: row.C_CODE
							}
							params.add(obj);
						}
						dlg.$refs.body.$api_widget_saveAppRelPageTemp({ data: params }).then(res => {
							options.that.handleSearch()
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
						}).finally(() => { })
					}
				}]
			}
			this.$dialog(options)
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
				this.$api_widget_delApp(options).then(res => {
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
		update (row) {
			let dlg = this
			let body = require('./view/AppEdit.vue')
			let options = {
				title: '编辑应用',
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
								dlg.$refs.body.$api_widget_saveAppInfo({
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
		formStatusFormat (row, column) {
			if (row.C_STATUS == '0') {
				return "停用"
			} else if (row.C_STATUS == '1') {
				return "启用"
			}
		},
		handleSelectionChange (val) { // 列表选中
			this.multipleSelection = val
			if (val.length > 0 && val.length == 1) {
				this.enabledBtn = false
			} else {
				this.enabledBtn = true
			}
		},
		updateStatus (status) { // 启/停用应用
			if (this.multipleSelection.length == 0) {
				this.$alert('您还没有选择要操作的数据!', '提示', {
					confirmButtonText: '确定',
					type: 'info',
					callback: action => { }
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
					for (var i = 0; i < len; i++) {
						checkedIds.push(this.multipleSelection[i].C_ID);
					}
					var params = {
						ids: checkedIds.join(','),
						status: status

					};
					this.$api_widget_updateAppStatus({
						data: params
					}).then(res => {
						this.$message({
							message: statusText + '成功！',
							type: 'success'
						});
						// 刷新列表
						this.handleSearch()
					}).catch(err => {
						console.info(err)
					}).finally(() => { })
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消' + statusText + ''
					});
				});
			}
		},
		copyApp (row) { // 应用复制
			let dlg = this
			let body = require('./view/CopyApp.vue')
			let options = {
				title: '复制应用',
				body: body.default,
				that: this,
				data: {},
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
						form.id = row.C_ID
						dlg.$refs.body.$refs.form.validate((valid) => {
							if (valid) {
								dlg.$refs.body.$api_widget_copyAppInfo({
									data: form
								}).then(res => {
									options.that.$message({
										'message': '复制成功！',
										'type': 'success'
									})
									options.that.handleSearch()
									dlg.close()
								}).catch(err => {
									console.info(err)
									this.$message({
										'message': '复制失败！',
										'type': 'error'
									});
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
		exportApp (row) { // 导出应用
			let params = {
				id: row.C_ID
			}
			this.loading = true
			this.$api_widget_exportApp({
				data: params
			}).then(res => {
				window.location.href = this.fileDownloadUrl + "/" + res;
			}).catch(err => {
				this.$message({
					type: 'error',
					message: '导出失败!'
				});
			}).finally(() => {
				this.loading = false
			})
		},
		beforeUpload (file) { // 导入前校验
			var mime = file.name.toLowerCase().substr(file.name.lastIndexOf("."));
			var allow = (mime === '.zip')
			const isLt2M = file.size / 1024 / 1024 / 2 < 20;
			if (!allow) {
				this.$message.error('应用包只能是 zip格式!');
			}
			if (!isLt2M) {
				this.$message.error('应用包大小不能超过 20MB!');
			}
			if (allow && isLt2M) {
				this.loading2 = true;
			}
			return allow && isLt2M;
		},
		uploadSuccess (response, file, fileList) { // 导入成功处理
			this.loading2 = false;
			if (response && response.referenceId) {
				let params = {
					referenceId: response.referenceId,
					fileName: response.name
				}
				this.importApp(params);
			} else {
				this.$message({
					type: 'error',
					message: '导入失败'
				});
			}
		},
		importApp (params) { // 应用导入实作
			this.loading2 = true;
			this.$api_widget_importApp({data:params}).then((data) => {
				this.loading2 = false;
				if (data === '1') { // 应用包已存在
					this.$confirm('应用包已存在，是否覆盖？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						params.isCover = '1'
						this.importApp(params);
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消导入'
						});
					});
				} else {
					this.$message({
						message: '导入成功',
						type: 'success'
					});
					this.handleSearch();
				}
			}).catch((e) => {
				this.loading2 = false;
				this.$message({
					type: 'error',
					message: "导入失败,原因:" + e
				});
			});
		}
	},
	computed: {
	},
	created () {
		this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
		this.fileUploadUrl = gbs.fileServiceUrl + '/file/uploadFile'
		this.handleSearch()
	}
}
</script>

<style scoped>
.widget {
  min-height: 50px;
}
</style>