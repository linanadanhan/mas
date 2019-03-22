<template>
  <div class="widget">
		<el-form ref="form" :model="form" label-width="140px">
	    <el-form-item prop="formFlag" label="表单标识">
        <el-select v-model="form.formFlag" placeholder="请选择表单标识" @change="handleFormFlagChange">
          <el-option v-for="item in formFlagOptions" :key="item.formFlag" :label="item.formName" :value="item.formFlag">
				  </el-option>
        </el-select>
	    </el-form-item>
			<!--配置事件key-->
			<el-form-item prop="triggerKey" label="触发事件">
				<div>
					<el-table :data="form.triggerKeys" :size="size" border>
						<el-table-column prop="C_KEY" label="事件KEY" align="center" width="160">
							<template slot-scope="scope">
								<el-input :size="size" v-model="scope.row.C_KEY"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="C_FIELD" align="center" label="关联字段">
							<template slot-scope="scope">
								<el-select v-model="scope.row.C_FIELD" multiple placeholder="请选择关联字段" filterable>
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
								<el-select v-model="scope.row.C_FIELD" multiple placeholder="请选择关联字段" filterable>
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
    name: 'form-widget-config-a',
    title: '系统设置',
    props: ['data', 'form'],
    data () {
    	var validateDataField = (rule, value, callback) => {
        if (!value && this.form.dataTableRel == '1') {
          callback(new Error('请选择从表关联字段！'));
        } else {
          callback();
        }
      };
      var validateDataTable = (rule, value, callback) => {
        if (!value && (this.form.dataTableRel == '0' || this.form.dataTableRel == '1')) {
          callback(new Error('请选择主表！'));
        } else {
          callback();
        }
      };
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
    	handleFormFlagChange(val) {
    		this.form.formFlag = val
    	},
    	getFormFlagOptions() {
	      this.$api_form_getAllFormTemp({
	        data: {
	          formType: '0'
	        },
	        fn: data => this.initWidgetTable(data)
	      })   		
    	},
    	initWidgetTable: function(data) {
        this.formFlagOptions = data
      },
      handleRadioChange(val) {// 数据表关联关系
      	this.form.dataTableRel = val
      	this.form.dataField = ''
      },
      handleTbChange() {
      },
      getFieldList() {// 获取主从关系时从表所有字段属性
      	if (this.form.formFlag) {
      		let options = {
	            data: {formFlag: this.form.formFlag}
	        }
		  	  this.$api_form_getFormConfInfo(options).then(res=>{
		        var tmpConfig = JSON.parse(res.confJson)
		        if (tmpConfig.dataSource) {
			        let options1 = {
		            data: {tableName: tmpConfig.dataSource, dataSourceType: tmpConfig.dataSourceType}
		          }
		          this.$api_form_getTableFeild(options1).then((data)=>{
		            if (data) {
		            	this.feildList = data
		            }else {
		            	this.feildList = []
		            }
		          }) 		        	
		        }
	        }).catch(err=>{
	          console.info(err)
	        }).finally(()=>{
	        })
      	} 
      }
    },
    mounted () {
    	this.getFormFlagOptions()
    	this.getFieldList()
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
}
</style>
