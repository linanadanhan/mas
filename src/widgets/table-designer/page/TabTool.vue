<template>
	<div>
		<el-form v-model="config.tool" size="mini" label-width="85px" label-position="left">
			<el-form-item label="分页" prop="">
				<el-checkbox size="mini" v-model="config.tool.page"></el-checkbox>
			</el-form-item>
			<el-form-item label="单击行事件" prop="">
				<el-checkbox size="mini" v-model="config.tool.isRowClick"><p></p></el-checkbox>
			</el-form-item>
			<el-row class="add-btn-group">
				<el-select style="width: 150px;" size="mini" v-model="config.tool.rowClickType" :disabled="!config.tool.isRowClick" placeholder="请选择事件类型">
					<el-option key="view" label="查看详情" value="view"></el-option>
					<el-option key="process" label="流程审批" value="process"></el-option>
				</el-select>
			</el-row>
			<el-row class="add-btn-group">
				<el-select style="width: 150px;" size="mini" v-if="config.tool.isRowClick && config.tool.rowClickType =='view'" v-model="config.tool.viewFormFlag" placeholder="请选择表单模版">
					<el-option v-for="item in formFlagOptions" :key="item.formFlag" :label="item.formName" :value="item.formFlag">
					</el-option>
				</el-select>
			</el-row>
			<el-form-item label="默认按钮">
			</el-form-item>
			<el-row v-if="item.default == true" v-for="(item,index) in config.tool.type" :key="index" class="add-btn-group">
				<el-checkbox @change="(val) => handleToolBtnChk(item,val)" :disabled="config.table.dataSourceType == 'view'" size="mini" v-model="item.isCheck">{{item.text ? item.text : item.name}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
				<el-select style="width: 150px;" size="mini" v-if="item.type == '2' " :disabled="!item.isCheck" v-model="item.formFlag" placeholder="请选择表单模版">
					<el-option v-for="item in formFlagOptions" :key="item.formFlag" :label="item.formName" :value="item.formFlag">
					</el-option>
				</el-select>
			</el-row>
			<el-form-item label="自定义按钮">
				<el-button :disabled="config.table.dataSourceType == 'view'" size="mini" type="primary" @click="handleAddCustomBtn" plain><i class="el-icon-circle-plus-outline"></i>
				</el-button>
			</el-form-item>
			<el-row v-if="item.default == false" v-for="(item,index) in config.tool.type" :key="index" class="add-btn-group">
				<el-input style="width: 100px;" v-model="item.name" class="add-btn-input" size="mini"></el-input>
				<el-button size="mini" type="text" style="margin-left: 10px;" title="编辑事件" @click="addBtnScript" icon="el-icon-edit" circle></el-button>
				<el-button size="mini" type="text" class="el-icon-error btn-delete" @click="handleDeleteOpration(index)"></el-button>
			</el-row>
		</el-form>
		<!--编辑事件脚本弹框-->
		<el-dialog size="small" title="编辑事件脚本" :visible.sync="editScriptDialog" :append-to-body="true" :close-on-click-modal="false" width="50%" top="6vh">
			<addScript @closeAndFresh="closeFresh" ref="addScriptInfo"></addScript>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editScriptDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveSubmitForm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import addScript from './btnEventScript.vue'
	export default {
		data() {
			return {
				actives: ['1'],
				form: {},
				formFlagOptions: [],
				editScriptDialog: false
			}
		},
		props: ['config'],
		components: {
			'addScript': addScript
		},
		methods: {
			handleAddOpration(id) {
				let obj = {}
				if('0' == id) {
					obj = {
						'name': '表单',
						'type': '0',
						'formFlag': '',
						'mark': ''
					}
				} else if('1' == id) {
					obj = {
						'name': '非表单',
						'type': '1',
						'formFlag': '',
						'mark': ''
					}
				}
				this.config.tool.type.push(obj)
			},
			handleDeleteOpration(index) {
				this.config.tool.type.splice(index, 1)
			},
			handleAddCustomBtn() { // 添加自定义按钮
				let obj = {
					'default': false,
					'isCheck': false,
					'type': '9',
					'name': '编辑',
					'formFlag': '',
					'script': ''
				}
				this.config.tool.type.push(obj)
			},
			addBtnScript() {
				this.editScriptDialog = true
				this.$nextTick(() => {
					this.$refs.addScriptInfo.loadData()
				});
			},
			closeFresh(form) {
				this.editScriptDialog = false;
			},
			saveSubmitForm() {
				this.$nextTick(() => {
					this.$refs.addScriptInfo.saveData();
				});
			},
			getFormFlagOptions() {
				let options = {
					data: {
						formType: '0'
					}
				}
				this.$api_form_getAllFormTemp(options).then(res => {
					if(res) {
						this.formFlagOptions = res
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			},
			handleToolBtnChk(item, val){
				this.$parent.$parent.$parent.$parent.$children[1].$children[0].resetPermission()
			}
		},
		created() {
			this.getFormFlagOptions()
		}
	}
</script>

<style scoped>
	.el-collapse {
		border-bottom: 0;
		border-top: 0;
	}

	>>>.el-collapse-item__wrap {
		border-bottom: 0;
	}

	>>>.el-collapse-item__header {
		border-bottom: 0;
	}

	>>>.el-collapse-item__header:hover {
		color: #409EFF
	}

	.item-opration .el-input {
		width: 85%;
	}

	.add-btn-group {
		margin-bottom: 10px;
	}

	.add-btn-group .add-btn-input {
		width: 150px;
		margin-right: 5px;
	}

	.add-btn-group .btn-delete {
		padding: 6px;
	}
</style>
