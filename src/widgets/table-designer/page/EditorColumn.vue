<template>
	<div>
		<el-card shadow="never" class="box-card">
			<div slot="header" class="clearfix">
				<span v-if="!context.column.type">列属性配置</span>
				<span v-else>操作列配置</span>
			</div>
			<el-form v-model="context.column" size="mini" label-width="100px" class="column-form">
				<el-row v-if="!context.column.type">
					<el-col :span="7">
						<el-form-item label="列标题" prop="">
							<el-input v-model="context.column.label"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="表字段名" prop="">
							<el-select v-model="context.column.prop" placeholder="请选择字段名" default-first-option @change="setCusOptions">
								<el-option v-for="item in context.feildList" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="列宽" prop="">
							<el-input-number v-model.number="context.column.width"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="溢出省略" prop="">
							<el-checkbox v-model="context.column.tooltip"></el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="格式化">
							<el-checkbox v-model="context.column.isNeedFormat"></el-checkbox>&nbsp;&nbsp;&nbsp;	
							<el-select style="width: 140px;" filterable :disabled="!context.column.isNeedFormat" v-model="context.column.formatterFlag" size="mini" placeholder="请选择字典标识">
						        <el-option v-for="item in dicOptions" :key="item.C_KEY" :label="item.C_NAME" :value="item.C_KEY">
				 				</el-option>
					        </el-select>	
					</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="日期格式化">
							<el-checkbox v-model="context.column.isDateFormat"></el-checkbox>&nbsp;&nbsp;&nbsp;	
							<el-select style="width: 140px;" filterable :disabled="!context.column.isDateFormat" v-model="context.column.formatterDate" size="mini" placeholder="请选择格式类型">
						        <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
						        <el-option label="yyyy-MM-dd hh:mm" value="yyyy-MM-dd hh:mm"></el-option>
						        <el-option label="yyyy-MM-dd hh:mm:ss" value="yyyy-MM-dd hh:mm:ss"></el-option>
						        <el-option label="yyyy-MM" value="yyyy-MM"></el-option>
						        <el-option label="yyyy" value="yyyy"></el-option>

								<el-option label="yyyy年MM月dd日" value="yyyy年MM月dd日"></el-option>
								<el-option label="yyyy年MM月dd日 24hh:mm:ss" value="yyyy年MM月dd日 24hh:mm:ss"></el-option>
								<el-option label="yyyy年MM月dd日 AM hh:mm:ss" value="yyyy年MM月dd日 AM hh:mm:ss"></el-option>
								<el-option label="yyyy-MM-dd AM hh:mm" value="yyyy-MM-dd AM hh:mm"></el-option>
								<el-option label="yyyy-MM-dd AM hh:mm:ss" value="yyyy-MM-dd AM hh:mm:ss"></el-option>
					        </el-select>	
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="自定义格式化">
							<el-checkbox v-model="context.column.isCusFormat"></el-checkbox>&nbsp;&nbsp;&nbsp;	
							<el-select v-if="context.column.cusFormat.dataSource == 3" style="width: 140px;" :disabled="!context.column.isCusFormat"  size="mini" placeholder="按视图格式化" v-model="context.column.cusFormatChecked" >
						        <el-option :disabled="true" v-for="item in context.column.cusFormat.options" :key="item[context.column.cusFormat.viewValue]" :label="`${item[context.column.cusFormat.viewLabel]}-${item[context.column.cusFormat.viewValue]}`" :value="item[context.column.cusFormat.viewValue]" >
				 				</el-option>
					        </el-select>
					        <el-select v-else style="width: 140px;" :disabled="!context.column.isCusFormat"  size="mini" placeholder="按自定义格式化" v-model="context.column.cusFormatChecked" >
						         <el-option :disabled="true" v-for="item in context.column.cusFormat.options" :key="item.value" :label="`${item.label}-${item.value}`" :value="item.value">
				 				</el-option>
					        </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="排序">
							<el-checkbox v-model="context.column.sortable"></el-checkbox>&nbsp;&nbsp;&nbsp;		
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="隐藏列" prop="">
							<el-checkbox v-model="context.column.hideCol"></el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="固定列" >
							<el-checkbox filterable :disabled="context.column.hideCol" v-model="context.column.isFixed"></el-checkbox>&nbsp;&nbsp;&nbsp;	
							<el-select style="width: 140px;" filterable :disabled="!context.column.isFixed" v-model="context.column.fixCol" size="mini" placeholder="请选择类型">
						        <el-option label="true" value="true"></el-option>
						        <el-option label="right" value="right"></el-option>
						        <el-option label="left" value="left"></el-option>
					        </el-select>	
						</el-form-item>
					</el-col>
				</el-row>

				<el-row v-else>
					<el-col :span="24">
						<el-form-item label="列宽" prop="">
							<el-input-number v-model.number="context.column.width"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="固定列" >
							<el-checkbox v-model="context.column.isFixed"></el-checkbox>&nbsp;&nbsp;&nbsp;	
							<el-select style="width: 140px;" filterable :disabled="!context.column.isFixed" v-model="context.column.fixCol" size="mini" placeholder="请选择类型">
						        <el-option label="true" value="true"></el-option>
						        <el-option label="right" value="right"></el-option>
						        <el-option label="left" value="left"></el-option>
					        </el-select>	
						</el-form-item>
					</el-col>
					
					<el-col :span="24">
						<el-form-item label="默认按钮">
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item class="item-opration" v-if="item.default == true" v-for="(item,index) in context.column.type" :key="index">
							<el-checkbox :disabled="config.table.dataSourceType == 'view' && item.type != '2'" v-model="item.isCheck">{{item.text ? item.text : item.name}}</el-checkbox>&nbsp;&nbsp;&nbsp;	
							<el-select v-if="item.type == '1' || item.type == '2'" :disabled="!item.isCheck" v-model="item.formFlag" placeholder="请选择表单模版">
					          <el-option v-for="item in formFlagOptions" :key="item.formFlag" :label="item.formName" :value="item.formFlag">
						      </el-option>
					        </el-select>	
						</el-form-item>
					</el-col>
					
					<el-col :span="24">
						<el-form-item label="自定义按钮">
							<el-button :disabled="config.table.dataSourceType == 'view'" type="primary" @click="handleAddCustomBtn" plain><i class="el-icon-circle-plus-outline"></i>
							</el-button>
						</el-form-item>
					</el-col>
				
					<el-col :span="24">
						<el-form-item class="item-opration" v-if="item.default == false" v-for="(item,index) in context.column.type" :key="index">
							<el-input v-model="item.name" class="add-btn-input"></el-input>
							<el-button style="margin-left: 10px;" title="编辑事件" type="text" @click="addBtnScript" icon="el-icon-edit" circle></el-button>
							<el-button type="text" class="el-icon-error" @click="handleDeleteOpration(index)"></el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		
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
				editScriptDialog: false,
				form: {
					id: '',
					modelJson: {},
					confJson: {},
					ruleJson: {},
					tyep: ''
				},
				formFlagOptions: [],
				dicOptions: []
			}
		},
		components: {
			'addScript': addScript
		},
		props: ['config', 'context'],
		methods: {
			handleAddCustomBtn() {// 添加自定义按钮
			  let opration = {
			  	'default': false,
        		'isCheck': false,
        		'type': '9',
        		'name': 'btn' + this.$_.now(),
        		'text': '编辑',
        		'formFlag': '',
        		'script': ''
			  }
			  this.context.column.type.push(opration)
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
			handleDeleteOpration(index) {
				this.context.column.type.splice(index, 1)
			},
			getFormFlagOptions() {
		      let options = {
		        data: {formType: '0'}
		      }
		      this.$api_form_getAllFormTemp(options).then(res=>{
				if (res) {
				  this.formFlagOptions = res
				}
		      }).catch(err=>{
		        console.info(err)
		      }).finally(()=>{
		      })
	    	},
	    	getDicOptions(){
	    	  this.$api_form_getDicOptions().then((data) => {
		      	if (data) {
		      		this.dicOptions = data
		      	}
		      }) 
	    	},
	    	setCusOptions(){
	    		let cusOptions = {}
				let fieldName = this.context.column.prop
				let len = this.config.addFormCfg.rows.length
				for(let i=0;i<len;i++){
					let row = this.config.addFormCfg.rows[i]
					for(let j=0;j<row.columns.length;j++){
						let col = row.columns[j]
						if(col.name == fieldName){
							if(col.options){
								cusOptions.dataSource = col.dataSource
								cusOptions.options = col.options
								if(col.dataSource==3){
									cusOptions.viewValue = col.viewValue
									cusOptions.viewLabel = col.viewLabel
								}
							}
							break
						}
					}
				}
				this.context.column.cusFormat = cusOptions
				this.$set(this.context,this.context.column.cusFormat,cusOptions)
			}
		},
		created() {
			this.getFormFlagOptions()
			this.getDicOptions()
		}
	}
</script>

<style scoped>
	.box-card {
		margin-bottom: 15px;
	}
	
	>>>.box-card .el-card__header {
		padding: 8px 15px;
		background: #f5f7fa;
	}
	
	.item-opration .el-input {
		width: 60%;
	}
	
	.item-opration .add-btn-input {
		width: 150px;
	}
	/* .column-form{ background:#f5f7fa; padding-top:15px; margin-bottom:15px;} */
</style>