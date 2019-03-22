<template>
  <div class="widget">
    Configration A {{data.widget.name}}
  </div>
</template>

<script>
  export default {
    name: 'form-widget-config-a',
    title: '系统设置',
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
