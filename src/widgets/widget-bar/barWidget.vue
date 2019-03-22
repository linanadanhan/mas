<template>
	<div class="widget" :id="'bar'+id">
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
	      initWidgetBar: function(data) {
	        this.$echarts().then((echarts) => {
	          let dom = document.getElementById('bar'+this.id)
	          if(dom){
	            var barChart = echarts.init(dom)
	            var posList = [
				    'left', 'right', 'top', 'bottom',
				    'inside',
				    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
				    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
				];
	            var labelOption = {
				    normal: {
				        show: true,
				        position: {
					        options: echarts.util.reduce(posList, function (map, pos) {
					            map[pos] = pos;
					            return map;
					        }, {})
					    },
				        distance: {
					        min: 0,
					        max: 400
					    },
				        align: {
					        options: {
					            left: 'left',
					            center: 'center',
					            right: 'right'
					        }
					    },
				        verticalAlign: {
					        options: {
					            top: 'top',
					            middle: 'middle',
					            bottom: 'bottom'
					        }
					    },
				        rotate: {
					        min: -90,
					        max: 400
					    },
				        formatter: '{c}  {name|{a}}',
				        fontSize: 12,
				        rich: {
				            name: {
				                textBorderColor: '#fff'
				            }
				        }
				    }
				};
	            barChart.setOption({
	              color: ['	#FF5809', '#FFA042'],
	              legend: {
				        data: ['预算数', '执行数'],
				        itemWidth: 20,
				        align: 'left',
				        bottom: 0
				  },
	              title: {
	                  text: '三公经费和会议'
	              },
	              tooltip: {},
	              xAxis:[
				        {
				            type: 'category',
				            data: ['三公经费', '招待', '出国', '交通', '会议'],
				            show: true,
				            position: 'bottom'
				            
				        }
				  ],
	              yAxis:[
				        {
				            type: 'value',
				            show: true
				        }
				    ],
	              series:[
				        {
				            name: '预算数',
				            type: 'bar',
				            lable: labelOption,
				            barGap: 0,
				            data: [320, 332, 301, 334, 390]
				        },
				        {
				            name: '执行数',
				            type: 'bar',
				            lable: labelOption,
				            barGap: 0,
				            data: [220, 182, 191, 234, 290]
				        }
				    ]
	            })
	          }
	        })
	      }
    },
    created () {
      this.initWidgetBar()
//    this.$api_widget_widgetBar({
//      data: {
//        path: this.$route.path
//      }, 
//      fn: data => this.initWidgetBar(data)
//    })
    }
	}
</script>

<style scoped>
.widget{
   min-height: 200px;
}
</style>