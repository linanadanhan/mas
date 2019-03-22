<template>
  <div>
    <el-row type="flex" justify="space-between" class="handle">
      <h2></h2>
      <el-button type="primary" size="mini" @click="handleSaveTableConfig">保存</el-button>
    </el-row>
    
		<el-tabs v-model="activeName" @tab-click="handleTabClick">
			<el-tab-pane label="表格配置" name="first">
				<editor-column v-if="config.rows[0].children.length > 0 ? true:false" :is="context.columnName" :context="context" :config="config"/>
				<widget :widget="tableBrowser" :page="page"></widget>
			</el-tab-pane>
			<el-tab-pane label="权限配置" name="second">
				<permissionConf :permission="permission" :context="context"></permissionConf>
			</el-tab-pane>
		</el-tabs>
  </div>
</template>

<script>
import EditorColumn from './EditorColumn.vue'
import permissionConf from './permissionConf.vue'
export default {
  props: ['config', 'context', 'fm', 'page', 'params', 'widget', 'permission', 'permissionMap'],
  components:{
    'editor-column': EditorColumn,
		'permissionConf': permissionConf
  },
  data() {
    return {
    	activeName: 'first',
      form: {},
			tableData: [],
			tableBrowser: {
				hidden: true,
				id: this.$_.now(),
				name: 'table-browser'
			},
			tableBrowserParams: {
				decorator: 'none',
				formFlag: this.params.formFlag,
				config: this.config,
				formType: '1',
				qryParams: {}
			}
    }
	},
	computed: {
		rootPage () {
			return this.$store.getters.page
		}
	},
  created(){
		this.$store.dispatch('update_widget_params',{
			rootPage: this.rootPage,
			widgetId: this.tableBrowser.id,
			params: this.tableBrowserParams
		})
  },
  methods: {
    handleSaveTableConfig(){
    	  this.resetPermission()
        this.form.id = this.fm ? this.fm.C_ID : ''
        this.form.formType = this.fm ? this.fm.C_FORM_TYPE : ''
        this.form.confJson = JSON.stringify(this.config)
        this.form.modelJson = JSON.stringify(this.modelJson)
        this.form.ruleJson = JSON.stringify(this.rules)
        this.form.permissionJson = JSON.stringify(this.permission)
        console.info(this.form)
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
        }).finally(() => {})
      },
			handleTabClick(tab, event) {
				this.activeName = tab.name
				if(tab.name === 'second') {
					this.resetPermission()
				}
			},
			resetPermission() {// 重新组装按钮权限项
					// toolButton 添加
					var i = 0
					if(this.config.tool.type) {
						this.config.tool.type.forEach((item, index) => {
							if ((item.default && item.isCheck) || item.type == '9') {
								// 判断原数组中是否已存在
								var isExistObj = this.permission.find((pitem)=> {
							    return pitem.name === item.name;
							  })
								
								if (!isExistObj) {
									isExistObj = {
										name: item.name,
										text: item.text ? item.text : item.name,
										permissionGroup: ''
									}
								}
								this.$set(this.permission, i, isExistObj)
								i++
							}
						})
					}
					// 操作列表按钮
					if (this.config.rows[0].children) {
						this.config.rows[0].children.forEach((item, index) => {
						 	 if (item.type) {
						 	 		item.type.forEach((colItem, index) => {
						 	 			 if ((colItem.default && colItem.isCheck) || colItem.type == '9') {
						 	 			 		// 判断原数组中是否已存在
												var isExistObj = this.permission.find((pitem)=> {
											    return pitem.name === colItem.name;
											  })
												
												if (!isExistObj) {
													isExistObj = {
														name: colItem.name,
														text: colItem.text ? colItem.text : colItem.name,
														permissionGroup: ''
													}
												}
												this.$set(this.permission, i, isExistObj)
												i++
						 	 			 }
						 	 		})
						 	 }
						})
					}
					
					if (this.permission && this.permission.length > i) {
						this.permission.splice(i,1)
					}				
			}
  }
}
</script>

<style scoped>
	.handle {
		padding: 10px;
		border-bottom:  0px solid #e4e7ed;
	}
  .editor-table{ width:100%; }
  >>>.el-table thead.is-group th,>>> .el-table th.is-leaf{ background: #f5f7fa }
  >>>.thead-style{ background:#e6e6e6 !important;}
</style>
