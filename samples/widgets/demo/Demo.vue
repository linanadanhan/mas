<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      <img :src="img">
      Sample Demo Widget--{{params.text}}
    </div>
  </decorator>
</template>

<script>
  import img from './imgs/theme.png'
  export default {
    name: 'demo-widget',
    props: ['page', 'decorator', 'params', 'widget', 'i', 'j'],
    data () {
      return {
        img
      }
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
  overflow: hidden;
}
</style>