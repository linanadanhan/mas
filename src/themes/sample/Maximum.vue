<template>
  <div class="themes">
    <div class="header">
    	<div class="header-in">
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
    </div>
    <div class="nav">
      <div class="nav-in">
        <navbar :page="page" :navs="navs"></navbar>
      </div>
    </div>
    <div class="content">
      <layout :page="page" ></layout>
    </div>
    <div class="footer">Copyright &copy; {{site.copyright}}</div>
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
.themes{background:#fafafa;font-family:"Microsoft YaHei";font-size:12px;}
.header{height: 60px;width: 100%;padding:0 20px;box-sizing: border-box;color:#009a61;background: #fafafa;}
.header-in{height:60px;margin: 0 auto;overflow: hidden;color:#009a61;}
.header .title{height: 60px;float:left;color:#009a61;font-size: 19px;line-height: 60px;font-weight: bold;}
.header .user-info{float: right;margin-top: 20px;}
.user-info >>>.el-dropdown{color:#009a61;cursor: pointer;}
.el-dropdown-menu__item{font-size: 14px;}
.nav >>>.el-submenu__title i {
     color: #fff; 
}
.nav{width: 100%;height: 60px;background: #009a61;}
.nav-in{margin: 0 auto;padding: 0 20px;box-sizing: border-box;}

.content {
  color:#009a61;
  margin: 0 auto;
  padding:5px;
  min-height: calc(100vh - 170px);
}
.footer{height: 50px;width: 100%;background: #009a61;text-align: center;line-height: 50px;font-size: 12px;color: #fff;}
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
>>>.el-menu--horizontal > .el-menu-item:hover{background:rgba(0,0,0,0.1);color:#fff!important}
>>>.el-menu--horizontal > .el-menu-item.is-active{color:#26ffae;background: transparent;border-bottom: 2px solid #26ffae;}
>>>.el-menu--horizontal > .el-menu-item.is-active:hover{background:rgba(0,0,0,0.1);}
>>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, >>>.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus{background:rgba(0,0,0,0.1);}
</style>
