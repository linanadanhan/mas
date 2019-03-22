<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
    <el-input clearable :class="config.unit?'addUnit':''" v-model="model[config.name]" v-bind='config' :type="config.componentType" :rows="config.rowNumber" @blur="handleInputRules(model[config.name])"></el-input>
    <span class="unit" v-show="config.unit">{{config.unit}}</span>
    <span v-show="config.errorMsg" class="error-message">{{errMsg}}</span>
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
        errMsg:''
      }
    },
    methods: {
       handleInputRules(val){
         this.config.errorMsg=false
         //验证数字
         if(!this.config.errorMsg && this.context.column.numCheck){
              if (!(/^[0-9]+$/).test(val)) {
                  this.errMsg="请输入数字值"
                  this.config.errorMsg=true
              }else{
                 this.errMsg=""
                 this.config.errorMsg=false
              }
         }
          //长度校验
          if(!this.config.errorMsg && this.context.column.lengthCheck){
            if(val.length>this.context.column.textLength){
                this.errMsg="输入长度过长"
                this.config.errorMsg=true
            }else{
                this.errMsg=""
                this.config.errorMsg=false
            }

          }
          //邮箱校验
          if(!this.config.errorMsg && this.context.column.emailCheck){
            var regEmail=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if(!regEmail.test(val)){
                this.errMsg="邮箱格式不正确"
                this.config.errorMsg=true
            }else{
                this.errMsg=""
                this.config.errorMsg=false
            }

          }

          //日期校验
          if(!this.config.errorMsg && this.context.column.dateCheck){
            var regDate=/^(\d{4})(0\d{1}|1[0-2])(0\d{1}|[12]\d{1}|3[01])$/
            if(!regDate.test(val)){
                this.errMsg="日期格式不正确"
                this.config.errorMsg=true
            }else{
                this.errMsg=""
                this.config.errorMsg=false
            }

          }



          //唯一验证
         if(!this.config.errorMsg && this.context.column.uniqueCheck){
           if(this.context.config.dataSource!=''){
                let options = {
                  data: {
                    tableName:this.context.config.dataSource,
                    id:'',
                    [this.config.name]:val
                  }
              }
              this.$api_form_checkUnique(options).then(res => {
                if(res){
                  this.errMsg=""
                  this.config.errorMsg=false

                }else{
                  this.errMsg='属性值已存在'
                  this.config.errorMsg=true
                }
              }).catch(err => {
                console.info(err)
              }).finally(() => {})
           }

         }

       }
    }
  }
</script>

<style scoped="scoped">
	.addUnit{width:85%}
	.unit{width:15%;margin-left: 5px;}
  .error-message{ color:#f56c6c;font-size:12px; display: block;}
</style>
