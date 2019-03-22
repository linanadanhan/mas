<template>
   <el-form-item :label="config.label" :prop="config.name">
    <el-time-picker
      v-model="model[config.name]"
      :is-range="false"
      placeholder="任意时间点" v-bind="config">
    </el-time-picker>
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
  >>>.el-date-editor.el-input{
    width: 100%;
  }
</style>
