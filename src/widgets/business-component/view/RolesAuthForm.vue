<template>
	<div>
		<el-form>
			<el-row>
				<el-form-item label="业务组件名称" label-width="100px">
					<el-input v-model="ywName" readonly></el-input>
				</el-form-item>
			</el-row>

			<el-row class="rolehead">
				<el-col :span="4">
					<h5 class="h-title">角色分类</h5></el-col>
				<el-col :span="9">
					<h5 class="h-title">待选角色</h5></el-col>
				<el-col :span="2">
					<h5 align="center">操作</h5></el-col>
				<el-col :span="9">
					<h5 class="h-title">已选角色</h5></el-col>
			</el-row>
			<el-row style="background:#f5f5f5;height:391px">
				<el-col :span="4" style="height:391px;overflow:auto;">
					<el-menu default-active="1" @select="selectRoleItems" class="el-menu-vertical-demo" background-color="#f5f5f5" text-color="#000" active-text-color="#409EFF">
						<el-menu-item v-for="item in roleTypes" :key="item" :index="item">{{item}}</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="9">
					<el-table ref="waitTable" :data="waitRole" @select="selectWaitRoleRow" @select-all="selectWaitRoleAll" border style="width: 100%" height="390">
						<el-table-column type="selection" width="30">
						</el-table-column>
						<el-table-column prop="C_NAME" label="角色名称" width="180">
						</el-table-column>
						<el-table-column prop="C_CODE" label="角色标识">
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="2">
					<div style="margin-top: 120px;">
						<el-button type="primary" @click="toGrant" icon="arrow-right" size="small" style="margin-left:7px;">授权<i class="el-icon-arrow-right el-icon--right"></i></el-button>
					</div>

					<div style="margin-top: 60px;">
						<el-button type="primary" @click="cancelGrant" icon="el-icon-arrow-left" size="small" style="margin-left:7px;">移除</el-button>
					</div>

				</el-col>
				<el-col :span="9">
					<el-table ref="haveTable" :data="haveRole" @select="selectHaveRoleRow" @select-all="selectHaveRoleAll" border style="width: 100%" height="390">
						<el-table-column type="selection" width="30">
						</el-table-column>
						<el-table-column prop="C_NAME" label="角色名称" width="180">
						</el-table-column>
						<el-table-column prop="C_CODE" label="角色标识">
						</el-table-column>
						<!--<el-table-column label="允许转授">
							<template slot-scope="scope">
								<el-switch v-model="haveRole[scope.$index].isTurnGrant"></el-switch>
							</template>
						</el-table-column>-->
					</el-table>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'rolesAuthForm',
		title: '角色授权',
		props: ['data'],
		data() {
			return {
				roleTypes: [],
				waitRole: [],
				haveRole: [],
				waitRoles: [],
				haveRoles: [],
				roleType: '',
				ywLabel: '',
				ywName: '',
				ywType: '',
				ywId: ''
			}
		},
		methods: {
			loadData() {
				this.ywType = '2'
				this.ywId = this.data.rows.C_ID
				this.ywName = this.data.rows.C_COMP_NAME

				//查询角色分类信息
				this.$api_site_getRoleTypes().then((data)=>{// 查询已经授权的
		            if (data) {
						this.roleTypes = data
						this.selectRoleItems(data[0])
		            }
		      })
			},
			selectRoleItems(roleCatalog) { // 选中分类
				if(roleCatalog == '全部') {
					roleCatalog = ''
				}

				this.roleType = roleCatalog // 保存的时候用
				var waitRole = []
				var haveRole = []

				let NoAuthPara = {
					roleCatalog: roleCatalog,
					ywId: this.ywId,
					grantType: '0',
					ywType: this.ywType
				}
				
				this.$api_site_getNoAuthRole({data: NoAuthPara}).then((data)=>{// 查询未授权的
		            if (data) {
						waitRole = data
						this.$api_site_getAuthRole({data: NoAuthPara}).then((data)=>{// 查询已经授权的
				            if (data) {
								haveRole = data
								if(haveRole && haveRole.length > 0) {
									for(var i = waitRole.length - 1; i >= 0; i--) {
										for(var j = 0; j < haveRole.length; j++) {
											if(waitRole[i].C_ID == haveRole[j].C_ID) {
												waitRole.splice(i, 1);
												break;
											}
										}
									}
								}
				            }
			            	this.waitRole = waitRole //这样避免左边的列表先显示，然后不显示，导致有时候会错乱
							this.haveRole = haveRole
				        })
		            }
		      })
			},
			selectWaitRoleAll(selection) {
				this.waitRoles = selection;
			},
			selectHaveRoleAll(selection) {
				this.haveRoles = selection;
			},
			selectWaitRoleRow(selection, row) {
				this.waitRoles = selection;
			},
			selectHaveRoleRow(selection, row) {
				this.haveRoles = selection
			},
			toGrant() {
				if(!this.waitRoles || this.waitRoles.length == 0) {
					this.alertDialog('请选择需要授权的角色!', '提示');
				}

				for(var obj in this.waitRoles) {
					console.info(this.waitRoles[obj]);
					this.haveRole.push(this.waitRoles[obj]);
				}

				//删除
				for(var i = this.waitRole.length - 1; i >= 0; i--) {
					for(var j = 0; j < this.waitRoles.length; j++) {
						if(this.waitRole[i].C_ID == this.waitRoles[j].C_ID) {
							this.waitRole.splice(i, 1);
							break;
						}
					}
				}
				this.waitRoles = [];
			},
			cancelGrant() { //取消
				if(!this.haveRoles || this.haveRoles.length == 0) {
					this.alertDialog('请选择需要取消的角色!', '提示');
				}
				for(var obj in this.haveRoles) {
					console.info(obj);
					this.waitRole.push(this.haveRoles[obj]);
				}
				//删除
				for(var i = this.haveRole.length - 1; i >= 0; i--) {
					for(var j = 0; j < this.haveRoles.length; j++) {
						if(this.haveRole[i].C_ID == this.haveRoles[j].C_ID) {
							this.haveRole.splice(i, 1);
							break;
						}
					}
				}
				this.haveRoles = [];
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
			this.loadData()
		},
		created() {

		}
	}
</script>

<style scoped="scoped">
.rolehead {
    background: #f3f3f3;
    height: 30px;
    line-height: 30px;
    border: 1px solid #d1dbe5;
}
.h-title {
		text-align: center;
	}
</style>