<template>
	<div class="widget" :id="'pie'+id">
	</div>
</template>

<script>
	export default {
		props: ['id'],
		data () {
			return {
			}
		},
		created () {
		},
		methods:{
	      initWidgetPie: function(data){
	        this.$echarts().then((echarts) => {
	          var dom = document.getElementById('pie'+this.id)
	          if (dom) {
	            var pieChart = echarts.init(dom)
	            pieChart.setOption({
	              title: {
	                  text: '执行情况'
	              },
	              tooltip: {
				    trigger: 'item',
				    formatter: "{a} <br/>{b}: {c} ({d}%)"
				  },
				  legend: {
				    bottom: 0,
				    data:['特批金额','支付金额','预算数','已批金额']
				  },
	              series : [
				        {
				            name: '执行情况',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '45%'],
				            data:[
				                {value:335, name:'特批金额'},
				                {value:310, name:'支付金额'},
				                {value:234, name:'预算数'},
				                {value:135, name:'已批金额'}
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
	            })
	          }
	        })
	      }
    },
    created () {
      this.initWidgetPie()
//    this.$api_widget_widgetPie({
//      data: {
//        path: this.$route.path
//      },
//      fn: data => this.initWidgetPie(data)
//    })
    }
	}
</script>

<style scoped>
.widget{
   min-height: 200px;
}
</style>