<template>
<div class="main-box">
  <div class="main"  :style="{borderColor:`${params.borderColor}`,borderRadius:`${params.borderRadius}px`,backgroundColor:`${params.decoratorBgColor}`}">
    <decorator-header class="header" :page="page" :widget="widget" :i="i" :j="j">
      <slot name="header">
        <span class="header-title">
          <slot name="icon" >
            <i :class="params.widgetIco ? 'iconfont '+params.widgetIco : 'iconfont icon-cf-c57'"></i>
          </slot>
          <span class="title">
          	{{params.title}}
          </span>
        </span>
        <decorator-toolbar class="header-toolbar" :page="page" :widget="widget" :i="i" :j="j" :minimized.sync="minimized">
          <slot name="buttons"></slot>
        </decorator-toolbar>
      	<span style="clear: both;"></span>
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
    name: 'decorator-chartViewTop',
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
	border-width: 1px;
	border-style:solid;
	border-color:transparent ;
}
.header{
  min-height: 34px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 10px;
  box-sizing:border-box;
  margin-bottom: 1px;
}
.header-title{float: left;}
.header-title .icon{font-size: 14px;color:#237ec9}
.header-title .title{font-size: 12px;color:#f5f5f5}
.header-toolbar{float: right;}
.header-toolbar >>> i{font-size: 14px;display: inline-block;padding:0 5px;box-sizing:border-box;cursor: pointer;}
.main .content{width:100%;box-sizing:border-box;font-size: 12px;overflow: auto;}
.footer {
  padding: 5px 10px;
}
.tip-number{color:red;font-style:normal;}
</style>