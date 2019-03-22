<template>
   <el-form-item :label="config.label">
      <!-- <el-upload multiple :action="fileServiceUrl" :on-change="handleChange" :file-list="fileList" :on-success="handleImportSuccess" :on-remove="handleRemove"
      	:before-upload="beforeAvatarUpload"
      	:limit="config.fileCount" :on-exceed="handleExceed" >
        <el-button size="mini" type="primary">点击上传</el-button>
      </el-upload> -->

      <el-upload action="https://jsonplaceholder.typicode.com/posts/"  
      drag
      :disabled="!videoFlag"
      :show-file-list="true" 
      :on-success="handleImportSuccess"
      :before-upload="(file) => beforeAvatarUpload(file,config)"
      :on-progress="uploadVideoProcess">
      <i v-if="videoFlag" class="el-icon-upload"></i>
      <div class="el-upload__text">
        <span v-if="videoFlag">将文件拖到此处，或<em>点击上传</em></span>
         <el-progress v-if="!videoFlag" type="circle" :percentage="videoUploadPercent"></el-progress> 
      </div>
      <div class="el-upload__tip" slot="tip">只能上传【mp4，ogg，avi，flv，wmv】格式视频文件，且不超过10MB</div>
    </el-upload>
    <div class="video-box">
      <video v-bind="config"
      :width=" config.width ? `${config.width}px` : '100%' "
      >
        <source src="http://www.w3school.com.cn//i/movie.ogg" type="video/ogg"/>
        <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/ogg" />
      </video>
    </div>
  </el-form-item>
</template>

<script>
	import {gbs} from 'config'
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
      	fileServiceUrl: '',
      	videoFlag: true,
        videoUploadPercent: 0
      }
    },
    methods: {
      handleImportSuccess(response, file, fileList) {
    		this.videoFlag = false
    	},
  		beforeAvatarUpload(file,config) {
        const isLt10M = file.size / 1024 / 1024  < config.videoSize
        let videoArr = []
        config.videoSuffix.forEach( item => {
            videoArr.push('video/' + item)
        })
        console.log(videoArr)
        if (videoArr.indexOf(file.type) == -1) {
            this.$message.error('请上传正确的视频格式，支持格式有【mp4，ogg，avi，flv，wmv】');
            return false;
        }
        if (!isLt10M) {
            this.$message.error('上传视频大小不能超过10MB哦!');
            return false;
        }
      },
      uploadVideoProcess(event, file, fileList){
          this.videoFlag = false
          this.videoUploadPercent = file.percentage.toFixed(0)
          console.log('------',file.percentage.toFixed(0))
      }
    }
  }
</script>

<style>
</style>
