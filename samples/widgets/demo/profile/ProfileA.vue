<template>
  <div class="widget">
    Profile A {{data.params.title}}
  </div>
</template>

<script>
  export default {
    name: 'demo-widget-profile',
    title: '偏好设置',
    props: ['data', 'form'],
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
