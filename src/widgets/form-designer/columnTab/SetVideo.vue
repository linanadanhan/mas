<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <!-- <el-form-item label="资源路径">
        <el-input v-model="context.column.reourceUrl"></el-input>
      </el-form-item> -->
      <el-form-item label="自动播放">
        <el-checkbox v-model="context.column.autoPlay"></el-checkbox>
      </el-form-item>
      <el-form-item label="显示控件">
        <el-checkbox v-model="context.column.controls"></el-checkbox>
      </el-form-item>
      <el-form-item label="循环播放">
        <el-checkbox v-model="context.column.loop"></el-checkbox>
      </el-form-item>
      <el-form-item label="播放器宽" class="col-span-width">
        <el-input-number :min="200" v-model="context.column.width"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="播放器高" class="col-span-width">
        <el-input-number v-model="context.column.videoHeight"></el-input-number>
      </el-form-item> -->
      <el-form-item label="文件大小" class="col-span-width">
        <el-input-number v-model="context.column.videoSize" :min="0" style="width: 120px;"></el-input-number>
        &nbsp;&nbsp;MB
      </el-form-item>
      <el-form-item label="文件格式">
        <el-select v-model="context.column.videoSuffix" multiple placeholder="请选择">
			    <el-option
			      v-for="(item,index) in context.column.videoSuffixList"
			      :key="index"
			      :label="item"
			      :value="item">
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
      return {
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