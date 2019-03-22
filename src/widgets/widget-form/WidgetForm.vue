<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">

			<el-row style="margin-bottom: 10px;">
				<div style="float: left;">
					<el-button size="mini" type="primary" @click="addFormTemp">新增</el-button>
					<el-button size="mini" type="primary" @click="updateStatus('1')">启用</el-button>
					<el-button size="mini" type="primary" @click="updateStatus('0')">停用</el-button>
					<!--<el-button size="mini" type="primary" @click="addForm">模拟新增表单数据</el-button>-->
				</div>
				<el-input style="float: right;margin-top:0;width:150px;margin-right: 0px;" size="mini" placeholder="请输入关键字" icon="search" v-model="search">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="searchTableData"></i>
				</el-input>
				<el-select clearable style="float: right;margin-top:0;width:150px;margin-right: 10px;" size="mini" v-model="ywType" @change="handleYwTypeChange" placeholder="请选择业务类型">
					<el-option v-for="item in formYwOptions" :key="item.VALUE" :label="item.LABEL" :value="item.VALUE">
					</el-option>
				</el-select>
				<el-select clearable style="float: right;margin-top:0;width:150px;margin-right: 10px;" size="mini" v-model="mbType" @change="handleYwTypeChange" placeholder="请选择模板类型">
					<el-option v-for="item in formMbOptions" :key="item.VALUE" :label="item.LABEL" :value="item.VALUE">
					</el-option>
				</el-select>
			</el-row>

			<el-row class="pannel-box">
				<el-table ref="multipleTable" :data="tableData" @row-click="rowClick" @row-dblclick="dblclick" border style="width: 100%" highlight-current-row @selection-change="handleSelectionChange">
					<el-table-column  type="selection" width="40"></el-table-column>
					<el-table-column type="index" :index="indexMethod" width="80" align="center">
					</el-table-column>
					<el-table-column prop="C_FORM_FLAG" label="模版标识">
					</el-table-column>
					<el-table-column prop="C_FORM_NAME" label="模版名称">
					</el-table-column>
					<el-table-column prop="C_FORM_TYPE" align="center" label="模版类型" width="80">
						<template slot-scope="scope">
							<i v-if="scope.row.C_FORM_TYPE == '0'" title="表单" class="iconfont icon-icon-paper"></i>
							<i v-else-if="scope.row.C_FORM_TYPE == '1'" title="表格" class="iconfont icon-duoxuanjuzhen"></i>
							<i v-else-if="scope.row.C_FORM_TYPE == '2'" title="树" class="iconfont icon-icon-listrich-copy"></i>
						</template>
					</el-table-column>
					<el-table-column prop="C_TEXT" label="业务类型" align="center" width="120">
					</el-table-column>
					<el-table-column prop="C_STATUS" label="状态" align="center" width="80" :formatter="formStatusFormat" >
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
	</decorator>
</template>

<script>
	import Widgets from 'widgets'

	export default {
		name: 'form-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				total: 0,
				pageSize: 10,
				currentPage: 1,
				search: '',
				ywType: '',
				mbType: '',
				tableData: [],
				selectRow: {},
				formYwOptions: [],
				formMbOptions: [{VALUE:'0',LABEL:'表单'},{VALUE:'1',LABEL:'表格'},{VALUE:'2',LABEL:'树'}],
				multipleSelection: []
			}
		},
		methods: {
			initWidgetTable: function(data) { // 初始化table数据
				this.tableData = data.rows
				this.total = data.total
			},
			addForm() { // 模拟新增表单数据
				if(Object.keys(this.selectRow).length === 0) {
					this.$message('请选择一笔表单模版！')
				} else {
					if(this.selectRow.C_FORM_TYPE != '0') {
						this.$message('请选择一笔form表单模版！')
						return
					}
					let dlg = this
					dlg.params.formFlag = this.selectRow.C_FORM_FLAG
					let body = require('./view/testForm.vue')
					let options = {
						title: '新增' + this.selectRow.C_FORM_NAME,
						width: '80%',
						heigth: '70%',
						body: body.default,
						that: this,
						data: {
							page: dlg.page,
							params: dlg.params,
							widget: dlg.widget,
							i: dlg.i,
							j: dlg.j
						},
						buttons: [{
							text: '取消',
							handle: function(options, dlg) {
								options.visible = false
							}
						}, {
							type: 'primary',
							text: '确定',
							handle: function(options, dlg) {
								let form = dlg.$children[0].$children[0].$children[0].model
								let config = dlg.$children[0].$children[0].$children[0].config
								for(var key in form) {
									if(new RegExp('GMT').test(form[key])) {
										var d = new Date(form[key])
										if(d) {
											form[key] = options.that.formatDate(d, 'yyyy-MM-dd hh:mm:ss')
										}
									}
								}
								form.tableName = config.dataSource
								dlg.$children[0].$children[0].$children[0].$refs.editorForm.validate((valid) => {
									if(valid) {
										dlg.$children[0].$children[0].$children[0].$api_form_saveFormData({
											data: form
										}).then(res => {
											options.visible = false
										}).catch(err => {
											console.info(err)
										}).finally(() => {
											options.that.$message({
												'message': '保存成功！',
												'type': 'success'
											})
										})
									} else {
										dlg.$message('请确认表单是否填写完整！');
									}
								});
							}
						}]
					}
					this.$dialog(options)
				}
			},
			rowClick(row) { // 单击数据行
				this.selectRow = row
			},
			checkDate(val) {
				if(val.indexOf('GMT+0800') != -1) {
					return true
				} else {
					return false
				}
			},
			formatDate(date, fmt) {
				if(/(y+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
				}
				let o = {
					'M+': date.getMonth() + 1,
					'd+': date.getDate(),
					'h+': date.getHours(),
					'm+': date.getMinutes(),
					's+': date.getSeconds()
				}
				for(let k in o) {
					let str = o[k] + '';
					if(new RegExp(`(${k})`).test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
					}
				}
				return fmt;
			},
			padLeftZero(str) {
				return('00' + str).substr(str.length);
			},
			addFormTemp() { // 新增form模板数据
				let dlg = this
				let body = require('./view/formEdit.vue')
				let options = {
					title: '新增表单模板',
					body: body.default,
					that: this,
					buttons: [{
						text: '取消',
						handle: function(options, dlg) {
							options.visible = false
						}
					}, {
						type: 'primary',
						text: '确定',
						handle: function(options, dlg) {
							let form = dlg.$children[0].$children[0].form
							dlg.$children[0].$children[0].$refs.form.validate((valid) => {
								if(valid) {
									dlg.$children[0].$children[0].$api_form_saveFormTempInfo({
										data: form
									}).then(res => {
										options.visible = false
									}).catch(err => {
										console.info(err)
									}).finally(() => {
										options.that.$message({
											'message': '保存成功！',
											'type': 'success'
										})
										options.that.getFormTempData()
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
			handleCommand(command, row) {
				if(command == '2') { // 设计
					let bobyComp
					let title
					let widgetName
					if(row.C_FORM_TYPE == '0') { // 表单form
						bobyComp = require('./view/formDesign.vue')
						title = 'form表单设计'
						widgetName = 'form-widget'
					} else if(row.C_FORM_TYPE == '1') { // table列表
						bobyComp = require('./view/tableDesign.vue')
						title = 'table表格设计'
						widgetName = 'table-widget'
					} else if(row.C_FORM_TYPE == '2') { // 树
						bobyComp = require('./view/treeDesign.vue')
						title = 'tree树设计'
						widgetName = 'tree-widget'
					}
					let dlg = this
					let body = bobyComp
					let options = {
						title: title,
						width: '100%',
						heigth: '100%',
						'fullscreen': true,
						body: body.default,
						data: {
							page: dlg.page,
							params: {
								formFlag: dlg.params,
								decorator: 'default'
							},
							widget: {
								id: this.$_.now(),
								name: widgetName,
								hidden: true
							},
							i: dlg.i,
							j: dlg.j,
							fm: row
						},
					}
					this.$dialog(options)
				} else if(command == '1') { // 删除
					
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
						this.$api_form_delFormTempInfo(options).then(res => {
							this.getFormTempData();
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
				} else if(command == '0') { // 修改
					let dlg = this
					let body = require('./view/formEdit.vue')
					let options = {
						title: '编辑表单模板',
						body: body.default,
						data: row.C_ID,
						that: this,
						buttons: [{
							text: '取消',
							handle: function(options, dlg) {
								options.visible = false
							}
						}, {
							type: 'primary',
							text: '确定',
							handle: function(options, dlg) {
								let form = dlg.$children[0].$children[0].form
								dlg.$children[0].$children[0].$refs.form.validate((valid) => {
									if(valid) {
										dlg.$children[0].$children[0].$api_form_saveFormTempInfo({
											data: form
										}).then(res => {
											options.visible = false
											options.that.$message({
												'message': '保存成功！',
												'type': 'success'
											})
											options.that.getFormTempData()
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
				}
			},
			getFormTempData() {
				this.$api_form_getFormTempInfo({
					data: {
						ywType: this.ywType,
						search: this.search,
						dicKey: 'form_yw_type',
						mbType: this.mbType,
						page: this.currentPage,
						size: this.pageSize
					},
					fn: data => this.initWidgetTable(data)
				})
			},
			dblclick(row) { //双击
				this.handleCommand('0', row);
			},
			formTypeFormat(row, column) {
				if(row.C_FORM_TYPE == '0') {
					return "表单"
				} else if(row.C_FORM_TYPE == '1') {
					return "表格"
				} else if(row.C_FORM_TYPE == '2') {
					return '树'
				}
			},
			formStatusFormat(row, column) {
				if(row.C_STATUS == '0') {
					return "停用"
				} else if(row.C_STATUS == '1') {
					return "启用"
				}
			},
			searchTableData() {
				this.getFormTempData()
			},
			handleSizeChange(val) { //2.分页设置
				this.pageSize = val;
				this.getFormTempData();
			},
			handleCurrentChange(val) { //2.分页设置
				this.currentPage = val;
				this.getFormTempData();
			},
			getFormYwOptions() {
				let options = {
					data: {
						dicKey: 'form_yw_type'
					}
				}
				this.$api_form_getDicItemByKey(options).then((data) => {
					if(data) {
						 this.formYwOptions = data
					}
				})
			},
			handleYwTypeChange(val) {
				this.getFormTempData();
			},
			indexMethod(index) {
				return (this.currentPage - 1) * this.pageSize + index + 1
			},
		    handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
			updateStatus(status){
				if(this.multipleSelection.length==0){
					this.$alert('您还没有选择要操作的数据!', '提示', {
						confirmButtonText: '确定',
						type: 'info',
						callback: action => {}
					});
					return;
				}else{
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
							this.$api_form_updateTempStatus({
								data: params
							}).then(res => {
								this.$message({
									message: statusText + '成功！',
									type: 'success'
								});
								// 刷新列表
								this.getFormTempData()
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
			}
		},
		created() {
			this.getFormYwOptions();
			this.getFormTempData()
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
</style>