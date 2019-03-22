<template>
	<div>
		<el-row class="tool-bar">
			<el-button v-if="((item.default && item.isCheck && item.type !='5') || item.type == '9') && filter(item)" v-for="(item,index) in config.tool.type" @click="handleToolButton(item)" :key="index" type="primary" plain size="mini">
				{{item.text ? item.text : item.name}}
			</el-button>
			<el-upload style="display: inline-block;" v-for="(item,index) in config.tool.type" v-if="(item.type == '5' && item.default && item.isCheck)" :key="index" :on-success="uploadSuccess" :action="fileUploadUrl" :show-file-list="false" :on-change="handleFileChange" :before-upload="beforeFileUpload">
				<el-button size="mini" type="primary">{{item.text ? item.text : item.name}}</el-button>
			</el-upload>
		</el-row>
		<el-table :data="tableData" v-bind="config.table" 
		:header-cell-style="handleTheadStyle" 
		:cell-style="handleRowStyle"
		@selection-change="selectionChange" 
		@header-dragend="headerDragend" 
		@sort-change="handleSortChange" 
		@row-click="rowClick" class="browser-table">
			<el-table-column v-if="config.table.checkbox" type="selection" width="55"></el-table-column>
			<el-table-column v-if="config.table.orderNumber" type="index" width="55"></el-table-column>
			<el-table-column v-for="(col,index) in config.rows[0].children" v-if="!col.hideCol" :formatter="formatColumnLabel" :key="index" v-bind="filterCol(col)" type="" :sortable="col.sortable">
				<template slot-scope="scope">
					<span v-if="!col.type">
						<span>{{formatterLabel(scope.row[col.prop], col)}}</span>
					</span>
					<div v-else>
						<el-dropdown trigger="click" placement="bottom-start" @command="(command) => handleCommand(command, scope.row)">
							<span class="el-dropdown-link" :size="config.table.size">···</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-if="((item.default && item.isCheck) || item.type == '9') && filter(item)" v-for="(item,o) in col.type" :command="item" :key="o">{{item.text ? item.text : item.name}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</template>
				<table-column :config="col.children" />
			</el-table-column>

		</el-table>
		<el-pagination v-if="config.tool.page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	import TableColumn from './TableColumn.vue'
	import { gbs } from 'config'
	export default {
		props: ['tableData', 'config', 'page', 'params', 'initParam', 'widget', 'total', 'permission'],
		data() {
			return {
				currentPage: 1,
				pageSize: 20,
				checkFormData: [],
				fileList: [],
				importFiles: {},
				fileUploadUrl: '',
				fileDownloadUrl: '',
				dicItms: {}
			}
		},
		computed: {
			userInfo () {
		      return this.$store.getters.userinfo
		    }
		},
		components: {
			'table-column': TableColumn
		},
		methods: {
			handleTheadStyle({row, column, rowIndex, columnIndex}){
				return {
					background: this.config.table.theadStyle.bgStyle,
					color: this.config.table.theadStyle.colorStyle,
					borderColor: this.config.table.theadStyle.borderStyle
				}
			},
			handleRowStyle({row, column, rowIndex, columnIndex}){
				if( rowIndex % 2 == 0 ){
					return {
						background: this.config.table.evenRowStyle.bgStyle,
						color: this.config.table.evenRowStyle.colorStyle,
						borderColor: this.config.table.evenRowStyle.borderStyle
					}
				}else{
					return {
						background: this.config.table.oddRowStyle.bgStyle,
						color: this.config.table.oddRowStyle.colorStyle,
						borderColor: this.config.table.oddRowStyle.borderStyle
					}
				}
			},
			uploadSuccess(response, file, fileList) {
				this.importFiles = response
				console.info(this.importFiles)
				console.info(this.config.table.resource)
				this.importFiles.tableName = this.config.table.resource
				this.$api_form_importData({
					data: this.importFiles
				}).then(res => {
					this.$message({
						message: '导入成功！',
						type: 'success'
					});
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			},
			handleFileChange(file, fileList) {
				this.fileList = fileList.slice(-3);
			},
			beforeFileUpload(file) {
				const isxlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
				if(!isxlsx) {
					this.$message.error('只能上传xlsx文件!');
				}
				return isxlsx;
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.$parent.$parent.$parent.tablePageQry(this.pageSize, this.currentPage)
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.$parent.$parent.$parent.tablePageQry(this.pageSize, this.currentPage)
			},
			selectionChange(val) {
				this.checkFormData = val; //选中数据
			},
			headerDragend(newWidth, oldWidth, column, event) {// 拖动表头改变列宽
				let prop = column.property
				let order = column.order
				let sortable = column.sortable
				
				let columnProps = this.params.hasOwnProperty('columnProps')
				if (columnProps) {
					let columnProp = this.params.columnProps
					let columnIsExist = columnProp[prop]
					if (columnIsExist) {
						columnIsExist.order = order
						columnIsExist.columnWidth = newWidth
					}else {
						columnIsExist = {
							'columnWidth': newWidth,
							'sortable': sortable,
							'order': order
						}
					}
					columnProp[prop] = columnIsExist
					this.$set(this.params, 'columnProps', columnProp)
				}else{
					let colProp = {
						'columnWidth': newWidth,
						'sortable': sortable,
						'order': order
					}
					this.$set(this.params, 'columnProps', {[prop]: colProp})
				}
				// 保存值偏好数据
				this.saveProfileConf()
			},
			handleSortChange(obj) {
				let prop = obj.prop
				let order = obj.order
				let columnProps = this.params.hasOwnProperty('columnProps')
				if (columnProps) {
					let columnProp = this.params.columnProps
					let columnIsExist = columnProp[prop]
					if (columnIsExist) {
						columnIsExist.order = order						
					}else {
						columnIsExist = {
							'columnWidth': '',
							'sortable': true,
							'order': order
						}
					}
					columnProp[prop] = columnIsExist
					this.$set(this.params, 'columnProps', columnProp)
				}else{
					let colProp = {
						'columnWidth': '',
						'sortable': true,
						'order': order
					}
					this.$set(this.params, 'columnProps', {[prop]: colProp})
				}
				// 保存值偏好数据
				this.saveProfileConf()
			},
			saveProfileConf() {// 保存偏好数据
				console.info(this.params)
				this.$api_site_saveProfileConf({
					data: {
							widgetUuId: this.widget.id,
							diyMode: true,
							json: JSON.stringify(this.params)
						}
				})
			},
			rowClick(row, column) { //单击行事件
				// 判断是否开启单击行事件
				if (this.config.tool.isRowClick) {
					if (this.config.tool.rowClickType == 'view' && this.config.tool.viewFormFlag != '') {// 查看详情
						var command = {
							type: '2',
							name: '',
							formFlag: this.config.tool.viewFormFlag
						}
						this.handleCommand(command, row)					
						
					}else if (this.config.tool.rowClickType == 'process') {// 流程审批
						let bobyComp = require('./view/processAdvice.vue')
						let title = ''
						let dlg = this
						let body = bobyComp
						let options = {
							title: title,
							body: body.default,
							width: '100%',
							heigth: '100%',
							'fullscreen': true,
							data: {
								row: row
							}
						}
						this.$dialog(options)
					}
				}
			},
			handleCommand(command, row) { // 操作按钮操作
				if(command.type == '1') { // 表单修改
					let bobyComp = require('./view/formBrowser.vue')
					let title = command.name
					var fomFlag = command.formFlag
					let dlg = this
					let body = bobyComp
					let options = {
						title: title,
						width: '80%',
						heigth: '70%',
						body: body.default,
						that: this,
						data: {
							page: dlg.page,
							params: dlg.params,
							widget: dlg.widget,
							formFlag: fomFlag,
							id: row.C_ID
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
									//									if(new RegExp('GMT').test(form[key])) {
									//										var d = new Date(form[key])
									//										if(d) {
									//											form[key] = options.that.formatDate(d, 'yyyy-MM-dd hh:mm:ss')
									//										}
									//									}
									if (form[key] === '') {
										form[key.toUpperCase()] = null
									}else {
										form[key.toUpperCase()] = form[key]
									}
								}
								if(options.that.initParam) {
									for(var field in options.that.initParam) {
										console.info(field, options.that.initParam[field])
										form[field.toUpperCase()] = options.that.initParam[field]
									}
								}
								// 登录用户名
								form.personName = options.that.userInfo.username
								form.tableName = config.dataSource
								dlg.$children[0].$children[0].$children[0].$refs.editorForm.validate((valid) => {
									if(valid) {
										dlg.$children[0].$children[0].$children[0].$api_form_saveFormData({
											data: form
										}).then(res => {
											options.visible = false
											options.that.$parent.$parent.$parent.closeAndRefresh()
											options.that.$message({
												'message': '保存成功！',
												'type': 'success'
											})
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
				} else if(command.type == '0') { // 删除
					if(this.config.table.resource) {
						this.$confirm('是否确定删除选中数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							var params = {
								ids: row.C_ID,
								tableName: this.config.table.resource
							};
							this.$api_form_delFormData({
								data: params
							}).then(res => {
								this.$message({
									message: '删除成功！',
									type: 'success'
								});
								// 删除后刷新列表
								this.$parent.$parent.$parent.closeAndRefresh()
							}).catch(err => {
								console.info(err)
							}).finally(() => {})
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					}
				} else if(command.type == '3') { // 下载
					if(row.C_REFERENCE_ID && row.C_REFERENCE_ID.length > 0) {
						var files = row.C_REFERENCE_ID.split(',')
						if(files.length > 0) {
							for(var i in files) {
								window.location.href = this.fileDownloadUrl + "/" + files[i];
							}
						}
					} else {
						this.$message({
							type: 'info',
							message: '无下载文件'
						});
					}

				} else if(command.type == '2') { // 查看

					if(command.formFlag == '') {
						this.$message({
							type: 'info',
							message: '未找到查看表单'
						});
						return
					}
					let bobyComp = require('./view/formBrowser.vue')
					let title = command.name
					var fomFlag = command.formFlag
					let dlg = this
					let body = bobyComp
					let options = {
						title: title,
						width: '80%',
						heigth: '70%',
						body: body.default,
						that: this,
						data: {
							page: dlg.page,
							params: dlg.params,
							widget: dlg.widget,
							formFlag: fomFlag,
							id: row.C_ID,
							viewMode: true
						}
					}
					this.$dialog(options)
				}
			},
			handleToolButton(item) { // 列表toolBar按钮区域
				if(item.type == '2') { // 表单新增
					let bobyComp = require('./view/formBrowser.vue')
					let title = '新增'
					var fomFlag = item.formFlag
					let dlg = this
					let body = bobyComp
					let options = {
						title: title,
						width: '80%',
						heigth: '70%',
						'append-to-body': true,
						body: body.default,
						that: this,
						data: {
							page: dlg.page,
							params: dlg.params,
							widget: dlg.widget,
							formFlag: fomFlag
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
									if (form[key] === '') {
										form[key.toUpperCase()] = null
									}else {
										form[key.toUpperCase()] = form[key]
									}
								}
								// 登录用户名
								form.personName = options.that.userInfo.username
								form.tableName = config.dataSource
								console.info(options.that.initParam)
								if(options.that.initParam) {
									for(var field in options.that.initParam) {
										console.info(field, options.that.initParam[field])
										form[field.toUpperCase()] = options.that.initParam[field]
									}
								}

								dlg.$children[0].$children[0].$children[0].$refs.editorForm.validate((valid) => {
									if(valid) {
										dlg.$children[0].$children[0].$children[0].$api_form_saveFormData({
											data: form
										}).then(res => {
											options.visible = false
											options.that.$message({
												'message': '保存成功！',
												'type': 'success'
											})
											//关闭刷新事件
											options.that.$parent.$parent.$parent.closeAndRefresh()

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

				} else if(item.type == '0') { // 批量删除
					if(!this.checkFormData || this.checkFormData.length == 0) {
						this.alertDialog('您还没有选择要删除的数据!', '提示');
						return;
					} else {
						this.$confirm('是否确定删除选中数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							var params = {
								ids: this.getIds(),
								tableName: this.config.table.resource
							};
							this.$api_form_delFormData({
								data: params
							}).then(res => {
								this.$message({
									message: '删除成功！',
									type: 'success'
								});
								// 删除后刷新列表
								this.$parent.$parent.$parent.closeAndRefresh()
							}).catch(err => {
								console.info(err)
							}).finally(() => {})
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					}
				} else if(item.type == '3' || item.type == '4') { //停用、启用
					if(!this.checkFormData || this.checkFormData.length == 0) {
						this.alertDialog('您还没有选择要操作的数据!', '提示');
						return;
					} else {
						var statusText = (item.type == '3') ? '停用' : '启用'
						this.$confirm('确定要' + statusText + '该项吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							var params = {
								ids: this.getIds(),
								tableName: this.config.table.resource
							};
							if(item.type == '3') {
								params.status = false
							} else {
								params.status = true
							}
							this.$api_form_updateFormStatus({
								data: params
							}).then(res => {
								this.$message({
									message: statusText + '成功！',
									type: 'success'
								});
								// 删除后刷新列表
								this.$parent.$parent.$parent.closeAndRefresh()
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
				} else if(item.type == '5') { // 导入
				} else if(item.type == '6') { // 导出
					let params = {
						tableName: this.config.table.resource
					}
					this.$api_form_exportTableInfo({
						data: params
					}).then(res => {
						window.location.href = this.fileDownloadUrl + "/" + res;
					}).catch(err => {
						this.$message({
							type: 'error',
							message: '导出失败!'
						});
					}).finally(() => {})
				} else if(item.type == '7') { // 收藏

				} else if(item.type == '9') { // 自定义按钮

				}
			},
			getIds() {
				this.checkFormData;
				var ids = '';
				ids = this.checkFormData[0].C_ID;
				for(var i = 1; i < this.checkFormData.length; i++) {
					ids += "," + this.checkFormData[i].C_ID;
				}
				return ids;
			},
			alertDialog(message, title) { //抽出公共的提示弹出框
				this.$alert(message, title, {
					confirmButtonText: '确定',
					type: 'info',
					callback: action => {}
				});
			},
			formatterLabel(val, col) {
				var dataFormatter = col.isNeedFormat
				var formatterFlag = col.formatterFlag
				var dateFormatter = col.isDateFormat
				var formatterDate = col.formatterDate
				var cusFormatter = col.isCusFormat
				var formatterCus = col.cusFormat
				
				if(dataFormatter) {// 数据字典格式化
					if(formatterFlag) {
						var items = this.$store.getters.getDicItems(formatterFlag)
						if(items) {
							let obj = {}
							obj = items.find((item) => {
								return item.VALUE === val;
							})
							if(typeof(obj) == 'undefined'){
								return val
							}else{
								return obj.LABEL
							}
						} else {
							return val
						}
					} else {
						return val
					}
				} else if (dateFormatter && val!=''&& val!=null) {// 日期格式化
					if (formatterDate) {
						var d = new Date(val)
						return this.formatDate(d, formatterDate)
					} else {
						return val
					}
				} else if(cusFormatter){//自定义格式化
					if(formatterCus && formatterCus.options){
						let fmtval = []
						if(formatterCus.dataSource == 3){//按视图格式化
							let vals = val.split(',')
							for(let j=0;j<vals.length;j++){
								let temp = vals[j]
								let flag = false
								if(temp!=''){
									for(let i=0;i<formatterCus.options.length;i++){
										if(temp == formatterCus.options[i][formatterCus.viewValue]){
											fmtval.push(formatterCus.options[i][formatterCus.viewLabel])
											flag = true
											break
										}
									}
								}
								if(!flag){
									fmtval.push(temp)
								}
							}
						}else{
							let vals = val.split(',')
							for(let j=0;j<vals.length;j++){
								let temp = vals[j]
								let flag = false
								if(temp!=''){
									for(let i=0;i<formatterCus.options.length;i++){
										if(vals[j] == formatterCus.options[i].value){
											fmtval.push(formatterCus.options[i].label)
											flag = true
											break
										}
									}
								}
								if(!flag){
									fmtval.push(temp)
								}
							}
						}
						
						return fmtval.join(',')
					}else{
						return val
					}
				} else {
					return val
				}
			},
			getFormatLabel(key) {
				let options = {
					data: {
						dicKey: key
					}
				}
				this.$api_form_getDicItemByKey(options).then((data) => {
					if(data) {
						this.$set(this.dicItms, key, data)
					}
				})
			},
			formatColumnLabel(row, cell, value) {
				console.info(row, value)
			},
			handleDicItems(items) {
				if(items) {
					items.forEach((item, index) => {
						if(item.hasOwnProperty('formatter') && item.hasOwnProperty('formatterFlag')) {
							if(item.formatter && item.formatterFlag) {
								this.getFormatLabel(item.formatterFlag)
							}
						}
					})
				}
			}, formatDate(date, fmt) {
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
			filter(item) {
				if (this.params.config) {
					return true
				} else {
					if (this.permission) {
						if (this.permission[item.name]) {
		      				return true
		      			}else {
		      				return false
		      			}
					}else{
						return true
					}
				}
			},
			filterCol(col){
				// table 个性化列宽或排序处理
				if (this.params.hasOwnProperty('columnProps') && this.params.columnProps[col.prop]){
					let columnProp = this.params.columnProps[col.prop]
					col.width = columnProp.columnWidth
					col.order = columnProp.order
				}
				if(col.isFixed){//判断是否设置为固定列
				    if(col.fixed){//设置为True 默认为定位在左边
						 col.fixed
					}else{
 						col.fixed=col.fixCol
					}
				}else{
					delete col.fixed
				}
				return col
			}
		},
		created() {
			this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
			this.fileUploadUrl = gbs.fileServiceUrl + '/file/uploadFile'
		}
	}
</script>

<style scoped>
	.tool-bar {
		margin-bottom: 8px;
	}
</style>