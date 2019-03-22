<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="日期类型">
        <el-select v-model="context.column.componentType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设置">
        <el-checkbox v-model="context.column.disabled">禁用</el-checkbox><br/>
        <el-checkbox v-model="context.column.readonly">只读</el-checkbox>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item name="3" title="校验">
      <el-form-item label="">
        <el-checkbox v-model="context.column.rule[0].required">必填</el-checkbox><br/>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="context.column.startTimeCheck">开始时间大于当前时间</el-checkbox><br/>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-checkbox v-model="context.column.endTimeCheck">结束时间大于开始时间</el-checkbox><br/>
      </el-form-item> -->
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context'],
    data() {
      return {
        options:[{
          value: 'datetimerange',
          label: '日期时间范围'
        },{
          value: 'daterange',
          label: '日期范围'
        }]
      }
    }
  }
</script>

<style scoped>
  .el-form-item{
	  margin-bottom:12px; 
	}
  .check{
    background: #f3f3f3;
    padding: 10px;
    box-sizing: border-box;
  }
</style>