<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<el-row class="rowClass">
				<el-col :span="21">
					财政部、商务部、工业和信息化部关于全国推广家电下乡工作
				</el-col>
				<el-col :span="3">
					05-14
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					财政部办公厅关于做好＋大产业调整
				</el-col>
				<el-col :span="3">
					03-11
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					和振兴规戈lJ财貌正打策贯彻落实工作的通知
				</el-col>
				<el-col :span="3">
					04-24
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					浙江省财政厅转发财政部关于印发2009年度外商投资企业财务
				</el-col>
				<el-col :span="3">
					02-29
				</el-col>
			</el-row>
			<el-row class="rowClass">
				<el-col :span="21">
					会计决算报表的通知
				</el-col>
				<el-col :span="3">
					02-23
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