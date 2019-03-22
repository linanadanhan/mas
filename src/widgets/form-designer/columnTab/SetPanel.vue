<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
      <el-form-item label="卡片">
        <el-checkbox v-model="context.column.card"></el-checkbox>
      </el-form-item>
      <el-row v-if="context.column.card">
        <el-form-item label="卡片头部">
          <el-checkbox v-model="context.column.showHead"></el-checkbox>
        </el-form-item>
        <el-form-item label="卡片阴影">
            <el-radio-group v-model="context.column.cardShadow">
              <el-radio-button label="always">有</el-radio-button>
              <el-radio-button label="hover">移入</el-radio-button>
              <el-radio-button label="never">无</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="model[context.attrName]"></el-input>
        </el-form-item>
      </el-row>
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','config','context','model'],
    data() {
      return {
        lineHeightFlag: false
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .el-form-item{
	  margin-bottom:12px; 
	}
</style>