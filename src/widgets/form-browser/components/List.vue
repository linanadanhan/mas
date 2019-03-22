<template>
  <el-form-item :label="config.label" :prop="config.name" :label-width="config.label?'':'5px'">
  	<div @click="handleClickTag">
        <template v-for="item in fileList">
          <div>
            {{item.name}}
            <el-button v-if="config.download" @click="handleDownLoad(item)" type="text">下载</el-button>
            <el-button v-if="config.preview" @click="handlePreview(item)" type="text">预览</el-button>
          </div>
        </template>
  	</div>
	</el-form-item>
</template>

<script>
	import {gbs} from 'config'
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
      	fileList: [],
      	fileDownloadUrl: '',
      	filePreviewUrl: ''
      }
    },
    created () {
    	if (this.model[this.config.name]) {
					let params = {
						data: {
							referenceIds: this.model[this.config.name]
						}
					}
					this.$api_form_getFileNodesById(params).then(data => {
						if(data) {
							this.fileList = data
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {
					})
    	}
    	this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
    	this.filePreviewUrl = gbs.filePreviewUrl + '/file/download'
    },
    methods:{
      handleClickTag(){
        this.$set(this.context,'activeTab','column')
        this.$set(this.context,'columnTab',"form-"+this.config.type)
        this.$set(this.context,'column',this.config)
      },
      handleDownLoad(item){// 下载
      	window.location.href = this.fileDownloadUrl + "/" + item.referenceId
      },
      handlePreview(item) {// 预览
      	window.location.href = this.filePreviewUrl + "/" + item.referenceId
      }
    }
  }
</script>

<style scoped>

</style>