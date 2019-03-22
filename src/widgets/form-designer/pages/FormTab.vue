<template>
	<div>
		<!-- <el-collapse v-model="actives">
		<el-collapse-item title="基本设置" name="1" > -->
		<ul class="form-setting-ul">
			<li class="formSetting">
				<label>数据源</label>
				<div class="setList">
					<el-radio-group v-model="config.dataSourceType" @change="handleDataSourceTypeChange" size="mini">
						<el-radio-button label="table">数据表</el-radio-button>
						<el-radio-button label="view">动态视图</el-radio-button>
					</el-radio-group>
				</div>
				<div class="setList">
					<el-select v-model="config.dataSource" placeholder="请选择数据源" @change="handleDataSourceChange" size="mini">
						<el-option v-for="item in dataSourceOptions" :key="item.C_ID" :label="item.C_TEXT" :value="item.C_NAME">
						</el-option>
					</el-select>
				</div>
			</li>
			<li class="formSetting">
				<label>字段名称与值的布局</label>
				<div class="setList layoutCheck">
					<div class="layoutLeft" :class="{current:!isCurrent}" @click="changeCurrent('right')">
						<div class="layoutBg"></div>
						<span class="text">左右</span>
					</div>
					<div class="layoutRight" :class="{current:isCurrent}" @click="changeCurrent('top')">
						<div class="layoutBg"></div>
						<span class="text">上下</span>
					</div>
				</div>
			</li>
			<li class="formSetting" v-if="hideInputNum!='top'">
				<label>字段名称的长度</label>
				<div class="setList">
					<el-input-number v-model="config.formlabelWidth" :min="40" size="mini"></el-input-number>
				</div>
			</li>
			<li class="formSetting">
				<label>组件大小</label>
				<div class="setList">
					<el-radio-group v-model="config.size" size="mini">
						<el-radio-button label="">大</el-radio-button>
						<el-radio-button label="medium">中</el-radio-button>
						<el-radio-button label="small">小</el-radio-button>
						<el-radio-button label="mini">迷你</el-radio-button>
					</el-radio-group>
				</div>
			</li>
		</ul>
		<!-- </el-collapse-item>
		</el-collapse> -->
	</div>
</template>

<script>
	export default {
		props: ['page', 'params', 'widget','context', 'config'],
		data() {
			return {
				// actives: ['1'],
				isCurrent: false,
				hideInputNum: 'right',
				dataSourceOptions: []
			}
		},
		methods: {
			changeCurrent(dir) {
				this.hideInputNum = dir
				this.isCurrent = !this.isCurrent
				this.$set(this.config, 'formLabelPosition', dir)
			},
			handleDataSourceChange() {
				if(this.config.dataSource) {
					let options = {
						data: {
							tableName: this.config.dataSource,
							dataSourceType: this.config.dataSourceType
						}
					}
					this.$api_form_getTableFeild(options).then((data) => {
						if(data) {
							this.$set(this.context, 'feildList', data)
						}else {
							this.$set(this.context, 'feildList', [])
						}
					})
				}
			},
			handleDataSourceTypeChange(val) {
				let qryTableName = (val === 'view' ? 'TBL_VIEWS' : 'TBL_TABLES')
				let options = {
					data: {
						tableName: qryTableName
					}
				}
				this.$api_form_getTableDataInfo(options).then((data) => {
					if(data) {
						this.config.dataSource = null
						this.dataSourceOptions = data
						this.handleDataSourceChange()
					}else {
						this.dataSourceOptions = []
					}
				})
			}
		},
		created() {
			let qryTableName
			if(this.config.dataSourceType && this.config.dataSourceType === 'view') {
				qryTableName = 'TBL_VIEWS'
			} else {
				qryTableName = 'TBL_TABLES'
			}
			let options = {
				data: {
					tableName: qryTableName
				}
			}
			this.$api_form_getTableDataInfo(options).then((data) => {
				if(data) {
					this.dataSourceOptions = data
					this.handleDataSourceChange()
				}
			})
		}
	}
</script>

<style scoped>
	.form-setting-ul {
		margin-top: 8px
	}

	.formSetting {
		margin-bottom: 15px;
	}

	.setList {
		overflow: hidden;
		margin-top: 3px;
	}

	.setList>>>.el-input-number {
		width: 100%;
	}

	.setList>>>.el-select {
		width: 100%;
	}

	.layoutCheck {
		border-top: 1px solid #ececec;
		border-left: 1px solid #ececec;
	}

	.layoutCheck .layoutLeft,
	.layoutCheck .layoutRight {
		width: 50%;
		float: left;
		height: 70px;
		border-right: 1px solid #ececec;
		border-bottom: 1px solid #ececec;
		cursor: pointer;
	}

	.layoutCheck .text {
		display: block;
		text-align: center;
		color: #333;
	}

	.layoutLeft .layoutBg {
		width: 88px;
		height: 23px;
		margin: 10px auto;
		background: url(../../../assets/layout.png) no-repeat left top;
	}

	.layoutRight .layoutBg {
		width: 88px;
		height: 23px;
		margin: 10px auto;
		background: url(../../../assets/layout.png) no-repeat 0 -32px;
	}

	.layoutCheck .current {
		background: #f9f9f9;
	}

	.layoutCheck .current .text {
		font-weight: bold;
	}

/* .el-collapse{
  border-bottom: 0;
  border-top: 0;
}
>>> .el-collapse-item__wrap{
  border-bottom: 0;
}
>>> .el-collapse-item__header{
  border-bottom: 0;
}
>>>.el-collapse-item__header:hover { color: #409EFF} */
</style>
