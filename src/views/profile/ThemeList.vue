<template>
  <el-carousel @change="change" :initial-index="index" trigger="click" :autoplay="false" type="card" height="300px">
    <el-carousel-item v-for="item in themes" :key="item.name">
      <div class="theme-card">
        <img :src="item.image" class="image">
        <div class="theme-title">
          <span>{{item.title}}</span>
        </div>
      </div>    
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  import Themes from 'themes'

  export default {
    name: 'theme-list',
    props: ['data'],
    data () {
      return {
        themes: [],
        index: 0
      }
    },
    computed: {
      theme () {
        return this.$store.getters.theme
      },
      page(){
				return this.$store.getters.page
			}
    },
    methods: {
      initThemeList: function (data) {
        this.$_.each(data, (theme, index) => {
          if(this.theme === theme.name){
            this.index = index
          }
          if(/\//.test(theme.name)) {
            this.$set(theme, 'image', '/modules/' + theme.name + '/theme.png')
          } else {
          	if (Themes[theme.name]) {
	            Themes[theme.name].image().then((img) => {
	              this.$set(theme, 'image', img)
	            })          		
          	}
          }
          this.themes.push(theme)
        })
      },
      change: function (index) {
        let theme = this.themes[index].name
        //切换保存主题 sn
        this.$api_site_saveCustomTheme({
           data: {
             siteCode: this.page.site,
             themeCode: theme
           }
        })
        this.$store.dispatch('update_theme', theme)
      }
    },
    created () {
      this.$api_site_themeList({
        data: {
        	siteCode: this.page.site
        },
        fn: (data) => this.initThemeList(data)
      })
    }
  }
</script>

<style scoped>
  .el-carousel {
    width: 600px;
  }
  .el-carousel__item {
    background-color: #dddddd;
  }
  .theme-card {
    padding: 5px;
  }
  .image {
    width: 290px;
    height: 250px;
  }
</style>