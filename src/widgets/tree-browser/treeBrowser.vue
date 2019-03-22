<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<span v-if="editMode && !diyMode" slot="buttons">
			<i class="el-icon-edit" title="设计" @click="designTree"></i>
		</span>
		<span v-if="showRootBtn && config.dataSourceType != 'view' && !editMode && !diyMode" slot="buttons">
			<i class="el-icon-plus" title="添加根节点" @click="addRootNode"></i>
		</span>
		<div class="showTree">
			<el-input placeholder="输入关键字进行过滤" v-model="filterText" v-if='config.isFilterText' size="mini" class="filter">
			</el-input>
			<el-tree :lazy="lazy" :load="loadNode" v-if="showElTree" v-bind='config' ref="tree" :data="data" node-key="id" @node-click="handleNodeClick" :props="defaultProps" :filter-node-method="filterNode">
				<span class="custom-tree-node" slot-scope="{ node, data }">
	       		<span>{{ node.label }}</span>
				<span v-if="config.showHandleBtn && config.dataSourceType == 'table'">
					<el-dropdown trigger="click" size="small">
					<span class="el-dropdown-link">
					<i class='el-icon-more show'></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="append(data)" v-if="showBtnFilter('add')">添加</el-dropdown-item>
					<el-dropdown-item @click.native="remove(node, data)" v-if="showBtnFilter('del')">删除</el-dropdown-item>
				</el-dropdown-menu>
				</el-dropdown>
				</span>
				</span>
			</el-tree>
		</div>
	</decorator>
</template>

<script>
	let id = 10000;
	export default {
		name: 'tree-browser-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				lazy: true,
				initParams: {},
				showRootBtn: false,
				showElTree: false,
				data: [],
				defaultProps: {
					children: 'children',
					label: 'text',
					isLeaf: 'leaf'
				},
				filterText: '',
				config: {
					isFilterText: false,
					showCheckbox: true,
					highlightCurrent: true,
					accordion: false,
					draggable: true,
					defaultExpandAll: false,
					expandOnClickNode: true,
					indent: 16
					//					showHandleBtn: true
				},
				form: {
					id: '',
					modelJson: {},
					confJson: {},
					ruleJson: {}
				},
				permission: {}
			}
		},
		created() {
			// this.getConf()
			//this.getDataList()
			// 监听
			if(this.params.listenKeys && this.params.listenKeys.length > 0) {
				for(var i = 0; i < this.params.listenKeys.length; i++) {
					let listenObj = this.params.listenKeys[i]
					// 调用事件接收
					this.$root.eventHub.$on(listenObj.C_KEY, (target) => {
						console.info(listenObj.C_KEY + 'widget 接收消息：' + target + ',关联字段 ' + listenObj.C_FIELD)
						let listenFileds = listenObj.C_FIELD
			 			if(listenFileds && listenFileds != '' && target) {
							listenFileds.forEach((fieldItem, index) => {
								if(target[Object.keys(target)[index]]) {
									let filedVal = target[Object.keys(target)[index]]
									this.initParams[fieldItem] = filedVal
								}
							})
						}
						//this.getDataList()
						//this.reloadNode(0)
						this.getTreeLisener();
					});
				}
			}
			this.getConf()
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		beforeDestroy() { // 此处需要销毁页面时间监听
			if(this.params.listenKeys && this.params.listenKeys.length > 0) {
				for(var i = 0; i < this.params.listenKeys.length; i++) {
					var listenKey = this.params.listenKeys[i]
					this.$root.eventHub.$off(listenKey.C_KEY)
				}
			}
		},
		computed: {
			editMode() {
				return this.$store.getters.editMode
			},
			diyMode() {
				return this.$store.getters.diyMode
			},
			userInfo () {
		        return this.$store.getters.userinfo
		    }
		},
		methods: {
			getTreeLisener(){
				if(this.config.lazy){
					if(this.config.defaultExpandAll){
						this.getDataList();
					}else{
						this.reloadNode(0)
					}
				}else{
					this.getDataList();
				}
			},
			getDataList() {
				if(this.params.formFlag) {
					if(this.config.dataSource && this.config.dataSource != '') {
						this.initParams.tableName = this.config.dataSource
						this.initParams.dataSourceType = this.config.dataSourceType
						let options = {
								data: this.initParams
						}
						this.$api_form_getTreeDataInfo(options).then(res => {
							if(res) {
								this.data = res
								this.handleNodeClick(this.data[0])
								if(res.length>0){
									this.showRootBtn = true
								}
							}
						}).catch(err => {
							console.info(err)
						}).finally(() => {
						})
					}
					//判断是否有关联表根据值，查询关联数据
					let param='';
					for(var i in this.initParams) {
						if (i!='tableName'&&i!='dataSourceType') {
							param=this.initParams[i]
						}
					}

					if (this.config.relationTab && this.config.relationTab!=''
						&& this.config.relationCol && this.config.relationCol!=''
						&& this.config.showCol && this.config.showCol!=''
						&& param && param!='') {
						let options = {
							data: {
								tabName: this.config.relationTab,
								colName:this.config.relationCol,
								showName:this.config.showCol,
								param:param
							}
						}
						this.selectTreeData = []
						this.$api_form_getTreeRelationData(options).then(res => {
							if(res) {
								res.map( (item) => {
									this.selectTreeData.push(item[this.config.showCol])
								})
								if(this.$refs.tree){
									this.$refs.tree.setCheckedKeys(this.selectTreeData)
								}
								
								
							}
						}).catch(err => {
							console.info(err)
						}).finally(() => {})

					}

				}
			},
			filterNode(value, data) {
				if(!value) return true;
				return data[this.defaultProps.label].indexOf(value) !== -1;
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
				this.$api_form_saveFormData(params).then(res => {}).catch(err => {
					this.$message({
						'message': '新增失败！',
						'type': 'error'
					});
				}).finally(() => {
					//this.getDataList(); // 刷新当前tree
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
				this.$api_form_delTreeNode(params).then(res => {}).catch(err => {
					this.$message({
						'message': '删除失败！',
						'type': 'error'
					});
				}).finally(() => {
					//this.getDataList(); // 刷新当前tree
					//刷新父节点
					this.reloadNode(data.parentId);
				})
			},
			getChilds(arr, delArr) {
				for(let item of arr) {
					if(item.children) {
						delArr.push(item.id)
						this.getChilds(item.children, delArr);
					} else {
						delArr.push(item.id)
					}
				}
			},
			handleSaveTree() {
				this.form.modelJson = JSON.stringify(this.modelJson)
				this.form.confJson = JSON.stringify(this.config)
				this.form.ruleJson = JSON.stringify(this.form.ruleJson)
				this.form.formType = '2'
				let options = {
					data: this.form
				}
				this.$api_form_saveFormConfInfo(options).then(res => {
					this.$message({
						'message': '保存成功！',
						'type': 'success'
					});
				}).catch(err => {
					this.$message({
						'message': '保存失败！',
						'type': 'error'
					});
				}).finally(() => {
					this.getDataList(); // 刷新当前tree
				})
			},
			handleNodeClick(data) { //点击树节点
				//触发事件
				if(this.params.triggerKeys && this.params.triggerKeys.length > 0) {
					for(var i = 0; i < this.params.triggerKeys.length; i++) {
						let trigger = this.params.triggerKeys[i]
						let triggerKey = trigger.C_KEY
						let triggerField = trigger.C_FIELD
						let filedVal = {}
						if (triggerField) {
							triggerField.forEach((fieldItem, index) => {
								filedVal[fieldItem] = data.attributes[fieldItem]
							})
						}
						this.$root.eventHub.$emit(triggerKey, filedVal)
					}
				}
			},
			designTree() { // 表格设计
				if(!this.params.formFlag) {
					// 新增表单模版
					var tmpFormFlag = 'tr' + this.$_.now()
					let form = {
						formFlag: tmpFormFlag,
						formName: tmpFormFlag,
						formType: '2',
						status: '1'
					}
					this.$api_form_saveFormTempInfo({
						data: form
					}).then(res => {
						this.params.formFlag = res.formFlag
						this.$api_site_saveProfileConf({
							data: {
								widgetUuId: this.widget.id,
								diyMode: false,
								json: JSON.stringify(this.params)
							}
						})
						this.loadFormTmp()
					}).catch(err => {
						console.info(err)
						this.$message({
							'message': '新增树模版失败！',
							'type': 'info'
						});
					}).finally(() => {})
				} else {
					this.loadFormTmp()
				}
			},
			loadFormTmp() {
				// 根据表格模版获取单笔模版信息
				if(this.params.formFlag) {
					this.$api_form_getFormTempByFormFlag({
						data: {
							formFlag: this.params.formFlag
						}
					}).then(res1 => {
						if(res1) {
							this.showFormTmp(res1)
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {})
				}
			},
			showFormTmp(rows) {
				let body = require('./view/treeDesign.vue')
				let title = 'tree树设计'
				let dlg = this
				let options = {
					title: title,
					width: '100%',
					heigth: '100%',
					'fullscreen': true,
					body: body.default,
					'before-close': function(done) {
						dlg.getDataList()
						done()
					},
					data: {
						page: dlg.page,
						params: dlg.params,
						widget: {
							id: dlg.widget.id,
							hidden: true
						},
						i: dlg.i,
						j: dlg.j,
						fm: rows
					}
				}
				this.$dialog(options)
			},
			showBtnFilter(btnName) {
				if(this.permission[btnName]) {
					return true
				} else {
					return false
				}
			},
			addRootNode(){// 添加树根节点
				this.$prompt('请输入根节点名称', '', { inputPattern:/^\S+$/,inputErrorMessage: '根节点名称不能为空！' }).then((result) => {
					let id = (this.data && this.data.length > 0) ? this.data[0].parentId : this.getParentId()
					// 保存根节点信息
					let params = {
						data: {
							tableName: this.config.dataSource,
							C_PARENT_ID: id,
							C_CASCADE: '/',
							personName: this.userInfo.username,
							C_TEXT: result.value
						}
					}
					this.showElTree = false
					
					this.$api_form_saveFormData(params).then(res => {}).catch(err => {
						this.$message({
							'message': '新增失败！',
							'type': 'error'
						});
					}).finally(() => {
						//this.getDataList(); // 刷新当前tree
						
						//设置this.showElTree的值时为了重新加载tree
						this.showElTree = true
					})
		    	});
			},
			getConf() {
				if(this.params.formFlag) {
					let options = {
						data: {
							formFlag: this.params.formFlag
						}
					}
					this.$api_form_getTreeConfInfo(options).then(res => {
						if(res && res.id) {
							this.form.id = res.id
							let tmpConfig = JSON.parse(res.confJson)
							this.config = tmpConfig
							if(res.permissionMap) {
								this.permission = JSON.parse(res.permissionMap)
							}
							if(this.config.lazy){
								if(this.config.defaultExpandAll){
					    			this.lazy = false
					    			this.getDataList()
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
					    		this.getDataList()
							}
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {
						this.showElTree = true
					})
				}
			},
			reloadNode(nodeId){
				if(nodeId==''){
	    			nodeId = 0
	    		}
				let parentId= this.getParentId()
				if(nodeId==parentId){//表示刷新的是根节点，使用showElTree切换值实现刷新树
					this.showElTree = false
					  setTimeout(() => {
					  	this.showElTree = true
			       	  }, 500);
				}else{
					this.initParams.tableName = this.config.dataSource
					this.initParams.dataSourceType = this.config.dataSourceType
					this.initParams.C_PARENT_ID = nodeId
					let options = {
						data: this.initParams
					}
					this.$api_form_getTreeDataInfoByNode(options).then(res => {
						if(res) {
							this.$refs.tree.updateKeyChildren(nodeId,res)
						}
					}).catch(err => {
						console.info(err)
					}).finally(() => {})
				}
				
			},
			loadNode(node, resolve) {//使用这种方式加载数据时，在父页面不需要获取data的值进行传递
	    		if(this.config.dataSource && this.config.dataSource != '') {
	    			let parentId = this.getParentId()
	    			let nodeId = parentId;
	    			if (node.store.currentNode) {
			           nodeId = node.data.id
			        }
	    			this.initParams.tableName = this.config.dataSource
					this.initParams.dataSourceType = this.config.dataSourceType
					this.initParams.C_PARENT_ID = nodeId
					let options = {
						data: this.initParams
					}
					this.$api_form_getTreeDataInfoByNode(options).then(res => {
						if(res) {
							resolve(res)
							if(res.length>0){
								this.showRootBtn = true
								if(nodeId===parentId){
									this.$refs.tree.setCurrentKey(res[0].id)
								}
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