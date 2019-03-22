<template>
   <el-form-item :label="config.label" :prop="config.name">
    <el-input v-model="model[config.name]" v-bind='config' :type="config.componentType"></el-input>
  </el-form-item>  
</template>

<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style>
</style>
