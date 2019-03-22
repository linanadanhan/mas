<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
    <el-checkbox-group v-if="config.dataSource!=3" v-model="model[config.name]" v-bind="config">
      <el-checkbox v-for="item in config.options" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox-group v-else v-model="model[config.name]" v-bind="config">
      <el-checkbox v-for="item in config.options" :key="item[config.viewValue]" :label="item[config.viewValue]">{{item[config.viewLabel]}}</el-checkbox>
    </el-checkbox-group>
  </form-item>
</template>

<script>
  import FormItem from '../pages/FormItem.vue'
  export default {
    components: { 
      'form-item': FormItem
    },
    props: ['page', 'params', 'widget','config', 'model','rules', 'context','rindex','cindex','rows'],
    data () {
      return {
      }
    },
    mounted(){
    }
  }
</script>

<style scoped="scoped">
  >>>.el-select{
    width: 100%;
  }
</style>

