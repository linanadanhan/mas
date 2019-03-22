<template>
	<div>
		<el-form ref="form" :model="context.column" label-width="70px" size="mini">
		    <el-collapse-item name="2" title="高级设置">
		      <el-form-item label="选项">
		        <el-radio-group @change="handleRadioChange" v-model="context.column.dataSource" size="mini">
		          <el-radio-button label="1">本地</el-radio-button>
		          <el-radio-button label="2">数据字典项</el-radio-button>
		          <el-radio-button label="3">动态视图</el-radio-button>
		        </el-radio-group>
		      </el-form-item>
		      
		      <el-form-item label="备选项" v-show="context.column.dataSource === '1'">
		        <el-button type="text" icon="el-icon-circle-plus" @click="addList">添加</el-button>
		        <div class="addlist" >
		        	<span>值</span>
		        	<span>文本</span>
		        </div>
		        <div class="addlist" v-for="(list,index) in context.column.options" :key="index">
		        	<el-input v-model="list.value" size="mini" readonly="true" placeholder="请填写值"></el-input>
		        	<el-input v-model="list.label" size="mini" readonly="true" placeholder="请填写文本"></el-input>
		        	<el-button type="text" icon="el-icon-delete" @click="deleteList(index)"></el-button>
		        </div>
		      </el-form-item>
		      
		      <el-form-item v-show="context.column.dataSource === '2'" label="字典标识">
		       <el-select v-model="context.column.dicKey" @change="handleDicChange" placeholder="请选择字典标识" size="mini">
		         <el-option v-for="item in context.column.dicOptions" :key="item.C_KEY" :label="item.C_NAME" :value="item.C_KEY">
						 </el-option>
		       </el-select>
		      </el-form-item>
		      
		      <el-form-item v-show="context.column.dataSource === '3'" label="动态视图">
		       <el-select v-model="context.column.viewKey" @change="handleViewChange" placeholder="请选择动态视图" size="mini">
		         <el-option v-for="item in context.column.viewOptions" :key="item.C_NAME" :label="item.C_TEXT" :value="item.C_NAME">
						 </el-option>
		       </el-select>
		      </el-form-item>
		      <el-form-item v-show="context.column.dataSource === '3' && context.column.viewKey && context.column.viewKey!='' " label="选择值">
		       	<el-select v-model="context.column.viewValue" placeholder="请选择值" size="mini">
			         <el-option v-for="item in context.column.viewFieldOptions" :key="item" :label="item" :value="item">
							 </el-option>
			       </el-select>
		      </el-form-item>
		      <el-form-item v-show="context.column.dataSource === '3' && context.column.viewKey && context.column.viewKey!='' " label="选择文本">
		       	<el-select v-model="context.column.viewLabel" @change="handleTextChange" placeholder="请选择文本" size="mini">
			         <el-option v-for="item in context.column.viewFieldOptions" :key="item" :label="item" :value="item">
							 </el-option>
			       </el-select>
		      </el-form-item>
		      
		      <el-form-item label="设置">
		        <el-checkbox v-model="context.column.disabled">禁用</el-checkbox><br/>
		      </el-form-item>
		    </el-collapse-item>  
		</el-form>	
		  
		<set-item :itemObj="itemObj" :context="context"></set-item>
	
  </div>
</template>

<script>
  import SetItem from './SetItem.vue'
  export default {
    props:['page', 'params', 'widget','context'],
    components: {
      'set-item': SetItem
    },
    data() {
      return {
      	itemObj:{
      		dlgVisible: false
      	}
      }
    },
    methods:{
      addList(){
      	this.itemObj.dlgVisible = true
      	//this.$set(this.itemObj,this.itemObj.dialogFormVisible,true)
        /*let length=this.context.column.options.length
        let options = this.context.column.options.push({value:length+1,label:''})
        this.$set(this.context,this.context.column.options,options)*/
      },
      deleteList(index){
        this.context.column.options.splice(index,1)
      },
      handleRadioChange(val) {
      	this.context.column.defaultFormValue = ''
      	this.context.column.options = []
      	if (val === '2') {
      		this.context.column.dicKey = ''
      	}else if(val === '3'){
      		this.context.column.viewKey = ''
      		this.context.column.viewValue = ''
      		this.context.column.viewLabel = ''
      		this.context.column.viewFieldOptions = []
      	}
      },
      handleDicChange() { // 数据字典下拉选框change事件,设置右边预览项
      	if (this.context.column.dicKey) {
          let options = {
            data: {dicKey: this.context.column.dicKey}
          }
          this.$api_form_getDicItemByKey(options).then((data)=>{
            if (data) {
            	this.$set(this.context.column, 'options', JSON.parse(JSON.stringify(data).toLowerCase()))
            }
          })  		
      	}
      },
      getDicOptions(){//获取数据字典内容
      	this.$api_form_getDicOptions().then((data) => {
	      	if (data) {
	      		this.$set(this.context.column, 'dicOptions', data)
	      	}
		    })
      },
      getViewOptions(){//获取视图信息
      	let qryTableName = 'TBL_VIEWS'
				let options = {
					data: {
						tableName: qryTableName
					}
				}
				this.$api_form_getTableDataInfo(options).then((data) => {
					if(data) {
						this.$set(this.context.column, 'viewOptions', data)
					}else{
						this.$set(this.context.column, 'viewOptions', [])
					}
				})
      },
      handleViewChange() {//选择视图名称，获取视图对应的字段，绑定到下面的值和文本的下拉框
				if(this.context.column.viewKey) {
					let options = {
						data: {
							tableName: this.context.column.viewKey,
							dataSourceType: 'view'
						}
					}
					this.$api_form_getTableFeild(options).then((data) => {
						if(data) {
							this.$set(this.context.column, 'viewFieldOptions', data)
						}else {
							this.$set(this.context.column, 'viewFieldOptions', [])
						}
					})
					this.$set(this.context.column, 'viewValue', '')
					this.$set(this.context.column, 'viewLabel', '')
					this.$set(this.context.column, 'options', [])
				}
			},
      handleTextChange() { // 获取配置视图中的所有数据，根据value和label设置左边项,设置右边预览项
      	if (this.context.column.viewValue && this.context.column.viewLabel) {
      		let paraMap = {
      				dataSourceType:'view',
					  	tableName: this.context.column.viewKey
					}
					this.$api_form_getTableDataInfo({data: paraMap}).then(res => {
						if(res) {
							this.$set(this.context.column, 'options', JSON.parse(JSON.stringify(res).toUpperCase()))
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {
					})
          		
      	}
      }
    },
    created(){
    	this.getDicOptions()
    	this.getViewOptions()
    }
  }
</script>

<style scoped>
  .el-form-item {
     margin-bottom:12px; 
  }
  .addlist{height: 40px;line-height: 40px;margin-bottom: 5px;background:#f8fafe;padding: 0 5px;box-sizing: border-box;margin-left: -54px;}
  .addlist >>>.el-input{width: 90px;float: left;}
  .addlist >>> span{width: 90px;float: left;text-align: center;}
  .addlist >>>.el-button{margin-left:5px;}
</style>