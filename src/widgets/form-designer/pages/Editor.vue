<template>
	<div>
		<div class="handle">
			<h3></h3>
			<el-button size="mini" type="primary" @click="handleCreateForm">保存</el-button>
		</div>
		<el-form ref="editorForm" :model="model" :rules="rules" :size="config.size" :label-width="`${config.formlabelWidth}px`" :label-position="config.formLabelPosition" class="form editorForm">
			<el-tabs v-model="activeName" @tab-click="handleTabClick">
				<el-tab-pane label="表单配置" name="first">
					<layout :config="config" :model="model" :context="context" :rules="rules" :widget="widget"/>
				</el-tab-pane>
				<el-tab-pane label="权限配置" name="second">
					<permissionConf :permission="permission" :context="context" :widget="widget"></permissionConf>
				</el-tab-pane>
			</el-tabs>
		</el-form>

		<!--新增动态表属性弹框-->
		<el-dialog size="small" title="动态建表" :visible.sync="addTableDialog" :append-to-body="true" :close-on-click-modal="false" width="50%" top="6vh">
			<addTable @closeAndFresh="closeFresh" ref="addTableInfo"></addTable>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addTableDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveSubmitForm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Layout from './Layout.vue'
	import addTable from './addTable.vue'
	import permissionConf from './permissionConf.vue'
	export default {
		mounted() {},
		methods: {
			closeFresh(form) {
				this.config.tableLabel = form.C_TEXT
				this.config.tableType = form.C_TYPE
				this.saveFormData()
				this.addTableDialog = false
			},
			saveSubmitForm() {
				this.$nextTick(() => {
					this.$refs.addTableInfo.saveData();
				});
			},
			handleCreateForm() {
				console.log('model-----', this.model)
				console.log('config-----', this.config)
				console.log('rules-----', this.rules)
				console.log('permission-----', this.permission)
				if(this.config.hasOwnProperty('dataSource') && this.config.dataSource != '') {
					this.saveFormData()
				} else {
					this.addTableDialog = true
					this.$nextTick(() => {
						this.$refs.addTableInfo.loadData()
					});
				}
			},
			saveFormData() {
				this.resetPermission()
				this.$refs.editorForm.clearValidate()
				this.form.id = this.fm ? this.fm.C_ID : ''
				this.form.formType = this.fm ? this.fm.C_FORM_TYPE : ''
				this.form.modelJson = JSON.stringify(this.model)
				this.form.confJson = JSON.stringify(this.config)
				this.form.ruleJson = JSON.stringify(this.rules)
				this.form.permissionJson = JSON.stringify(this.permission)
				let options = {
					data: this.form
				}
				this.$api_form_saveFormConfInfo(options).then(res => {
					this.$message({
						'message': '保存成功！',
						'type': 'success'
					});
					if(!(this.config.hasOwnProperty('dataSource') && this.config.dataSource != '') ) {
						this.$emit('closeAndFresh')
					}
				}).catch(err => {
					this.$message({
						'message': '保存失败！',
						'type': 'error'
					});
				}).finally(() => {})
			},
			handleTabClick(tab, event) {
				this.activeName = tab.name
				if(tab.name === 'second') {
					this.resetPermission()
				}
			},
			resetPermission() {// 重新组装按钮权限数据
				if(this.config.rows) {
					var i = 0
					this.config.rows.forEach((item, index) => {
						if(item.columns) {
							item.columns.forEach((col, index) => {
								if(col.type === 'button') {
									// 判断原数组中是否已存在
									var isExistObj = this.permission.find((pitem)=> {
								          return pitem.name === col.name;
								    })
									if (!isExistObj) {
										isExistObj = {
											name: col.name,
											text: col.defaultFormValue,
											permissionGroup: ''
										}
									}
									this.$set(this.permission, i, isExistObj)
									i++
								}
							})
							if (this.permission && this.permission.length > i) {
								this.permission.splice(i,1)
							}
						}
					})
				}
			}
		},
		components: {
			'layout': Layout,
			'addTable': addTable,
			'permissionConf': permissionConf
		},
		props: ['page', 'params', 'widget','context', 'model', 'config', 'rules', 'fm', 'permission'],
		data() {
			return {
				activeName: 'first',
				addTableDialog: false,
				form: {
					id: '',
					modelJson: {},
					confJson: {},
					ruleJson: {},
					permissionJson: {}
				}
			}
		}
	}
</script>

<style scoped>
	.handle {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
</style>
