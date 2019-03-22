<template>
	<div>
		<el-form class="tab-form" v-model="config.table" size="mini" label-width="90px">
			<el-collapse v-model="activeName">
				<!--动态视图参数配置begin-->
				<el-collapse-item title="数据源设置" name="1">
					<el-form-item label="表数据来源">
						<el-radio-group v-model="config.table.dataSourceType" @change="handleDataSourceTypeChange" size="mini">
							<el-radio-button label="table">数据表</el-radio-button>
							<el-radio-button label="view">动态视图</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="">
						<el-select size="mini" v-model="config.table.resource" @change="handleDataSourceChange" placeholder="请选择表">
							<el-option v-for="item in dataSourceOptions" :key="item.C_NAME" :label="item.C_TEXT" :value="item.C_NAME">
							</el-option>
						</el-select>
					</el-form-item>
					<el-row v-if="config.table.dataSourceType == 'view' && config.table.resource != null " style="padding-bottom: 10px;">
						<el-table :data="config.table.viewParamsOpts" size="mini">
							<el-table-column prop="paramName" width="70px" align="center" label="参数名">
							</el-table-column>
							<el-table-column align="center" label="参数值">
								<template slot-scope="scope">
									<el-select size="mini" clearable v-model="scope.row.paramVal" placeholder="请选择或输入默认值" allow-create filterable>
										<el-option v-for="item in paramsList" :key="item.key" :label="item.value" :value="item.key"></el-option>
									</el-select>
								</template>
							</el-table-column>
						</el-table>
					</el-row>
				</el-collapse-item>
				<!--动态视图参数配置end-->

			<el-collapse-item title="基本设置" name="2">
				<el-form-item label="复选框">
					<el-checkbox v-model="config.table.checkbox"></el-checkbox>
				</el-form-item>
				<el-form-item label="序号">
					<el-checkbox v-model="config.table.orderNumber"></el-checkbox>
				</el-form-item>
				<el-form-item label="边框">
					<el-checkbox v-model="config.table.border"></el-checkbox>
				</el-form-item>
				<el-form-item label="斑马纹">
					<el-checkbox v-model="config.table.stripe">（隔行变色白灰）</el-checkbox>
				</el-form-item>
				<el-form-item label="固定表头">
					<el-checkbox v-model="config.table.fixedHead" @change="handleFixedHeadChange"></el-checkbox>
				</el-form-item>
				<el-form-item class="set-table-height" v-if="config.table.fixedHead">
					<p>
						<el-radio size="mini" v-model="setRadio" label="1">表格最大高度</el-radio>
					</p>
					<p><el-input-number v-model="tableHighgt" :min="100" size="mini" @change="handleRadioChange(setRadio)"></el-input-number></p>
				</el-form-item>
				<el-form-item label="表格大小">
					<el-radio-group v-model="config.table.size">
						<el-radio-button label="medium">大</el-radio-button>
						<el-radio-button label="small">中</el-radio-button>
						<el-radio-button label="mini">小</el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-collapse-item>

			<el-collapse-item title="高级设置" name="3">
				<el-form-item label="表头颜色">
					<el-row type="flex" justify="space-between" class="set-thead-style">
						<div>
							<span :style="{background:config.table.theadStyle.bgStyle}">背景</span>
							<el-color-picker v-model="config.table.theadStyle.bgStyle"></el-color-picker>
						</div>
						<div>
							<span :style="{color:config.table.theadStyle.colorStyle}">文字</span>
							<el-color-picker v-model="config.table.theadStyle.colorStyle"></el-color-picker>
						</div>
						<div>
							<span :style="{border: `1px solid ${config.table.theadStyle.borderStyle}`}">边框</span>
							<el-color-picker v-model="config.table.theadStyle.borderStyle"></el-color-picker>
						</div>
					</el-row>
				</el-form-item>

				<el-form-item label="奇行颜色">
					<el-row type="flex" justify="space-between" class="set-thead-style">
						<div>
							<span :style="{background:config.table.evenRowStyle.bgStyle}">背景</span>
							<el-color-picker v-model="config.table.evenRowStyle.bgStyle"></el-color-picker>
						</div>
						<div>
							<span :style="{color:config.table.evenRowStyle.colorStyle}">文字</span>
							<el-color-picker v-model="config.table.evenRowStyle.colorStyle"></el-color-picker>
						</div>
						<div>
							<span :style="{border: `1px solid ${config.table.evenRowStyle.borderStyle}`}">边框</span>
							<el-color-picker v-model="config.table.evenRowStyle.borderStyle"></el-color-picker>
						</div>
					</el-row>
				</el-form-item>

				<el-form-item label="偶行颜色">
					<el-row type="flex" justify="space-between" class="set-thead-style">
						<div>
							<span :style="{background:config.table.oddRowStyle.bgStyle}">背景</span>
							<el-color-picker v-model="config.table.oddRowStyle.bgStyle"></el-color-picker>
						</div>
						<div>
							<span :style="{color:config.table.oddRowStyle.colorStyle}">文字</span>
							<el-color-picker v-model="config.table.oddRowStyle.colorStyle"></el-color-picker>
						</div>
						<div>
							<span :style="{border: `1px solid ${config.table.oddRowStyle.borderStyle}`}">边框</span>
							<el-color-picker v-model="config.table.oddRowStyle.borderStyle"></el-color-picker>
						</div>
					</el-row>
				</el-form-item>

				<el-form-item label="">
					<el-button type="primary" plain @click="handleResetTableStyle">恢复全部默认颜色</el-button>
				</el-form-item>
			</el-collapse-item>

			
			</el-collapse>
		</el-form>
	</div>
</template>
<script>
	export default {
		created() {
			this.getDataTables()
			this.getViewParamsOpts()
		},
		props: ['context', 'config'],
		data() {
			return {
				activeName: ['1','2','3'],
				setRadio: '1',
				tableHighgt: 300,
				form: {},
				dataSourceOptions: [],
				viewParamsOpts: [],
				paramsList: [
				{
					key: '-1',
					value: '默认当前用户'
				}]
			}
		},
		methods: {
			handleResetTableStyle(){
				// 重置表头样式
				this.config.table.theadStyle =  {
					'bgStyle': '#f5f7fa',  // 表头背景颜色
					'colorStyle': '#909399',  // 表头文字颜色
					'borderStyle': '#ebeef5'  // 表头边框颜色
				}
				// 重置奇数行样式
				this.config.table.evenRowStyle =  {
					'bgStyle': '#fff',  // 奇数行背景颜色
					'colorStyle': '#606266',  // 奇数行文字颜色
					'borderStyle': '#ebeef5'  // 奇数行边框颜色
				}
				// 重置偶数行样式
				this.config.table.oddRowStyle =  {
					'bgStyle': '#fff',  // 偶数行背景颜色
					'colorStyle': '#606266',  // 偶数行文字颜色
					'borderStyle': '#ebeef5'  // 偶数行边框颜色
				}
			},
			getViewParamsOpts() {// 获取动态视图参数项
				if (this.config.table.dataSourceType == 'view' && this.config.table.resource != null) {
					let options = {
						data: {
							viewName: this.config.table.resource
						}
					}
					this.$api_form_getViewParamsOpts(options).then((data) => {
						if(data) {
							//原保存库里的json数据
							let oldOpt = this.config.table.viewParamsOpts
							data.forEach(item => {
								if (oldOpt) {
									oldOpt.forEach(oldItem => {
										if (item.paramName == oldItem.paramName) {
											item.paramVal = oldItem.paramVal
										}
									})	
								}
				            })
							this.$set(this.config.table, 'viewParamsOpts', data)
						}else {
							this.$set(this.config.table, 'viewParamsOpts', [])
						}
					})
				}
			},
			getDataTables() {
				let qryTableName
				if(this.config.table.dataSourceType && this.config.table.dataSourceType === 'view') {
					qryTableName = 'TBL_VIEWS'
				} else {
					qryTableName = 'TBL_TABLES'
				}
				let options = {
					data: {
						tableName: qryTableName
					}
				}
				this.$api_form_getTableDataInfo(options).then((data) => {
					if(data) {
						this.dataSourceOptions = data
						this.handleDataSourceChange()
					}
				})
			},
			handleDataSourceChange() {
				if(this.config.table.resource) {
					let options = {
						data: {
							tableName: this.config.table.resource,
							dataSourceType: this.config.table.dataSourceType
						}
					}
					this.$api_form_getTableFeild(options).then((data) => {
						if(data) {
							this.$set(this.context, 'feildList', data)
						} else {
							this.$set(this.context, 'feildList', [])
						}
					})
					if (this.config.table.dataSourceType == 'view') {
						this.getViewParamsOpts()
					}
				}
			},
			handleDataSourceTypeChange(val) {
				this.$set(this.config.table, 'viewParamsOpts', [])
				let qryTableName = (val === 'view' ? 'TBL_VIEWS' : 'TBL_TABLES')
				let options = {
					data: {
						tableName: qryTableName
					}
				}
				this.$api_form_getTableDataInfo(options).then((data) => {
					if(data) {
						this.config.table.resource = null
						this.dataSourceOptions = data
						this.handleDataSourceChange()
					} else {
						this.dataSourceOptions = []
					}
				})
			},
			handleFixedHeadChange(val){
				if(val){
					this.$set(this.config.table,'maxHeight',this.tableHighgt)
				}else{
					delete this.config.table.maxHeight
				}
			},
			handleRadioChange(val){
				this.$set(this.config.table,'maxHeight',this.tableHighgt)
			}
		}
	}
</script>

<style scoped>
	>>>.el-collapse {
		border-bottom: 0;
		border-top: 0;
	}
	
	>>>.el-collapse-item__wrap {
		border-bottom: 0;
	}
	
	>>>.el-collapse-item__header {
		border-bottom: 0;
	}


	>>>.empty-label .el-form-item__content {
		margin-left: 0 !important;
	}
	
	>>>.el-form-item__label {
		font-size: 12px;
	}
	.tab-form >>>.el-form-item{ margin-bottom: 3px; }
	.tab-form >>>.set-table-height .el-form-item__content{ margin-bottom: 10px;}
	.tab-form >>>.set-table-height .el-radio__label{ font-size: 12px; }
	.tab-form >>>.set-table-height .el-input-number{ width: 100%;}

	.set-thead-style{ margin-bottom: 30px; } 	/* flex-wrap: wrap; */
	.set-thead-style .el-color-picker{ vertical-align: middle; }
	.set-thead-style span{ color: #76787d; }
	
</style>