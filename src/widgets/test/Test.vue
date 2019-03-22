<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget">
			<el-input type="textarea" v-model="user" readonly></el-input>
			<el-button type="text" @click="checkPerson">打开选人 Dialog</el-button>
		</div>
		<!--<el-form ref="form" :model="form" label-width="120px" :rules="rule" size="small">
			<el-form-item label="附件：">
				<el-upload class="upload-demo" action="/api/zuul/cos3-file-manager/file/uploadFile" :on-success="handleImportFileSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
					<el-button type="primary" size="mini"><i class="iconfont icon-fujian"></i>上传</el-button>
				</el-upload>
			</el-form-item>
		</el-form>-->
	</decorator>
</template>

<script>
	export default {
		name: 'test-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				user: '',  
				userObj:{
					oldUsers:[],
					newUsers:[]
				}
			}
		},
		methods: {
			handleClick(row) {
				this.$root.eventHub.$emit('testSn', row.title) // 某一个组件内调用事件触发
				console.info('test widget 发送消息：' + row.title)
			},
			checkPerson() {
				let title = '选择对象'
				let body = require('./view/openCheckPerson.vue')
				let dlg = this
				let options = {
					title: title,
					width: '80%',
					heigth: '70%',
					body: body.default,
					that: this,
					'before-close': function(done) {
						done()
					},
					data:this.userObj,
					buttons: [{
						text: '取消',
						handle: function(options, dlg) {
							options.visible = false
						}
					}, {
						type: 'primary',
						text: '确定',
						handle: (options, dlg)=>{
							console.info(this.data,"===dddd===newUsers="); //这个也没有
							console.info(this.userObj,"======newUsers="); //=====只有这种才行,才有值
							console.info(dlg.userObj,"======newUsers=");  //这个没有值
							console.info("选人结果值：newUsers--------",this.userObj.newUsers); 
							
							this.user = this.filter(this.userObj.newUsers);
							this.userObj.oldUsers=JSON.parse(JSON.stringify(this.userObj.newUsers));  //模拟
							options.visible = false
						}
					}]
				}
				this.$dialog(options)
			},
			filter(orgList) {
				if(orgList && orgList.length>0 ) {
					let rtnLst = []
					for(let org of orgList){
						for(let user of org.userList){
							rtnLst.push(user.name);
						}
					}
					return rtnLst.join(',')
				} else {
					return '';
				}
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
</style>