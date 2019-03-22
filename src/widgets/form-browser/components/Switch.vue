<template>
   <el-form-item :label="config.label" :prop="config.name">
      <el-switch v-model="model[config.name]" v-bind="config"></el-switch>
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

<style>
</style>
