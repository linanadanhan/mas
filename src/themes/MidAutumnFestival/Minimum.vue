<template>
  <div class="themes">
    <div class="content">
      <layout :page="page" ></layout>
    </div>
  </div>
</template>

<script>
	import css from '!css-loader!sass-loader!../../assets/scss/elementAutumn.scss'
  export default {
    name: 'theme-MidAutumnFestival',
    props: ['page', 'theme', 'navs', 'subnavs'],
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
      document.getElementById("_theme_").innerHTML = css.toString()
    }
  }
</script>

<style scoped>
.themes{background:#fff;font-family:"Microsoft YaHei";font-size:12px;}
.content {
  color:#177da4;
  display: block;
  padding: 5px;
}
</style>
