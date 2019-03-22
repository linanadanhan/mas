<template>
  <div class="widget">
    Configration A {{data.widget.name}}
  </div>
</template>

<script>
  export default {
    name: 'demo-widget-config-a',
    title: '系统设置1',
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
