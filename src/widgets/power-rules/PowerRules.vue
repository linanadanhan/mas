<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="content">
			<el-form :inline="true" :model="powerRules" class="demo-form-inline" size="small">
				<el-form-item label="类型">
					<el-select v-model="powerRules.formField" style="width: 150px;">
						<el-option v-for="item in formFieldOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="条件" >
					<el-select v-model="powerRules.condition" style="width: 90px;">
						<el-option label="包含" value="1"></el-option>
						<el-option label="不包含" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="值">
					<!--<el-select v-model="powerRules.value" style="width: 150px;">
						<el-option v-for="item in valueOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>-->
					<el-input type="textarea" :rows="2"></el-input>
				</el-form-item>
				<el-form-item label="关系">
					<el-select v-model="powerRules.relation" style="width:90px;">
						<el-option label="与" value="1"></el-option>
						<el-option label="或" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item >
					<el-button  @click="onSubmit">(</el-button>	
				</el-form-item>
				<el-form-item>
					<el-button  @click="onSubmit">)</el-button>
				</el-form-item>
				<el-row>
					<el-form-item>
					<el-button type="primary" plain >添加</el-button>
			  		<el-button type="primary" plain >删行</el-button>
			  		<el-button type="primary" plain >清空</el-button>
					</el-form-item>
				</el-row>
			</el-form>
			<el-row>
				<ul class="textarea">
					<li>[角色] 包含 测试角色</li>
					<li>或 ([用户] 包含 张三</li>
					<li>与 [部门] 包含 研发部)</li>
				</ul>
			</el-row>
			<!--<el-row>
				<div class="panel">
					<div class="head">满足规则人员</div>
					<ul class="person">
						<li v-for="item in people">{{item}}</li>
					</ul>
				</div>
			</el-row>-->
		</div>
	</decorator>
</template>

<script>
	export default {
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				powerRules: {
          formField: '',
          condition: '',
          value:'',
          relation:''
       },
       formFieldOption:[{
          value: '1',
          label: '[用户]'
        }, {
          value: '2',
          label: '[角色]'
        },{
          value: '3',
          label: '[部门]'
        }],
       valueOption:[{
          value: '1',
          label: '局领导'
        }, {
          value: '2',
          label: '催办人'
        }, {
          value: '3',
          label: '档案管理'
        }],
        people:['张山','李四','王小五','张山']
			}
		},
		computed() {

		},
		methods: {
			onSubmit() {
        console.log('submit!');
      }
		},
		created() {

		},
		mounted() {}
	}
</script>

<style scoped>
.content{padding: 10px ;box-sizing: border-box;}
.textarea{width: 600px;height:130px;border: 1px solid #dcdfe6;border-radius:5px;padding:5px 10px;box-sizing: border-box;list-style: none;overflow: auto;}
.textarea li{font-size: 13px;color: #666;line-height:24px ;}
.panel{width: 600px;height:180px;border: 1px solid #dcdfe6;border-radius:5px;margin-top: 15px;}
.head {
		height: 30px;
		width: 100%;
		background: #f5f5f5;
		padding: 0 10px;
		font-size: 13px;
		line-height: 30px;
		color: #333;
		border-radius:5px 5px 0 0;
	}
	.person{height:148px;padding: 10px;box-sizing: border-box;list-style: none;overflow: auto;}
	.person li{float: left;margin:0 20px 10px 0 ;color: #666;font-size: 13px;}
</style>