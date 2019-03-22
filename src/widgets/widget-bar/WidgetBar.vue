<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      <barWidget :id="widget.id"></barWidget>
    </div>
  </decorator>
</template>

<script>
  import barWidget from './barWidget.vue'
  export default {
    name: 'bar-widget',
    props: ['page', 'widget', 'params', 'i', 'j'],
    components: {
      'barWidget': barWidget
    },    
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<style scoped>
.widget{
   min-height: 50px;
}
</style>
