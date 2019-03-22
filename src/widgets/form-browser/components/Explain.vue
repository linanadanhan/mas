<template>
  	<el-form-item>
      <div :style="{ 'paddingTop': `${config.top}px`,'paddingBottom': `${config.bottom}px` }">
        <h1 class="title" :style="{color:config.color,fontSize:`${config.fontSize}px`,fontFamily :`${config.fontFamily}`}">{{model[config.name]}}</h1>
        <p :style="{ textAlign: config.formHeadAlign}">{{config.instructions}}</p>
      </div>
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
	.title{ text-align: center; line-height: 50px;font-size: 20px;}
	p{line-height:40px;font-size: 12px;}
</style>