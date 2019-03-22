<template>
  <el-form-item :label="config.label" :prop="config.name" :label-width="config.label?'':'5px'">
    <el-input :clearable="clearable" :class="config.unit?'addUnit':''" v-model="model[config.name]" v-bind='config' :type="config.componentType"></el-input>
    <span class="unit" v-show="config.unit">{{config.unit}}</span>
  </el-form-item>
 </template>
<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
        clearable: true,
        errMsg:''
      }
    },
    methods: {

    },
    created() {
    	if (this.config.readonly || this.config.disabled) {
    		this.clearable = false
    	} else {
    		this.clearable = true
    	}
    }
  }
</script>

<style scoped="scoped">
	.addUnit{width:85%}
	.unit{width:15%;margin-left: 5px;}
  .error-message{ color:#f56c6c;font-size:12px; display: block;}
</style>
