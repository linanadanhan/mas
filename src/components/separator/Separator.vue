<template>
  <div class="dropzone" :class="{'drag-hover': hover}" @dragleave="dragleave($event)" @dragover="dragover($event)" @drop='drop($event)'></div>
</template>
<script>
  export default {
    name: 'separator',
    props: ['page', 'i', 'j', 'params'],
    data () {
      return {
        hover: false
      }
    },
    computed: {
      editMode () {
        return this.$store.getters.editMode
      },
      rootPage () {
        return this.$store.getters.page
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
        this.params.tabs = this.params.tabs ? this.params.tabs : []
        let data = this.$store.getters.dragWidget
        let dragWidget = data.widget.widgets
        
        // 业务组件需要先查询配置的业务模版信息，并重新实例化模版配置的widget实例及配置
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
            
            this.handleStoreWidget(this.i, this.j, data.widget, data.params)
        
            if( dragWidget && dragWidget.length > 0){
              this.params.tabs.splice(this.j,0,data.widget)
              this.params.layoutPage = data.widget
            }else{
              let tabWidget = {
                name: data.widget.name,
                id: data.widget.id,
                layout: 'default',
                widgets: [[data.widget]]
              }
              this.params.tabs.splice(this.j,0,tabWidget)
              this.params.layoutPage = tabWidget
            }
             this.params.tabActive = this.j
          }).catch(err => {
            console.info(err)
          }).finally(() => {})
        } else {
            this.handleStoreWidget(this.i, this.j, data.widget, data.params)
        
            if( dragWidget && dragWidget.length > 0){
              this.params.tabs.splice(this.j,0,data.widget)
              this.params.layoutPage = data.widget
            }else{
              let tabWidget = {
                name: data.widget.name,
                id: data.widget.id,
                layout: 'default',
                widgets: [[data.widget]]
              }
              this.params.tabs.splice(this.j,0,tabWidget)
              this.params.layoutPage = tabWidget
            }
            this.params.tabActive = this.j
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
  width: 6px;
  height: 34px;
  /* display: inline-block; */
  float: left;
}
.drag-hover{
  border: 1px solid #ededed;
  background-color: darkgrey;
}
</style>
