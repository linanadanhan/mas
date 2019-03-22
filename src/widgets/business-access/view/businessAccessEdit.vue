<template>
	<div>
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span class="mainTitle">系统类</span>
		    <el-button v-if="userInfo && userInfo.id == 1" style="float: right; padding: 3px 0" type="text" @click="handleSysAccess">编辑</el-button>
		  </div>
		  <div class="text item" style="padding-bottom: 35px;">
		      <el-checkbox v-if="sysAccessOpts.length > 0" :indeterminate="isSysIndeterminate" v-model="checkSysAll" @change="handleSysCheckAllChange">全选</el-checkbox>
			  <div style="margin: 15px 0;"></div>
			  <div style="margin: 15px 0;text-align: center;" v-if="sysAccessOpts.length === 0">暂无数据</div>
			  <el-checkbox-group style="font-size: 14px;" v-model="checkedSys" @change="handleCheckedSysChange">
			  	<div v-for="sysAccess in sysAccessOpts" style="float:left">
			  		<el-row :gutter="2" style="width: 180px;">
			  			<el-col :span="3" >
			  				<el-checkbox :label="sysAccess.C_SYS_CODE" :key="sysAccess.C_SYS_CODE"><p></p></el-checkbox>
			  			</el-col>
			  			<el-col :span="8">
			  				<img class="avatar" :src="filterIco(sysAccess.C_SYS_ICO)" v-if="sysAccess.C_SYS_ICO">
							<img class="avatar" v-else src="../noImg.jpg" />  
			  			</el-col>
			  			<el-col :span="13">
			  				<div>
								<p style="width: 80px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="sysAccess.C_SYS_NAME">{{sysAccess.C_SYS_NAME}}</p>
								<el-input-number @change="(val) => handleSysInputNumChange(val, sysAccess)" v-model="sysAccess.C_SORT_NO" style="width: 80px;" size="mini" controls-position="right"></el-input-number>
							</div>
			  			</el-col>
			  		</el-row>
			  	</div>
			  </el-checkbox-group>
		  </div>
		</el-card>
		<div style="margin: 15px 0;"></div>
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span class="mainTitle">个人类</span>
		    <el-button v-if="userInfo" style="float: right; padding: 3px 0" type="text" @click="handleCusAccess">编辑</el-button>
		  </div>
		  <div class="text item" style="padding-bottom: 35px;">
		      <el-checkbox v-if="cusAccessOpts.length > 0" :indeterminate="isCusIndeterminate" v-model="checkCusAll" @change="handleCusCheckAllChange">全选</el-checkbox>
			  <div style="margin: 15px 0;"></div>
			  <div style="margin: 15px 0;text-align: center;" v-if="cusAccessOpts.length === 0">暂无数据</div>
			  <el-checkbox-group style="font-size: 14px;" v-model="checkedCus" @change="handleCheckedCusChange">
			  	<div v-for="cusAccess in cusAccessOpts" style="float:left">
			  		<el-row :gutter="2" style="width: 180px;">
			  			<el-col :span="3" >
			  				<el-checkbox :label="cusAccess.C_SYS_CODE" :key="cusAccess.C_SYS_CODE"><p></p></el-checkbox>
			  			</el-col>
			  			<el-col :span="8">
			  				<img class="avatar" :src="filterIco(cusAccess.C_SYS_ICO)" v-if="cusAccess.C_SYS_ICO">
							<img class="avatar" v-else src="../noImg.jpg" />  
			  			</el-col>
			  			<el-col :span="13">
			  				<div>
								<p style="width: 80px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="cusAccess.C_SYS_NAME">{{cusAccess.C_SYS_NAME}}</p>
								<el-input-number @change="(val) => handleCusInputNumChange(val, cusAccess)" v-model="cusAccess.C_SORT_NO" style="width: 80px;" size="mini" controls-position="right"></el-input-number>
							</div>
			  			</el-col>
			  		</el-row>
			  	</div>
			  </el-checkbox-group>		    
		  </div>
		</el-card>
		<div class="dialog-footer" style="text-align: right;margin-top: 10px;">
			<el-button @click="closeDialog">取 消</el-button>
			<el-button type="primary" @click="saveAddApply">确 定</el-button>
		</div>
	</div>
</template>

<script>
	import {gbs} from 'config'
	import Widgets from 'widgets'
	import {object} from 'utils'
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data', 'widgetUuId', 'dataList'],
		data() {
			return {
				fileDownloadUrl: '',
				widgetComponent: '',
				i: 0,
				j: 0,
				widget: {
					id: this.$_.now(),
					name: 'table-widget',
					hidden: true
				},
				params: {
					decorator: 'none',
					formFlag: '',
					primaryKey: '',
					widgetHeight: '',
					listenKeys: [],
					qryParams: {}
				},
				page: {},
				isSysIndeterminate: false,
				checkSysAll: false,
				checkedSys: [],
				isCusIndeterminate: false,
				checkCusAll: false,
				checkedCus: [],
				sysAccessOpts: [],
				cusAccessOpts: [],
				sysFormFlag: '',
				cusFormFlag: ''
			}
		},
	    computed: {
	   	  rootPage () {
	        return this.$store.getters.page
	      },
	      userInfo () {
	        return this.$store.getters.userinfo
	      }
	    },
		methods: {
			loadData(params) {
				if (params.sysFormFlag) {
				  this.sysFormFlag = params.sysFormFlag
				}
				if (params.cusFormFlag) {
				  this.cusFormFlag = params.cusFormFlag
				}
				this.checkedSys = []
				this.checkedCus = []
				this.sysAccessOpts = []
				this.cusAccessOpts = []
				//组装页面上已选择的
				this.dataList.forEach((item, index) => {
					if (item.C_TYPE == '0') {
						this.checkedSys.push(item.C_SYS_CODE)
					}
					
					if (item.C_TYPE == '1') {
						this.checkedCus.push(item.C_SYS_CODE)
					}
				})
				
				//查询所有系统业务接入信息
				this.getAllSysAccessList();
				//查询所有个人业务接入信息
				this.getAllCusAccessList();
			},
			getAllSysAccessList() {
				let paraMap = {
				  	tableName: 'COS_SYS_BUSINESS_ACCESS'
				}
				this.$api_form_getTableDataInfo({data: paraMap}).then(res => {
					if(res) {
						this.sysAccessOpts = res
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {
				})
			},
			getAllCusAccessList() {
				let paraMap = {
				  	tableName: 'COS_CUSTOM_BUSINESS_ACCESS',
				  	C_USER_ID: this.userInfo.id
				}
				this.$api_form_getTableDataInfo({data: paraMap}).then(res => {
					if(res) {
						this.cusAccessOpts = res
					}
				}).catch(err => {
					console.info(err)
				}).finally(() => {
				})
			},
			handleSysCheckAllChange(val) {
				if (val) {
					if (this.sysAccessOpts) {
						this.sysAccessOpts.forEach((item, index) => {
							this.checkedSys.push(item.C_SYS_CODE)
						})
					}
				}else{
					this.checkedSys = [];
				}
        		this.isSysIndeterminate = false;
			},
			handleCheckedSysChange(value) {
				let checkedCount = value.length;
        		this.checkSysAll = checkedCount === this.sysAccessOpts.length;
        		this.isSysIndeterminate = checkedCount > 0 && checkedCount < this.sysAccessOpts.length;
			},
			handleCusCheckAllChange(val) {
				if (val) {
					if (this.cusAccessOpts) {
						this.cusAccessOpts.forEach((item, index) => {
							this.checkedCus.push(item.C_SYS_CODE)
						})
					}
				}else{
					this.checkedCus = [];
				}
        		this.isCusIndeterminate = false;
			},
			handleCheckedCusChange(value) {
				let checkedCount = value.length;
        		this.checkCusAll = checkedCount === this.cusAccessOpts.length;
        		this.isCusIndeterminate = checkedCount > 0 && checkedCount < this.cusAccessOpts.length;
			},
			saveAddApply() {
				let chkArr = []
				
				//组装保存数据
				if (this.checkedSys && this.checkedSys.length > 0) {
					this.checkedSys.forEach((sysCode, index) => {
						var obj = this.sysAccessOpts.find((pitem)=> {
					        return pitem.C_SYS_CODE === sysCode
					    })
						if (obj) {
							obj.C_TYPE = '0'
							obj.C_USER_ID = this.userInfo.id
							obj.C_WIDGET_UU_ID = this.widgetUuId
							chkArr.push(obj)
						}
					})
				}
				
				if (this.checkedCus && this.checkedCus.length > 0) {
					this.checkedCus.forEach((sysCode, index) => {
						var obj = this.cusAccessOpts.find((pitem)=> {
					        return pitem.C_SYS_CODE === sysCode
					    })
						if (obj) {
							obj.C_TYPE = '1'
							obj.C_USER_ID = this.userInfo.id
							obj.C_WIDGET_UU_ID = this.widgetUuId
							chkArr.push(obj)
						}
					})
				}
				
				if (chkArr.length > 0) {
					let options = {
						data: chkArr
					}
					console.info(chkArr)
					this.$api_form_batchSaveAccess(options).then(res => {
						this.$message({
							'message': '保存成功！',
							'type': 'success'
						});
						this.$emit('closeAndFresh')
					}).catch(err => {
						this.$message({
							'message': '保存失败！',
							'type': 'error'
						});
					}).finally(() => {})
				}else{
					this.$emit('closeAndFresh')
				}
			},
			closeDialog() {
				this.$emit('closeAndFresh')
			},
			handleSysAccess() {
				let options = {
					title: '编辑系统类',
					width: '80%',
					heigth: '70%',
					body: 'appFactory/widgets/table-browser',
					onclosed (options, dialog, body) {
						this.backToEdit()
					},
					data: {
						formFlag: this.sysFormFlag
					}
				}
				this.$dialog(options)
			},
			handleCusAccess() {
				this.page = object.deepcopy(this.data)
				this.params.formFlag = this.cusFormFlag
				this.$set(this.params.qryParams, 'C_USER_ID', this.userInfo.id)
				
				let options = {
					title: '编辑个人类',
					width: '80%',
					heigth: '70%',
					body: 'appFactory/widgets/table-browser',
					onclosed (options, dialog, body) {
						this.backToEdit()
					},
					data: object.deepcopy(this.params)
				}
				this.$dialog(options)
			},
			backToEdit() { // 返回编辑页面并刷新
				//查询所有系统业务接入信息
				this.getAllSysAccessList();
				//查询所有个人业务接入信息
				this.getAllCusAccessList();
			},
			filterIco(logo) {
				return this.fileDownloadUrl + '/' + logo
			},
			handleCusInputNumChange(newVal, item){
//				let form = item
//				form.tableName = 'COS_CUSTOM_BUSINESS_ACCESS'
//				this.$api_form_saveFormData({
//					data: form
//				}).then(res => {
//					console.info(res)
//				}).catch(err => {
//					console.info(err)
//				}).finally(() => {})
			},
			handleSysInputNumChange(newVal, item) {
//				let form = item
//				form.tableName = 'COS_SYS_BUSINESS_ACCESS'
//				this.$api_form_saveFormData({
//					data: form
//				}).then(res => {
//					console.info(res)
//				}).catch(err => {
//					console.info(err)
//				}).finally(() => {})
			}
		},
		created() {
			this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
		}
	}
</script>

<style scoped>
  .el-checkbox-group {
  	font-size:1
  }
  .el-checkbox .el-checkbox__label {
  	display:none;
  }
  .mainTitle{
  	font-size: 15px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .avatar{
	width: 50px;
  	height: 50px;
   }
</style>