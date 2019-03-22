<template>
	<div v-if="dialogs.length > 0">
		<dlg v-for="(dialog, id) in dialogs" :options="dialog" :key="id"></dlg>
	</div>
</template>
<script>
	export default {
		name: 'dlgs',
		data() {
			return {}
		},
		computed: {
			dialogs() {
				return this.$store.getters.dialogs
			}
		}
	}
</script>