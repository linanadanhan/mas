<template>
	<div>
		<el-carousel :interval="5000" height="380px" arrow="hover" indicator-position="outside">
	    <el-carousel-item v-for="item in guide" :key="item.C_ID">
				<p class="introTitle">{{item.C_TITLE}}</p>
				<p class="introText" v-html="item.C_CONTENT"></p>
	    	<div class="intro">
					<img class="introImg" :src="`${fileDownloadUrl}/${item.C_PHOTO}`  " alt="" width="100%" height="100%"/>
	    	</div>
	    </el-carousel-item>
  	</el-carousel>
	</div>
</template>

<script>
  import {gbs} from 'config'
	export default {
    props: ['data'],
		data() {
			return {
				guide:[],
      	fileDownloadUrl: ''
			}
		},
		methods:{

		},
		created() {
			this.guide=this.data.guideData;
			this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0 auto;
  }
  .el-carousel__item{
    overflow-y: auto;
    padding:0px;
    box-sizing: border-box;
  }
	.introTitle{
		width: 660px;
		font-size: 18px;
		color:#666;
		line-height: 20px;
		overflow: hidden;
    text-overflow:ellipsis;
		margin-left:10px;
		}
  .introText{
		width: 660px;
		height: 69px;
		font-size: 14px;
        color:#666;
		line-height: 20px;
		margin-bottom: 10px;
		padding:10px;
		overflow: hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient: vertical;
		}
  .intro{
		width: 100%;
		text-align: center;
		}
  .intro .introImg{width: 100%;}
</style>
