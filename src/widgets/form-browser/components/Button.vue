<template>
  <el-row class="btn-box" :style="{textAlign:config.textAlign}">
    <el-button :type="config.style" @click="handleClick(config)" v-bind='config'>{{config.defaultFormValue}}</el-button>
  </el-row>
</template>

<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
        align:'center'
      }
    },
    created () {
    },
    methods:{
    	handleClick(config) {
    		if (config.default == '0') {// 默认事件
	    		if (config.eventType == '0') {// 保存
	    			this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.saveHandle()
	    		}else if (config.eventType == '1') {// 重置
	    			this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.resetForm()
	    		}else if (config.eventType == '2') {// 查询
							this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.qryForm()
	    		}
    		}else if (config.default == '1') {// 自定义事件
    			//TODO
    		}
    	}
    }
  }
</script>

<style scoped>
.btn-box{ min-height: 58px; line-height: 45px; }
</style>