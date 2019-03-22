<template>
	<div>
		<widget :widget="nestWidget" :page="page" :params="params" @getData="getData"></widget>
	</div>
</template>

<script>
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data'],
		data() {
			return {
				nestWidget: {
					id: this.$_.now(),
					name: 'check-person'
				},
				page: {},
				params: {
					decorator: 'none',
					userData: {
						oldUsers: this.data.oldUsers,
						newUsers: []
					},
					attributes: { //属性------事件
//						dimension: 'bmks', //纬度
//						isSingle: true, //单选还是多选
//												orgShow: false, //机构
						//						orgIscascade: true,  //只有当orgData不为空，才会生效
						//						orgData: '79,87,88',
//						roleShow: false, //角色
						roleData: '2',
						//						groupShow: false, //群组
						//						groupData: '',
						jobShow: false, //岗位
						//						jobData: '',
						//						pingShow: true, //拼音
//						exPersons: '165,166,167', //扩展待选人员
						selectedPersons: '', //已选人员
					}
				}
			}
		},
		methods: {},
		computed: {
			rootPage() {
				return this.$store.getters.page
			}
		},
		watch: {
			params: { //深度监听，可监听到对象、数组的变化 ;  参数编辑的组件定位
				handler(val, oldVal) {
					console.info("------newUsers0000:", val);
				},
				deep: true
			}
		},
		created() {
			this.$store.dispatch('update_widget_params', {
				rootPage: this.rootPage,
				widgetId: this.nestWidget.id,
				params: this.params
			})
		},
		methods: {
			getData(data) { //有这个方法就行了，里面的逻辑自己实现
				console.info("返回的结果值:-=-======getData---", data);
				this.data.newUsers=data;
			}
		}
	}
</script>

<style scoped>

</style>