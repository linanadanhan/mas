<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="设置">
        <el-checkbox-group v-model="context.column.defaultFormValue">
          <el-checkbox label="drag">支持拖拽</el-checkbox><br/>
          <el-checkbox label="multiple">文件多选</el-checkbox><br/>
          <el-checkbox label="disabled">禁用</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文件个数">
        <el-input-number v-model="context.column.fileCount" :min="0" style="width: 120px;"></el-input-number>
      </el-form-item>
      <el-form-item label="文件大小" prop="fileSize">
        <!--<el-input v-model="context.column.fileSize" size="mini" placeholder="请输入内容" style="width: 120px;"></el-input>-->
        <el-input-number v-model="context.column.fileSize" :min="0" style="width: 120px;"></el-input-number>
        &nbsp;&nbsp;MB
      </el-form-item>
      <el-form-item label="文件格式">
        <el-select v-model="context.column.fileSuffix" multiple placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.value"
			      :value="item.value">
			    </el-option>
				</el-select>
      </el-form-item>
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context'],
    data() {
    	var checkNum = (rule, value, callback) => {
        if (value) {
        	if (!(/^[0-9]+([.]{1}[0-9]+){0,1}$/).test(value)) {
        		//只允许输入数字，将非数字进行替换
        		let regexp = /[^\d\.]]*/g
        		this.context.column.fileSize = this.context.column.fileSize.replace(regexp,'')  
		        callback(new Error('必须为数字值!'))
		      }
        }else{
        	 callback();
        }
      };
      return {
      	rules:{
		      fileSize:[{ validator: checkNum}]
		    },
      	options:[
	      	{value:'doc'},{value:'docx'},
	      	{value:'xls'},{value:'xlsx'},
	      	{value:'pdf'},{value:'txt'}
	      	]
	      }
    }
  }
</script>

<style scoped>
  .el-form-item {
     margin-bottom:12px; 
  }
  .el-input-number {
		width: 100%;
	}
</style>