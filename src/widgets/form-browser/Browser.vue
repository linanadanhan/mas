<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<span v-if="editMode && !diyMode" slot="buttons">
			<i class="el-icon-edit" title="设计" @click="designForm"></i>
		</span>
		<el-form ref="editorForm" :model="model" :rules="rules" readonly="true" :size="config.size" :label-width="`${config.formlabelWidth}px`" :label-position="config.formLabelPosition">
			<layout 
				v-if="showLayout" 
				:config="config" 
				:params="params" 
				:model="model" 
				:context="context" 
				:permission="permission" 
				:widget="widget">
			</layout>
		</el-form>
	</decorator>
</template>

<script>
  import layout from './pages/BrowserLayout.vue'
  import _ from 'underscore'
	export default {
		name: 'form-browser-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		components: {
			'layout': layout
		},
		created() {
			 // 监听
			 if(this.params.listenKeys && this.params.listenKeys.length > 0) {
			 	for(var i = 0; i < this.params.listenKeys.length; i++) {
			 		let listenObj = this.params.listenKeys[i]
			 		// 调用事件接收
			 		this.$root.eventHub.$on(listenObj.C_KEY, (target) => {
			 			console.info(listenObj.C_KEY + ',关联字段 ' + listenObj.C_FIELD, target)
			 			let listenFileds = listenObj.C_FIELD
			 			if(listenFileds && listenFileds != '' && target) {
							listenFileds.forEach((fieldItem, index) => {
								if(target[Object.keys(target)[index]]) {
									let filedVal = target[Object.keys(target)[index]]
									this.initParams[fieldItem] = filedVal
									this.getFormData()
								}
							})
						}
			 		});
			 	}
			 }

			 // 初始化参数
			 if (this.params.qryParams) {
			 	this.initParams = this.params.qryParams
			 }

			 // 数据权限
			 if (this.params.dataAuthObj) {
			 	this.$set(this.context, 'dataAuthObj', this.params.dataAuthObj)
			 }

			this.getFormData()
		},
		beforeDestroy() {// 此处需要销毁页面时间监听
		  	if (this.params.listenKeys && this.params.listenKeys.length > 0) {
		  		for (var i=0;i<this.params.listenKeys.length;i++) {
					var listenKey = this.params.listenKeys[i]
					this.$root.eventHub.$off(listenKey.C_KEY)
				}
		  	}
		},
		data() {
			return {
				showLayout: false,
				model: {},
				config: {},
				rules: {},
				permission: {},
				oFromFlag: '',
				context: {},
				initParams: {}
			}
		},
		computed: {
		  editMode () {
		    return this.$store.getters.editMode
		  },
	      diyMode () {
	        return this.$store.getters.diyMode
	      },
	      userInfo () {
	        return this.$store.getters.userinfo
	      }
		},
		methods: {
			saveHandle() {
				this.$refs.editorForm.validate((valid) => {
					if(valid) {
						// 日期格式化 TODO
						if(this.config.dataSource) {
							let form = {}
							for(var key in this.model) {
								if (form[key] === '') {
									form[key.toUpperCase()] = null
								}else {
									form[key.toUpperCase()] = this.model[key]
								}
							}
							if (JSON.stringify(this.initParams) != '{}') {
								for (var initKey in this.initParams) {
									if (form[initKey] === '') {
										form[initKey.toUpperCase()] = null
									}else {
										form[initKey.toUpperCase()] = this.initParams[initKey]
									}
								}
							}
							form.tableName = this.config.dataSource
							// 登录用户名
							form.personName = this.userInfo.username
							this.$api_form_saveFormData({
								data: form
							}).then(res => {
								console.info(res)
								this.$message({
									'message': '保存成功！',
									'type': 'success'
								})

								//保存成功后触发事件
								if(this.params.triggerKeys && this.params.triggerKeys.length > 0) {
									for(var i = 0; i < this.params.triggerKeys.length; i++) {
										var triggerKey = this.params.triggerKeys[i]
										this.$root.eventHub.$emit(triggerKey.C_KEY)
									}
								}

								// 保存成功后重置页面
								this.getFormData()
								this.$root.eventHub.$emit("clearFileList")
								this.$root.eventHub.$emit("clearEditor")

							}).catch(err => {
								console.info(err)
							}).finally(() => {})
						}
					} else {
						this.$message('请确认表单是否填写完整！');
					}
				});
			},
			getFormData() {
				if(this.params.formFlag) {
					this.oFromFlag = this.params.formFlag
					let options = {
						data: {
							formFlag: this.params.formFlag
						}
					}
					this.$api_form_getFormConfInfo(options).then(res => {
						if(res && res.id) {
							var tmpConfig = res.confJson
							this.rules = JSON.parse(res.ruleJson)
							this.model = JSON.parse(res.modelJson)
							if (res.permissionMap) {
								this.permission = JSON.parse(res.permissionMap)
							}
							if(this.params.primaryKey) {
								this.$api_form_getFormDataInfoById({
									data: {
										id: this.params.primaryKey,
										tableName: tmpConfig.dataSource
									}
								}).then(res1 => {
									if(res1) {
										this.model = res1
									}
									this.config = tmpConfig
								}).catch(err => {
									console.info(err)
								}).finally(() => {})
							} else {
								this.config = tmpConfig
								if (JSON.stringify(this.initParams) != '{}') {
									this.initParams.tableName = tmpConfig.dataSource
									this.initParams.dataSourceType = tmpConfig.dataSourceType
									//单独处理不传主键，根据传过来的参数进行查询数据的情况
									this.$api_form_getFormDataInfoByCondition({
										data: this.initParams
									}).then(res1 => {
										if(res1) {
											this.model = res1
											if (this.params.readonlyAll) {
												this.$set(this.context, 'readonlyAll', true)
											}
										}
									}).catch(err => {
										console.info(err)
									}).finally(() => {})
								}
							}
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {
						this.showLayout = true
						if(this.$refs['editorForm']) {
							this.$refs['editorForm'].resetFields()
						}
					})
				}
			},
			resetForm() {// 重置表单
				this.$refs['editorForm'].resetFields()
			},
			qryForm() {// 查询表单
				//触发事件
				console.info(this.params.triggerKeys)
				if(this.params.triggerKeys && this.params.triggerKeys.length > 0) {
					for(var i = 0; i < this.params.triggerKeys.length; i++) {
						let trigger = this.params.triggerKeys[i]
						let triggerKey = trigger.C_KEY
						let triggerField = trigger.C_FIELD
						let filedVal = {}
						if (triggerField) {
							triggerField.forEach((fieldItem, index) => {
								let col = this.getColumnConf(fieldItem)
								if (col) {
									let paramVal = this.model[fieldItem]
			                    	if (col.type === 'input') {
			                    		if (col.hasOwnProperty('likeQry') && col.likeQry) {
			                    			paramVal = '%' + this.model[fieldItem] + '%'
			                    		}
			                    	}
			                    	if (col.type === 'date-picker') {
			                    		if (col.hasOwnProperty('dateInterval')) {
			                    			if (col.dateInterval === 'isBegin') {
			                    				paramVal = 'MIN_' + this.model[fieldItem]
			                    			} else {
			                    				paramVal = 'MAX_' + this.model[fieldItem]
			                    			}
			                    		}
			                    	}
			                    	filedVal[fieldItem] = paramVal
								}
							})
						}
						this.$root.eventHub.$emit(triggerKey, filedVal)
					}
				}
			},
			getColumnConf(colName) {
				let rtnCol
				if(this.config.rows) {
					this.config.rows.forEach((item, index) => {
						if(item.columns) {
							item.columns.forEach((col, index) => {
								if(col.name === colName) {
									rtnCol = col
								}
							})
						}
					})
				}
				return rtnCol
			},
			designForm() { // 表单设计
				if(!this.params.formFlag) {
					// 新增表单模版
				    var tmpFormFlag = 'fm'+this.$_.now()
					let form = {
					  formFlag: tmpFormFlag,
					  formName: tmpFormFlag,
					  formType: '0',
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
							'message': '新增表单模版失败！',
							'type': 'info'
						});
					}).finally(() => {
					})
				}else {
					this.loadFormTmp()
				}
			},
			loadFormTmp() {
				// 根据表单模版获取单笔模版信息
				if (this.params.formFlag) {
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
				let body = require('./view/formDesign.vue')
				let title = 'form表单设计'
				let dlg = this
				let options = {
					title: title,
					width: '100%',
					heigth: '100%',
					'fullscreen': true,
					body: body.default,
					'before-close': function(done){
						dlg.getFormData()
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
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}

	.handle {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		padding: 10px 20px;
		box-sizing: border-box;
	}
</style>
