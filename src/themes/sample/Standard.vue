<template>
  <div class="themes">
    <div class="header submenu">
      <h1 class="title">
      	<div v-if="site.logo" style="float: left;">
					<img class="avatar" :src="filter(site.logo)" >   		
      	</div>
      	<div style="float: left;padding-left: 10px;">
      		<p style="width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="site.title">{{site.title}}</p>
      	</div>
      </h1>
      <navbar :page="page" :navs="navs"></navbar>
      <sysbar :page="page"></sysbar>
    </div>
    <div class="main">
      <div v-if="subnavs" class="menu">
        <div class="menu-in">
          <sub-navbar :page="page" :navs="subnavs"></sub-navbar>
        </div>      	
      </div>
      <div class="main-right" :class="{noLeft:!subnavs}">
        <div class="content">
          <layout :page="page" ></layout>
        </div>
        <div class="footer">Copyright &copy; {{site.copyright}}</div>
      </div>
    </div>  
    
  </div>
</template>

<script>
	import css from '!css-loader!sass-loader!../../assets/scss/elementSample.scss'
	import {gbs} from 'config'
  export default {
    name: 'theme-sample',
    props: ['page', 'theme', 'navs', 'subnavs'],
    data () {
      return {
      	fileDownloadUrl: ''
      }
    },
    computed: {
    	site () {
        return this.$store.getters.site
      }
    },
    methods: {
      handleCommand: function(command) {
        if (command === 'custom') {
          this.$store.dispatch('toggle_page_edit_mode')
        }
      },
      filter(logo) {
      	return this.fileDownloadUrl + '/' + logo
      }
    },
    mounted () {
     this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
     document.getElementById("_theme_").innerHTML = css.toString()
    }
  }
</script>

<style scoped>
.themes{background:#fff;font-family:"Microsoft YaHei";font-size:12px;}
.header{height: 60px;width: 100%;position:relative;background: #009a61;color:#fff;padding:0 10px;box-sizing: border-box;}
.header .title{height: 60px;line-height:60px;float:left;font-size: 18px;font-weight: bold;}
.header .nav{float:left;height: 60px;margin-left: 10px;background: #009a61;}
.header .nav >>>.el-submenu__title i{ color: #fff;background: #009a61; }
.header .user-info{position: absolute;color: #fff;right:20px ;margin-top: 21px;}
.header .user-info .iconfont{font-size: 14px;margin-right: 5px;color:#fff;}
.themes .user-info >>>.el-dropdown{color: #fff;cursor: pointer;}
.main{position: absolute;top: 60px;bottom:0;width: 100%;overflow: hidden;}
.menu{position: absolute;left: 0;top: 0;bottom: 0;width:200px;background:#3a3f51;overflow:hidden}
.menu .menu-in{width: 220px; height:100%;overflow-y: auto;overflow-x: hidden;background:#253d3d;}
.main-right {
  position: absolute;
  color:#009a61;
  left: 200px;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
.noLeft{
  left: 0;
}
.main-right .content{padding: 5px;padding-bottom:50px;min-height: 100%;box-sizing: border-box;}
.main-right .footer{margin-top:-50px;height: 50px;background: #009a61;text-align: center;line-height: 50px;font-size: 12px;color: #fff;}

.avatar{
	margin-top: 10px;
	width: 40px;
  height: 40px;
}
>>>.el-menu--horizontal > .el-submenu .el-submenu__title:hover{background:rgba(0,0,0,0.1);color:#fff}
>>>.el-menu--horizontal > .el-submenu.is-active .el-submenu__title:hover{background:rgba(0,0,0,0.1);}
>>>.el-menu--horizontal > .el-submenu .el-submenu__title{color:#fff}
>>>.el-menu--horizontal > .el-submenu.is-active .el-submenu__title{color:#26ffae;background: transparent;border-bottom: 2px solid #26ffae;}
>>>.el-menu--horizontal > .el-menu-item{color:#fff}
>>>.el-menu--horizontal > .el-menu-item:hover{background:rgba(0,0,0,0.1);color:#fff}
>>>.el-menu--horizontal > .el-menu-item.is-active{color:#26ffae;background: transparent;border-bottom: 2px solid #26ffae;}
>>>.el-menu--horizontal > .el-menu-item.is-active:hover{background:rgba(0,0,0,0.1);}
>>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, >>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus{background:rgba(0,0,0,0.1);color: #fff;}

.el-menu-vertical-demo{width: 201px;background:#253d3d;}
.el-menu-vertical-demo >>>.el-menu{background:#253d3d;}
.el-menu-vertical-demo >>>.el-menu-item{color:#fff}
.el-menu-vertical-demo >>>.el-submenu__title{color:#fff}
.el-menu-vertical-demo >>>.el-menu-item:hover{background:rgba(0,0,0,0.4);}
.el-menu-vertical-demo >>>.el-menu-item.is-active:hover{background:rgba(0,0,0,0.4);}
.el-menu-vertical-demo >>>.el-submenu__title:hover{background:rgba(0,0,0,0.4);}
.el-menu-vertical-demo >>>.el-menu-item.is-active{background:none;color:#26ffae}
.el-menu-vertical-demo > .el-menu-item:not(.is-disabled):hover, .el-menu-vertical-demo > .el-menu-item:not(.is-disabled):focus{background:rgba(0,0,0,0.1);}

</style>
