<template>
	<div class="main">
	  <div class="content">
	    <el-row>
	           温馨提示：您访问的页面不存在！
	    </el-row>
	    <el-row>
        <el-button type="text" @click="backHome">返回首页</el-button>
      </el-row>
	  </div>
	</div>
</template>
<script>
	export default {
		name: 'no-page',
		props: ['data'],
		data() {
			return {
			}
		},
		computed: {
		  site() {
        return this.$store.getters.site
      }
		},
		methods: {
		  backHome() {
		    this.$router.push(`/${this.site.name}/public`)
		  }
		},
		created() {
		}
	}
</script>

<style scoped>
.main{position: absolute;top: 0px;bottom:0px;width: 100%;overflow: hidden;background:#faf3ed;}
.content{
  position: relative;
  text-align: center;
  top:50%;
}
</style>
