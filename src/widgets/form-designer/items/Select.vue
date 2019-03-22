<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
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
  </form-item>
</template>

<script>
  import FormItem from '../pages/FormItem.vue'
  export default {
    components: { 
      'form-item': FormItem
    },
    props: ['page', 'params', 'widget','config', 'model','rules', 'context', 'rindex', 'cindex', 'rows'],
    data () {
      return {
      }
    },
    mounted () {
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

