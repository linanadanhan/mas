<template>
  <div class="widget">
    Profile A {{data.widget.name}}
  </div>
</template>

<script>
  export default {
    name: 'form-widget-profile',
    title: '偏好设置',
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
