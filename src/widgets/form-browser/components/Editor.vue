<template>
  <el-form-item :label="config.label" :prop="config.name">
  	<div :id="`tool-${widget.id + config.index}`" class="toolbar"></div>
    <div :id="`text-${widget.id + config.index}`" class="text" :style="{'height':config.editorHeight+'px'}"> 
    </div>
  </el-form-item>
</template>

<script>
	import {gbs} from 'config'
	import E from 'wangeditor'
  export default {
    props: ['widget','config', 'model','rules', 'context'],
    data () {
    	return {
    		
    	}
    },
    mounted(){
    	this.$nextTick(() => {
					let editor= new E(`#tool-${this.widget.id + this.config.index}`,`#text-${this.widget.id + this.config.index}`) 
					editor.customConfig.zIndex = 100
					editor.customConfig.menus = [
			      'head',  // 标题
				    'bold',  // 粗体
				    'fontSize',  // 字号
				    'fontName',  // 字体
				    'italic',  // 斜体
				    'underline',  // 下划线
				    'strikeThrough',  // 删除线
				    'foreColor',  // 文字颜色
				    'backColor',  // 背景颜色
				    'link',  // 插入链接
				    'list',  // 列表
				    'justify',  // 对齐方式
				    'quote',  // 引用
				    'emoticon',  // 表情
				    'image',  // 插入图片
				    'table',  // 表格
				    'video',  // 插入视频
				    'code',  // 插入代码
				    'undo',  // 撤销
				    'redo'  // 重复
			    ]
					editor.customConfig.uploadImgServer = gbs.fileServiceUrl + '/file/uploadFile' // 上传图片到服务器
					// 将文件大小限制为 20M
					editor.customConfig.uploadImgMaxSize = 20 * 1024 * 1024
					// 限制一次最多上传 5 张图片
					// editor.customConfig.uploadImgMaxLength = 1
					// editor.customConfig.uploadImgShowBase64 = true
					
					editor.customConfig.uploadFileName = 'file'
					
					//跨域上传中如果需要传递 cookie 需设置 withCredentials
					editor.customConfig.withCredentials = true
					
					editor.customConfig.uploadImgHooks = {
						before: function(xhr, editor, files) {
							// 图片上传之前触发
							// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
		
							// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
							// return {
							//     prevent: true,
							//     msg: '放弃上传'
							// }				
						},
						success: function(xhr, editor, result) {
							console.info(result)
							// 图片上传并返回结果，图片插入成功之后触发
							// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
						},
						fail: function(xhr, editor, result) {
							// 图片上传并返回结果，但图片插入错误时触发
							// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
						},
						error: function(xhr, editor) {
							// 图片上传出错时触发
							// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
						},
						timeout: function(xhr, editor) {
							// 图片上传超时时触发
							// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
						},
						// 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
						// （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
						customInsert: function(insertImg, result, editor) {
							// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
							// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
							var url = gbs.fileServiceUrl + '/file/download' + "/" + result.referenceId;
							// that.imgRefereIds.push(result.referenceId);
							insertImg(url)
						}
					};
					
					editor.customConfig.onchange = (html) => {
			       this.model[this.config.name] = html
			    }
					editor.create()
					editor.$textElem.attr('contenteditable', !this.config.disabled)
					editor.txt.html(this.model[this.config.name])
					
					this.$root.eventHub.$on("clearEditor",() => {
						editor.txt.clear()
					});
    	})
		},
		created() {
		},
    methods: {
    },
		beforeDestroy() {// 此处需要销毁页面事件监听
			this.$root.eventHub.$off("clearEditor")
		}
 }
</script>

<style scoped="scoped">
	.toolbar {
     border: 1px solid #ccc;
     flex-wrap: wrap;
  }
  .text {
      border: 1px solid #ccc;
      border-top:none;
      word-wrap:break-word;
      word-break:break-all;
  }
</style>
