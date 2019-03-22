<template>
	<div>
		<el-row>
			{{data.data}}
			<i v-if="data.description" @click="showMsgDetail" class="el-icon-question msc-text-color" title="显示错误明细内容" style="margin-left:10px;cursor:pointer;"></i>
		</el-row>
		<el-dialog :fullscreen="true" :modal="false" @close="closeDialog" :visible.sync="dialogFormVisible">
			{{data.description}}
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['data'],
		data() {
			return {
				dialogFormVisible: false
			}
		},
		created() {
		},
		methods: {
			showMsgDetail() {
				this.dialogFormVisible = true
			},
			closeDialog() {
				this.dialogFormVisible = false
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
</style>