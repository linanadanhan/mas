<template>
  <div>
    <diybar v-if="editMode || diyMode" :page="page" :editMode="editMode" :diyMode="diyMode" :confMode="confMode"></diybar>
    <component v-if="page && theme" v-bind:is="themeComponent" :theme="theme" :navs="navs" :subnavs="subnavs" :page="page" :site="site" :editMode="editMode"></component>
  </div>
</template>
<script>
  import Themes from 'themes'

  export default {
    name: 'theme',
    data () {
      return {
      }
    },
    computed: {
      site() {
        return this.$store.getters.site
      },
      theme() {
        return this.$store.getters.theme
      },
      page() {
        return this.$store.getters.page
      },
      navs: function () {
        let navs = this.$store.getters.navs
        if (navs) {
          return navs
        }
      },
      subnavs: function () {
        return this.$store.getters.subnavs
      },
      editMode () {
        return this.$store.getters.editMode
      },
      diyMode () {
        return this.$store.getters.diyMode
      },
      confMode () {
        return this.$store.getters.confMode
      },
      themeComponent () {
        let themes = this.$store.getters.pageComponents.themes
        let page = this.page
        let component = null
        if(themes[this.theme]) {
          component = themes[this.theme][page.mode]
        }
        if (!component) {
          if (/\//.test(this.theme)) {
            component = this.$require(this.theme, page.mode)
          } else {
            component = Themes[this.theme][page.mode]
          }          
          this.$store.dispatch('add_page_component', {
            name: this.theme,
            type: 'theme',
            mode: page.mode,
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