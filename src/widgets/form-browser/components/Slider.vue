<template>
   <el-form-item :label="config.label" :prop="config.name">
    <el-slider v-model="model[config.name]" v-bind="config"></el-slider>
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
