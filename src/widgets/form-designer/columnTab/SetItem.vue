<template>
  <el-dialog title="新增备选项" :visible.sync="itemObj.dlgVisible" append-to-body @closed="closeDlg">
	  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <el-form-item label="文本" prop="label">
	      <el-input v-model="form.label"></el-input>
	    </el-form-item>
	    <el-form-item label="值" prop="value">
	    	 <el-input v-model="form.value"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="itemObj.dlgVisible = false">取 消</el-button>
	    <el-button type="primary" @click="confirmDlg">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
  export default {
    props:['page', 'params', 'widget','context','itemObj'],
    data() {
    	  var checkValue = (rule, value, callback) => {
	        if (!value) {
	         callback(new Error('请输入备选项的值'));
	        }
	        let flag = false
	        let options = this.context.column.options
	      	for(let i=0;i<options.length;i++){
	      		if(options[i].value == value){
	      			flag = true
	      			break
      			}
	      	}
	      	if(flag){
	      		callback(new Error('输入的值('+value+')已经存在'));
	      	}else{
	      		callback();
	      	}
	      };
      return {
      	 form: {
          label:'',
          value: ''
        },
        rules: {
        	label: [
            { required: true, message: '请输入备选项文本', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入备选项的值', trigger: 'blur' },
            { validator: checkValue, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      closeDlg(){
      	//this.itemObj.dlgVisible = false
      	//this.$refs['ruleForm'].resetFields()
      	this.form = {
          label:'',
          value: ''
        }
      	this.$refs['ruleForm'].clearValidate()
      },
      confirmDlg(){
      	this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
          	let length=this.context.column.options.length
			      let options = this.context.column.options.push(this.form)
			      this.$set(this.context,this.context.column.options,options)
        		//关闭dlg
            this.itemObj.dlgVisible = false
          } 
        });
      }
    },
    created(){
    }
  }
</script>

<style scoped>
</style>