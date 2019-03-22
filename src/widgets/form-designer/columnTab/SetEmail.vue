<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
    <!-- <el-form-item label="文本类型">
    <el-radio-group v-model="context.column.componentType">
      <el-radio label="text">文本</el-radio>
      <el-radio label="textarea">文本域</el-radio>
    </el-radio-group>
    </el-form-item> -->
    <el-form-item label="设置">
      <el-checkbox v-model="context.column.disabled">禁用</el-checkbox><br/>
      <el-checkbox v-model="context.column.readonly">只读</el-checkbox>
    </el-form-item>
    </el-collapse-item>
    <el-collapse-item name="3" title="校验">
      <el-form-item label="">
        <el-checkbox v-model="context.column.rule[0].required">必填</el-checkbox><br/>
      </el-form-item>
      <el-form-item label="正则">
        <el-input v-model="context.column.rule[1].pattern" size="mini"></el-input>
      </el-form-item>
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context', 'model', 'config'],
    data() {
      return {
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped>
  .el-form-item{
	  margin-bottom:12px; 
	}
</style>