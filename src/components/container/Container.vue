<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'container',
    data () {
      return {}
    },
    mounted() {
      this.$emit("ready", this.$el)
    }
  }
</script>
