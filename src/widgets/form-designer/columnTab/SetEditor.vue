<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="高度">
         <el-input-number v-model="context.column.editorHeight" :min="50"  size="mini"></el-input-number>
      </el-form-item>
      <el-form-item label="设置">
        <el-checkbox v-model="context.column.disabled" @change="changeDisabled">禁用</el-checkbox>
      </el-form-item>
    </el-collapse-item>
  </el-form>	
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context'],
    data() {
      return {
      }
    },
    methods:{
    	changeDisabled(){
					this.context.editor[this.context.column.name].$textElem.attr('contenteditable', !this.context.column.disabled)
    	}
    }
  }
</script>

<style scoped>
  .el-form-item {
     margin-bottom:12px; 
  }
  .el-input-number{ width: 100%; }
</style>