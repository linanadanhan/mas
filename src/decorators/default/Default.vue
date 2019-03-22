<template>
	<div class="main-box">
		<div class="main" :style="{borderColor:`${params.borderColor}`,borderRadius:`${params.borderRadius}px`,backgroundColor:params.decoratorBgColor?`${params.decoratorBgColor}`:'#fff'}">
			<decorator-header class="header" :page="page" :widget="widget" :i="i" :j="j">
				<slot name="header">
					<div class="header-title">
						<slot name="icon">
							<i :class="params.widgetIco ? `iconfont ${params.widgetIco}` : 'iconfont icon-cf-c57'" class="icon"></i>
						</slot>
						<div class="header-badge" v-if="badge && badge.isDot">
							<slot v-if=" 'tab' == widget.name " name="title">
								{{params.title}}
							</slot>
							<badge v-else :name="params.badge">
								<slot name="title">
									{{params.title}}
								</slot>
							</badge>
						</div>
						<div class="header-badge" v-else>
							<slot name="title">
								{{params.title}}<i v-if="badge && badge.value" class="tip-number">({{badge.value}})</i>
							</slot>
						</div>
					</div>
					<decorator-toolbar class="header-toolbar" :page="page" :widget="widget" :i="i" :j="j" :minimized.sync="minimized">
						<slot name="buttons"></slot>
					</decorator-toolbar>
				</slot>
			</decorator-header>
			<div class="content" v-if="!minimized">
				<slot></slot>
			</div>
			<div class="footer" v-if="!minimized && $slots.footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'decorator-default',
		props: ['page', 'widget', 'params', 'i', 'j', 'editMode'],
		data() {
			return {
				minimized: false
			}
		},
		computed: {
			badge() {
				if(this.params.badge) {
					return this.$store.getters.badge(this.params.badge)
				}
			}
		},
		created() {}
	}
</script>

<style scoped>
	.main-box {
		padding: 5px;
		box-sizing: border-box;
	}
	
	.main {
		border-width: 1px;
		border-style: solid;
		border-color: #dbe0e5;
	}
	
	.header {
		display: flex;
		display: -webkit-box;
		display: -ms-flexbox;
		justify-content: space-between;
		min-height: 34px;
		line-height: 32px;
		border-bottom: 1px solid #ededed;
		font-size: 14px;
		padding: 0 10px;
		box-sizing: border-box;
	}
	
	.header-title {
		display: flex;
		display: -webkit-box;
		display: -ms-flexbox;
	}
	
	.header-title .icon {
		margin-right: 3px;
	}
	
	.header-badge .el-badge {
		display: flex;
		display: -webkit-box;
		display: -ms-flexbox;
	}
	
	.header-toolbar>>>i {
		font-size: 14px;
		display: inline-block;
		padding: 0 5px;
		box-sizing: border-box;
		cursor: pointer;
	}
	
	.main .content {
		width: 100%;
		box-sizing: border-box;
		font-size: 12px;
		overflow: auto;
	}
	
	.footer {
		padding: 5px 10px;
	}
	
	.tip-number {
		color: red;
		font-style: normal;
	}
</style>