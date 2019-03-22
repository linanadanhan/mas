<template>
  <div class="themes">
    <div class="header submenu">
      <h1 class="title">
      	<div v-if="site.logo" style="float: left;">
					<img class="avatar" :src="filter(site.logo)">	
      	</div>
      	<div style="float: left;padding-left: 10px;">
      		<p :title="site.title">{{site.title}}</p>
      	</div>
      </h1>
      <navbar :page="page" :navs="navs"></navbar>
      <sysbar :page="page"></sysbar>
    </div>
    <div class="main">
      <div v-if="subnavs" class="menu" :style="{width:navWidth+'px'}">
          <div class="subNavbar">
            <el-scrollbar style="height:100%;" >
              <sub-navbar :page="page" :navs="subnavs" :isCollapse="isCollapse"></sub-navbar>
            </el-scrollbar>
          </div>
          <div class="switch" @click="switchNav"><i :class="['iconfont',isCollapse?'icon-zhankai':'icon-shouqi']"></i></div>
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
  import css from '!css-loader!sass-loader!../../assets/scss/elementIconNav.scss'
	import {gbs} from 'config'
  export default {
    name: 'theme-default',
    props: ['page', 'theme', 'navs', 'subnavs'],
    data () {
      return {
      	fileDownloadUrl: '',
        isCollapse:false,
        navWidth:200
      }
    },
    computed: {
    	site () {
        return this.$store.getters.site
      }
    },
    methods: {
      filter(logo) {
      	return this.fileDownloadUrl + '/' + logo
      },
      switchNav(){
        if(this.isCollapse){
          this.navWidth=200
          this.isCollapse=false
        }else{
          this.navWidth=64
          this.isCollapse=true
        }
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
.header{height: 60px;width: 100%;position:relative;background: #7c7ee6;color:#fff;padding:0 10px;box-sizing: border-box;}
.header .title{height: 60px;line-height:60px;float:left;font-size: 16px;font-weight: bold;margin-right: 50px;}
.header .nav{float:left;height: 60px;margin-left: 10px;background:#7c7ee6;color:#fff}
.header .user-info{position: absolute;color: #fff;right:20px ;margin-top: 21px;}
.header .user-info >>>.el-dropdown{color: #fff;cursor: pointer;}
.el-dropdown-menu__item{font-size: 14px;}
.header .nav >>>.el-menu-item i{color:#fff}
.header .nav >>>.el-submenu__title i {color: #fff;}
.main{position: absolute;top: 60px;bottom:0;width: 100%;overflow: hidden;display: flex}
.menu{background:#464c5e;height:100%;}
.menu >>>.el-menu {
    border-right:none
}
.menu .subNavbar{height:calc(100% - 30px);}
.menu >>>.el-scrollbar__wrap{overflow-x: hidden;}
.switch{width:100%;height: 30px;line-height: 30px;text-align:center;background:#34394a;cursor: pointer;color:#fff}
.main-right {
 flex: 1;
  color:#7c7ee6;
  background:#f0f1f4;
  overflow-y: auto;
  overflow-x: hidden;
}
.noLeft{
  left: 0;
}
.main-right .content{ padding:5px; padding-bottom:55px;min-height: 100%;box-sizing: border-box;}
.main-right .footer{margin-top:-50px;height: 50px;background:#e9eaee;text-align: center;line-height: 50px;font-size: 12px;color:#403c3e;}
.avatar{
	margin-top: 10px;
	width: 40px;
  height: 40px;
}
.themes >>>.el-menu--horizontal > .el-submenu .el-submenu__title:hover{background:rgba(0,0,0,0.1);color:#fff}
.themes >>>.el-menu--horizontal > .el-submenu.is-active .el-submenu__title:hover{background:rgba(0,0,0,0.1);}
.themes >>>.el-menu--horizontal > .el-submenu .el-submenu__title{color:#fff}
.themes >>>.el-menu--horizontal > .el-submenu.is-active .el-submenu__title{color:fff;background:rgba(0,0,0,0.1);;border-bottom:none;}
.themes >>>.el-menu--horizontal > .el-menu-item{color:#fff}
.themes >>>.el-menu--horizontal > .el-menu-item:hover{background:rgba(0,0,0,0.1);color:#fff}
.themes >>>.el-menu--horizontal > .el-menu-item.is-active{color:#fff;background:rgba(0,0,0,0.1);border-bottom:none;}
.themes >>>.el-menu--horizontal > .el-menu-item.is-active:hover{background:rgba(0,0,0,0.1);}
.themes >>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, .themes >>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus{background:rgba(0,0,0,0.1);color: #fff;}

.el-menu-vertical-demo{background:#464c5e;}
.el-menu-vertical-demo >>>.el-menu{background:#464c5e;}
.el-menu-vertical-demo >>>.el-menu-item{color:#8b97b8}
.el-menu-vertical-demo >>>.el-submenu__title{color:#8b97b8}
.el-menu-vertical-demo >>>.el-menu-item:hover{background:#50566d;}
.el-menu-vertical-demo >>>.el-menu-item.is-active:hover{background:#50566d;}
.el-menu-vertical-demo >>>.el-submenu__title:hover{background:#50566d;}
.el-menu-vertical-demo >>>.el-menu-item.is-active{background:#50566d;color:#fff}
.el-menu-vertical-demo > .el-menu-item:not(.is-disabled):hover, .el-menu-vertical-demo > .el-menu-item:not(.is-disabled):focus{background:#50566d;}
</style>
