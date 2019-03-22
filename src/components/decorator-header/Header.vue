<template>
  <div :draggable='editMode > 0' @dragstart="dragstart($event)" @dragend="dragend($event)">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'decorator-header',
    props: ['page', 'widget', 'i', 'j'],
    data () {
      return {}
    },
    computed: {
      editMode () {
        return this.$store.getters.editMode
      }
    },
    methods: {
      dragstart: function(event) {
        event.dataTransfer.setData("abc","数据")
        this.page.widgets[this.i].splice(this.j, 1)
        this.$store.dispatch('update_drag_widget', {
          widget: this.widget
        })
      },
      dragend: function(event) {
        if (this.$store.getters.dragWidget !== null){
          this.page.widgets[this.i].splice(this.j, 0, this.widget)
          this.$store.dispatch('update_drag_widget', null)
        }
      }
    }
  }
</script>
