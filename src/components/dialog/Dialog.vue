<template>
	<el-dialog  v-bind="options" @close="onclose" :visible.sync="visible">
		<el-tabs v-if="Array.isArray(options.body)" v-model="options.data.activeName">
			<el-tab-pane :label="item.title" v-for="item in options.body" :name="item.name" :key="item.name">
				<component :ref="item.name" v-bind:is="item" :data="options.data" :form="options.form" :dialog="this"></component>
			</el-tab-pane>
		</el-tabs>
		<widget ref="body" v-else-if="typeof options.body == 'string'" :widget="options.body" :params="options.data" :dialog="this"></widget>
		<component ref="body" v-else v-bind:is="options.body" :data="options.data" :form="options.form" :dialog="this"></component>
		<span v-if="options.buttons && options.buttons.length > 0" slot="footer" class="dialog-footer">
			<el-button v-for="(btn, index) in options.buttons" :size="btn.size ? btn.size:'medium' " :type="btn.type" @click="handle(btn.handle)" :key="'dialog-button-' + index">{{btn.text}}</el-button>
		</span>
	</el-dialog>
</template>
<script>
	export default {
		name: 'dlg',
		props: ['options'],
		data() {
			return {
				visible: true
			}
		},
		methods: {
			handle(cb) {
				if (typeof cb != 'function') {
					return
				}
				let body = this.$refs.body
				if (typeof this.options.body == 'string') { // widget
					body = body.$refs.comp
				} else if (Array.isArray(this.options.body)){
					body = this.$refs
				}
				cb.call(this.options.opener, this.options, this, body)
			},
			onclose() {
				this.$_.delay(this.$closeDialog, 300)
				this.handle(this.options.onclosed)
			},
			close() {
				this.visible = false
			}
		},
		mounted() {

		}
	}
</script>