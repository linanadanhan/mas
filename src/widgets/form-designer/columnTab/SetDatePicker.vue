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
      <el-form-item label="单位">
        <el-input v-model="context.column.unit"></el-input>
      </el-form-item>
      <el-form-item label="设置">
        <el-checkbox v-model="context.column.disabled">禁用</el-checkbox><br/>
        <el-checkbox v-model="context.column.readonly">只读</el-checkbox>
      </el-form-item>
      <el-form-item label="区间">
        <el-radio-group style="width: 150px;" v-model="context.column.dateInterval">
	        <el-radio label="isBegin">开始</el-radio>
	        <el-radio label="isEnd">结束</el-radio>
	      </el-radio-group>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item name="3" title="校验">
      <el-form-item label="">
        <el-checkbox v-model="context.column.rule[0].required">必填</el-checkbox><br/>
      </el-form-item>
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context'],
    data() {
      return {
        options:[{
          value: 'date',
          label: '日期'
        },{
          value: 'year',
          label: '年'
        },{
          value: 'month',
          label: '月'
        },{
          value: 'week',
          label: '周'
        },{
          value: 'datetime',
          label: '日期时间'
        }]
      }
    }
  }
</script>

<style scoped>
  .el-form-item{
	  margin-bottom:12px; 
	}
</style>