<template>
  <div class="themes">
    <div class="header maixmum">
      <div  class="header-in">
	      <h1 class="title">
	      	<div v-if="site.logo" style="float: left;">
						<img class="avatar" :src="filter(site.logo)" >		
	      	</div>
	      	<div>
	      		<p :title="site.title">{{site.title}}</p>
	      	</div>
	      </h1>
	      <sysbar :page="page"></sysbar>
      </div>
    </div>
    <div class="nav">
      <div class="nav-in">
        <navbar :page="page" :navs="navs" ></navbar>
      </div>
    </div>
    <div class="content">
      <layout :page="page"></layout>
    </div>
    <div class="footer">Copyright &copy; {{site.copyright}}</div>
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
        activeIndex: '1',
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
.themes{background:#fff;font-family:"Microsoft YaHei";font-size:12px;}
.header{height: 60px;width: 100%;padding:0 20px;box-sizing: border-box;}
.header-in{height: 60px;margin: 0 auto;color:#7c7ee6;overflow: hidden;}
.header .title{height: 60px;float:left;color:#7c7ee6;font-size:19px;line-height: 60px;font-weight: bold;}
.header .user-info{float: right;margin-top:21px ;}
.header .user-info >>>.el-dropdown{color:#7c7ee6;cursor: pointer;}
.header .user-info .iconfont{font-size: 14px;margin-right: 5px;color:#7c7ee6;}
.el-dropdown-menu__item{font-size: 14px;}
.nav{width: 100%;height: 60px;background:#7c7ee6;}
.nav-in{ margin: 0 auto;padding: 0 20px;box-sizing: border-box;}
 .nav >>>.el-menu-item i{color:#fff}
 .nav >>>.el-submenu__title i {color: #fff;}
.content {
  margin: 0 auto;
  color: #7c7ee6;
  padding: 5px;
  min-height: calc(100vh - 170px);
}
.footer{height: 50px;width: 100%;background:#464c5e;text-align: center;line-height: 50px;font-size: 12px;color:#fff;}
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
</style>
