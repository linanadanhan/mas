<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
    	<el-form-item label="单位">
        <el-input v-model="context.column.unit"></el-input>
      </el-form-item>
      <el-form-item label="最小值">
        <el-input v-model.number="context.column.min"></el-input>
      </el-form-item>
      <el-form-item label="最大值">
        <el-input v-model.number="context.column.max"></el-input>
      </el-form-item>
      <el-form-item label="步数">
        <el-input v-model.number="context.column.step"></el-input>
      </el-form-item>
      <el-form-item label="设置">
        <el-checkbox v-model="context.column.disabled">禁用</el-checkbox>
      </el-form-item>
      <el-form-item label="按钮位置">
        <el-radio-group v-model="context.column.controlsPosition">
          <el-radio label="">默认</el-radio>
          <el-radio label="right">右边</el-radio>
        </el-radio-group>
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
</style>