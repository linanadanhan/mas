<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<el-row class="rowClass">
				<el-col :span="21">
					预算单位账号开设、变更申报表
				</el-col>
				<el-col :span="3">
					12-30
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					2014年度省级事业单位结余及各项目基金核定表
				</el-col>
				<el-col :span="3">
					03-12
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					浙财农发〔201314号附件
				</el-col>
				<el-col :span="3">
					12-11
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					预算单位账号开设、变更申报表
				</el-col>
				<el-col :span="3">
					02-23
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					2014年度省级事业单位结余及各项目基金核定表
				</el-col>
				<el-col :span="3">
					11-29
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					浙财农发〔201314号附件
				</el-col>
				<el-col :span="3">
					10-30
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					预算单位账号开设、变更申报表
				</el-col>
				<el-col :span="3">
					10-11
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