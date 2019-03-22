<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
      <el-upload
			  class="avatar-uploader"
        :list-type="config.images ? 'picture-card': ''"
        :file-list="fileList"
			  :action="fileServiceUrl"
			  :show-file-list="config.images ? true : false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload"
			  :limit="config.fileCount"
		    :on-exceed="handleExceed">
			  <span v-if="!config.images">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="{width:`${this.config.imgWidth}px`,height:`${this.config.imgHeight}px`, lineHeight:`${this.config.imgHeight}px`}">
			    <i v-else class="el-icon-plus avatar-uploader-icon" :style="{width:`${this.config.imgWidth}px`,height:`${this.config.imgHeight}px`, lineHeight:`${this.config.imgHeight}px`}"></i>
        </span>
         <span v-else>
          <i class="el-icon-plus avatar-uploader-icon" :style="{width:`${this.config.imgWidth}px`,height:`${this.config.imgHeight}px`, lineHeight:`${this.config.imgHeight}px`}"></i>
         </span>
			</el-upload>
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
  </form-item>
</template>

<script>
	import {gbs} from 'config'
  import FormItem from '../pages/FormItem.vue'
  export default {
    components: { 
      'form-item': FormItem
    },
    props: ['page', 'params', 'widget','config', 'model', 'context','rules','rindex','cindex','rows'],
    data () {
      return {
      	imageUrl: '',
      	fileServiceUrl: '',
        dialogImageUrl: '',
        fileDownloadUrl: '',
        dialogVisible: false,
        fileList: [],
        imgStyle:{
          width:`${this.config.imgWidth}px`,
          height:`${this.config.imgHeight}px`,
          lineHeight:`${this.config.imgHeight}px`
        }
      }
    },
    methods: {
    	handleAvatarSuccess(res, file, fileList){
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
    		if (!this.config.images) {
    			this.imageUrl = this.fileDownloadUrl + '/' + res.referenceId
    		}
    		
    		this.$set(this.model, this.config.name, tmpReferenceId)
    	},
    	handleExceed(files, fileList) {
    		this.$message.warning(`当前限制选择 ${this.config.imgCount} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  		},
    	beforeAvatarUpload(file) {
    		let fileSize = this.config.imgSize 
		  	let fileSuffix = this.config.fileSuffix 
    		
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
    			isSuffix = file.type === 'image/jpeg' || file.type === 'image/png';
    			this.$message.error('上传头像图片只能是 JPG 或png格式!');
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
      },
      handlePictureCardPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
      }
    },
    mounted () {
    	this.fileServiceUrl = gbs.fileServiceUrl + '/file/uploadFile'
    	this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
    	if (this.model[this.config.name]) {
    		var listArr = String(this.model[this.config.name]).split(',')
    		if (listArr.length > 0) {
    			if (this.config.images) {
    				for (var i in listArr)
		    		{
		    				var obj = {
			    				name: listArr[i],
			    				url: this.fileDownloadUrl + '/' + listArr[i]
			    			}
			    			this.fileList.push(obj)
		    		}
    			}else{
 						this.imageUrl = gbs.fileServiceUrl + '/file/download/' + listArr[0]
    			}
    		}
    	}
    }
  }
</script>

<style scoped>
  >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  >>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  >>> .avatar-uploader .el-upload {
    border-radius: 0;
  }
  >>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 85px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }
  >>> .avatar {
    width: 85px;
    height: 105px;
    display: block;
  }
  >>>.el-upload--picture-card{ width:auto;height:auto;line-height:initial; }
</style>
