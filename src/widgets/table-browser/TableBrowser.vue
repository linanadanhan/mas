<template>
	<div>
		<div v-if="params.config">
			<table-browser :page="page" :initParam="myInitParam" :params="params" :widget="widget" :tableData="tableData" :total="total" :config="config" :permission="permission" />
		</div>
		<decorator v-else :i="i" :j="j" :widget="widget" :page="page">
			<span v-if="editMode && !diyMode" slot="buttons">
			<i class="el-icon-edit" title="设计" @click="designTable"></i>
		</span>
			<table-browser :page="page" :initParam="myInitParam" :params="params" :widget="widget" :tableData="tableData" :total="total" :config="config" :permission="permission" />
		</decorator>
	</div>
</template>

<script>
	import TableBrowser from './table/Table.vue'
	export default {
		data() {
			return {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				tableData: [],
				config: {
					rows: [{
						children: []
					}],
					table: {},
					tool: {}
				},
				column: [],
				oFormFlag: '',
				oDecorator: '',
				permission: {},
				myInitParam: {}
			}
		},
		components: {
			'table-browser': TableBrowser
		},
		props: ['page', 'params', 'widget', 'i', 'j'],
		created() {
			if (this.params.config) {
				this.config = this.params.config
				return
			}
			//初始化参数
			if(this.params.qryParams) {
				this.myInitParam = this.params.qryParams
			}
			// 监听
			if(this.params.listenKeys && this.params.listenKeys.length > 0) {
				for(var i = 0; i < this.params.listenKeys.length; i++) {
					let listenObj = this.params.listenKeys[i]
					// 调用事件接收
					this.$root.eventHub.$on(listenObj.C_KEY, (target) => {
						console.info(listenObj.C_KEY + ',关联字段 ' + listenObj.C_FIELD, target)
						let listenFileds = listenObj.C_FIELD
						if(listenFileds && listenFileds != '' && target) {
							if(!this.myInitParam) {
								this.myInitParam = {}
							}
							listenFileds.forEach((fieldItem, index) => {
								if(target[Object.keys(target)[index]]) {
									let filedVal = target[Object.keys(target)[index]]
									if(filedVal.indexOf('MAX_') !== -1) {
										fieldItem = 'MAX_' + fieldItem
										filedVal = filedVal.replace('MAX_', '')
										if(filedVal && filedVal != 'null') {
											var d = new Date(filedVal)
											filedVal = this.formatDate(d, 'yyyy-MM-dd hh:mm:ss')
										}
									} else if(filedVal.indexOf('MIN_') !== -1) {
										fieldItem = 'MIN_' + fieldItem
										filedVal = filedVal.replace('MIN_', '')
										if(filedVal && filedVal != 'null') {
											var d = new Date(filedVal)
											filedVal = this.formatDate(d, 'yyyy-MM-dd hh:mm:ss')
										}
									}
									this.$set(this.myInitParam, fieldItem, filedVal)
									console.info(this.myInitParam)
								}
							})
						}
						this.getDataList()
					});
				}
			}

			this.getDataList()
		},
		beforeDestroy() { // 此处需要销毁页面时间监听
			if(this.params.listenKeys && this.params.listenKeys.length > 0) {
				for(var i = 0; i < this.params.listenKeys.length; i++) {
					var listenKey = this.params.listenKeys[i]
					this.$root.eventHub.$off(listenKey.C_KEY)
				}
			}
		},
		computed: {
			editMode() {
				return this.$store.getters.editMode
			},
			diyMode() {
				return this.$store.getters.diyMode
			},
			userInfo() {
				return this.$store.getters.userinfo
			}
		},
		methods: {
			tablePageQry(pageSize, currentPage){
				this.pageSize = pageSize
				this.currentPage = currentPage
				this.getDataList()
			},
			getDataList() {
				if(this.params.formFlag) {
					let options = {
						data: {
							formFlag: this.params.formFlag
						}
					}
					this.$api_form_getTabelConfInfo(options).then(res => {
						if(res && res.id) {
							var tmpConfig = JSON.parse(res.confJson)
							this.config = tmpConfig
							let colNames=''
							this.config.rows[0].children.map( (item,index) => {//判断长度校验是否添加进去还是仅仅只是做修改长度
								 if(!item.type && item.prop){
									colNames=colNames+item.prop+","
								 }
							})
							if(colNames!=''){
								colNames=colNames.slice(0,colNames.length-1)
							}
							// console.log(colNames)
							if(res.permissionMap) {
								this.permission = JSON.parse(res.permissionMap)
							}
							let paraMap = {}

							//若为动态视图时需先设置配置的默认参数值
							if(tmpConfig.table.dataSourceType == 'view' && tmpConfig.table.viewParamsOpts) {
								tmpConfig.table.viewParamsOpts.forEach(pItem => {
									if(pItem.paramVal != '') {
										if(pItem.paramVal == '-1') { // 当前用户
											paraMap[pItem.paramName] = this.userInfo.id
										} else {
											paraMap[pItem.paramName] = pItem.paramVal
										}
									}
								})
							}

							if(this.myInitParam) {
								for(var field in this.myInitParam) {
									if(this.myInitParam[field] && this.myInitParam[field] != 'null') {
										paraMap[field] = this.myInitParam[field]
									}
								}
							}
							paraMap.tableName = tmpConfig.table.resource
							paraMap.dataSourceType = tmpConfig.table.dataSourceType
							paraMap.colNames=colNames
							if(tmpConfig.table.resource) {
								if(this.config.tool.page == true) { // 列表分页查询
									paraMap.page = this.currentPage
									paraMap.rows = this.pageSize
									this.$api_form_getTablePageInfo({
										data: paraMap
									}).then(res1 => {
										if(res1) {
											this.tableData = res1.rows
											this.total = res1.total
										}
									}).catch(err => {
										console.info(err)
									}).finally(() => {})
								} else {
									this.$api_form_getTableDataInfo({
										data: paraMap
									}).then(res1 => {
										if(res1) {
											this.tableData = res1
										}
									}).catch(err => {
										console.info(err)
									}).finally(() => {})
								}
							}
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {})
				}
			},
			closeAndRefresh() {
				this.getDataList()
			},
			designTable() { // 表格设计
				if(!this.params.formFlag) {
					// 新增表单模版
					var tmpFormFlag = 'tb' + this.$_.now()
					let form = {
						formFlag: tmpFormFlag,
						formName: tmpFormFlag,
						formType: '1',
						status: '1'
					}
					this.$api_form_saveFormTempInfo({
						data: form
					}).then(res => {
						this.params.formFlag = res.formFlag
						this.$api_site_saveProfileConf({
							data: {
								widgetUuId: this.widget.id,
								diyMode: false,
								json: JSON.stringify(this.params)
							}
						})
						this.loadFormTmp()
					}).catch(err => {
						console.info(err)
						this.$message({
							'message': '新增表格模版失败！',
							'type': 'info'
						});
					}).finally(() => {})
				} else {
					this.loadFormTmp()
				}
			},
			loadFormTmp() {
				// 根据表格模版获取单笔模版信息
				if(this.params.formFlag) {
					this.$api_form_getFormTempByFormFlag({
						data: {
							formFlag: this.params.formFlag
						}
					}).then(res1 => {
						if(res1) {
							this.showFormTmp(res1)
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {})
				}
			},
			showFormTmp(rows) {
				let body = require('./view/tableDesign.vue')
				let title = 'table表格设计'
				let dlg = this
				let options = {
					title: title,
					width: '100%',
					heigth: '100%',
					'fullscreen': true,
					body: body.default,
					'before-close': function(done) {
						dlg.getDataList()
						done()
					},
					data: {
						page: dlg.page,
						params: dlg.params,
						widget: {
							id: dlg.widget.id,
							hidden: true
						},
						i: dlg.i,
						j: dlg.j,
						fm: rows
					}
				}
				this.$dialog(options)
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
			}
		}
	}
</script>

<style scoped>
	/* .browser-table { width:100%;} */
	
	>>>.el-table thead.is-group th,
	>>>.el-table th.is-leaf {
		background: #f5f7fa
	}
</style>