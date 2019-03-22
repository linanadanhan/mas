<template>
<div class="main-box" :class="{'main-style': editMode}">
  <div :class="{'main': editMode}" :style="{'editModeborderColor':editMode ? `${params.borderColor}`:'','borderRadius':editMode?`${params.borderRadius}px`:'',backgroundColor:`${params.decoratorBgColor}`}">
    <decorator-header v-if="editMode" class="header" :page="page" :widget="widget" :i="i" :j="j" :style="{}">
      <slot name="header">
        <div class="header-title">
          <slot name="icon">
            <i :class="params.widgetIco ? `iconfont${params.widgetIco}` : 'iconfont icon-cf-c57'" class="icon"></i>
          </slot>
          <div class="header-badge" v-if="badge && badge.isDot" >
              <slot v-if=" 'tab' == widget.name " name="title">
                {{params.title}}
              </slot>
              <badge v-else :name="params.badge">
                <slot name="title">
                  {{params.title}}
                </slot>
              </badge>
            </div>
            <div class="header-badge" v-else>
              <slot name="title">
                  {{params.title}}<i v-if="badge && badge.value" class="tip-number">({{badge.value}})</i>
              </slot>
            </div> 
        </div>
        <decorator-toolbar class="header-toolbar" :page="page" :widget="widget" :i="i" :j="j">
          <slot name="buttons"></slot>
        </decorator-toolbar>
      </slot>
    </decorator-header>
    <!-- 
      判断不是编辑模式 none 内边距 0
      否则是编辑模式 是嵌套widget other-content 5px
      否则普通widget default 10px
     -->
    <div class="content" :class="[ (!editMode) ? 'none' : ('nested' == widget.name || 'tab' == widget.name) ? 'other-content' : 'default-content']" >
      <slot></slot>
    </div>
  </div>
</div>  
</template>

<script>
  export default {
    name: 'decorator-none',
    props: ['page', 'widget', 'params', 'i', 'j', 'editMode'],
    data () {
      return { 
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
.main-box{ padding: 0; }
div.main-style{ padding: 5px; box-sizing:border-box;}
.main{
	border-width: 1px;
	border-style:solid;
	border-color: #dbe0e5;
}
.header{
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  justify-content: space-between;
  min-height: 34px;
  line-height: 30px;
  border-bottom:1px solid #ededed ;
  font-size: 14px;
  padding: 0 10px;
  box-sizing:border-box;
}
.header-title{
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
}
.header-title .icon {
  margin-right: 3px;
}

.header-badge .el-badge{ 
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
}
.header-toolbar >>> i{font-size: 14px;display: inline-block;padding:0 5px;box-sizing:border-box;cursor: pointer;}
.main .content{width:100%;box-sizing:border-box;font-size: 12px;overflow: auto;}

.main .none{
  padding:0;
}
.main .other-content{
  padding:5px;
}
.main .default-content{
  padding:10px;
}

</style>