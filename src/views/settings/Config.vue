<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules" label-width="90px">
			<el-form-item v-if="data.widget.name != 'tab'" prop="title" label="名称">
				<el-input v-model="form.title" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="Widget">
				{{data.widget.name}}
			</el-form-item>
			<el-form-item label="Widget图标">
				<el-tag><i style="cursor: pointer;" :class="form.widgetIco ? 'iconfont '+form.widgetIco : 'iconfont icon-cf-c57'" @click="handleIcoSetting"></i></el-tag>
			</el-form-item>
			<el-form-item prop="decorator" label="修饰器">
				<el-select v-model="form.decorator" placeholder="请选择修饰器">
					<el-option v-for="item in decoratorOptions" :disabled="(item.code == 'none' || item.code == 'noheader') && data.widget.name == 'tab'" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="">
				<el-row>
					<el-col :span="6">
						<el-form-item label-width="60px" label="背景色">
							<el-color-picker v-model="form.decoratorBgColor" show-alpha></el-color-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label-width="60px" label="边框色">
							<el-color-picker v-model="form.borderColor" show-alpha></el-color-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label-width="70px" label="圆角边框">
							<el-input-number v-model="form.borderRadius" ></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="badge">
				<el-input v-model="form.badge" placeholder="请输入badge"></el-input>
			</el-form-item>
			<el-form-item prop="widgetHeight" label="高度">
				<el-input v-model="form.widgetHeight" placeholder="请输入widget高度"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-row>
					<el-col :span="12">
						上边距 <el-input-number v-model="form.paddingTop"></el-input-number>
					</el-col>
					<el-col :span="12">
						左边距 <el-input-number v-model="form.paddingLeft"></el-input-number>
					</el-col>
				</el-row>
				<div style="margin-top: 15px;"></div>
				<el-row>
					<el-col :span="12">
						下边距 <el-input-number v-model="form.paddingBottom"></el-input-number>
					</el-col>
					<el-col :span="12">
						右边距 <el-input-number v-model="form.paddingRight"></el-input-number>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="">
				<el-checkbox v-model="form.openMax">启用最大化</el-checkbox>
				<el-checkbox v-model="form.openMin">启用最小化</el-checkbox>
			</el-form-item>
		</el-form>
		<el-dialog size="small" title="IconFont 图标" :fullscreen="true" :visible.sync="icoDialog" :append-to-body="true" :close-on-click-modal="false" width="100%" top="6vh">
			<widgetIco :form="form" @closeAndRtnVal="closeAndRtnVal"></widgetIco>
		</el-dialog>
	</div>
</template>
<script>
	import widgetIco from './Icon'
	export default {
		name: 'basic',
		title: '基本信息',
		props: ['data', 'form'],
		components: {
			'widgetIco': widgetIco
		},
		data() {
			var validateNumber = (rule, value, callback) => {
				if(value && !/^\d*$/.test(value)) {
					callback(new Error('必须是数字！'));
				} else {
					callback();
				}
			};
			return {
				icoDialog: false,
				rules: {
					title: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}, {
						min: 1,
						max: 20,
						message: '长度在 1 到 20 个字符',
						trigger: 'blur'
					}],
					widgetHeight: [{
						validator: validateNumber,
						trigger: 'blur'
					}]
				},
				decoratorOptions: []
			}
		},
		methods: {
			handleIcoSetting() { // 设置图标
				this.icoDialog = true
			},
			closeAndRtnVal() {
				this.icoDialog = false
			},
			getDecoratorOptions() { // 获取所有平台修饰器数据
				this.$api_site_getAllDecorateList().then((data) => {
					if(data) {
						this.decoratorOptions = data
					}
				})
			},
			formatTooltip(val) {
				return val / 100
			}
		},
		created() {
			if(this.form.widgetIco == '') {
				this.form.widgetIco = 'icon-cf-c57'
			}
			this.getDecoratorOptions()
		}
	}
</script>

<style scoped>

</style>