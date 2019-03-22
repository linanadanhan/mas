<template>
   <el-form-item :label="config.label" :prop="config.name">
   	 <el-radio-group v-if="config.dataSource!=3" v-model="model[config.name]" v-bind="config">
    	<el-radio v-for="item in config.options" :key="item.value" :label="String(item.value)">{{item.label}}</el-radio>
    </el-radio-group>
    <el-radio-group v-else v-model="model[config.name]" v-bind="config">
      <el-radio v-for="item in config.options" :key="item[config.viewValue]" :label="String(item[config.viewValue])">{{item[config.viewLabel]}}</el-radio>
    </el-radio-group>
  	
    <!--<el-radio-group v-model.number="model[config.name]" v-bind="config">
      <el-radio v-for="item in config.options" :key="item.value" :label="Number(item.value)">{{item.label}}</el-radio>
    </el-radio-group>-->
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
    },
    created() {
    	//this.model[this.config.name] = Number(this.model[this.config.name])
    	this.model[this.config.name] = String(this.model[this.config.name])
    }
  }
</script>

<style scoped="scoped">
  >>>.el-select{
    width: 100%;
  }
</style>

