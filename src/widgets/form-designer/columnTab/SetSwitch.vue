<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="打开描述">
        <el-input v-model="context.column.activeText"></el-input>
      </el-form-item>
      <el-form-item label="关闭描述">
        <el-input v-model="context.column.inactiveText"></el-input>
      </el-form-item>
      <el-form-item label="设置">
        <el-checkbox v-model="context.column.disabled">禁用</el-checkbox>
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