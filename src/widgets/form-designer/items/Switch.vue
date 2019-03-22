<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
      <el-switch v-model="model[config.name]" v-bind="config"></el-switch>
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

<style>
</style>
