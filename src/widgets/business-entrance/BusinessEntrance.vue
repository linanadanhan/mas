<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<span v-if="editMode || diyMode" slot="buttons">
			<i class="el-icon-edit-outline" title="编辑" @click="handleEdit"></i>
		</span>
		<container @ready="initWidgetDom" class="widget">
			<el-row>
				<div class="card-wrap" v-for="(item,index) in dataList" :key="index" :style="{'width': `${card.width}px`}" @click="handleClick(item)">
					<el-card shadow="hover" class="business-card">
						<el-row type="flex">
							<div class="business-avatar">
								<img v-if="item.C_YW_ICO" :src="item.sysIcoRef" class="avatar">
								<img v-else src="./noImg.jpg" class="avatar" />
							</div>
							<div class="business-info">
								<h5 class="business-title" :title="item.C_YW_NAME">{{item.C_YW_NAME}}</h5>
								<P class="business-explain" :title="item.C_DESC">{{item.C_DESC}}</P>
							</div>
						</el-row>
					</el-card>
				</div>
			</el-row>
		</container>

		<el-dialog size="small" title="" :visible.sync="editDialog" :append-to-body="true" :close-on-click-modal="false" width="100%" top="6vh">
			<businessEntranceEdit @closeAndFresh="closeAndFresh" :data="page" :widgetUuId="widget.id" :dataList="dataList" ref="eidtDialogInfo"></businessEntranceEdit>
		</el-dialog>

	</decorator>
</template>

<script>
	import { gbs } from 'config'
	import businessEntranceEdit from './view/businessEntranceEdit.vue'
	export default {
		name: 'bar-widget',
		props: ['page', 'widget', 'params', 'i', 'j'],
		data() {
			return {
				dataList: [],
				fileServiceUrl: '',
				editDialog: false,
				widgetDom: '',
				card: {
					'width': 150,
					'wrap': 10
				}
			}
		},
		components: {
			'businessEntranceEdit': businessEntranceEdit
		},
		computed: {
			editMode() {
				return this.$store.getters.editMode
			},
			diyMode() {
				return this.$store.getters.diyMode
			},
			userInfo() {
				return this.$store.getters.userinfo
			}
		},
		methods: {
			handleClick(item) {
				if(item.C_ACCESS_URL) {
					let siteUrl = '' + window.location.href;
					siteUrl = siteUrl.substring(0, siteUrl.lastIndexOf('/'))
					siteUrl = siteUrl.substring(0, siteUrl.lastIndexOf('/'))
					window.location = siteUrl + item.C_ACCESS_URL
				}
			},
			getDataList() {
				if(!(this.widget && this.widget.id)) {
					return
				}else if(!(this.userInfo && this.userInfo.id)){
					return
				}
				let paraMap = {
					tableName: 'COS_BUSINESS_ENTRANCE',
					C_WIDGET_UU_ID: this.widget.id,
					C_USER_ID: this.userInfo.id,
					sort: 'C_SORT_NO, C_ID'
				}
				this.$api_form_getTableDataInfo({
					data: paraMap
				}).then(res1 => {
					if(res1) {
						res1.forEach((item, index) => {
							if(item.C_YW_ICO) {
								item.sysIcoRef = this.fileServiceUrl + item.C_YW_ICO
							}
						})
						this.dataList = res1
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {})
			},
			handleEdit() { // 编辑
				this.editDialog = true
				this.$nextTick(() => {
					this.$refs.eidtDialogInfo.loadData(this.params)
				});
			},
			closeAndFresh() { // 关闭弹框
				this.editDialog = false
				this.getDataList()
			},
			del(that, widgetId) { // widget删除时触发自己业务逻辑
				let params = {
					tableName: 'COS_BUSINESS_ENTRANCE',
					C_WIDGET_UU_ID: widgetId
				}
				that.$api_form_delTableData({
					data: params
				}).then(res => {}).catch(err => {
					console.info(err)
				}).finally(() => {})
			},
			initWidgetDom(divDom,cardWidth = 220,cardWrap = 10){
				this.widgetDom = divDom
				let widgetW = divDom.offsetWidth-1
				//计算 一行可以放几个卡片
				let colNum = Math.round( widgetW  / cardWidth )
				// 设置每一个卡片宽度  
				cardWidth =  widgetW / colNum 
				this.$set(this.card,'width',cardWidth)
			}
		},
		updated () {
			this.initWidgetDom(this.widgetDom)
		},
		mounted() {
			window.addEventListener('resize', () => {
				this.initWidgetDom(this.widgetDom)
			}, false)
		},
		created() {
			this.fileServiceUrl = gbs.fileServiceUrl + '/file/download/'
			this.getDataList()
		},
		beforeDestroy () {
    	window.removeEventListener('resize',() => this.initWidgetDom(this.widgetDom), false)
  	}
	}
</script>

<style scoped>
	.card-wrap {
		float: left;
		padding: 5px;
	}
	
	.business-card {
		height: 100px;
		background: #e3eefb;
		border-radius: 0;
		cursor: pointer;
	}
	
	.el-card:hover .business-avatar img {
		border: 1px solid #fff;
		border-radius: 8px;
	}
	
	.el-card:hover .business-info .business-title {
		color: #20a0ff;
	}
	
	>>>.el-card__body {
		padding: 15px;
	}
	
	.business-avatar img {
		border-radius: 8px;
		width: 60px;
		height: 60px;
	}
	
	.business-info {
		overflow: hidden;
		padding-left: 15px;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.business-info .business-title {
		font-size: 12px;
		font-weight: normal;
		color: #5c5c5c;
		white-space: nowrap;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
	}
	
	.business-info .business-explain {
		font-size: 10px;
		color: #909399;
		padding-top: 15px;
		white-space: nowrap;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
	}
	
	.widget {
		min-height: 50px;
		overflow: hidden;
	}
	
</style>