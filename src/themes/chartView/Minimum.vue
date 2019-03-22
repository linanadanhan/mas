<template>
  <div class="themes">
  	<div class="themesBody">
	    <div class="header">
	    	<div class="left">
	    		<img v-if="site.logo" :src="filter(site.logo)"/>
	    		<img v-else src="./logo.png"/>
	    	</div>
	    	<div class="center" :style="{textAlign:position}">{{page.title}}</div>
	    	<div class="right" @dblclick="handleEditModel"><img src="./time.png"/></div>
	    </div>
	    <div class="content">
	      <layout :page="page" ></layout>
	    </div>
    </div>
  </div>
</template>

<script>
	import css from '!css-loader!sass-loader!../../assets/scss/elementDefault.scss'
  import {gbs} from 'config'
  export default {
    name: 'theme-chartView',
    props: ['page', 'theme', 'navs', 'subnavs'],
    data () {
      return {
        fileDownloadUrl: '',
        position:'left'
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
      handleEditModel(){// 双击编辑模式
      	this.$store.dispatch('update_widget_original')
				// 切换页面
				this.$api_site_pageInfo({
					data: {
						path: this.page.path,
						isDefault: true
					},
					fn: (data) => {
						data.path = this.page.path
						this.$store.dispatch('update_page', data).then(() => {
							this.$store.dispatch('update_page_edit_mode', true)
							this.$store.dispatch('update_page_diy_mode', false)
						})
					}
				})
      }
    },
    mounted () {
      this.fileDownloadUrl = gbs.fileServiceUrl + '/file/download'
      document.getElementById("_theme_").innerHTML = css.toString()
    }
  }
</script>

<style scoped>
.themes{position: absolute;top:0;left:0;right:0;bottom:0;font-family:"Microsoft YaHei";}
.themesBody{min-height:100%;width: 100%;background:url(bg.jpg) repeat;background-size:cover;padding:0 15px;}
.header{height: 60px;border-bottom: 1px solid #11293e;display: flex;margin: 0 5px;}
.header .left{height:40px;margin-top: 10px;margin-right: 20px;}
.header .left img{height: 40px;}
.header .center{color:#fff;font-size: 23px;line-height: 60px;flex: 1;}
.header .right{height:40px;margin-top: 10px;margin-left: 20px;}
.header .right img{height: 40px;}
.content {
  color:#fff;
  display: block;
  padding: 5px 0;
}
</style>
