<template>
  <el-form-item :label="config.label" :prop="config.name" :label-width="config.label?'':'5px'">
    <el-date-picker v-if="config.componentType=='week'"
      v-model="model[config.name]"
      :type="config.componentType"
      placeholder="选择日期" v-bind="config"  format="yyyy 第 WW 周">
    </el-date-picker>
    <el-date-picker v-else :class="config.unit?'addUnit':''"
      v-model="model[config.name]"
      :type="config.componentType"
      placeholder="选择日期" v-bind="config" >
    </el-date-picker>
    <span class="unit" v-show="config.unit">{{config.unit}}</span>
  </el-form-item> 
</template>

<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped="scoped">
  >>>.el-date-editor.el-input{
    width: 100%;
  }
  >>>.el-date-editor.el-input__inner{
    width: 100%;
  }
  .addUnit{width:85%!important}
	.unit{width:15%;margin-left: 5px;}
</style>
