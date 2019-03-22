<template>
  <form-item :config="config" :model="model" :rules="rules" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
		<div :id="`tool-${widget.id + config.index}`" class="toolbar"></div>
    <div :id="`text-${widget.id + config.index}`" class="text" :style="{'height':config.editorHeight+'px'}"> 
    </div>
  </form-item>
</template>

<script>
	import E from 'wangeditor'
  import FormItem from '../pages/FormItem.vue'
  export default {
		components: { 
			'form-item': FormItem
		},
    props: ['page', 'params', 'widget','config', 'model','rules', 'context', 'rindex', 'cindex', 'rows'],
    data () {
    	return {
				editorNumber:0
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
					editor.customConfig.onchange = (html) => {
			       this.model[this.config.name] = html
//			       console.log( this.model)
			    }
					this.context.editor[this.config.name]= editor
					editor.create()
					editor.$textElem.attr('contenteditable', !this.config.disabled)
					
    	})
		},
    methods: {
    	
    }
 }
</script>

<style scoped="scoped">
	.addUnit{width:90%}
	.unit{width:10%;margin-left: 5px;}
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
