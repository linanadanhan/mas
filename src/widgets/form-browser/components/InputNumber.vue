<template>
   <el-form-item :label="config.label" :prop="config.name">
    <el-input-number :class="config.unit?'addUnit':''" v-model="model[config.name]" v-bind="config"></el-input-number>
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
  >>>.el-input-number{
    width: 100%;
  }
  .addUnit{width:90%}
	.unit{width:10%;margin-left: 5px;}
</style>



