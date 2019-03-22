<template>
  <el-form-item :label="config.label" :prop="config.name">
    <el-date-picker 
      v-model="model[config.name]"
      :type="config.componentType"
      start-placeholder="开始日期"
      end-placeholder="结束日期" v-bind="config" :picker-options="pickerOptions">
    </el-date-picker>
  </el-form-item>
</template>

<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
         pickerOptions: {
          disabledDate: (time) => {
              if(this.config.startTimeCheck){
                  return time.getTime() < Date.now() ;
              }
          }
        }
      }
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
