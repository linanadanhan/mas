<template>
<div class="main-box">
  <div class="main" :style="{borderColor:`${params.borderColor}`,borderRadius:`${params.borderRadius}px`,backgroundColor:`${params.decoratorBgColor}`}">
    <decorator-header class="header" :page="page" :widget="widget" :i="i" :j="j" >
      <slot name="header">
        <span class="header-title">
          <slot name="icon" >
            <i :class="params.widgetIco ? 'iconfont '+params.widgetIco : 'iconfont icon-cf-c57'"></i>
          </slot>
          <span class="title">{{params.title}}</span>
        </span>
        <decorator-toolbar class="header-toolbar" :page="page" :widget="widget" :i="i" :j="j" :minimized.sync="minimized">
          <slot name="buttons"></slot>
        </decorator-toolbar>
      </slot>
    </decorator-header>
    <div class="content" v-if="!minimized">
      <slot></slot>
    </div>
    <div class="footer" v-if="!minimized && $slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</div>  
</template>

<script>
  export default {
    name: 'decorator-chartViewLeft',
    props: ['page', 'widget', 'params', 'i', 'j', 'editMode'],
    data () {
      return {
        minimized: false
      }
    },
    computed: {
      badge () {
      	if (this.params.badge) {
      		return this.$store.getters.badge(this.params.badge)
      	}
      }
    },
    created() {
    }
  }
</script>

<style scoped>
.main-box{ padding: 5px; box-sizing:border-box;}
.main{
	display: flex;
	min-height:150px;
	flex-direction: row-reverse;
	border-width: 1px;
	border-style:solid;
	border-color:transparent ;}
.header{
	display: flex;
	flex-direction:column;
	justify-content: space-between;
  font-size: 14px;
  padding: 10px 0px;
  box-sizing:border-box;
  margin-right: 1px;
  width: 36px;
  white-space:normal;
  word-break:break-all;
  text-align: center; 
 	line-height: 15px;
 	color:#abaeb2;
}
.header-title{display: block;width:14px;margin:0 auto ;}
.header-title .icon{font-size: 14px;color:#237ec9;}
.header-title .title{font-size: 14px;}
.header-toolbar{display: block;width:14px;margin:0 auto;color:#fff;line-height: 20px;}
.header-toolbar >>> i{font-size: 14px;cursor: pointer;}
.main .content{flex:1;box-sizing:border-box;font-size: 12px;overflow: auto;}
.footer {
  padding: 5px 10px;
}
.tip-number{color:red;font-style:normal;}
</style>