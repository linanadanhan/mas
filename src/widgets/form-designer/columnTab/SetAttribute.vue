<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="属性值">
        <el-input type="textarea" v-model="model[context.attrName]"></el-input>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="context.column.background"></el-color-picker>
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker v-model="context.column.color"></el-color-picker>
      </el-form-item>
      <!-- <el-form-item label="图标">
        <span slot="label"><i></i></span>
      </el-form-item> -->
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','config','context','model'],
    data() {
      return {
        lineHeightFlag: false
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .el-form-item{
	  margin-bottom:12px; 
	}
  .col-span-width .el-input-number{ width: 100%; }  
</style>