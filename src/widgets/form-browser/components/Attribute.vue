<template>
  	<el-form-item :label="config.label" :prop="config.name" :label-width="config.label?'':'5px'">
       <div slot="label" class="attr-label" :style="{background: config.background ? config.background : 'none',color:config.color}">{{config.label}}</div>
       <div v-html="model[config.name]" style="overflow: auto;"></div>  
  	</el-form-item>
</template>

<script>
  export default {
    props: ['config', 'model', 'context'],
    data () {
      return {
      }
    },
    created () {
    },
    methods:{
    }
  }
</script>

<style scoped>
.attr-label{ padding-right: 5px; }
</style>