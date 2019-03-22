<template>
  <form-item :config="config" :model="model" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
  	<div @click="handleClickTag">
        <template v-for="item in model[config.name]">
          <div>
            {{item.text}}
            <el-button v-if="config.download" type="text">下载</el-button>
            <el-button v-if="config.preview" type="text">预览</el-button>
          </div>
        </template>
  	</div>
	</form-item>
</template>

<script>
  import FormItem from '../pages/FormItem.vue'
  export default {
    props: ['page', 'params', 'widget','config', 'model', 'context', 'rindex', 'cindex', 'rows'],
    components: { 
      'form-item': FormItem
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods:{
      handleClickTag(){
        this.$set(this.context,'activeTab','column')
        this.$set(this.context,'columnTab',"form-"+this.config.type)
        this.$set(this.context,'column',this.config)
      }
    }
  }
</script>

<style scoped>

</style>