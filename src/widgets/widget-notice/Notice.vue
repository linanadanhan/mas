<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<el-row class="rowClass">
				<el-col :span="18">
					产品部全体人员在下午13:50分到大会议室开会
				</el-col>
				<el-col :span="3">
					16:45
				</el-col>
				<el-col :span="3">
					农审中心
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="18">
					方舟子我读文峰我读发为福建体人员在下午到大会议阿偶
				</el-col>
				<el-col :span="3">
					11:30
				</el-col>
				<el-col :span="3">
					办公室
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="18">
					产品部全体人员在下午13:50分到大会议室
				</el-col>
				<el-col :span="3">
					05:23
				</el-col>
				<el-col :span="3">
					会计中心
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="18">
					方舟子我读文峰我读发为福建体人员在下午到大会议阿偶
				</el-col>
				<el-col :span="3">
					04-30
				</el-col>
				<el-col :span="3">
					农发办
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="18">
					产品部全体人员在下午13:50分到大会议室
				</el-col>
				<el-col :span="3">
					04-21
				</el-col>
				<el-col :span="3">
					农发办
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="18">
					产品部全体人员在下午13:50分到大会议室
				</el-col>
				<el-col :span="3">
					04-12
				</el-col>
				<el-col :span="3">
					办公室
				</el-col>
			</el-row>
		</div>
	</decorator>
</template>

<script>
	export default {
		name: 'hello-world-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
	.rowClass {
		margin: 10px;
		line-height: 20px;
		cursor: pointer;
	  font-size: 14px;
	  text-overflow: ellipsis;
	}
	.rowClass:hover{
		color: black;
		background: #f5f7fa;
	}
</style>