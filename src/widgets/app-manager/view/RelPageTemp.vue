<template>
	<div>
		<el-form>
			<el-row>
				<el-form-item label="应用名称" label-width="100px">
					<el-input v-model="appName" readonly></el-input>
				</el-form-item>
			</el-row>

			<el-row class="head">
				<el-col :span="11">
					<h5 class="h-title">待选页面模版</h5>
				</el-col>
				<el-col :span="2">
					<h5 class="h-title" align="center">操作</h5>
				</el-col>
				<el-col class="h-title" :span="11">
					<h5>已选页面模版</h5>
				</el-col>
			</el-row>

			<el-row class="dialog" style="background:#f5f5f5;height:391px;">
				<el-col :span="11">
					<el-table ref="waitPageTemp" :data="waitPageTemp" @select="selectWaitPageTempRow" @select-all="selectWaitPageTempAll" border style="width: 100%" height="390">
						<el-table-column align="center" type="selection" width="55">
						</el-table-column>
						<el-table-column prop="C_CODE" align="center" label="模版标识">
						</el-table-column>
						<el-table-column prop="C_NAME" align="center" label="模版名称">
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="2">
					<div style="margin-top: 120px;">
						<el-button type="primary" @click="toGrant" icon="arrow-right" size="small" style="margin-left:7px;">选择
							<i class="el-icon-arrow-right el-icon--right"></i>
						</el-button>
					</div>
					<div style="margin-top: 60px;">
						<el-button type="primary" @click="cancelGrant" icon="el-icon-arrow-left" size="small" style="margin-left:7px;">移除</el-button>
					</div>

				</el-col>
				<el-col :span="11">
					<el-table :data="havePageTemp" @select="selectHavePageTempRow" @select-all="selectHavePageTempAll" border style="width: 100%" height="391">
						<el-table-column align="center" type="selection" width="55">
						</el-table-column>
						<el-table-column prop="C_CODE" align="center" label="模版标识">
						</el-table-column>
						<el-table-column prop="C_NAME" align="center" label="模版名称">
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>
import _ from 'underscore'
export default {
	name: 'basic',
	title: '关联页面模版',
	props: ['data'],
	data () {
		return {
			appName: '',
			waitPageTemp: [],
			havePageTemp: [],
			waitPageTemps: [],
			havePageTemps: [],
		}
	},
	methods: {
		getNoSelectedPageTemp (row) { // 查询待选页面模版列表数据
			var waitPageTemp = []
			var havePageTemp = []

			let options = {
				data: {
					appCode: row.C_CODE
				}
			}
			this.$api_widget_getNoSelectedPageTemp(options).then(res => {
				if (res) {
					waitPageTemp = res
					this.$api_widget_getHasSelectedPageTemp(options).then((data) => {// 查询已经选择的
						if (data) {
							havePageTemp = data
							if (havePageTemp && havePageTemp.length > 0) {
								for (var i = waitPageTemp.length - 1; i >= 0; i--) {
									for (var j = 0; j < havePageTemp.length; j++) {
										if (waitPageTemp[i].C_CODE == havePageTemp[j].C_CODE) {
											waitPageTemp.splice(i, 1);
											break;
										}
									}
								}
							}
						}
						this.waitPageTemp = waitPageTemp //这样避免左边的列表先显示，然后不显示，导致有时候会错乱
						this.havePageTemp = havePageTemp
					})
				}
			}).catch(err => {
			}).finally(() => {
			})
		},
		selectWaitPageTempAll(selection) {
			this.waitPageTemps = selection;
		},
		selectHavePageTempAll(selection) {
			this.havePageTemps = selection;
		},
		selectWaitPageTempRow(selection, row) {
			this.waitPageTemps = selection;
		},
		selectHavePageTempRow(selection, row) {
			this.havePageTemps = selection
		},
		toGrant() { // 选择
			if(!this.waitPageTemps || this.waitPageTemps.length == 0) {
				this.alertDialog('请选择需要的页面模版!', '提示');
			}

			for(var obj in this.waitPageTemps) {
				this.havePageTemp.push(this.waitPageTemps[obj]);
			}

			//删除
			for(var i = this.waitPageTemp.length - 1; i >= 0; i--) {
				for(var j = 0; j < this.waitPageTemps.length; j++) {
					if(this.waitPageTemp[i].C_CODE == this.waitPageTemps[j].C_CODE) {
						this.waitPageTemp.splice(i, 1);
						break;
					}
				}
			}
			this.waitPageTemps = [];
		},
		cancelGrant() { //取消
			if(!this.havePageTemps || this.havePageTemps.length == 0) {
				this.alertDialog('请选择需要取消的页面模版!', '提示');
			}
			for(var obj in this.havePageTemps) {
				this.waitPageTemp.push(this.havePageTemps[obj]);
			}
			//删除
			for(var i = this.havePageTemp.length - 1; i >= 0; i--) {
				for(var j = 0; j < this.havePageTemps.length; j++) {
					if(this.havePageTemp[i].C_CODE == this.havePageTemps[j].C_CODE) {
						this.havePageTemp.splice(i, 1);
						break;
					}
				}
			}
			this.havePageTemps = [];
		},
		alertDialog(message, title) { //抽出公共的提示弹出框
			this.$alert(message, title, {
				confirmButtonText: '确定',
				type: 'info',
				callback: action => {}
			});
		}
	},
	mounted() {
		if (this.data) { // 修改模式
			this.appName = this.data.C_NAME;
			this.getNoSelectedPageTemp(this.data);
		}
	},
	created () {
	}
}
</script>

<style scoped>
.head {
  background: #f3f3f3;
  height: 30px;
  line-height: 30px;
  border: 1px solid #d1dbe5;
}

.h-title {
  text-align: center;
}
</style>