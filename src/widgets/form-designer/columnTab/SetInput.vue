<template>
  <el-form ref="form" :model="context.column" label-width="70px" size="mini">
    <el-collapse-item name="2" title="高级设置">
    	<el-form-item label="单位">
        <el-input v-model="context.column.unit"></el-input>
      </el-form-item>
      <el-form-item label="文本类型">
	      <el-radio-group style="width: 150px;" v-model="context.column.componentType">
	        <el-radio label="text">文本</el-radio>
	        <el-radio label="textarea">文本域</el-radio>
	      </el-radio-group>
      </el-form-item>
      <el-form-item label="行数" v-if="context.column.componentType=='textarea'">
         <el-input-number v-model="context.column.rowNumber" :min="2"></el-input-number>
      </el-form-item>
      <el-form-item label="设置">
        <el-checkbox v-model="context.column.disabled">禁用</el-checkbox><br/>
        <el-checkbox v-model="context.column.readonly">只读</el-checkbox>
      </el-form-item>
      <el-form-item label="模糊查询">
        <el-checkbox v-model="context.column.likeQry"></el-checkbox>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item name="3" title="校验">
      <el-form-item label="">
        <el-checkbox v-model="context.column.required" @change="(val,rule) => handelRules(val,'required',true,'不能为空',0)">必填</el-checkbox><br/>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox  filterable :disabled="context.column.emailCheck" v-model="context.column.numCheck" @change="(val,rule) => handelRules(val,'validator','numberCheck','只能输入数字',1)">数字校验</el-checkbox><br/>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox  v-model="context.column.lengthCheck" @change="(val,rule) => handelRules(val,'validator','lengthCheck','长度校验失败',2)">长度校验</el-checkbox>
        <el-input-number filterable :disabled="!context.column.lengthCheck" v-model="context.column.textLength"  :min="1" :max="1000" size="mini" @change="handleLenChange('lengthCheck')"></el-input-number>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox    filterable :disabled="context.column.dateCheck|| context.column.numCheck" v-model="context.column.emailCheck" @change="(val,rule) => handelRules(val,'type','email','邮箱格式不正确',1)">邮箱校验</el-checkbox><br/>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox   filterable :disabled="context.column.emailCheck"  v-model="context.column.dateCheck" @change="(val,rule) => handelRules(val,'validator','dateCheck','日期格式不正确',1)">日期校验</el-checkbox><br/>
      </el-form-item>
       <el-form-item label="">
        <el-checkbox  v-model="context.column.uniqueCheck" @change="(val,rule) => handelRules(val,'validator','uniqueCheck','该值已存在',3)">唯一验证</el-checkbox><br/>
      </el-form-item>
    </el-collapse-item>
  </el-form>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context', 'model', 'config','rules'],
    data() {
      return {
        check:false
      }
    },
    created() {
        console.info(this.context.column.rule)
    },
    methods:{
      handleLenChange(expreVal){
        let key = this.context.column.name
        let rule = this.context.column.rule
        let obj = {}
        rule.map( (item,index) => {//判断长度校验是否添加进去还是仅仅只是做修改长度
            if(item.flag==expreVal){
              item.textLength = this.context.column.textLength
              this.check=true
            }else{
              this.check=false
            }
        })
        if(this.context.column.textLength&&this.context.column.textLength!=''&& !this.check){
            obj.textLength=this.context.column.textLength

            obj.message = this.context.column.label + '长度校验失败'
            obj.trigger = 'blur'
            obj.flag = expreVal
            rule.push(obj)
        }
         this.$set(this.rules, key, rule)
      },
      handelRules(val,expreKey,expreVal,msg,type){//type=0:类似于required的原生态的验证   type=1:自定义验证 type=2:长度  type=3:唯一
        let key = this.context.column.name
        let rule = this.context.column.rule
        let obj = {}
        obj.flag = false
        // 获取当前控件的rule信息，并在选中或取消时重新组装json
          if(val){//添加json
             eval("obj." + expreKey + "='" + expreVal + "'");
           if(type===2){//长度
              if(this.context.column.textLength&&this.context.column.textLength!=''){
                obj.textLength=this.context.column.textLength

                obj.message = this.context.column.label + msg
                obj.trigger = 'blur'
                obj.flag = expreVal
                rule.push(obj)
              }
            }else if(type===3){//唯一
               if(this.config.dataSource&&this.config.dataSource!=''){
                  obj.tabName=this.config.dataSource
                  obj.colName=key
                  obj.message = this.context.column.label + msg
                  obj.trigger = 'blur'
                  obj.flag = expreVal
                  rule.push(obj)
              }
            }else{
               obj.message = this.context.column.label + msg
               obj.trigger = 'blur'
               if(type===0){
                  obj.flag = expreKey
                }else{
                  obj.flag = expreVal
                }
                rule.push(obj)
            }
          }else{
            rule.map( (item,index) => {
              if(type===0){
                if(item.flag==expreKey){
                  rule.splice(index,1)
                }
              }else{
                if(item.flag==expreVal){
                  rule.splice(index,1)
                }
              }
            }) 
          }
          this.$set(this.rules, key, rule)
      }
    }
  }
</script>

<style scoped>
  .el-form-item{
	  margin-bottom:12px;
	}
	.el-input-number{ width: 100%; }
</style>
