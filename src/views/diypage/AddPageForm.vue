<template>
	<div>
		<el-form :model="addForm" ref="addForm" :rules="rules" label-width="80px">
			<el-form-item label="页面名称" prop="name">
				<el-input v-model="addForm.name"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-checkbox v-model="addForm.isLink">外部链接</el-checkbox>
			</el-form-item>
			<el-form-item v-if="addForm.isLink" label="链接地址" prop="linkUrl">
				<el-input v-model="addForm.linkUrl"></el-input>
			</el-form-item>
			<el-form-item v-if="!addForm.isLink" label="页面模版" prop="pageTempCode">
				<el-select v-model="addForm.pageTempCode" placeholder="请选择页面模版" >
					<el-option v-for="item in pageTempOptions" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>				
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'add-page-form',
		props: ['data'],
		data() {
			//页面path唯一性校验
			var validatePagePath = (rule, value, callback) => {
				if(value) {
					if(!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
						callback(new Error('不能输入中文！'));
					} else {
						let options = {
							data: {
								path: value, 
								id: this.addForm.id,
								cascade: this.addForm.cascade,
								type: this.addForm.type,
								siteCode: this.siteCode
							}
						}
						this.$api_site_isExitPagePath(options).then(res => {
							if (res) {
								callback(new Error('页面path已存在！'));
							} else {
								callback();
							}
						}).catch(err => {
						}).finally(() => {
						})						
					}
				} else {
					callback();
				}
			};
			return {
				siteCode: '',
				pageTempOptions: [],
				addForm: {
					id: '',
					parentId: '',
					siteCode: '',
					name: '',
					themeCode: '',
					themeCodeImg: '',
					layoutCode: '',
					layoutCodeImg: '',
					openSelf: '0',
					navHidden: '0',
					allowWidget: '0',
					allowLayout: '0',
					isMenu: false,
					themeStyle: 'standard',
					type: '',
					path: '',
					cascade: '',
					sortNo: 1,
					isLink: false,
					linkUrl: '',
					pageTempCode: ''
				},
				rules: {
					name: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 200,
							message: '长度在 1到 200个字符',
							trigger: 'blur'
						}
					],
					path: [{
							required: true,
							message: '必填 ',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '长度在 1到 50个字符',
							trigger: 'blur'
						}
					],
					linkUrl: [{
						required: true,
						message: '必填 ',
						trigger: 'blur'
					}]
				}

			};
		},
		methods: {
			loadData(data, siteCode) {
				console.info(siteCode)
				this.siteCode = siteCode;
				this.initForm();
				this.$refs['addForm'].resetFields();
				this.addForm.parentId = data.id;
				this.addForm.siteCode = this.siteCode;
				this.addForm.isSystem = data.attributes.isSystem;
				this.addForm.layoutCode = 'default';
				if(data.parentId != 0) {
					this.addForm.cascade = data.attributes.cascade + data.attributes.path + '/';
				} else {
					this.addForm.cascade = '/';
				}
			},
			initForm() {
				this.addForm = {
					id: '',
					parentId: '',
					siteCode: '',
					name: '',
					themeCode: '',
					themeCodeImg: '',
					layoutCode: '',
					layoutCodeImg: '',
					openSelf: '0',
					navHidden: '0',
					allowWidget: '0',
					allowLayout: '0',
					isMenu: false,
					themeStyle: 'standard',
					path: '',
					cascade: '',
					sortNo: 1,
					isLink: false,
					linkUrl: ''
				}
			},
			getPageTempOptions() { // 获取页面模版下拉列表
				this.$api_site_getPageTempOptions().then((data)=>{
					if (data) {
						this.pageTempOptions = data
					}
				})
			}
		},
		mounted() {
			console.info(this.data.data)
			this.getPageTempOptions()
			this.loadData(this.data.data, this.data.siteCode)
		},
		created() {
		}
	}
</script>

<style>
</style>