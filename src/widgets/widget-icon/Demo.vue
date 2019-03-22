<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      <el-button type="text" @click="dialogVisible = true">打开图标库</el-button>
			<el-dialog title="选择对象" :visible.sync="dialogVisible" width="90%" top="5vh" :close-on-click-modal="false">
			  <div slot="title" >
			    <h3 style="border-bottom: 1px solid #e5e5e5;height: 35px;font-size: 18px;font-weight: normal;">选择对象</h3>
			  </div>
			  <widget-icon/>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">关 闭</el-button>
			    <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
			  </div>
			</el-dialog>
    </div>
  </decorator>
</template>

<script>
	import Icon from './Icon'
  export default {
    name: 'icon-widget',
    props: ['page', 'params', 'widget', 'i', 'j'],
    components:{
    	'widget-icon':Icon
    },
    data () {
      return {
      	dialogVisible: false,
      }
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
}
>>>.el-dialog__body{padding: 10px 20px;}
.dialog-footer{border-top: 1px solid #e5e5e5;padding: 10px 20px;}
>>>.el-dialog__header{padding: 20px 20px 0px 20px;}
>>>.el-dialog__footer{padding: 0px 20px 5px;}
</style>
