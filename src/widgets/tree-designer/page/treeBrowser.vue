<template>
	<div class="showTree">
		<el-input placeholder="输入关键字进行过滤" v-model="filterText" v-if='config.isFilterText' size="mini" class="filter">
		</el-input>
		<el-tree :lazy="lazy" :load="loadNode" v-if="showElTree" :data="treeData" v-bind='config' ref="tree" node-key="id" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick">
			<span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
			<span v-if="config.showHandleBtn && config.dataSourceType == 'table'">
					<el-dropdown trigger="click" size="small">
			      <span class="el-dropdown-link">
			        <i class='el-icon-more show'></i>
			      </span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="append(data)">添加</el-dropdown-item>
				<el-dropdown-item @click.native="remove(node, data)">删除</el-dropdown-item>
			</el-dropdown-menu>
			</el-dropdown>
			</span>
			</span>
		</el-tree>
	</div>
</template>

<script>
	let id = 10000;
	export default {
		props: ['config', 'data', 'defaultProps', 'nodeData'],
		data() {
			return {
				activeNames: ['1', '2'],
				lazy: true,
				treeData: [],
				showElTree: false
			};
		},
		created() {
    		if(this.config.lazy){
				if(this.config.defaultExpandAll){
	    			this.lazy = false
    				this.treeData = this.data
	    		}else{
	    			this.defaultProps.isLeaf = function(data, node){
	    				if(data.attributes){
	    					if(data.attributes.ISLEAF == 0){
		    					return false
		    				}else if(data.attributes.ISLEAF == 1){
		    					return true
		    				}
	    				}else{
	    					return true
	    				}
					}
	    		}
			}else{
				this.lazy = false
    			this.treeData = this.data
			}
			this.showElTree = true			
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		computed: {
	      userInfo () {
	        return this.$store.getters.userinfo
	      }
		},
		methods: {
			filterNode(value, data) {
				if(!value) return true;
				return data[this.defaultProps.label].indexOf(value) !== -1;
			},

			handleNodeClick(data) {
				this.nodeData.nodeInfo = data
			},
			append(data) {
				let id = data.id
				let text = '节点'
				// 保存根节点信息
				let params = {
					data: {
						tableName: this.config.dataSource,
						personName: this.userInfo.username,
						C_CASCADE: data.attributes.C_CASCADE + data.id + '/',
						C_PARENT_ID: id,
						C_TEXT: text						
					}
				}
				this.$api_form_saveFormData(params).then(res => {
				}).catch(err => {
					this.$message({
						'message': '新增失败！',
						'type': 'error'
					});
				}).finally(() => {
					//更新树
					//this.$emit('updataTree')
					//刷新当前选中节点
					this.reloadNode(id);
				})
			},
			remove(node, data) {
				let delArr = []
				delArr.push(data.id)
				let params = {
					data: {
						tableName: this.config.dataSource,
						ids: delArr.join(',')
					}
				}
				
				this.$api_form_delTreeNode(params).then(res => {
				}).catch(err => {
					this.$message({
						'message': '删除失败！',
						'type': 'error'
					});
				}).finally(() => {
					//更新树
					//this.$emit('updataTree')
					//刷新父节点
					this.reloadNode(data.parentId);
				})
			},
			getChilds(arr,delArr){
	    		for(let item of arr){
	    			if(item.children){
	    				delArr.push(item.id)
	    				this.getChilds(item.children, delArr);
	    			}else{
	    				delArr.push(item.id)
	    			}
	    		}
	    	},
	    	reloadNode(nodeId){
	    		if(nodeId==''){
	    			nodeId = 0
	    		}
	    		let parentId= this.getParentId()
	    		if(nodeId==parentId){//表示刷新的是根节点，使用showElTree切换值实现刷新树
					/*this.showElTree = false
					setTimeout(() => {
					  	this.showElTree = true
			       	}, 500);*/
			       	this.$emit('updataTree')
					
				}else{
	    			if(this.config.dataSource && this.config.dataSource != '' && nodeId) {
						let options = {
							data: {
								C_PARENT_ID: nodeId,
								tableName: this.config.dataSource,
								dataSourceType: this.config.dataSourceType
							}
						}
						this.$api_form_getTreeDataInfoByNode(options).then(res => {
							if(res) {
								this.$refs.tree.updateKeyChildren(nodeId,res)
							}
						}).catch(err => {
							console.info(err)
						}).finally(() => {})
					}
	    		}
			},
	    	loadNode(node, resolve) {//使用这种方式加载数据时，在父页面不需要获取data的值进行传递
	    		if(this.config.dataSource && this.config.dataSource != '') {
	    			let parentId = this.getParentId()
	    			let nodeId = parentId
	    			if (node.store.currentNode) {
			           nodeId = node.data.id
			        }
					let options = {
						data: {
							C_PARENT_ID: nodeId,
							tableName: this.config.dataSource,
							dataSourceType: this.config.dataSourceType
						}
					}
					
					this.$api_form_getTreeDataInfoByNode(options).then(res => {
						if(res) {
							resolve(res)
							if(res.length>0 && nodeId===parentId){
								this.$refs.tree.setCurrentKey(res[0].id)
							}
						}
					}).catch(err => {
						resolve([])
						console.info(err)
					}).finally(() => {})
				} else {
					resolve([])
				}
	  		},
	    	getParentId(){
	    		let parentId = 0
	    		if(this.config.cusParent){
	    			if(this.config.cusParentId && this.config.cusParentId!='' && typeof(this.config.cusParentId) != 'undefined'){
	    				parentId = this.config.cusParentId
	    			}
	    		}
	    		return parentId
	    	}
		}
	}
</script>

<style scoped="scoped">
	.filter {
		margin-bottom: 10px;
	}
	
	.showTree {
		width: 300px;
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
	
	>>>.el-icon-loading {
		display: none;
	}
</style>