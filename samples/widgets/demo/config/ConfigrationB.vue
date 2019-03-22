<template>
  <div class="widget">
    Configration B {{widget.name}}
  </div>
</template>

<script>
  export default {
    name: 'demo-widget-config-b',
    title: '系统设置B',
    props: ['widget'],
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
