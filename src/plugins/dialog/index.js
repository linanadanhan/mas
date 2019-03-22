import Vue from 'vue'

Vue.use({
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$dialog', {
      get () {
        return (options) => {
          options.opener = this
          if (typeof options['close-on-click-modal'] === 'undefined') {
            options['close-on-click-modal'] = false
          }
          this.$store.dispatch('update_dialog_content', options)
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$closeDialog', {
      get () {
        return () => {
          this.$store.dispatch('update_dialog_content', null)
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$closeAllDialog', {
      get () {
        return () => {
          this.$store.dispatch('clear_dialog_content')
        }
      }
    })
  }
})
