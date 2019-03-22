<template>
	<div style="height: 100%;width: 100%;">
		<div style="height: 20px;width: 100%;">
			<span v-for="(item,index) of backCodeArr">
				<el-button v-if="index!=backCodeArr.length-1" type="text" size="small" @click="toBack(item.code)"> {{item.name}} </el-button>
				<span v-if="index!=backCodeArr.length-1">-></span>
				<span v-if="index==backCodeArr.length-1" > {{item.name}} </span>
			</span>
		</div>
		<div style="height: 90%;width: 100%;" :id="'echartsPost'+id">
		</div>
	</div>
</template>
<script>
	export default {
		props: ['id', 'params'],
		data() {
			return {
				myChart: '',
				currentCodeArr: '', //下钻会追加，返回会减少，当==3时，控制不能再下钻
				backCodeArr:[],
			}
		},
		watch: {
			params: { //深度监听，可监听到对象、数组的变化 ;  参数编辑的组件定位
				handler(val, oldVal) {
					this.initParam();
					if(val.areaCode) {
						this.initWidgetMap();
					}
				},
				deep: true
			}
		},
		mounted() {
			this.initParam();
			this.initDiv();
		},
		methods: {
			initParam() {
				this.backCodeArr=[];
				this.currentCodeArr=[];
				if(this.params.areaCode) {
					let arr = this.params.areaCode;
					this.currentCodeArr = JSON.parse(JSON.stringify(arr));
					if(arr[0] != '000000') { //统一处理，第一层为全国
						this.currentCodeArr.unshift('000000');
					}
					this.backCodeArr.push({name:this.params.leafName,code:this.params.leafCode}); //名称应该后台带过来
				} else {
					this.$message('您还没有选择要展示的行政区划！')
				}
			},
			initDiv() {
				this.$echarts().then((echarts) => {
					let dom = document.getElementById('echartsPost' + this.id);
					if(dom) {
						this.myChart = echarts.init(dom);
						//事件
						this.eventClick();
						//渲染数据
						if(this.params.areaCode) {
							this.initWidgetMap();
						}
					}
				});
			},
			setOptions(data) {
				this.$echarts().then((echarts) => {
					echarts.registerMap('allMap', data);
					this.myChart.setOption({
						toolbox: {
							show: true,
							orient: 'vertical',
							left: 'right',
							top: 'center'
						},
						series: [{
							name: '',
							type: 'map',
							mapType: 'allMap', // 自定义扩展图表类型
							selectedMode: 'single',
							itemStyle: {
								normal: {
									label: {
										show: true
									}
								},
								emphasis: {
									label: {
										show: true
									}
								}
							},
							data: data
						}]
					}, true);

				});
			},
			initWidgetMap() {
				this.getGeoJson(this.params.leafCode, '还未初始化本地区GeoJson数据！');
			},
			getGeoJson(areaCode, errtitle) {
				let params = {
					areaCode: areaCode
				}
				this.$api_widget_widgetMap({
					data: params
				}).then(res => {
					if(res.flag) {
						this.setOptions(JSON.parse(res.geoJson));
					} else {
						this.$message(errTitle);
					}
				})
			},
			eventClick() {
				this.myChart.on('mapselectchanged', (params) => { 
					this.clickToDown(params.batch[0].name)
				});
			},
			clickToDown(areaName) { //下钻
				if(this.currentCodeArr.length == 3) { //限制下钻层级，省，市 
					this.$message("只能下钻到省、市!");
					return false;
				}
				this.$api_widget_getCodeByName({
					data: {
						areaName: areaName,
						cascade: this.getCascade()
					}
				}).then(res => {
					if(res.flag) {
						this.currentCodeArr.push(res.areaCode);
						this.backCodeArr.push({
							code:res.areaCode,
							name:areaName
						});
						this.setOptions(JSON.parse(res.geoJson));

					} else {
						this.$message("数据库没有找到该区划或没有该区划的geoJson!");
					}
				});
			},
			getCascade(){  //加上这个参数只是为了更精确的去重,以免真的有市是相同的名字 
				let cascade='/';
				if(this.currentCodeArr.length>1){ //里面是全国，省，市这种结构
					cascade+=this.currentCodeArr[this.currentCodeArr.length-1]+'/';
				}
				return cascade;
			},
			toBack(code){ //返回
				this.getGeoJson(code, "数据库操作异常!");
				this.currentCodeArr.splice(this.currentCodeArr.length - 1, 1);
				this.backCodeArr.splice(this.backCodeArr.length - 1, 1);
			}
		},
	}
</script>

<style scoped>
	.widget {
		min-height: 50px;
	}
</style>