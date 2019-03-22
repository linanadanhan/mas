<template>
	<div>
		<el-card class="box-card">
			<div class="text item">
				<div class="mainLeft">
					<el-tree :data="dataTree" 
						default-expand-all 
						highlight-current 
						ref="tree" 
						@node-click="handleNodeClick" 
						:expand-on-click-node=false 
						node-key="id" 
						:props="defaultProps">
					</el-tree>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script>
	export default {
		name: 'sys-page',
		props: ['data'],
		data() {
			return {
				dataTree: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				currentNode: {}
			}
		},
		computed: {
			site() {
				return this.$store.getters.site
			}
		},
		methods: {
			getSysTreeData() { // 获取系统菜单树数据
				let options = {
					data: {
						siteCode: this.site.name
					}
				}
				this.$api_site_getSysPageTree(options).then((data) => {
					if(data) {
						this.dataTree = data
					}
				})
			},
			handleNodeClick(data) { //点击树节点
				this.currentNode = data
			},
		},
		created() {
			this.getSysTreeData()
		}
	}
</script>

<style scoped>
	>>>.el-dialog__body {
		padding: 10px 20px;
	}
	
	.box-card {
		height: 520px;
	}
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	
	.show {
		display: none;
	}
	
	>>>.custom-tree-node:hover .show {
		display: block;
	}
	
	.el-icon-more {
		padding: 2px 10px;
		box-sizing: border-box;
	}
	
	.mainLeft {
		width: 325px;
		height: 480px;
		overflow: auto;
		background: #f6f7fb;
	}
	
	.mainLeft .el-tree {
		background: #f6f7fb;
	}
</style>