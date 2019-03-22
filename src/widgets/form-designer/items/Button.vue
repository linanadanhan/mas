<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
    <el-row class="btn-box" :style="{textAlign:config.textAlign}">
      <el-button :type="config.style" v-bind='config'>{{config.defaultFormValue}}</el-button>  
    </el-row>  
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
.btn-box{ min-height: 58px; line-height: 45px; }
</style>

