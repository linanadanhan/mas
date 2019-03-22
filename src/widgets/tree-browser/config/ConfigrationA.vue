<template>
	<div class="widget">
		<el-form ref="form" :model="form" label-width="140px">
			<el-form-item prop="formFlag" label="树模版">
				<el-select v-model="form.formFlag" placeholder="请选择模版" @change="handleFormFlagChange">
					<el-option v-for="item in formFlagOptions" :key="item.formFlag" :label="item.formName" :value="item.formFlag">
					</el-option>
				</el-select>
			</el-form-item>
			<!--配置事件key-->
			<el-form-item prop="triggerKey" label="触发事件KEY">
				<div>
					<el-table :data="form.triggerKeys" :size="size" border>
						<el-table-column prop="C_KEY" label="事件KEY" align="center" width="160">
							<template slot-scope="scope">
								<el-input :size="size" v-model="scope.row.C_KEY"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="C_FIELD" align="center" label="关联字段">
							<template slot-scope="scope">
								<el-select multiple v-model="scope.row.C_FIELD" placeholder="请选择关联字段" filterable>
									<el-option v-for="item in feildList" :key="item" :label="item" :value="item"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center" fixed="right" width="60">
							<template slot-scope="scope">
								<el-button @click.native.prevent="deleteTriggerRow(scope.$index, form.triggerKeys)" title="删除栏位" type="text" size="small">
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="margin-top: 10px;">
						<el-button type="primary" :size="size" title="新增栏位" @click="addTriggerRow">+</el-button>
					</div>
				</div>
			</el-form-item>
			<el-form-item prop="listenKey" label="监听事件KEY">
				<div>
					<el-table :data="form.listenKeys" :size="size" border>
						<el-table-column prop="C_KEY" label="事件KEY" align="center" width="160">
							<template slot-scope="scope">
								<el-input :size="size" v-model="scope.row.C_KEY"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="C_FIELD" align="center" label="关联字段">
							<template slot-scope="scope">
								<el-select multiple v-model="scope.row.C_FIELD" placeholder="请选择关联字段" filterable>
									<el-option v-for="item in feildList" :key="item" :label="item" :value="item"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center" fixed="right" width="60">
							<template slot-scope="scope">
								<el-button @click.native.prevent="deleteListenRow(scope.$index, form.listenKeys)" title="删除栏位" type="text" size="small">
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="margin-top: 10px;">
						<el-button type="primary" :size="size" title="新增栏位" @click="addListenRow">+</el-button>
					</div>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'tree-browser-widget-config-a',
		title: '系统设置',
		props: ['data', 'form'],
		data() {
			return {
				formFlagOptions: [],
				size: 'mini',
				tableData: [],
				feildList: []
			}
		},
		methods: {
			addTriggerRow() { // 新增触发key行
				if(!this.form.triggerKeys) {
					this.tableData = []
					this.$set(this.form, 'triggerKeys', this.tableData)
				}
				this.form.triggerKeys.push({
					"C_KEY": "",
					"C_FIELD": []
				})
			},
			deleteTriggerRow(index, rows) { // 删除触发key行
				rows.splice(index, 1)
			},
			addListenRow() { // 新增监听key行
				if(!this.form.listenKeys) {
					this.tableData = []
					this.$set(this.form, 'listenKeys', this.tableData)
				}
				this.form.listenKeys.push({
					"C_KEY": "",
					"C_FIELD": []
				})
			},
			deleteListenRow(index, rows) { // 删除监听key行
				rows.splice(index, 1)
			},
			initWidgetTable: function(data) {
				this.formFlagOptions = data
			},
			getFormFlagOptions() {
				this.$api_form_getAllFormTemp({
					data: {
						formType: '2'
					},
					fn: data => this.initWidgetTable(data)
				})
			},
			handleFormFlagChange(val) {
				this.form.formFlag = val
			}
		},
		mounted() {
			this.getFormFlagOptions()
			if(this.form.formFlag) { // 获取表单对应数据表信息同时获取表字段集合
				let options = {
					data: {
						formFlag: this.form.formFlag
					}
				}
				this.$api_form_getFormConfInfo(options).then(res => {
					if(res && res.id) {
						var tmpConfig = JSON.parse(res.confJson)
						let paraMap = {}
						if(tmpConfig.dataSource) {
							if (tmpConfig.dataSourceType == 'view') {
								let options = {
									data: {
										viewName: tmpConfig.dataSource
									}
								}
								// 获取参数项字段
								this.$api_form_getViewParamsOpts(options).then((data) => {
									if(data) {
										data.forEach(item => {
											this.feildList.push(item.paramName)
							            })
									}
								})
								// 获取视图字段
								this.$api_form_getTableFeild({
									data: {
										tableName: tmpConfig.dataSource,
										dataSourceType: tmpConfig.dataSourceType
									}
								}).then((data) => {
									if(data) {
										data.forEach(item => {
											this.feildList.push(item)
							            })
									}
								})
								
							}else {
								this.$api_form_getTableFeild({
									data: {
										tableName: tmpConfig.dataSource
									}
								}).then((data) => {
									if(data) {
										this.feildList = data
									}
								})
							}
						}
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
</style>