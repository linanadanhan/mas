<template>
  <div class="dropzone" :class="{'drag-hover': hover}" @dragleave="dragleave($event)" @dragover="dragover($event)" @drop='drop($event)'></div>
</template>
<script>
  export default {
    name: 'dropzone',
    props: ['page', 'i', 'j'],
    data () {
      return {
        hover: false
      }
    },
    computed: {
      editMode () {
        return this.$store.getters.editMode
      },
			diyMode() {
				return this.$store.getters.diyMode
			},
      rootPage () {
        return this.$store.getters.page
      },
      userInfo() {
        return this.$store.getters.userinfo
      }
    },
    methods: {
      handleStoreWidget(i,j,widget,params){
        this.$store.dispatch('update_drag_widget', null)
        this.$store.dispatch('update_widget', {
          rootPage: this.rootPage,
          page: this.page,
          i: i,
          j: j,
          widget: widget,
          params: params
        })
      },
      drop: function(event) {
        let data = this.$store.getters.dragWidget
        let dragWidget = data.widget.widgets
        // 判断是编辑还是个性化
				if(this.diyMode || (this.editMode && this.userInfo.id == 1)) {
					// 个性化时拖动的若是业务组件，业务组件需要先查询配置的业务模版信息，并重新实例化模版配置的widget实例及配置
					// 业务组件最外层默认是一面板，该操作仅第一次拖动业务组件实例化时作用
					if(data.widget.compId) {
						let options = {
							data: {
								'widgetUuId': data.widget.id,
								'compId': data.widget.compId
							}
						}
						this.$api_widget_copyBusinessCompConf(options).then(res => {
							let resData = JSON.parse(res)
							
							// 更新widget参数本地store
							for(var key in resData.widgetParams) {
								this.$store.dispatch('update_widget_params', {
									rootPage: this.rootPage,
									widgetId: key,
									params: resData.widgetParams[key]
								})
							}
							// 页面widget实例信息
							data.params.layout = 'default'
							data.params.changeLayout = false
							data.params.nestedPage = resData.nestedPage

							this.handleStoreWidget(this.i,this.j,data.widget,data.params)
						}).catch(err => {
							console.info(err)
						}).finally(() => {})
					} else {
						this.handleStoreWidget(this.i,this.j,data.widget,data.params)
					}
				} else {
	        if( dragWidget && dragWidget.length > 0 ){
	          dragWidget.map( (widget,rindex) => {
	            widget.map( (item,cindex) => {
	              this.handleStoreWidget(this.i,this.j,item,data.params)
	            })
	          })
	        }else{
	          this.handleStoreWidget(this.i,this.j,data.widget,data.params)
	        }					
				}
      },
      dragover: function(event) {
        if(this.editMode){
          event.preventDefault();
        }
        this.hover = true
      },
      dragleave: function(event) {
        this.hover = false
      }
    }
  }
</script>

<style scoped>

.dropzone {
  border: 1px dashed #ededed;
  height: 6px;
}
.drag-hover{
  border: 1px solid #ededed;
  background-color: darkgrey;
}
</style>