<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="main">
			<div class="content">
				<el-row>
					温馨提示：您无权限访问该页面！
				</el-row>
			</div>
		</div>
	</decorator>
</template>

<script>
export default {
	name: 'no-permission',
	props: ['page', 'params', 'widget', 'i', 'j'],
	data () {
		return {
		}
	},
	methods: {
	},
	computed: {
	},
	created () {
	}
}
</script>

<style scoped>
.main {
  position: relative;
  top: 0px;
	height: 510px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
  background: #faf3ed;
}
.content {
  position: relative;
  text-align: center;
  top: 50%;
}
</style>