<template>
	<div class="main">
	  <div class="content">
	    <el-row>
	           温馨提示：您访问的站点不存在！
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
		},
		methods: {
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