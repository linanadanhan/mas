<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
      <el-upload multiple :action="fileServiceUrl" :file-list="fileList" :on-success="handleImportSuccess" :on-remove="handleRemove" 
      	:before-upload="beforeAvatarUpload"
      	:limit="context.column.fileCount" :on-exceed="handleExceed">
        <el-button size="mini" type="primary">点击上传</el-button>
      </el-upload>
  </form-item>
</template>

<script>
  import FormItem from '../pages/FormItem.vue'
  import {gbs} from 'config'
  export default {
    components: { 
      'form-item': FormItem
    },
    props: ['page', 'params', 'widget','config', 'model','rules', 'context','rindex','cindex','rows'],
    data () {
      return {
      	fileServiceUrl: '',
      	fileDownloadUrl: '',
      	fileList: []
      }
    },
    methods: {
    	handleImportSuccess(response, file, fileList) {
    		var tmpReferenceId = ''
    		if (fileList.length > 0) {
    			fileList.forEach((item,index) => {
						tmpReferenceId += item.response.referenceId + ','
					})
    		}
    		if (tmpReferenceId.length > 0)
    		{
    			tmpReferenceId = tmpReferenceId.substring(0,tmpReferenceId.length - 1)
    		}
				this.$set(this.model, this.config.name, tmpReferenceId)
    	},
    	handleRemove(file, fileList) {
    		fileList.splice(fileList.indexOf(file), 0)
    		var tmpReferenceId = ''
    		if (fileList.length > 0) {
    			fileList.forEach((item,index) => {
						tmpReferenceId += item.response.referenceId + ','
					})
    		}
    		if (tmpReferenceId.length > 0)
    		{
    			tmpReferenceId = tmpReferenceId.substring(0,tmpReferenceId.length - 1)
    		}
    		this.$set(this.model, this.config.name, tmpReferenceId)
    	},
    	handleExceed(files, fileList) {
    		this.$message.warning(`当前限制选择 ${this.context.column.fileCount} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  		},
  		beforeAvatarUpload(file) {
		  	let fileSize = this.context.column.fileSize 
		  	let fileSuffix = this.context.column.fileSuffix 
		    
		    let isLtSize = false
		    let isSuffix = false
		
		    if (fileSuffix && fileSuffix.length>0) {
		    	let filename = file.name
		    	let temp = filename.split('.')
		    	if(temp.length>=2){
		    		let suffix = temp[temp.length-1].trim()
		    		for(let i=0;i<fileSuffix.length;i++){
		    			if(suffix == fileSuffix[i].trim()){
		        			isSuffix = true
		        			break
		        		}
		    		}
		    	}
		    	if(!isSuffix){
		    		this.$message.error('上传文件格式错误!');
		    	}
		    }else{
		    	isSuffix = true
		    }
		    
		    if(fileSize!='' && typeof(fileSize) !='undefined'){
		    	isLtSize = file.size / 1024 / 1024 < fileSize;
		    	if (!isLtSize) {
		        this.$message.error(`上传文件大小不能超过 ${fileSize}MB!`);
		      }
		    }else{
		    	isLtSize = true
		    }
		    
		    return isSuffix && isLtSize;
  		}
    },
    created () {
    	this.fileServiceUrl = gbs.fileServiceUrl + '/file/uploadFile'
    	this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
    	
    	if (this.model[this.config.name]) {
    		var listArr = String(this.model[this.config.name]).split(',')
    		if (listArr.length > 0) {
	    		for (var referenceId in listArr)
	    		{
	    			if (referenceId != '0') {
	    				var obj = {
		    				name: referenceId,
		    				url: this.fileDownloadUrl + '/' + referenceId
		    			}
		    			this.fileList.push(obj)
	    			}
	    		}    			
    		}
    	}
    }
  }
</script>

<style>
</style>
