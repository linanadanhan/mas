<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="1" title="基本设置">
      <el-form-item label="属性名" prop="name" v-if="context.columnTab!='set-panel'">
					 <el-select v-model="context.column.name" placeholder="请选择属性名" size="mini">
             <el-option v-for="item in context.feildList" :key="item" :label="item" :value="item">
					   </el-option>
          </el-select>
			</el-form-item>
      <el-form-item label="表头标题">
        <el-input v-model="model[context.attrName]"></el-input>
      </el-form-item>
      <el-form-item label="说明属性" prop="name" v-if="context.columnTab!='set-panel'">
					 <el-select v-model="context.column.remarkeName" placeholder="请选择属性名" size="mini">
             <el-option v-for="item in context.feildList" :key="item" :label="item" :value="item">
					   </el-option>
          </el-select>
			</el-form-item>
      <el-form-item label="表头说明">
        <el-input v-model="context.column.instructions"></el-input>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item name="2" title="高级设置">
       <el-form-item label="字体" class="col-span-width">
       <el-select v-model="context.column.fontFamily" placeholder="请选择">
           <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字体大小" class="col-span-width">
        <el-input-number v-model="context.column.fontSize" :min="10"></el-input-number>
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker v-model="context.column.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="说明位置">
        <el-radio-group v-model="context.column.formHeadAlign">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="宽度" class="col-span-width">
        <el-input-number v-model="context.column.span" :min="1" :max="24"></el-input-number>
      </el-form-item>
       <el-form-item label="上边距" class="col-span-width">
        <el-input-number v-model="context.column.top" :min="10"></el-input-number>
      </el-form-item>
       <el-form-item label="下边距" class="col-span-width">
        <el-input-number v-model="context.column.bottom" :min="10"></el-input-number>
      </el-form-item>
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','config','context','model'],
    data() {
      return {
        options: [{
          value: 'SimSun',
          label: '宋体' 
        }, {
          value: 'SimHei',
          label: '黑体'
        }, {
          value: 'Microsoft Yahei',
          label: '微软雅黑'
        }, {
          value: 'Microsoft JhengHei',
          label: '微软正黑体'
        }, {
          value: 'KaiTi',
          label: '楷体'
        }, {
          value: 'NSimSun',
          label: '新宋体'
        }, {
          value: 'FangSong',
          label: '仿宋'
        }]

        
      }
    },
    activated(){
    }
  }
</script>

<style scoped>
  .el-form-item{
	  margin-bottom:12px; 
	}
  .col-span-width .el-input-number{ width: 100%; }  
</style>