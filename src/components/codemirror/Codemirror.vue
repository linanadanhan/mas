<template>
  <component :is="codeComponent" :value="codeText" :options="codeOptions" @input="changeText"></component>
</template>
<script>

export default {
  name: 'VueCodemirror',
  props: {
    codeText: {
      default: 'The default language is JavaScript!'
    },
    codeOptions:  {
      type: Object,
      default: function () {
        return {
          height: 'auto',
          tabSize: 2,
          mode: "text/javascript",
          theme: "base16-dark",
          lineNumbers: true,
          line: true,
          extraKeys: {"Ctrl": "autocomplete"}
        }
      }
    }
  },
  data () {
    return {
      codeComponent: '',
    }
  },
  components: {
    codemirror: require('vue-codemirror').codemirror
  },
  beforeCreate () {
    require('codemirror/lib/codemirror.css')
    require('codemirror/theme/base16-dark.css')
    require('codemirror/mode/javascript/javascript.js')
  },
  created () {
    this.codeComponent = 'codemirror'
  },
  beforeDestroy () {
  },
  methods: {
    changeText(val){
      this.$emit('input', val)
    }
  }
}
</script>
