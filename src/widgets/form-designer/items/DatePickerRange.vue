<template>
  <form-item :config="config" :model="model"  :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
    <el-date-picker 
      v-model="model[config.name]"
      :type="config.componentType"
      start-placeholder="开始日期"
      end-placeholder="结束日期" v-bind="config"   :picker-options="pickerOptions">
    </el-date-picker>
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
       pickerOptions: {
         disabledDate: (time) => {
             if(this.context.column.startTimeCheck){
                return time.getTime() < Date.now() ;
             }
         }
        }
      }
    },
    methods: {
  }
  }
</script>

<style scoped="scoped">
  >>>.el-date-editor.el-input{
    width: 100%;
  }
  >>>.el-date-editor.el-input__inner{
    width: 100%;
  }
</style>
