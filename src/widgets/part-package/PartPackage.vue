<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<el-row style="margin-bottom: 10px;">
				<el-input style="float: right;margin-top:0;width:150px;margin-right: 0px;" size="mini" placeholder="请输入关键字" icon="search" v-model="search">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
				</el-input>
			</el-row>
			<el-row class="pannel-box">
				<el-table ref="multipleTable" :data="tableData"  border style="width: 100%" element-loading-text="安装中" v-loading="loading" highlight-current-row >
					<el-table-column type="selection" width="40"></el-table-column>
					<el-table-column type="index" width="80" align="center">
					</el-table-column>
					<el-table-column prop="C_COMPONENT_NAME" label="部件包名称">
					</el-table-column>
					<el-table-column prop="C_VERSION" label="版本">
					</el-table-column>
					<el-table-column prop="C_STATUS" label="状态" :formatter="formStatusFormat">
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-dropdown trigger="click" placement="bottom-start" @command="(command) => handleCommand(command, scope.row)">
								<div style="width: 60px;"><i class="el-icon-more"></i></div>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="0">下载</el-dropdown-item>
									<el-dropdown-item command="1">安装</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-row>
		</div>
	</decorator>
</template>

<script>
  import {gbs} from 'config'
	export default {
		name: 'component-package',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				total: 0,
				pageSize: 10,
				currentPage: 1,
				search: '',
				tableData: [],
				fileDownloadUrl: '',
				loading: false
			}
		},
		methods: {
		  handleSearch() {
        this.currentPage = 1;
        this.searchTableData();		    
		  },
			handleSizeChange(val) { // 分页查询
				this.pageSize = val;
				this.searchTableData();
			},
			handleCurrentChange(val) { // 分页查询
				this.currentPage = val;
				this.searchTableData();
			},
			indexMethod(index) {
				return(this.currentPage - 1) * this.pageSize + index + 1
			},
			searchTableData() { // 搜索部件包
				this.$api_widget_getPartPackageList({
					data: {
						search: this.search,
						page: this.currentPage,
						size: this.pageSize
					},
					fn: data => this.initWidgetTable(data)
				})
			},
			initWidgetTable: function(data) { // 初始化table数据
				this.tableData = data.rows
				this.total = data.total
			},
			formStatusFormat(row, column) { // 格式化状态列
				if(row.C_STATUS === true) {
					return "已发布"
				} else {
					return "未发布"
				}
			},
			handleCommand(command, row) { // 列表操作列
				if(command == '1') { // 安装
					this.install(row)

				} else if(command == '0') { // 下载
					this.download(row)
				}
			},
			download(row) {// 下载
				window.location.href = this.fileDownloadUrl + "/" + row.C_REFERENCE_ID
			},
			install(row) {// 安装
		    let params = {
          referenceId: row.C_REFERENCE_ID,
          fileName: row.C_COMPONENT_NAME
        }
        this.loading = true
        this.$api_widget_installComponent({
          data: params
        }).then(res => {
          this.$message({
            'message': '安装成功！',
            'type': 'success'
          })
          this.searchTableData()
        }).catch(err => {
          console.info(err)
        }).finally(() => {
					this.loading = false
        })
			}
		},
		computed: {
		},
		created() {
			this.searchTableData()
			this.fileRemoteServiceUrl = gbs.fileRemoteServiceUrl + '/file/download'
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
	
	.aside {
		padding: 5px;
		border-right: 1px solid #e4e7ed;
	}
	
	>>>.el-tabs__header {
		margin-bottom: 0px;
	}
	
	>>>.el-tab-pane {
		padding: 15px 5px;
	}
	
	.btn {
		position: absolute;
		left: 0;
		top: 9px;
		font-size: 12px;
		padding: 4px 0px;
		background: #eee;
		cursor: pointer;
	}
	
	.btn:hover {
		background: #ddd;
	}
	
	>>>.el-main {
		padding: 10px 20px;
		position: relative;
		min-height: 400px;
	}
	
	.slide-enter-active {
		transition: all .1s ease;
	}
	
	.slide-leave-active {
		transition: all .1s ease;
	}
	
	.slide-enter,
	.slide-leave-to {
		transform: translateX(-300px);
	}
	
	.handle {
		height: 50px;
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 0px solid #e4e7ed;
	}
	
	.handle h2 {
		font-size: 18px;
		font-weight: normal;
	}
</style>