<template>
   <el-form-item :label="config.label" :prop="config.name">
    <el-select v-if="config.dataSource!=3" :class="config.unit?'addUnit':''" v-model="model[config.name]" placeholder="请选择" v-bind="config">
      <el-option
        v-for="item in config.options"
        :key="String(item.value)"
        :label="item.label"
        :value="String(item.value)">
      </el-option>
    </el-select>
    <el-select v-else :class="config.unit?'addUnit':''" v-model="model[config.name]" placeholder="请选择" v-bind="config">
      <el-option
        v-for="item in config.options"
        :key="String(item[config.viewValue])"
        :label="item[config.viewLabel]"
        :value="String(item[config.viewValue])">
      </el-option>
    </el-select>
    <span class="unit" v-show="config.unit">{{config.unit}}</span>
  </el-form-item>  
</template>

<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
      }
    },
    created () {
      this.model[this.config.name] = String(this.model[this.config.name])
    }
  }
</script>

<style scoped="scoped">
  >>>.el-select{
    width: 100%;
  }
  .addUnit{width:90%}
	.unit{width:10%;margin-left: 5px;}
</style>

