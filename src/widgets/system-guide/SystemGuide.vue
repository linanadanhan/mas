<template>
	<div>
		<el-carousel :interval="5000" arrow="hover" height="360px" indicator-position="outside">
	    <el-carousel-item v-for="item in guide" :key="item.id">
	    	<p class="introText">{{item.introduce}}</p>
	    	<div class="intro">
	    		<img class="introImg" :src="item.img" alt="" />
	    	</div>
	    </el-carousel-item>
  	</el-carousel>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				guide:[{
					id:0,
					img:require('./guide.png'),
					introduce:'邮件客户端界面'
				},{
					id:1,
					img:require('./guide.png'),
					introduce:'这是引导说明文字2'
				},{
					id:2,
					img:require('./guide.png'),
					introduce:'这是引导说明文字3'
				},{
					id:3,
					img:require('./guide.png'),
					introduce:'这是引导说明文字4'
				}]
			}
		},
		methods:{
			
		},
		created() {
		
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
    /*background-color: #f3f5f6;*/
    padding:0px;
    box-sizing: border-box;
  }
  .introText{font-size: 14px;font-size:#666;line-height: 20px;margin-bottom: 10px;overflow: auto;padding:10px;}
  .intro{width: 100%;text-align: center;height: 290px;overflow: hidden;}
  .intro .introImg{width: 100%;}
</style>