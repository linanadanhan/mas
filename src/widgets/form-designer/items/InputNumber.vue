<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
    <el-input-number :class="config.unit?'addUnit':''" v-model="model[config.name]" v-bind="config"></el-input-number>
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
    }
  }
</script>

<style scoped="scoped">
  >>>.el-input-number{
    width: 100%;
  }
  .addUnit{width:90%}
	.unit{width:10%;margin-left: 5px;}
</style>



