<template>
  <component ref="comp" v-bind:is="widgetComponent" :isWidget=true :widget="widgetObj" :params="widgetParams" :page="page || rootPage" :i="i" :j="j" :dialog="dialog" @getData="getData"></component>
</template>
<script>
  import Widgets from 'widgets'

  export default {
    name: 'widget',
    props: ['page', 'widget', 'params', 'i', 'j', 'dialog'],
    data () {
      return {}
    },
    computed: {
      widgetObj () {
        return typeof this.widget === 'string' ? {
            name: this.widget,
            id: this.$_.now() + '_' + Math.floor(Math.random() * 10000)
        } : this.widget
      },
      widgetComponent () {
        let widget = this.widgetObj
        let component = this.$store.getters.pageComponents.widgets[widget.name]
        if (!component) {
          if (/\//.test(widget.name)) {
            component = this.$require(widget.name, 'widget')
          } else {
            component = Widgets[widget.name].widget
          }          
          this.$store.dispatch('add_page_component', {
            name: widget.name,
            type: 'widget',
            component 
          })
        }
        return component
      },
      rootPage () {
        return this.$store.getters.page
      },
      widgetParams () {
        if (this.params) {
          this.params.decorator = this.params.decorator || 'none'
          this.params.widgetinwidget = true
          return this.params
        } else {
          return this.rootPage.widgetParams[this.widget.id]
        }
      }
    },
    created () {
      this.$store.dispatch('update_widget_created', this.widget.id)
    },
    beforeDestroy () {
      this.$store.dispatch('update_widget_destroyed', this.widget.id)
    },
    methods:{
      getComp() {
        return this.$refs.comp
      },
    	getData(data){
				this.$emit("getData",data)
    	}
    }
  }
</script>
