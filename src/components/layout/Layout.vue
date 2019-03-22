<template>
  <component v-if="page && page.layout" v-bind:is="layoutComponent" :layout="page.layout" :page="page"></component>
</template>
<script>
  import Layouts from 'layouts'

  export default {
    name: 'layout',
    props: ['page'],
    data () {
      return {}
    },
    computed: {
      layoutComponent () {
        let layout = this.page.layout
        let component = this.$store.getters.pageComponents.layouts[layout]
        if (!component) {
          if (/\//.test(layout)) {
            component = this.$require(layout, 'layout')
          } else {
            component = Layouts[layout]
          }          
          this.$store.dispatch('add_page_component', {
            name: layout,
            type: 'layout',
            component 
          })
        }
        return component
      }
    }
  }
</script>

<style scoped>
</style>