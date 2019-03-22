<template>
	<span class="Im">
	  <el-badge v-if="im" :max="99" :is-dot="false" :value="im">
	    <slot></slot>
	  </el-badge>
	  <span v-if="!im" class="noNum">
	    <slot></slot>
	  </span>
	</span>
</template>
<script>
  export default {
    name: 'Im',
    computed: {
      im () {
        return this.$store.getters.getAllImCount
      }
    }
  }
</script>
<style scoped="scoped">
	.Im{height:20px;display: inline-block;line-height: 20px;}
	.noNum{height:20px;display: inline-block;line-height: 20px;}
	>>>.el-badge__content.is-fixed {
	    top:8px;
	    right: 25px;
	}
</style>
