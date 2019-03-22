<template>
  <div class="themes">
  		<div class="handleEdit" @dblclick="handleEditModel"></div>
	    <div class="content">
	      <layout :page="page"></layout>
	    </div>
  </div>
</template>

<script>
	import css from '!css-loader!sass-loader!../../assets/scss/elementDefault.scss'
  import {gbs} from 'config'
  export default {
    name: 'theme-onlyBackground',
    props: ['page', 'theme', 'navs', 'subnavs'],
    data () {
      return {
        
      }
    },
    computed: {
      site () {
        return this.$store.getters.site
      }
    },
    methods: {
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
      document.getElementById("_theme_").innerHTML = css.toString()
    }
  }
</script>

<style scoped>
.themes{background: radial-gradient(#31217f, #2b1773);font-family:"Microsoft YaHei";font-size:12px;}
.handleEdit{width:50px;height:50px;background: none;cursor: pointer;position: fixed;top:0;right:0;}
.content {
  color:#fff;
  display: block;
  padding: 5px 0;
}
</style>
