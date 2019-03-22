<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="最小值">
        <el-input v-model="context.column.min"></el-input>
      </el-form-item>
      <el-form-item label="最大值">
        <el-input v-model="context.column.max"></el-input>
      </el-form-item>
      <el-form-item label="步数">
        <el-input v-model="context.column.step"></el-input>
      </el-form-item>
      <el-form-item label="设置">
        <el-checkbox v-model="context.column.disabled">禁用</el-checkbox><br/>
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
</style>