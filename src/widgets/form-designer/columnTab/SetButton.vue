<template>
	<div>
		<el-form ref="form" :model="context.column" label-width="70px" size="mini">
			<el-collapse-item name="1" title="基本设置">
				<el-form-item label="按钮文字">
					<el-input v-model="context.column.defaultFormValue"></el-input>
				</el-form-item>
				<el-form-item label="按钮样式">
					<!-- <el-color-picker v-model="context.column.color"></el-color-picker> -->
					<el-select v-model="context.column.style" placeholder="请选择按钮样式">
						<el-option v-for="(item,index) in context.column.group" :key="index" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="按钮大小">
					<el-radio-group v-model="context.column.size">
						<el-radio-button label="medium">大</el-radio-button>
						<el-radio-button label="small">中</el-radio-button>
						<el-radio-button label="mini">小</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="对齐方式">
					<el-radio-group v-model="context.column.textAlign">
						<el-radio-button label="left">左</el-radio-button>
						<el-radio-button label="center">中</el-radio-button>
						<el-radio-button label="right">右</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="宽度" class="col-span-width">
					<el-input-number v-model="context.column.span" :min="1" :max="24"></el-input-number>
				</el-form-item>
				<el-form-item label="事件类型">
					<el-radio label="0" v-model="context.column.default" @change="handleRadioChange">默认</el-radio>
					<el-select style="width: 80px;margin-left: 10px;" :disabled="context.column.default == '1'" v-model="context.column.eventType" placeholder="请选择事件类型">
						<el-option v-for="(item,index) in context.column.eventTypes" :key="index" :disabled="config.dataSourceType == 'view' && item.key == '0'" :label="item.value" :value="item.key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="">
					<el-radio label="1" v-model="context.column.default" @change="handleRadioChange">自定义</el-radio>
					<el-button type="text" @click="addBtnScript" icon="el-icon-edit" circle></el-button>
				</el-form-item>
			</el-collapse-item>
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
		props: ['page', 'params', 'widget','context', 'model', 'config', 'rules'],
		data() {
			return {
				editScriptDialog: false,
			}
		},
		components: {
			'addScript': addScript
		},
		created() {
			if (this.config.dataSourceType == 'view') {
				this.context.column.eventType = '2'
			}
		},
		methods: {
			handleRadioChange(val) {
				this.context.column.default = val
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
			}
		}
	}
</script>

<style scoped>
	.el-form-item {
		margin-bottom: 12px;
	}
	
	.col-span-width .el-input-number {
		width: 100%;
	}
</style>