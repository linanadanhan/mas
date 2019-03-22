<template>
  <el-form-item :label="config.label" :prop="config.name">
    <el-checkbox-group v-if="config.dataSource!=3" v-model="model[config.name]" v-bind="config">
      <el-checkbox v-for="item in config.options" :key="item.value" :label="String(item.value)">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox-group v-else v-model="model[config.name]" v-bind="config">
      <el-checkbox v-for="item in config.options" :key="item[config.viewValue]" :label="String(item[config.viewValue])">{{item[config.viewLabel]}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>  
</template>

<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
      }
    },
    mounted(){
    	if(this.model[this.config.name]!=''){
    		this.model[this.config.name] = this.model[this.config.name].split(',')
    	}
    }
  }
</script>

<style scoped="scoped">
  >>>.el-select{
    width: 100%;
  }
</style>

