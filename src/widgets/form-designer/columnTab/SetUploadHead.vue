<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="图片宽度" class="col-span-width">
        <el-input-number v-model="context.column.imgWidth"></el-input-number>
      </el-form-item>
      <el-form-item label="图片高度" class="col-span-width">
        <el-input-number v-model="context.column.imgHeight"></el-input-number>
      </el-form-item>
      <el-form-item label="设置">
        <!-- <el-checkbox-group v-model="context.column.defaultFormValue"> -->
          <el-checkbox v-model="context.column.images" label="picture-card">照片墙</el-checkbox>
          <!-- <el-checkbox label="drag">支持拖拽</el-checkbox><br/>
          <el-checkbox label="multiple">文件多选</el-checkbox><br/>
          <el-checkbox label="disabled">禁用</el-checkbox> -->
        <!-- </el-checkbox-group> -->
      </el-form-item>
      <el-form-item label="图片个数" class="col-span-width">
        <el-input-number v-model="context.column.imgCount" :min="0" @change="checkCK"></el-input-number>
      </el-form-item>
      <el-form-item label="图片大小" class="col-span-width">
        <el-input-number v-model="context.column.imgSize" :min="0" style="width: 120px;"></el-input-number>
        &nbsp;&nbsp;MB
      </el-form-item>
     <!-- <el-form-item label="图片像素" class="col-span-width">
        
      </el-form-item>-->
      <el-form-item label="图片格式">
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
    <el-collapse-item name="3" title="校验">
      <el-form-item label="">
        <el-checkbox v-model="context.column.rule[0].required">必填</el-checkbox><br/>
      </el-form-item>
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context'],
    data() {
      return {
      	options:[{value:'jpg'},{value:'png'}]
	    }
    },
    methods:{
    	checkCK(newValue,oldValue){
    		if(newValue>1){
    			this.context.column.images = true
    		}else{
    			this.context.column.images = false
    		}
    	}
    }
  }
</script>

<style scoped>
  .el-form-item {
     margin-bottom:12px; 
  }
  .check{
    background: #f3f3f3;
    padding: 10px;
    box-sizing: border-box;
  }
  .col-span-width .el-input-number{ width: 100%; }  
</style>