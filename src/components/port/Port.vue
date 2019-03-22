<template>
  <div v-if="page && page.layout" class="port">
    <dropzone v-if="dragWidget" :page="page" :i="index" j="0"></dropzone>
    <template v-for="(widget, j) in (page.widgets ? page.widgets[index] : [])">
      <widget :key="j" :i="index" :j="j" :widget="widget" :page="page" :dialog="page.dialog"></widget>
      <dropzone v-if="dragWidget" :page="page" :key="'dropzone-' + index + '-' + (j + 1)" :i="index" :j="j + 1"></dropzone>
    </template>
  </div>
  <div v-else class="port-show"></div>
</template>
<script>
  export default {
    name: 'port',
    props: ['page', 'index'],
    data () {
      return {}
    },
    computed: {
      dragWidget () {
        return this.$store.getters.dragWidget 
      }
    },
    created () {
      if(this.page && this.page.layout == null){
        this.page.ports.push(1)
      }
    }
  }
</script>

<style scoped>
.port {
  min-height: 20px;
}

.port-show {
  margin: 2px;
  height: 80px;
  background-color: #dddddd
}
</style>