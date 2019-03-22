<template>
  <div class="widget">
    Configration B {{data.widget.name}}
  </div>
</template>

<script>
  export default {
    name: 'demo-widget-config-b',
    title: '系统设置2',
    props: ['data'],
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
