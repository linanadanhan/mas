<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
    <el-time-picker
      v-model="model[config.name]"
      :is-range="false"
      placeholder="任意时间点" v-bind="config">
    </el-time-picker>
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
    }
  }
</script>

<style scoped="scoped">
  >>>.el-date-editor.el-input{
    width: 100%;
  }
</style>
