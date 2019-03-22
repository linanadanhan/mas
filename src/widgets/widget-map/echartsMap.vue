<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget" style="width: 100%;height: 100%">
      <widgetMap :id="widget.id" :params="params" ></widgetMap>
    </div>
  </decorator>
</template>
<script>
  import widgetMap from './WidgetMap.vue'

  export default {
    name: 'map-widget',
    props: ['page', 'params', 'widget', 'i', 'j'],
    components: {
      'widgetMap': widgetMap
    },
    data() {
      return {}
    },
    methods: {},
    created() {
    }
  }
</script>

<style scoped>
  .widget {
    min-height: 50px;
  }
</style>
