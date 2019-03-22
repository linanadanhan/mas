<template>
  <div class="themes">
  	<div class="top">	
	    <div class="header">
	  	  <h1 class="title">
	      	<div v-if="site.logo" style="float: left;">
						<img class="avatar" :src="filter(site.logo)" >  		
	      	</div>
	      	<div>
	      		<p style="width: 400px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="site.title">{{site.title}}</p>
	      	</div>
	      </h1>
	      <sysbar :page="page"></sysbar>
	    </div>
	    <div class="nav">
	      <div class="nav-in">
	        <navbar :page="page" :navs="navs"></navbar>
	      </div>
	    </div>
    </div>
    <div class="content">
      <layout :page="page" ></layout>
    </div>
    <div class="footer">Copyright &copy; {{site.copyright}}</div>
  </div>
</template>

<script>
	import css from '!css-loader!sass-loader!../../assets/scss/elementAutumn.scss'
	import {gbs} from 'config'
  export default {
    name: 'theme-MidAutumnFestival',
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
.themes{font-family:"Microsoft YaHei";font-size:12px;background:#f7fafc;}
.top{background:url(../../assets/themeImg/zhongqiu_bgheader.png) no-repeat top center;background-size: cover;}
.header{height: 60px;width: 100%;padding:0 20px;box-sizing: border-box;color:#fff;}
.header .title{height:60px;float:left;color:#fff;font-size: 19px;line-height: 60px;font-weight: bold;}
.header .user-info{float: right;margin-top: 20px;;}
.themes .user-info >>>.el-dropdown{color:#fff;cursor: pointer;}
.el-dropdown-menu__item{font-size: 14px;}
.nav{width: 100%;height: 60px;background:transparent;}
.nav-in{margin: 0 auto;padding:0 20px ;box-sizing: border-box;}
.content {
  color:#10536d;
  display: block;
  padding:5px;
  min-height: calc(100vh - 170px);
}
.footer{height: 50px;width: 100%;background:#106e88;text-align: center;line-height: 50px;font-size: 12px;color: #fff;}
.avatar{
  margin-top: 10px;
  width: 40px;
  height: 40px;
}

>>>.el-menu--horizontal > .el-submenu .el-submenu__title:hover{background:rgba(0,0,0,0.1);color:#fff}
>>>.el-menu--horizontal > .el-submenu.is-active .el-submenu__title:hover{background:rgba(0,0,0,0.1);}
>>>.el-menu--horizontal > .el-submenu .el-submenu__title{color:#fff}
>>>.el-menu--horizontal > .el-submenu.is-active .el-submenu__title{color:#ffeb42;background: transparent;border-bottom: 2px solid #ffeb42;}
>>>.el-menu--horizontal > .el-menu-item{color:#fff}
>>>.el-menu--horizontal > .el-menu-item:hover{background:rgba(0,0,0,0.1);color:#fff!important}
>>>.el-menu--horizontal > .el-menu-item.is-active{color:#ffeb42;background: transparent;border-bottom: 2px solid #ffeb42;}
>>>.el-menu--horizontal > .el-menu-item.is-active:hover{background:rgba(0,0,0,0.1);color:#ffeb42;}
>>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, >>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus{background:rgba(0,0,0,0.1);color:#ffeb42}
>>>.el-menu--horizontal > .el-submenu .el-submenu__title:not(.is-disabled):hover, >>>.el-menu--horizontal > .el-submenu .el-submenu__title:not(.is-disabled):focus{background:rgba(0,0,0,0.1);color:#ffeb42}
</style>

