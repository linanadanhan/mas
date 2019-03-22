<template>
  <form-item :config="config" :model="model" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
  	<div @click="handleClickTag" :style="{ 'paddingTop': `${config.top}px`,'paddingBottom': `${config.bottom}px` }">
  	  <h1 class="title" :style="{color:config.color,fontSize:`${config.fontSize}px`,fontFamily :`${config.fontFamily}`}">{{model[config.name]}}</h1>
  	  <p :style="{ textAlign: config.formHeadAlign }" >{{config.instructions}}</p>
  	</div>
	</form-item>
</template>

<script>
  import FormItem from '../pages/FormItem.vue'
  export default {
    props: ['page', 'params', 'widget','page', 'params', 'widget','config', 'model', 'context', 'rindex', 'cindex', 'rows'],
    components: { 
      'form-item': FormItem
    },
    data () {
      return {
        align:'center'
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
	.title{ text-align: center; line-height: 50px;font-size: 20px;}
	p{line-height:40px;font-size: 12px;}
</style>