<template>
	<div>
		<p class="introText" v-html="helpDetail.C_CONTENT"></p>
    <div class="intro">
      <img class="introImg" :src="`${fileDownloadUrl}/${helpDetail.C_PHOTO}`  " alt="" />
    </div>
		<div v-if="fileList.length>0">
		  <p>附件：<br/></p>
			<li class="file_li" v-for="(item,index) in fileList" :key = "index"><a  class="el-upload-list__item-name"   @click="uploadFile(item.referenceId)"><i class="el-icon-document"></i>{{item.name}}</a></li>
		</div>
	</div>
</template>

<script>
    import {gbs} from 'config'
	export default {
		props: ['data'],
		data() {
			return {
				helpDetail:{},
				fileList:[]
			}
		},
		methods:{
			uploadFile(referenceId){
				this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
				window.location.href = this.fileDownloadUrl + "/" + referenceId
			}

		},
		created() {
      this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
      this.helpDetail=this.data.helpData
			if (this.helpDetail && this.helpDetail.C_FILES.length>0) {
				let params = {
					data:{
						referenceIds: this.helpDetail.C_FILES
					}
				}
				this.$api_form_getFileNodesById(params).then(res => {
					if(res) {
						this.fileList = res
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {
				})
				}
		},
		mounted() {
		}
	}
</script>

<style scoped>
  .introText{
		width: 660px;
		height: 100%;
		font-size: 14px;
		color:#666;
		line-height: 20px;
		margin-bottom: 10px;
		padding:10px;
		overflow: hidden;
		overflow-y: auto;
	}
.file_li{
	list-style-type: none;
	margin-top:10px;
}
.el-icon-document:before {
    content: "\E614";
}
.el-upload-list__item-status-label{
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
    display: none;
}
.el-upload-list__item .el-icon-upload-success {
    color: #67c23a;
    content: "\E614";
}
.intro{
    width: 100%;
    text-align: center;
}
  .intro .introImg{width: 100%;}
</style>
