<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
    	<pieWidget :id="widget.id"></pieWidget>
    </div>
  </decorator>
</template>

<script>
	import pieWidget from './pieWidget.vue'
  export default {
    name: 'widget',
    props: ['page', 'widget', 'params', 'i', 'j'],
    components: {
      'pieWidget': pieWidget
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
