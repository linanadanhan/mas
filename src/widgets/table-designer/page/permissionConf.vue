<template>
	<div class="port">
		<el-table :data="permission" size="mini" style="width: 100%">
			<el-table-column align="center" label="按钮">
				<template slot-scope="scope">
					<el-button type="primary" size="mini">{{scope.row.text}}</el-button>
				</template>
			</el-table-column>
			<el-table-column align="center" label="权限组">
				<template slot-scope="scope">
					<el-select v-model="scope.row.permissionGroup" style="padding-left: 20px;" placeholder="请选择权限组" size="mini">
						<el-option label="所有人" value=""></el-option>
						<el-option v-for="item in context.permissionGroupOptions" :key="item.C_ID" :label="item.C_NAME" :value="item.C_ID">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	export default {
		props: ['permission', 'context'],
		components: {},
		data() {
			return {
			}
		},
		created() {
		},
		methods: {

		}
	}
</script>

<style scoped>
	.port {
		min-height: 50px;
	}
</style>