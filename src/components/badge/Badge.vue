<template>
  <el-badge v-if="dataBadge || badge" :max="99" :is-dot="dataBadge ? dataBadge.isDot : badge.isDot" :value="dataBadge ? dataBadge.value : badge.value">
    <slot></slot>
  </el-badge>
  <span class="el-badge" v-else>
    <slot></slot>
  </span>
</template>
<script>
	import _ from 'underscore'
  export default {
    name: 'badge',
    props: ['name', 'data'],
    data () {
      return {}
    },
    methods: {
    },
    computed: {
      badge () {
        if (this.name) {
          return this.$store.getters.badge(this.name)  	
        }
      },
      dataBadge () {
      	if (this.data && this.data.badgeNames && this.data.badgeNames.length > 0) {
      		return this.$store.getters.badge(this.data.badgeNames)
      	}
      }
    }
  }
</script>
