<template>
	<div>
		<div class="main markdown">
			<el-radio-group v-model="form.widgetIco" @change="selectedIco">
				<ul class="icon_lists clear">
						<template v-for="item in icons">
							<li>
								<i class="icon iconfont" :class="item.icon"></i>
								<div class="name">
									<el-radio :label="item.icon">
										<p style="width: 100px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="item.name">{{item.name}}</p>
									</el-radio>
								</div>
							</li>
						</template>
				</ul>
			</el-radio-group>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['form'],
		data() {
			return {
				ico: '',
				icons: [{
					'name': '资料库',
					'icon': 'icon-ziliaoku'
				}, {
					'name': '合并单元',
					'icon': 'icon-hebingdanyuan'
				}, {
					'name': '页面',
					'icon': 'icon-yemian'
				}, {
					'name': '刷新',
					'icon': 'icon-shuaxin1'
				}, {
					'name': '关闭',
					'icon': 'icon-guanbi'
				}, {
					'name': 'search',
					'icon': 'icon-icon-search2'
				}, {
					'name': '公告',
					'icon': 'icon-gonggao'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu5'
				}, {
					'name': 'grid',
					'icon': 'icon-icon-gridtwoup'
				}, {
					'name': 'user',
					'icon': 'icon-user1'
				}, {
					'name': '个性设置',
					'icon': 'icon-gexingshezhi'
				}, {
					'name': 'closedcaption',
					'icon': 'icon-icon-closedcaption'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu6'
				}, {
					'name': '编辑文档',
					'icon': 'icon-bianjiwendang'
				}, {
					'name': 'icon_bag_alt',
					'icon': 'icon-icon-bag'
				}, {
					'name': 'icon_image',
					'icon': 'icon-icon-image'
				}, {
					'name': 'icon_book',
					'icon': 'icon-icon-book'
				}, {
					'name': 'umbrella',
					'icon': 'icon-icon-umbrella'
				}, {
					'name': '饼状图',
					'icon': 'icon-bingzhuangtu'
				}, {
					'name': '日历',
					'icon': 'icon-rili'
				}, {
					'name': '邮件',
					'icon': 'icon-youjian'
				}, {
					'name': 'minus',
					'icon': 'icon-icon-minus1'
				}, {
					'name': 'flag-2',
					'icon': 'icon-icon-flag1'
				}, {
					'name': 'speech-bubble-left-3',
					'icon': 'icon-icon-speakernotes'
				}, {
					'name': '更多',
					'icon': 'icon-gengduo2'
				}, {
					'name': 'search',
					'icon': 'icon-icon-search3'
				}, {
					'name': '下载',
					'icon': 'icon-xiazai'
				}, {
					'name': '在线客服',
					'icon': 'icon-zaixiankefu'
				}, {
					'name': 'star',
					'icon': 'icon-icon-star2'
				}, {
					'name': 'pen',
					'icon': 'icon-icon-pen'
				}, {
					'name': 'anchor',
					'icon': 'icon-icon-anchor'
				}, {
					'name': 'archive',
					'icon': 'icon-icon-archive2'
				}, {
					'name': 'drop',
					'icon': 'icon-icon-drop'
				}, {
					'name': 'expand',
					'icon': 'icon-icon-expand'
				}, {
					'name': 'grid-2',
					'icon': 'icon-icon-grid2'
				}, {
					'name': 'head',
					'icon': 'icon-icon-head'
				}, {
					'name': 'location-2',
					'icon': 'icon-icon-location21'
				}, {
					'name': 'paragraph',
					'icon': 'icon-icon-paragraph'
				}, {
					'name': '两栏布局',
					'icon': 'icon-layout2'
				}, {
					'name': '停用',
					'icon': 'icon-tingyong'
				}, {
					'name': 'SHARE',
					'icon': 'icon-icon-share'
				}, {
					'name': '人员新增',
					'icon': 'icon-renyuanxinzeng'
				}, {
					'name': '查询',
					'icon': 'icon-chaxun'
				}, {
					'name': 'home',
					'icon': 'icon-icon-homeblack'
				}, {
					'name': 'icon-map',
					'icon': 'icon-icon-map'
				}, {
					'name': '设置',
					'icon': 'icon-shezhi2'
				}, {
					'name': '新增',
					'icon': 'icon-xinzeng'
				}, {
					'name': '折线图',
					'icon': 'icon-zhexiantu'
				}, {
					'name': '查询',
					'icon': 'icon-chaxun1'
				}, {
					'name': '人群拆分',
					'icon': 'icon-renqunchaifen'
				}, {
					'name': 'account-logout',
					'icon': 'icon-icon-accountlogout'
				}, {
					'name': 'audio-spectrum',
					'icon': 'icon-icon-audiospectrum'
				}, {
					'name': 'account-login',
					'icon': 'icon-icon-accountlogin'
				}, {
					'name': '更多',
					'icon': 'icon-gengduo3'
				}, {
					'name': '刷新',
					'icon': 'icon-shuaxin2'
				}, {
					'name': '搜索',
					'icon': 'icon-sousuo'
				}, {
					'name': '保存',
					'icon': 'icon-baocun'
				}, {
					'name': 'user',
					'icon': 'icon-icon-user'
				}, {
					'name': '社区-消息',
					'icon': 'icon-xiaoxi'
				}, {
					'name': '用户在线',
					'icon': 'icon-icongou'
				}, {
					'name': '页面',
					'icon': 'icon-yemian1'
				}, {
					'name': '设置',
					'icon': 'icon-set'
				}, {
					'name': 'icon-cloud2',
					'icon': 'icon-icon-cloud2'
				}, {
					'name': 'icon-brush',
					'icon': 'icon-icon-brush'
				}, {
					'name': 'plus',
					'icon': 'icon-icon-plus'
				}, {
					'name': '饼状图',
					'icon': 'icon-bingzhuangtu1'
				}, {
					'name': '箭头',
					'icon': 'icon-jiantou'
				}, {
					'name': '上传',
					'icon': 'icon-shangchuan'
				}, {
					'name': 'clipboard',
					'icon': 'icon-icon-clipboard'
				}, {
					'name': 'contract',
					'icon': 'icon-icon-contract'
				}, {
					'name': 'esc',
					'icon': 'icon-icon-esc'
				}, {
					'name': 'file-subtract',
					'icon': 'icon-icon-filesubtract'
				}, {
					'name': 'inbox',
					'icon': 'icon-icon-inbox2'
				}, {
					'name': 'layers',
					'icon': 'icon-icon-layers'
				}, {
					'name': 'marquee-plus',
					'icon': 'icon-icon-marqueeplus'
				}, {
					'name': 'outbox',
					'icon': 'icon-icon-outbox'
				}, {
					'name': 'paper',
					'icon': 'icon-icon-paper'
				}, {
					'name': 'paper-stack',
					'icon': 'icon-icon-stack21'
				}, {
					'name': 'center align',
					'icon': 'icon-icon-aligncenter1'
				}, {
					'name': '站点管理',
					'icon': 'icon-zhandianguanli'
				}, {
					'name': '应用',
					'icon': 'icon-msnui-app'
				}, {
					'name': '修改',
					'icon': 'icon-xiugai2'
				}, {
					'name': 'display',
					'icon': 'icon-icon-display'
				}, {
					'name': 'music',
					'icon': 'icon-icon-music'
				}, {
					'name': 'truck',
					'icon': 'icon-icon-truck'
				}, {
					'name': 'world',
					'icon': 'icon-icon-world'
				}, {
					'name': '交换',
					'icon': 'icon-jiaohuan'
				}, {
					'name': '公告通知',
					'icon': 'icon-gonggaotongzhi'
				}, {
					'name': 'star',
					'icon': 'icon-icon-star'
				}, {
					'name': 'align-justify',
					'icon': 'icon-icon-alignjustify'
				}, {
					'name': 'skipprevious',
					'icon': 'icon-icon-skipprevious'
				}, {
					'name': '88安全监督登记',
					'icon': 'icon-88anquanjiandudengji'
				}, {
					'name': 'app',
					'icon': 'icon-iconfontapp'
				}, {
					'name': '箭头',
					'icon': 'icon-jiantou1'
				}, {
					'name': '快捷方式',
					'icon': 'icon-kuaijiefangshi'
				}, {
					'name': '刷新',
					'icon': 'icon-shuaxin3'
				}, {
					'name': 'star',
					'icon': 'icon-icon-staroutline'
				}, {
					'name': '分享',
					'icon': 'icon-fenxiang'
				}, {
					'name': '发送',
					'icon': 'icon-fasong'
				}, {
					'name': 'icon-email',
					'icon': 'icon-icon-email'
				}, {
					'name': 'shop',
					'icon': 'icon-icon-shopblack'
				}, {
					'name': '关闭',
					'icon': 'icon-guanbi1'
				}, {
					'name': '关闭',
					'icon': 'icon-guanbi2'
				}, {
					'name': 'location',
					'icon': 'icon-icon-location1'
				}, {
					'name': 'airplanemode-off',
					'icon': 'icon-icon-airplanemodeoff'
				}, {
					'name': 'airplanemode-on',
					'icon': 'icon-icon-airplanemodeon'
				}, {
					'name': 'file-upload',
					'icon': 'icon-icon-fileupload'
				}, {
					'name': 'https',
					'icon': 'icon-icon-https'
				}, {
					'name': 'launch',
					'icon': 'icon-icon-launch'
				}, {
					'name': 'today',
					'icon': 'icon-icon-today'
				}, {
					'name': 'view-module',
					'icon': 'icon-icon-viewmodule'
				}, {
					'name': '打开',
					'icon': 'icon-dakai'
				}, {
					'name': '在线客服',
					'icon': 'icon-zaixiankefu1'
				}, {
					'name': '快捷方式',
					'icon': 'icon-kuaijiefangshi1'
				}, {
					'name': '锁定',
					'icon': 'icon-locked'
				}, {
					'name': 'watch',
					'icon': 'icon-icon-watch2'
				}, {
					'name': 'search',
					'icon': 'icon-icon-search'
				}, {
					'name': 'externallink',
					'icon': 'icon-icon-externallink'
				}, {
					'name': '权限',
					'icon': 'icon-quanxian'
				}, {
					'name': '部门',
					'icon': 'icon-bumen'
				}, {
					'name': 'file',
					'icon': 'icon-icon-file1'
				}, {
					'name': 'alt',
					'icon': 'icon-icon-alt'
				}, {
					'name': '登录',
					'icon': 'icon-login-user'
				}, {
					'name': '会员资料管理',
					'icon': 'icon-huiyuanziliaoguanli'
				}, {
					'name': '信封打开',
					'icon': 'icon-xinfengdakai'
				}, {
					'name': '电子邮件',
					'icon': 'icon-dianziyoujian'
				}, {
					'name': 'envelope',
					'icon': 'icon-icon-envelope'
				}, {
					'name': 'align-center',
					'icon': 'icon-icon-aligncenter'
				}, {
					'name': 'briefcase',
					'icon': 'icon-icon-briefcase'
				}, {
					'name': 'help',
					'icon': 'icon-icon-help2'
				}, {
					'name': 'disc',
					'icon': 'icon-icon-disc'
				}, {
					'name': 'loader',
					'icon': 'icon-icon-loader'
				}, {
					'name': 'reload',
					'icon': 'icon-icon-reload'
				}, {
					'name': 'signal',
					'icon': 'icon-icon-signal'
				}, {
					'name': 'skip-back',
					'icon': 'icon-icon-skipback'
				}, {
					'name': 'skip-forward',
					'icon': 'icon-icon-skipforward'
				}, {
					'name': 'upload',
					'icon': 'icon-icon-upload'
				}, {
					'name': 'tag',
					'icon': 'icon-icon-tag'
				}, {
					'name': 'shop',
					'icon': 'icon-icon-shop2'
				}, {
					'name': 'tag',
					'icon': 'icon-icon-tag2'
				}, {
					'name': 'params',
					'icon': 'icon-icon-params'
				}, {
					'name': 'ios-fastforward',
					'icon': 'icon-icon-fastforward'
				}, {
					'name': 'align-left',
					'icon': 'icon-icon-alignleft'
				}, {
					'name': 'align-right',
					'icon': 'icon-icon-alignright'
				}, {
					'name': 'chevron-down',
					'icon': 'icon-icon-chevronbottom'
				}, {
					'name': 'chevron-up',
					'icon': 'icon-icon-chevrontop'
				}, {
					'name': 'stop',
					'icon': 'icon-icon-mediastop'
				}, {
					'name': '设置',
					'icon': 'icon-shezhi3'
				}, {
					'name': 'huilv_会议室',
					'icon': 'icon-huilvhuiyishi'
				}, {
					'name': '文件管理',
					'icon': 'icon-guanwangicon31327'
				}, {
					'name': 'link',
					'icon': 'icon-icon-link2'
				}, {
					'name': '退出',
					'icon': 'icon-tuichu'
				}, {
					'name': 'sun',
					'icon': 'icon-icon-sun'
				}, {
					'name': 'album',
					'icon': 'icon-icon-album'
				}, {
					'name': 'calendar2',
					'icon': 'icon-icon-calendar2'
				}, {
					'name': 'brightness-6',
					'icon': 'icon-icon-brightness6'
				}, {
					'name': 'camera4',
					'icon': 'icon-icon-camera4'
				}, {
					'name': 'clock3',
					'icon': 'icon-icon-clock3'
				}, {
					'name': 'collections',
					'icon': 'icon-icon-collections'
				}, {
					'name': 'columns',
					'icon': 'icon-icon-columns'
				}, {
					'name': 'cloud4',
					'icon': 'icon-icon-cloud4'
				}, {
					'name': 'dashboard',
					'icon': 'icon-icon-dashboard'
				}, {
					'name': 'delete2',
					'icon': 'icon-icon-delete2'
				}, {
					'name': 'dnd-on',
					'icon': 'icon-icon-dndon'
				}, {
					'name': 'event-available',
					'icon': 'icon-icon-eventavailable'
				}, {
					'name': 'event-busy',
					'icon': 'icon-icon-eventbusy'
				}, {
					'name': 'explicit',
					'icon': 'icon-icon-explicit'
				}, {
					'name': 'esc',
					'icon': 'icon-esc'
				}, {
					'name': 'face-unlock',
					'icon': 'icon-icon-faceunlock'
				}, {
					'name': 'folder2',
					'icon': 'icon-icon-folder2'
				}, {
					'name': 'folder-special',
					'icon': 'icon-icon-folderspecial'
				}, {
					'name': 'flare',
					'icon': 'icon-icon-flare'
				}, {
					'name': 'grade',
					'icon': 'icon-icon-grade'
				}, {
					'name': 'hearing',
					'icon': 'icon-icon-hearing'
				}, {
					'name': 'invert-colors-on',
					'icon': 'icon-icon-invertcolorson'
				}, {
					'name': 'key2',
					'icon': 'icon-icon-key2'
				}, {
					'name': 'keyboard-alt',
					'icon': 'icon-icon-keyboardalt'
				}, {
					'name': 'local-attraction',
					'icon': 'icon-icon-localattraction'
				}, {
					'name': 'link',
					'icon': 'icon-icon-link'
				}, {
					'name': 'lock4',
					'icon': 'icon-icon-lock4'
				}, {
					'name': 'marquee',
					'icon': 'icon-icon-marquee'
				}, {
					'name': 'marquee-minus',
					'icon': 'icon-icon-marqueeminus'
				}, {
					'name': 'minimize',
					'icon': 'icon-icon-minimize'
				}, {
					'name': 'mnone',
					'icon': 'icon-icon-mnone'
				}, {
					'name': 'moff',
					'icon': 'icon-icon-moff'
				}, {
					'name': 'note',
					'icon': 'icon-icon-note'
				}, {
					'name': 'now-wallpaper',
					'icon': 'icon-icon-nowwallpaper'
				}, {
					'name': 'navigation',
					'icon': 'icon-icon-navigation'
				}, {
					'name': 'payment',
					'icon': 'icon-icon-payment'
				}, {
					'name': 'photo',
					'icon': 'icon-icon-panorama'
				}, {
					'name': 'perm-identity',
					'icon': 'icon-icon-permidentity'
				}, {
					'name': 'perm-contact-cal',
					'icon': 'icon-icon-permcontactcal'
				}, {
					'name': 'perm-device-info',
					'icon': 'icon-icon-permdeviceinfo'
				}, {
					'name': 'perm-media',
					'icon': 'icon-icon-permmedia'
				}, {
					'name': 'photo2',
					'icon': 'icon-icon-photo2'
				}, {
					'name': 'pie-graph',
					'icon': 'icon-icon-piegraph'
				}, {
					'name': 'receipt',
					'icon': 'icon-icon-receipt'
				}, {
					'name': 'record',
					'icon': 'icon-icon-record'
				}, {
					'name': 'repeat2',
					'icon': 'icon-icon-repeat2'
				}, {
					'name': 'server',
					'icon': 'icon-icon-server'
				}, {
					'name': 'search4',
					'icon': 'icon-icon-search4'
				}, {
					'name': 'sound',
					'icon': 'icon-icon-sound'
				}, {
					'name': 'speech-bubble',
					'icon': 'icon-icon-speechbubble'
				}, {
					'name': 'shuffle2',
					'icon': 'icon-icon-shuffle2'
				}, {
					'name': 'swap-vert-circle',
					'icon': 'icon-icon-swapvertcircle'
				}, {
					'name': 'supervisor-account',
					'icon': 'icon-icon-supervisoraccount'
				}, {
					'name': 'trash',
					'icon': 'icon-icon-trash'
				}, {
					'name': 'video3',
					'icon': 'icon-icon-video'
				}, {
					'name': 'volume',
					'icon': 'icon-icon-volume'
				}, {
					'name': 'arrow-right',
					'icon': 'icon-icon-arrowright1'
				}, {
					'name': 'arrow-circle-right',
					'icon': 'icon-icon-arrowcircleright'
				}, {
					'name': 'caret-right',
					'icon': 'icon-icon-caretright'
				}, {
					'name': 'chat',
					'icon': 'icon-icon-chat1'
				}, {
					'name': 'data-transfer-download',
					'icon': 'icon-icon-datatransferdownload'
				}, {
					'name': 'data-transfer-upload',
					'icon': 'icon-icon-datatransferupload'
				}, {
					'name': 'collapse-down',
					'icon': 'icon-icon-collapsedown'
				}, {
					'name': 'collapse-left',
					'icon': 'icon-icon-collapseleft'
				}, {
					'name': 'collapse-right',
					'icon': 'icon-icon-collapseright'
				}, {
					'name': 'collapse-up',
					'icon': 'icon-icon-collapseup'
				}, {
					'name': 'envelope-open',
					'icon': 'icon-icon-envelopeopen'
				}, {
					'name': 'excerpt',
					'icon': 'icon-icon-excerpt'
				}, {
					'name': 'expand-down',
					'icon': 'icon-icon-expanddown'
				}, {
					'name': 'expand-left',
					'icon': 'icon-icon-expandleft'
				}, {
					'name': 'expand-right',
					'icon': 'icon-icon-expandright'
				}, {
					'name': 'expand-up',
					'icon': 'icon-icon-expandup'
				}, {
					'name': 'document',
					'icon': 'icon-icon-document'
				}, {
					'name': 'double-quote-sans-left',
					'icon': 'icon-icon-doublequotesansleft'
				}, {
					'name': 'double-quote-sans-right',
					'icon': 'icon-icon-doublequotesansright'
				}, {
					'name': 'elevator',
					'icon': 'icon-icon-elevator'
				}, {
					'name': 'ellipses',
					'icon': 'icon-icon-ellipses'
				}, {
					'name': 'grid-four-up',
					'icon': 'icon-icon-gridfourup'
				}, {
					'name': 'list-rich',
					'icon': 'icon-icon-listrich'
				}, {
					'name': 'image',
					'icon': 'icon-icon-image1'
				}, {
					'name': 'justify-center',
					'icon': 'icon-icon-justifycenter'
				}, {
					'name': 'justify-right',
					'icon': 'icon-icon-justifyright'
				}, {
					'name': 'layers',
					'icon': 'icon-icon-layers1'
				}, {
					'name': 'media-step-forward',
					'icon': 'icon-icon-mediastepforward'
				}, {
					'name': 'medical-cross',
					'icon': 'icon-icon-medicalcross'
				}, {
					'name': 'media-skip-backward',
					'icon': 'icon-icon-mediaskipbackward'
				}, {
					'name': 'media-skip-forward',
					'icon': 'icon-icon-mediaskipforward'
				}, {
					'name': 'media-step-backward',
					'icon': 'icon-icon-mediastepbackward'
				}, {
					'name': 'project',
					'icon': 'icon-icon-project'
				}, {
					'name': 'resize-both',
					'icon': 'icon-icon-resizeboth'
				}, {
					'name': 'resize-height',
					'icon': 'icon-icon-resizeheight'
				}, {
					'name': 'resize-width',
					'icon': 'icon-icon-resizewidth'
				}, {
					'name': 'signpost',
					'icon': 'icon-icon-signpost'
				}, {
					'name': 'sort-ascending',
					'icon': 'icon-sortascending'
				}, {
					'name': '外出申请',
					'icon': 'icon-waichushenqing'
				}, {
					'name': '角色管理',
					'icon': 'icon-msnui-role-manage'
				}, {
					'name': '账单查询',
					'icon': 'icon-zhangdanchaxun'
				}, {
					'name': '维护',
					'icon': 'icon-msnui-maintain'
				}, {
					'name': 'remove',
					'icon': 'icon-icon-remove'
				}, {
					'name': '移动',
					'icon': 'icon-yidong'
				}, {
					'name': '申请',
					'icon': 'icon-shenqing'
				}, {
					'name': '用户_导入',
					'icon': 'icon-user_import'
				}, {
					'name': '布局',
					'icon': 'icon-buju'
				}, {
					'name': 'assignment',
					'icon': 'icon-icon-assignment'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu7'
				}, {
					'name': 'file-download',
					'icon': 'icon-icon-filedownload'
				}, {
					'name': 'visibility',
					'icon': 'icon-icon-visibility'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu8'
				}, {
					'name': 'icon-error',
					'icon': 'icon-icon-error'
				}, {
					'name': 'settings',
					'icon': 'icon-icon-settings'
				}, {
					'name': 'addcircle-outline',
					'icon': 'icon-icon-addcircleoutline'
				}, {
					'name': 'announcement',
					'icon': 'icon-announcement'
				}, {
					'name': 'screenrotation-locked',
					'icon': 'icon-icon-screenlockrotation'
				}, {
					'name': '修改',
					'icon': 'icon-xiugai3'
				}, {
					'name': '系统信息',
					'icon': 'icon-xitongxinxi'
				}, {
					'name': '删除',
					'icon': 'icon-icon'
				}, {
					'name': 'icon-home',
					'icon': 'icon-home'
				}, {
					'name': '密码修改',
					'icon': 'icon-mimaxiugai'
				}, {
					'name': '分类',
					'icon': 'icon-fenlei'
				}, {
					'name': 'web',
					'icon': 'icon-icon-web'
				}, {
					'name': 'folder2',
					'icon': 'icon-icon-folder'
				}, {
					'name': 'code',
					'icon': 'icon-icon-code'
				}, {
					'name': 'loyalty',
					'icon': 'icon-icon-loyalty'
				}, {
					'name': 'chevron20',
					'icon': 'icon-icon-chevronleft'
				}, {
					'name': '保存',
					'icon': 'icon-baocun1'
				}, {
					'name': 'arrow-circle-bottom',
					'icon': 'icon-icon-arrowcirclebottom'
				}, {
					'name': 'arrow-circle-left',
					'icon': 'icon-icon-arrowcircleleft'
				}, {
					'name': 'arrow-circle-top',
					'icon': 'icon-icon-arrowcircletop'
				}, {
					'name': '流程配置',
					'icon': 'icon-liuchengpeizhiicon01'
				}, {
					'name': 'settings',
					'icon': 'icon-icon-settings2'
				}, {
					'name': 'circleminus',
					'icon': 'icon-icon-circleminus'
				}, {
					'name': 'circleplus',
					'icon': 'icon-icon-circleplus'
				}, {
					'name': 'ribbon',
					'icon': 'icon-icon-ribbon'
				}, {
					'name': 'circlecross',
					'icon': 'icon-icon-circlecross'
				}, {
					'name': 'circlecheck',
					'icon': 'icon-icon-circlecheck'
				}, {
					'name': 'wallet33',
					'icon': 'icon-icon-wallet2'
				}, {
					'name': 'squarecheck',
					'icon': 'icon-icon-squarecheck'
				}, {
					'name': 'icon_archive',
					'icon': 'icon-icon-archive'
				}, {
					'name': 'icon_attachment',
					'icon': 'icon-icon-attachment'
				}, {
					'name': 'icon_beenhere',
					'icon': 'icon-icon-beenhere'
				}, {
					'name': 'icon_block',
					'icon': 'icon-icon-block'
				}, {
					'name': 'icon_camera',
					'icon': 'icon-icon-camera'
				}, {
					'name': 'icon_chat',
					'icon': 'icon-icon-chat'
				}, {
					'name': 'icon_create',
					'icon': 'icon-icon-create'
				}, {
					'name': 'icon_dialpad',
					'icon': 'icon-icon-dialpad'
				}, {
					'name': 'icon_done',
					'icon': 'icon-icon-done'
				}, {
					'name': 'icon_drafts',
					'icon': 'icon-icon-drafts'
				}, {
					'name': 'icon_favorite-outline',
					'icon': 'icon-icon-favoriteoutline'
				}, {
					'name': 'icon_event',
					'icon': 'icon-icon-event'
				}, {
					'name': 'icon_forum',
					'icon': 'icon-icon-forum'
				}, {
					'name': 'icon_forward',
					'icon': 'icon-icon-forward'
				}, {
					'name': 'icon_headset',
					'icon': 'icon-icon-headset'
				}, {
					'name': 'icon_inbox',
					'icon': 'icon-icon-inbox'
				}, {
					'name': 'icon_info',
					'icon': 'icon-icon-info'
				}, {
					'name': 'icon_keyboard',
					'icon': 'icon-icon-keyboard'
				}, {
					'name': 'icon_language',
					'icon': 'icon-icon-language'
				}, {
					'name': 'icon_loop',
					'icon': 'icon-icon-loop'
				}, {
					'name': 'icon_palette',
					'icon': 'icon-icon-palette'
				}, {
					'name': 'icon_panorama',
					'icon': 'icon-icon-photo'
				}, {
					'name': 'icon_place',
					'icon': 'icon-icon-place'
				}, {
					'name': '进入',
					'icon': 'icon-jinru'
				}, {
					'name': 'toggle',
					'icon': 'icon-icon-toggle'
				}, {
					'name': 'icon-edit',
					'icon': 'icon-iconedit'
				}, {
					'name': 'printer',
					'icon': 'icon-icon-printer'
				}, {
					'name': '团队组',
					'icon': 'icon-222psd'
				}, {
					'name': 'Creditcard',
					'icon': 'icon-icon-creditcard'
				}, {
					'name': 'location',
					'icon': 'icon-icon-location'
				}, {
					'name': 'User',
					'icon': 'icon-icon-timerauto'
				}, {
					'name': 'icon-menu',
					'icon': 'icon-icon-menu'
				}, {
					'name': 'icon_mic',
					'icon': 'icon-icon-mic'
				}, {
					'name': 'User portrait',
					'icon': 'icon-icon-portrait'
				}, {
					'name': 'trash',
					'icon': 'icon-icon-trash2'
				}, {
					'name': 'reply',
					'icon': 'icon-icon-reply'
				}, {
					'name': 'align-left',
					'icon': 'icon-icon-alignleft1'
				}, {
					'name': 'paperplane',
					'icon': 'icon-icon-paperplane'
				}, {
					'name': '资料管理',
					'icon': 'icon-document'
				}, {
					'name': '办公系统-绩效管理',
					'icon': 'icon-perfoemance-old'
				}, {
					'name': '办公系统-绩效管理',
					'icon': 'icon-perfoemance-manage'
				}, {
					'name': '公告通知管理',
					'icon': 'icon-iconfontgongsitonggao'
				}, {
					'name': '菜单',
					'icon': 'icon-caidan'
				}, {
					'name': '修改',
					'icon': 'icon-xiugai4'
				}, {
					'name': 'icon_book_alt',
					'icon': 'icon-icon-book2'
				}, {
					'name': 'icon_moon',
					'icon': 'icon-icon-moon'
				}, {
					'name': '数据分析',
					'icon': 'icon-shujufenxi'
				}, {
					'name': '监控',
					'icon': 'icon-monitor'
				}, {
					'name': '导入',
					'icon': 'icon-daoru'
				}, {
					'name': 'zoomOut',
					'icon': 'icon-icon-zoomout'
				}, {
					'name': 'icon-diamond',
					'icon': 'icon-icon-diamond'
				}, {
					'name': 'icon_org',
					'icon': 'icon-icon-org'
				}, {
					'name': 'icon_favorite',
					'icon': 'icon-icon-favorite'
				}, {
					'name': 'file-add',
					'icon': 'icon-icon-fileadd'
				}, {
					'name': '导出',
					'icon': 'icon-daochu'
				}, {
					'name': '导入',
					'icon': 'icon-daoru1'
				}, {
					'name': '用户',
					'icon': 'icon-yonghu1'
				}, {
					'name': 'location',
					'icon': 'icon-icon-location2'
				}, {
					'name': 'signal',
					'icon': 'icon-icon-signal1'
				}, {
					'name': '刷新',
					'icon': 'icon-refresh'
				}, {
					'name': '业绩统计',
					'icon': 'icon-yejitongji'
				}, {
					'name': 'chevron-right',
					'icon': 'icon-icon-chevronright'
				}, {
					'name': '权限',
					'icon': 'icon-quanxian1'
				}, {
					'name': '查询',
					'icon': 'icon-weibiaoti1'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu9'
				}, {
					'name': '导出Excel',
					'icon': 'icon-daochuexcel'
				}, {
					'name': 'icon_cross',
					'icon': 'icon-icon-cross'
				}, {
					'name': 'keyboard_control',
					'icon': 'icon-icon-keyboardcontrol'
				}, {
					'name': 'printer',
					'icon': 'icon-icon-print'
				}, {
					'name': 'mouse',
					'icon': 'icon-icon-mouse'
				}, {
					'name': '基本岗位',
					'icon': 'icon-jibengangwei'
				}, {
					'name': '操作流程',
					'icon': 'icon-caozuoliucheng'
				}, {
					'name': 'essential-light-74-control-fastforward',
					'icon': 'icon-icon-fastforward2'
				}, {
					'name': '干预',
					'icon': 'icon-ganyu'
				}, {
					'name': 'comment_icon',
					'icon': 'icon-icon-comment'
				}, {
					'name': 'bubble',
					'icon': 'icon-icon-bubble'
				}, {
					'name': 'fire',
					'icon': 'icon-icon-fire'
				}, {
					'name': 'star',
					'icon': 'icon-icon-star3'
				}, {
					'name': 'data',
					'icon': 'icon-icon-data'
				}, {
					'name': 'megaphone',
					'icon': 'icon-icon-megaphone2'
				}, {
					'name': 'stack',
					'icon': 'icon-icon-stack2'
				}, {
					'name': 'vynil',
					'icon': 'icon-icon-vynil'
				}, {
					'name': 'align-right',
					'icon': 'icon-icon-alignright1'
				}, {
					'name': 'icon_切换',
					'icon': 'icon-iconqiehuan'
				}, {
					'name': 'icon-lock',
					'icon': 'icon-icon-lock'
				}, {
					'name': '部门',
					'icon': 'icon-bumen1'
				}, {
					'name': '移动',
					'icon': 'icon-yidong1'
				}, {
					'name': 'mail2',
					'icon': 'icon-icon-mail3'
				}, {
					'name': '新增',
					'icon': 'icon-add'
				}, {
					'name': 'layout',
					'icon': 'icon-icon-layout'
				}, {
					'name': '切换',
					'icon': 'icon-qiehuan'
				}, {
					'name': 'caret-left',
					'icon': 'icon-icon-caretleft'
				}, {
					'name': '我的账号',
					'icon': 'icon-wodezhanghao'
				}, {
					'name': '未读',
					'icon': 'icon-noread'
				}, {
					'name': '已读',
					'icon': 'icon-read'
				}, {
					'name': 'app应用',
					'icon': 'icon-appyingyong'
				}, {
					'name': 'caret-up',
					'icon': 'icon-icon-carettop'
				}, {
					'name': 'caret-down',
					'icon': 'icon-icon-caretbottom'
				}, {
					'name': '我的绩效',
					'icon': 'icon-wodejixiao'
				}, {
					'name': 'icon_camera',
					'icon': 'icon-icon-camera2'
				}, {
					'name': 'basic_target',
					'icon': 'icon-icon-target'
				}, {
					'name': '导出Excel',
					'icon': 'icon-daochuexcel1'
				}, {
					'name': 'PAUSE',
					'icon': 'icon-icon-pause2'
				}, {
					'name': '系统参数',
					'icon': 'icon-xitongcanshu'
				}, {
					'name': '通知公告',
					'icon': 'icon-tongzhigonggao'
				}, {
					'name': '移动',
					'icon': 'icon-yidong2'
				}, {
					'name': '审批',
					'icon': 'icon-shenpi'
				}, {
					'name': '锁定',
					'icon': 'icon-suoding'
				}, {
					'name': 'sort',
					'icon': 'icon-icon-sort'
				}, {
					'name': 'shoppingcart',
					'icon': 'icon-icon-shoppingcart'
				}, {
					'name': '柱形图',
					'icon': 'icon-zhuxingtu'
				}, {
					'name': '配置',
					'icon': 'icon-peizhi'
				}, {
					'name': 'bolt',
					'icon': 'icon-icon-bolt'
				}, {
					'name': '确定',
					'icon': 'icon-queding'
				}, {
					'name': '文件',
					'icon': 'icon-wenjian'
				}, {
					'name': '启用',
					'icon': 'icon-qiyong'
				}, {
					'name': '重置密码',
					'icon': 'icon-zhongzhimima'
				}, {
					'name': '办公用品管理',
					'icon': 'icon-bangongyongpinguanli'
				}, {
					'name': '新增',
					'icon': 'icon-xinzeng1'
				}, {
					'name': '启用',
					'icon': 'icon-qiyong1'
				}, {
					'name': 'phone3',
					'icon': 'icon-icon-phone3'
				}, {
					'name': '员工导入',
					'icon': 'icon-yuangongdaoru'
				}, {
					'name': 'eye2',
					'icon': 'icon-icon-eye2'
				}, {
					'name': '数据字典',
					'icon': 'icon-shujuzidian'
				}, {
					'name': '督办案件',
					'icon': 'icon-weibiaoti2'
				}, {
					'name': '导出',
					'icon': 'icon-1'
				}, {
					'name': 'redeem',
					'icon': 'icon-icon-redeem'
				}, {
					'name': 'ban',
					'icon': 'icon-icon-ban'
				}, {
					'name': 'icon_Group',
					'icon': 'icon-icon-group'
				}, {
					'name': '修改密码',
					'icon': 'icon-xiugaimima'
				}, {
					'name': 'icon_Person',
					'icon': 'icon-icon-person'
				}, {
					'name': 'icon_Save',
					'icon': 'icon-iconsave'
				}, {
					'name': '机构管理',
					'icon': 'icon-jigouguanli'
				}, {
					'name': '督办',
					'icon': 'icon-weibiaoti11'
				}, {
					'name': 'icon_clock',
					'icon': 'icon-icon-clock'
				}, {
					'name': '浏览器注册',
					'icon': 'icon-liulanqizhuce'
				}, {
					'name': 'mail2',
					'icon': 'icon-icon-mail2'
				}, {
					'name': 'icon_调整-01',
					'icon': 'icon-icondiaozheng01'
				}, {
					'name': '角色管理',
					'icon': 'icon-jiaoseguanli'
				}, {
					'name': 'm_ic_article_video_fullscreen',
					'icon': 'icon-icon-fullscreenenter'
				}, {
					'name': '查询统计',
					'icon': 'icon-chaxuntongji'
				}, {
					'name': 'iconfont-contentleft',
					'icon': 'icon-icon-contentleft'
				}, {
					'name': 'iconfont-paperstack',
					'icon': 'icon-icon-paperstack'
				}, {
					'name': 'iconfont-squarecross',
					'icon': 'icon-icon-squarecross'
				}, {
					'name': '系统公告管理',
					'icon': 'icon-xitonggonggaoguanli'
				}, {
					'name': 'bulb',
					'icon': 'icon-icon-bulb'
				}, {
					'name': 'video',
					'icon': 'icon-icon-video3'
				}, {
					'name': 'folderopen',
					'icon': 'icon-icon-folderopen'
				}, {
					'name': 'download',
					'icon': 'icon-icon-download'
				}, {
					'name': '权限',
					'icon': 'icon-permission'
				}, {
					'name': 'icon-cog',
					'icon': 'icon-icon-cog'
				}, {
					'name': '停用',
					'icon': 'icon-tingyongzhiyuan'
				}, {
					'name': '操作员权限',
					'icon': 'icon-caozuoyuanquanxian'
				}, {
					'name': 'fullscreen.jw-off',
					'icon': 'icon-icon-fullscreenexit'
				}, {
					'name': 'pause',
					'icon': 'icon-icon-mediapause'
				}, {
					'name': '启用操作员',
					'icon': 'icon-qiyongcaozuoyuan'
				}, {
					'name': '修改',
					'icon': 'icon-xiugai5'
				}, {
					'name': 'audiotrack',
					'icon': 'icon-icon-audiotrack'
				}, {
					'name': 'brightness_5',
					'icon': 'icon-icon-brightness5'
				}, {
					'name': 'business',
					'icon': 'icon-icon-business'
				}, {
					'name': 'colorize',
					'icon': 'icon-icon-colorize'
				}, {
					'name': 'devices',
					'icon': 'icon-icon-devices'
				}, {
					'name': 'dns',
					'icon': 'icon-icon-dns'
				}, {
					'name': 'event_note',
					'icon': 'icon-icon-eventnote'
				}, {
					'name': 'dvr',
					'icon': 'icon-icon-dvr'
				}, {
					'name': 'extension',
					'icon': 'icon-icon-extension'
				}, {
					'name': '修改授权',
					'icon': 'icon-xiugaishouquan'
				}, {
					'name': 'highlight_remove',
					'icon': 'icon-icon-highlightremove'
				}, {
					'name': 'lens',
					'icon': 'icon-icon-lens'
				}, {
					'name': 'pause',
					'icon': 'icon-icon-pause'
				}, {
					'name': 'publish',
					'icon': 'icon-icon-publish'
				}, {
					'name': 'radio',
					'icon': 'icon-icon-radio'
				}, {
					'name': 'room',
					'icon': 'icon-icon-room'
				}, {
					'name': 'repeat',
					'icon': 'icon-icon-repeat'
				}, {
					'name': 'slideshow',
					'icon': 'icon-icon-slideshow'
				}, {
					'name': 'subtitles',
					'icon': 'icon-icon-subtitles'
				}, {
					'name': 'stay_current_landscape',
					'icon': 'icon-icon-staycurrentlandscape'
				}, {
					'name': 'video_collection',
					'icon': 'icon-icon-videocollection'
				}, {
					'name': 'watch',
					'icon': 'icon-icon-watch'
				}, {
					'name': 'work',
					'icon': 'icon-icon-work'
				}, {
					'name': '资料',
					'icon': 'icon-iconfontbook'
				}, {
					'name': '启用',
					'icon': 'icon-qiyong2'
				}, {
					'name': 'study',
					'icon': 'icon-icon-study'
				}, {
					'name': '导出数据',
					'icon': 'icon-weibiaoti3'
				}, {
					'name': '新增',
					'icon': 'icon-xinzeng2'
				}, {
					'name': '清单',
					'icon': 'icon-list1'
				}, {
					'name': 'icon-like',
					'icon': 'icon-icon-like'
				}, {
					'name': 'message',
					'icon': 'icon-icon-message'
				}, {
					'name': '绩效',
					'icon': 'icon-jixiao'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu'
				}, {
					'name': '用户',
					'icon': 'icon-yonghu2'
				}, {
					'name': '附件_attachment14',
					'icon': 'icon-fujianattachment14'
				}, {
					'name': '账号',
					'icon': 'icon-zhanghao'
				}, {
					'name': 'ICON_网页设计',
					'icon': 'icon-iconwangyesheji'
				}, {
					'name': '消息中心',
					'icon': 'icon-xiaoxizhongxin'
				}, {
					'name': 'menu-1',
					'icon': 'icon-icon-menu1'
				}, {
					'name': '重置认证口令',
					'icon': 'icon-zhongzhirenzhengkouling01'
				}, {
					'name': '报告查询',
					'icon': 'icon-baogaochaxun'
				}, {
					'name': '文件',
					'icon': 'icon-wenjian1'
				}, {
					'name': '文件',
					'icon': 'icon-wenjian2'
				}, {
					'name': 'iconfont-questionanswer',
					'icon': 'icon-icon-questionanswer'
				}, {
					'name': 'iconfont-verifieduser',
					'icon': 'icon-icon-verifieduser'
				}, {
					'name': '分析',
					'icon': 'icon-fenxi'
				}, {
					'name': 'backspace',
					'icon': 'icon-backspace'
				}, {
					'name': '在线客服',
					'icon': 'icon-zaixiankefu2'
				}, {
					'name': 'unlock',
					'icon': 'icon-icon-unlock'
				}, {
					'name': '消息中心',
					'icon': 'icon-xiaoxizhongxin1'
				}, {
					'name': '模板',
					'icon': 'icon-template'
				}, {
					'name': '柱图',
					'icon': 'icon-iconset0132'
				}, {
					'name': '页面',
					'icon': 'icon-yemian2'
				}, {
					'name': '审批',
					'icon': 'icon-shengpi'
				}, {
					'name': '授权',
					'icon': 'icon-shouquan'
				}, {
					'name': '注销_logout8',
					'icon': 'icon-zhuxiaologout8'
				}, {
					'name': 'equalizer',
					'icon': 'icon-icon-equalizer'
				}, {
					'name': '单位信息',
					'icon': 'icon-danweixinxi'
				}, {
					'name': 'merge-cell',
					'icon': 'icon-mergecell'
				}, {
					'name': '重置密码',
					'icon': 'icon-zhongzhimima1'
				}, {
					'name': '快捷入口',
					'icon': 'icon-kuaijierukou'
				}, {
					'name': '个人信息',
					'icon': 'icon-gerenxinxi'
				}, {
					'name': '确定',
					'icon': 'icon-queding1'
				}, {
					'name': '流程',
					'icon': 'icon-liucheng'
				}, {
					'name': '用户',
					'icon': 'icon-user'
				}, {
					'name': 'right-arrow',
					'icon': 'icon-icon-arrowthickright'
				}, {
					'name': '资料库',
					'icon': 'icon-ziliaoku1'
				}, {
					'name': 'icon-会员管理',
					'icon': 'icon-iconhuiyuanguanli'
				}, {
					'name': '绩效',
					'icon': 'icon-jixiao1'
				}, {
					'name': '设置',
					'icon': 'icon-shezhi'
				}, {
					'name': '折线图',
					'icon': 'icon-zhexiantu1'
				}, {
					'name': '账号管理-停用',
					'icon': 'icon-stop'
				}, {
					'name': '文件_打开',
					'icon': 'icon-wenjiandakai'
				}, {
					'name': 'Role',
					'icon': 'icon-role'
				}, {
					'name': 'controls-volumeoff',
					'icon': 'icon-icon-volumemute'
				}, {
					'name': 'input',
					'icon': 'icon-icon-input'
				}, {
					'name': '文件',
					'icon': 'icon-wenjian3'
				}, {
					'name': 'icon-minus',
					'icon': 'icon-icon-minus'
				}, {
					'name': 'icon_history',
					'icon': 'icon-icon-history'
				}, {
					'name': '待办事项',
					'icon': 'icon-daibanshixiang'
				}, {
					'name': '数据库表',
					'icon': 'icon-shujukubiao'
				}, {
					'name': '公共资料',
					'icon': 'icon-filebox'
				}, {
					'name': 'play',
					'icon': 'icon-icon-playcircleoutline'
				}, {
					'name': 'STOP',
					'icon': 'icon-icon-stop2'
				}, {
					'name': 'icon-heart',
					'icon': 'icon-icon-heart'
				}, {
					'name': 'autorenew',
					'icon': 'icon-icon-autorenew'
				}, {
					'name': 'message',
					'icon': 'icon-icon-messenger'
				}, {
					'name': 'record',
					'icon': 'icon-icon-mediarecord'
				}, {
					'name': 'security',
					'icon': 'icon-icon-security'
				}, {
					'name': ' icon-file',
					'icon': 'icon-icon-file'
				}, {
					'name': 'icon-flag',
					'icon': 'icon-icon-flag2'
				}, {
					'name': 'sort-descending',
					'icon': 'icon-icon-sortascending'
				}, {
					'name': 'thumb-down',
					'icon': 'icon-icon-thumbdown'
				}, {
					'name': 'trending-down',
					'icon': 'icon-icon-trendingdown'
				}, {
					'name': 'video-off',
					'icon': 'icon-icon-videocamoff'
				}, {
					'name': 'view-day',
					'icon': 'icon-icon-viewday'
				}, {
					'name': 'view-quilt',
					'icon': 'icon-icon-viewquilt'
				}, {
					'name': 'view-week',
					'icon': 'icon-icon-viewweek'
				}, {
					'name': 'voicemail',
					'icon': 'icon-icon-voicemail'
				}, {
					'name': 'wallet-membership',
					'icon': 'icon-icon-walletmembership'
				}, {
					'name': '公文处理',
					'icon': 'icon-gongwenchuli'
				}, {
					'name': '通知公告',
					'icon': 'icon-tongzhigonggao1'
				}, {
					'name': '公文处理',
					'icon': 'icon-gongwenchuli1'
				}, {
					'name': 'icon-move',
					'icon': 'icon-icon-move'
				}, {
					'name': 'arrowdown',
					'icon': 'icon-icon-arrowdown'
				}, {
					'name': 'arrowleft',
					'icon': 'icon-icon-arrowleft'
				}, {
					'name': 'arrowup',
					'icon': 'icon-icon-arrowup'
				}, {
					'name': 'Mute',
					'icon': 'icon-icon-mute'
				}, {
					'name': '删除 (4)',
					'icon': 'icon-shanchu4'
				}, {
					'name': 'play',
					'icon': 'icon-icon-playcirclefill'
				}, {
					'name': '转公文交换',
					'icon': 'icon-11zhuangongwenjiaohuan'
				}, {
					'name': 'backup',
					'icon': 'icon-icon-backup'
				}, {
					'name': 'clear',
					'icon': 'icon-icon-clear'
				}, {
					'name': 'memory',
					'icon': 'icon-icon-memory'
				}, {
					'name': 'replay',
					'icon': 'icon-icon-replay'
				}, {
					'name': 'report',
					'icon': 'icon-icon-report'
				}, {
					'name': 'store',
					'icon': 'icon-icon-store'
				}, {
					'name': 'visibility-off',
					'icon': 'icon-icon-visibilityoff'
				}, {
					'name': '06网上资料管理',
					'icon': 'icon-06wangshangziliaoguanli'
				}, {
					'name': '会员管理－标题',
					'icon': 'icon-zhuiyuanguanli'
				}, {
					'name': '日志管理',
					'icon': 'icon-rizhiguanli'
				}, {
					'name': 'icon_People',
					'icon': 'icon-icon-people'
				}, {
					'name': 'icon-flag',
					'icon': 'icon-icon-flag'
				}, {
					'name': 'stop',
					'icon': 'icon-icon-stop'
				}, {
					'name': '用户与机构库设置20',
					'icon': 'icon-yonghuyujigoukushezhi20'
				}, {
					'name': '列表',
					'icon': 'icon-cf-c57'
				}, {
					'name': 'icon-add',
					'icon': 'icon-icon-add'
				}, {
					'name': 'tv',
					'icon': 'icon-icon-tv'
				}, {
					'name': 'icon-edit',
					'icon': 'icon-icon-edit'
				}, {
					'name': 'Tshirt',
					'icon': 'icon-icon-tshirt'
				}, {
					'name': '外出',
					'icon': 'icon-waichu'
				}, {
					'name': '审批',
					'icon': 'icon-shenpi1'
				}, {
					'name': 'warning',
					'icon': 'icon-icon-warning'
				}, {
					'name': '修改',
					'icon': 'icon-xiugai'
				}, {
					'name': 'arrow',
					'icon': 'icon-icon-arrowthickbottom'
				}, {
					'name': '信息',
					'icon': 'icon-xinxi'
				}, {
					'name': 'icon-monitor',
					'icon': 'icon-icon-monitor'
				}, {
					'name': '任务管理',
					'icon': 'icon-renwuguanli'
				}, {
					'name': 'pause',
					'icon': 'icon-icon-pausecircleoutline'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu1'
				}, {
					'name': '认证',
					'icon': 'icon-unie60f'
				}, {
					'name': '督查',
					'icon': 'icon-icon22'
				}, {
					'name': '进入',
					'icon': 'icon-enter'
				}, {
					'name': 'eject',
					'icon': 'icon-icon-eject'
				}, {
					'name': 'long-arrow-left',
					'icon': 'icon-icon-arrowleft1'
				}, {
					'name': 'icon-delete',
					'icon': 'icon-icon-delete'
				}, {
					'name': '在线',
					'icon': 'icon-zaixian'
				}, {
					'name': '会议室',
					'icon': 'icon-huiyishi'
				}, {
					'name': '账号',
					'icon': 'icon-zhanghao1'
				}, {
					'name': '分析',
					'icon': 'icon-fenxi1'
				}, {
					'name': '多选矩阵',
					'icon': 'icon-duoxuanjuzhen'
				}, {
					'name': 'icon-grid',
					'icon': 'icon-icon-grid'
				}, {
					'name': '消息中心',
					'icon': 'icon-xiaoxizhongxin2'
				}, {
					'name': 'icon-heart',
					'icon': 'icon-icon-heart3'
				}, {
					'name': '接口配置',
					'icon': 'icon-jiekoupeizhi'
				}, {
					'name': 'icon_alarm',
					'icon': 'icon-icon-alarm'
				}, {
					'name': 'arrow',
					'icon': 'icon-icon-arrowthicktop'
				}, {
					'name': 'minus-square',
					'icon': 'icon-icon-squareminus'
				}, {
					'name': '数字政务－督查督办-01',
					'icon': 'icon-shuzizhengwuduchaduban01'
				}, {
					'name': 'down-arrow',
					'icon': 'icon-icon-arrowbottom'
				}, {
					'name': '收起',
					'icon': 'icon-shouqi'
				}, {
					'name': '展开',
					'icon': 'icon-zhankai'
				}, {
					'name': 'pause',
					'icon': 'icon-icon-pausecirclefill'
				}, {
					'name': 'tyb_barchart',
					'icon': 'icon-icon-barchart'
				}, {
					'name': '档案查询',
					'icon': 'icon-danganchaxun'
				}, {
					'name': '380. Contrast',
					'icon': 'icon-icon-contrast'
				}, {
					'name': 'icon-box',
					'icon': 'icon-icon-box'
				}, {
					'name': 'reply (2)',
					'icon': 'icon-icon-reply2'
				}, {
					'name': 'content-right',
					'icon': 'icon-icon-contentright'
				}, {
					'name': 'maximize',
					'icon': 'icon-icon-maximize'
				}, {
					'name': 'rewind',
					'icon': 'icon-icon-rewind'
				}, {
					'name': 'thermometer',
					'icon': 'icon-icon-thermometer'
				}, {
					'name': 'stack',
					'icon': 'icon-icon-stack'
				}, {
					'name': '流程',
					'icon': 'icon-iconfontliucheng'
				}, {
					'name': 'command',
					'icon': 'icon-icon-command'
				}, {
					'name': 'microphone',
					'icon': 'icon-icon-microphone'
				}, {
					'name': 'icon_play',
					'icon': 'icon-icon-play'
				}, {
					'name': 'move',
					'icon': 'icon-icon-move1'
				}, {
					'name': 'square-plus',
					'icon': 'icon-squareplus'
				}, {
					'name': 'transfer',
					'icon': 'icon-icon-transfer'
				}, {
					'name': '应用',
					'icon': 'icon-yingyong'
				}, {
					'name': '主题',
					'icon': 'icon-theme'
				}, {
					'name': '高级设置',
					'icon': 'icon-gaojishezhi'
				}, {
					'name': '向下三角箭头',
					'icon': 'icon-up-copy'
				}, {
					'name': '规则',
					'icon': 'icon-guize'
				}, {
					'name': 'airplay',
					'icon': 'icon-icon-airplay'
				}, {
					'name': '应用',
					'icon': 'icon-yingyong1'
				}, {
					'name': 'icon-bell',
					'icon': 'icon-icon-bell'
				}, {
					'name': 'icon-android',
					'icon': 'icon-icon-android'
				}, {
					'name': 'icon-call',
					'icon': 'icon-icon-call'
				}, {
					'name': 'icon-mail',
					'icon': 'icon-icon-mail'
				}, {
					'name': '会员管理',
					'icon': 'icon-huiyuanguanli'
				}, {
					'name': 'paperclip',
					'icon': 'icon-icon-paperclip'
				}, {
					'name': '模块',
					'icon': 'icon-mokuai'
				}, {
					'name': '模块',
					'icon': 'icon-xitongpeizhi'
				}, {
					'name': 'plus1',
					'icon': 'icon-icon-plus1'
				}, {
					'name': '会议室',
					'icon': 'icon-huiyishi1'
				}, {
					'name': 'zdy_logo_外出',
					'icon': 'icon-zdylogowaichu'
				}, {
					'name': 'star',
					'icon': 'icon-icon-starrate'
				}, {
					'name': 'icon-close',
					'icon': 'icon-icon-close'
				}, {
					'name': '增加',
					'icon': 'icon-zengjia'
				}, {
					'name': '业绩统计',
					'icon': 'icon-tongji'
				}, {
					'name': '登录',
					'icon': 'icon-denglu'
				}, {
					'name': 'long arrow up',
					'icon': 'icon-icon-arrowtop'
				}, {
					'name': '11.切换账号（其他线型）',
					'icon': 'icon-11qiehuanzhanghaoqitaxianxing'
				}, {
					'name': '还原',
					'icon': 'icon-huanyuan'
				}, {
					'name': '档案',
					'icon': 'icon-dangan'
				}, {
					'name': '档案查询',
					'icon': 'icon-danganchaxun1'
				}, {
					'name': 'play',
					'icon': 'icon-icon-mediaplay'
				}, {
					'name': 'cached',
					'icon': 'icon-icon-cached'
				}, {
					'name': '添加',
					'icon': 'icon-tianjia'
				}, {
					'name': '最大化',
					'icon': 'icon-group12'
				}, {
					'name': 'cloudupload-o',
					'icon': 'icon-icon-cloudupload2'
				}, {
					'name': 'clouddownload-o',
					'icon': 'icon-icon-clouddownload2'
				}, {
					'name': '事项',
					'icon': 'icon-shixiang'
				}, {
					'name': '业务',
					'icon': 'icon-yewu-copy'
				}, {
					'name': '清单',
					'icon': 'icon-qingdan'
				}, {
					'name': '审批',
					'icon': 'icon-shenpi2'
				}, {
					'name': '监控icon_监控logo1',
					'icon': 'icon-iconjiankonglogo1'
				}, {
					'name': '流程配置',
					'icon': 'icon-liuchengpeizhi'
				}, {
					'name': '备份',
					'icon': 'icon-group23copy'
				}, {
					'name': 'icon-List',
					'icon': 'icon-icon-list'
				}, {
					'name': '申请',
					'icon': 'icon-shenqing-copy'
				}, {
					'name': 'task',
					'icon': 'icon-icon-task'
				}, {
					'name': '审批',
					'icon': 'icon-icon5-copy'
				}, {
					'name': '数据',
					'icon': 'icon-shuju'
				}, {
					'name': '审批',
					'icon': 'icon-shenpi3'
				}, {
					'name': 'star1',
					'icon': 'icon-icon-star1'
				}, {
					'name': '我的方案',
					'icon': 'icon-wodefangan'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu2'
				}, {
					'name': 'thumbup',
					'icon': 'icon-icon-thumbup'
				}, {
					'name': '业务',
					'icon': 'icon-yewu'
				}, {
					'name': 'caret-down',
					'icon': 'icon-caret-down'
				}, {
					'name': 'caret-left',
					'icon': 'icon-caret-left'
				}, {
					'name': 'caret-right',
					'icon': 'icon-caret-right'
				}, {
					'name': 'caret-up',
					'icon': 'icon-caret-up'
				}, {
					'name': 'icon-bookmark',
					'icon': 'icon-icon-bookmark'
				}, {
					'name': ' icon-adjust',
					'icon': 'icon-icon-adjust'
				}, {
					'name': ' icon-help',
					'icon': 'icon-icon-help'
				}, {
					'name': ' icon-bookmark-o',
					'icon': 'icon-icon-bookmarkoutline'
				}, {
					'name': '备份',
					'icon': 'icon-icon114'
				}, {
					'name': '档案目录查询',
					'icon': 'icon-danganmuluchaxun'
				}, {
					'name': 'icon-eye',
					'icon': 'icon-icon-eye'
				}, {
					'name': '向下三角箭头',
					'icon': 'icon-triangle_right'
				}, {
					'name': 'icon-check2',
					'icon': 'icon-icon-check2'
				}, {
					'name': '新任务管理',
					'icon': 'icon-xinrenwuguanli'
				}, {
					'name': '缓存',
					'icon': 'icon-huancun'
				}, {
					'name': 'reorder',
					'icon': 'icon-icon-reorder'
				}, {
					'name': '正常视图',
					'icon': 'icon-zhengchangshitu'
				}, {
					'name': '矩阵',
					'icon': 'icon-juzhen'
				}, {
					'name': '装饰装修',
					'icon': 'icon-zhuangshizhuangxiu'
				}, {
					'name': 'nextui-theaters',
					'icon': 'icon-icon-theaters'
				}, {
					'name': '权限',
					'icon': 'icon-quanxian2'
				}, {
					'name': 'grid',
					'icon': 'icon-icon-gridthreeup'
				}, {
					'name': '应用',
					'icon': 'icon-yingyong2'
				}, {
					'name': 'paragraph-justify',
					'icon': 'icon-icon-justifyleft'
				}, {
					'name': 'cup',
					'icon': 'icon-icon-cup'
				}, {
					'name': 'icon_paper_clip',
					'icon': 'icon-icon-clip'
				}, {
					'name': 'pencil',
					'icon': 'icon-icon-pencil'
				}, {
					'name': 'icon_battery',
					'icon': 'icon-icon-battery'
				}, {
					'name': '修改',
					'icon': 'icon-xiugai1'
				}, {
					'name': 'icon_cloud',
					'icon': 'icon-icon-cloud'
				}, {
					'name': 'arrow',
					'icon': 'icon-icon-arrowthickleft'
				}, {
					'name': 'ic_settings_cell_24px',
					'icon': 'icon-icon-settingscell'
				}, {
					'name': 'ic_system_update_alt_24px',
					'icon': 'icon-icon-systemupdatetv'
				}, {
					'name': 'icon_camera',
					'icon': 'icon-icon_camera'
				}, {
					'name': 'Banknote',
					'icon': 'icon-icon-banknote'
				}, {
					'name': 'ic_shop_24px',
					'icon': 'icon-icon-shop'
				}, {
					'name': 'ic_translate_24px',
					'icon': 'icon-icon-translate'
				}, {
					'name': 'ic_queue_24px',
					'icon': 'icon-icon-queue'
				}, {
					'name': 'ic_shuffle_24px',
					'icon': 'icon-icon-shuffle'
				}, {
					'name': 'save',
					'icon': 'icon-icon-save'
				}, {
					'name': 'gear',
					'icon': 'icon-icon-gearblack'
				}, {
					'name': 'bookmark',
					'icon': 'icon-icon-bookmark1'
				}, {
					'name': 'accountBalance',
					'icon': 'icon-icon-accountbalance'
				}, {
					'name': 'accountBalanceWallet',
					'icon': 'icon-icon-accountbalancewallet'
				}, {
					'name': 'accountBox',
					'icon': 'icon-icon-accountbox'
				}, {
					'name': 'accountCircle',
					'icon': 'icon-icon-accountcircle'
				}, {
					'name': 'alarmAdd',
					'icon': 'icon-icon-alarmadd'
				}, {
					'name': 'aspectRatio',
					'icon': 'icon-icon-aspectratio'
				}, {
					'name': 'assessment',
					'icon': 'icon-icon-assessment'
				}, {
					'name': 'assignmentInd',
					'icon': 'icon-icon-assignmentind'
				}, {
					'name': 'assignmentLate',
					'icon': 'icon-icon-assignmentlate'
				}, {
					'name': 'assignmentReturn',
					'icon': 'icon-icon-assignmentreturn'
				}, {
					'name': 'assignmentTurnedIn',
					'icon': 'icon-icon-assignmentturnedin'
				}, {
					'name': 'bugReport',
					'icon': 'icon-icon-bugreport'
				}, {
					'name': 'doneAll',
					'icon': 'icon-icon-doneall'
				}, {
					'name': 'exitToApp',
					'icon': 'icon-icon-exittoapp'
				}, {
					'name': 'explore',
					'icon': 'icon-icon-explore'
				}, {
					'name': 'findInPage',
					'icon': 'icon-icon-findinpage'
				}, {
					'name': 'findReplace',
					'icon': 'icon-icon-findreplace'
				}, {
					'name': 'flipToBack',
					'icon': 'icon-icon-fliptoback'
				}, {
					'name': 'flipToFront',
					'icon': 'icon-icon-fliptofront'
				}, {
					'name': 'groupWork',
					'icon': 'icon-icon-groupwork'
				}, {
					'name': 'infoOutline',
					'icon': 'icon-icon-infooutline'
				}, {
					'name': 'invertColors',
					'icon': 'icon-icon-invertcolors'
				}, {
					'name': 'labelOutline',
					'icon': 'icon-icon-labeloutline'
				}, {
					'name': 'lockOpen',
					'icon': 'icon-icon-lockopen'
				}, {
					'name': 'lockOutline',
					'icon': 'icon-icon-lockoutline'
				}, {
					'name': 'noteAdd',
					'icon': 'icon-icon-noteadd'
				}, {
					'name': 'openInBrowser',
					'icon': 'icon-icon-openinbrowser'
				}, {
					'name': 'openInNew',
					'icon': 'icon-icon-openinnew'
				}, {
					'name': 'openWith',
					'icon': 'icon-icon-openwith'
				}, {
					'name': 'permCameraM',
					'icon': 'icon-icon-permcameram'
				}, {
					'name': 'permDataSetting',
					'icon': 'icon-icon-permdatasetting'
				}, {
					'name': 'permPhoneMsg',
					'icon': 'icon-icon-permphonemsg'
				}, {
					'name': 'permScanWifi',
					'icon': 'icon-icon-permscanwifi'
				}, {
					'name': 'pictureInPicture',
					'icon': 'icon-icon-pictureinpicture'
				}, {
					'name': 'queryBuilder',
					'icon': 'icon-icon-querybuilder'
				}, {
					'name': 'reportProblem',
					'icon': 'icon-icon-reportproblem'
				}, {
					'name': 'schedule',
					'icon': 'icon-icon-schedule'
				}, {
					'name': 'settingsApplications',
					'icon': 'icon-icon-settingsapplications'
				}, {
					'name': 'settingsBackupRestore',
					'icon': 'icon-icon-settingsbackuprestore'
				}, {
					'name': 'settingsBluetooth',
					'icon': 'icon-icon-settingsbluetooth'
				}, {
					'name': 'settingsEthernet',
					'icon': 'icon-icon-settingsethernet'
				}, {
					'name': 'settingsInputAntenna',
					'icon': 'icon-icon-settingsinputantenna'
				}, {
					'name': 'settingsInputComposite',
					'icon': 'icon-icon-settingsinputcomposite'
				}, {
					'name': 'settingsInputHdmi',
					'icon': 'icon-icon-settingsinputhdmi'
				}, {
					'name': 'settingsInputSvideo',
					'icon': 'icon-icon-settingsinputsvideo'
				}, {
					'name': 'settingsOverscan',
					'icon': 'icon-icon-settingsoverscan'
				}, {
					'name': 'settingsPhone',
					'icon': 'icon-icon-settingsphone'
				}, {
					'name': 'settingsPower',
					'icon': 'icon-icon-settingspower'
				}, {
					'name': 'settingsRemote',
					'icon': 'icon-icon-settingsremote'
				}, {
					'name': 'settingsVoice',
					'icon': 'icon-icon-settingsvoice'
				}, {
					'name': 'shoppingBasket',
					'icon': 'icon-icon-shoppingbasket'
				}, {
					'name': 'subject',
					'icon': 'icon-icon-subject'
				}, {
					'name': 'swapHoriz',
					'icon': 'icon-icon-swaphoriz'
				}, {
					'name': 'swapVert',
					'icon': 'icon-icon-swapvert'
				}, {
					'name': 'thumbsUpDown',
					'icon': 'icon-icon-thumbsupdown'
				}, {
					'name': 'toc',
					'icon': 'icon-icon-toc'
				}, {
					'name': 'trackChanges',
					'icon': 'icon-icon-trackchanges'
				}, {
					'name': 'trendingUp',
					'icon': 'icon-icon-trendingup'
				}, {
					'name': 'turnedIn',
					'icon': 'icon-icon-turnedin'
				}, {
					'name': 'turnedInNot',
					'icon': 'icon-icon-turnedinnot'
				}, {
					'name': 'viewAgenda',
					'icon': 'icon-icon-viewstream'
				}, {
					'name': 'viewArray',
					'icon': 'icon-icon-viewarray'
				}, {
					'name': 'viewCarousel',
					'icon': 'icon-icon-viewcarousel'
				}, {
					'name': 'viewColumn',
					'icon': 'icon-icon-viewcolumn'
				}, {
					'name': 'viewList',
					'icon': 'icon-icon-viewlist'
				}, {
					'name': 'zoomIn',
					'icon': 'icon-icon-zoomin'
				}, {
					'name': 'avTimer',
					'icon': 'icon-icon-avtimer'
				}, {
					'name': 'fastRewind',
					'icon': 'icon-icon-fastrewind'
				}, {
					'name': 'highQuality',
					'icon': 'icon-icon-highquality'
				}, {
					'name': 'libraryAdd',
					'icon': 'icon-icon-mylibraryadd'
				}, {
					'name': 'libraryBooks',
					'icon': 'icon-icon-mylibrarybooks'
				}, {
					'name': 'libraryMus',
					'icon': 'icon-icon-mylibrarymus'
				}, {
					'name': 'movie',
					'icon': 'icon-icon-movie'
				}, {
					'name': 'newReleases',
					'icon': 'icon-icon-newreleases'
				}, {
					'name': 'playArrow',
					'icon': 'icon-icon-playarrow'
				}, {
					'name': 'playlistAdd',
					'icon': 'icon-icon-playlistadd'
				}, {
					'name': 'queueMus',
					'icon': 'icon-icon-queuemus'
				}, {
					'name': 'recentActors',
					'icon': 'icon-icon-recentactors'
				}, {
					'name': 'repeatOne',
					'icon': 'icon-icon-repeatone'
				}, {
					'name': 'skipNext',
					'icon': 'icon-icon-skipnext'
				}, {
					'name': 'snooze',
					'icon': 'icon-icon-snooze'
				}, {
					'name': 'surroundSound',
					'icon': 'icon-icon-surroundsound'
				}, {
					'name': 'videocam',
					'icon': 'icon-icon-videocam'
				}, {
					'name': 'volumeDown',
					'icon': 'icon-icon-volumedown'
				}, {
					'name': 'volumeOff',
					'icon': 'icon-icon-volumeoff'
				}, {
					'name': 'volumeUp',
					'icon': 'icon-icon-volumeup'
				}, {
					'name': 'callEnd',
					'icon': 'icon-icon-callend'
				}, {
					'name': 'callSplit',
					'icon': 'icon-icon-callsplit'
				}, {
					'name': 'clearAll',
					'icon': 'icon-icon-clearall'
				}, {
					'name': 'dialerSip',
					'icon': 'icon-icon-dialersip'
				}, {
					'name': 'invertColorsOff',
					'icon': 'icon-icon-invertcolorsoff'
				}, {
					'name': 'locationOff',
					'icon': 'icon-icon-locationoff'
				}, {
					'name': 'locationOn',
					'icon': 'icon-icon-locationon'
				}, {
					'name': 'noSim',
					'icon': 'icon-icon-nosim'
				}, {
					'name': 'liveHelp',
					'icon': 'icon-icon-livehelp'
				}, {
					'name': 'ringVolume',
					'icon': 'icon-icon-ringvolume'
				}, {
					'name': 'portableWifiOff',
					'icon': 'icon-icon-portablewifioff'
				}, {
					'name': 'stayCurrentPortrait',
					'icon': 'icon-icon-staycurrentportrait'
				}, {
					'name': 'swapCalls',
					'icon': 'icon-icon-swapcalls'
				}, {
					'name': 'vpnKey',
					'icon': 'icon-icon-vpnkey'
				}, {
					'name': 'addCircle',
					'icon': 'icon-icon-addcircle'
				}, {
					'name': 'addBox',
					'icon': 'icon-icon-addbox'
				}, {
					'name': 'contentCopy',
					'icon': 'icon-icon-contentcopy'
				}, {
					'name': 'contentPaste',
					'icon': 'icon-icon-contentpaste'
				}, {
					'name': 'filterList',
					'icon': 'icon-icon-filterlist'
				}, {
					'name': 'markunread',
					'icon': 'icon-icon-markunread'
				}, {
					'name': 'redo',
					'icon': 'icon-icon-redo'
				}, {
					'name': 'removeCircle',
					'icon': 'icon-icon-removecircle'
				}, {
					'name': 'removeCircleOutline',
					'icon': 'icon-icon-removecircleoutline'
				}, {
					'name': 'replyAll',
					'icon': 'icon-icon-replyall'
				}, {
					'name': 'brightnessLow',
					'icon': 'icon-icon-brightnesslow'
				}, {
					'name': 'brightnessHigh',
					'icon': 'icon-icon-brightnesshigh'
				}, {
					'name': 'gpsNotFixed',
					'icon': 'icon-icon-gpsnotfixed'
				}, {
					'name': 'locationSearching',
					'icon': 'icon-icon-locationsearching'
				}, {
					'name': 'screenLockLandscape',
					'icon': 'icon-icon-screenlocklandscape'
				}, {
					'name': 'screenLockPortrait',
					'icon': 'icon-icon-screenlockportrait'
				}, {
					'name': 'screenRotation',
					'icon': 'icon-icon-screenrotation'
				}, {
					'name': 'sdStorage',
					'icon': 'icon-icon-sdstorage'
				}, {
					'name': 'settingsSystemDaydream',
					'icon': 'icon-icon-settingssystemdaydream'
				}, {
					'name': 'insertComment',
					'icon': 'icon-icon-insertcomment'
				}, {
					'name': 'insertChart',
					'icon': 'icon-icon-insertchart'
				}, {
					'name': 'insertDriveFile',
					'icon': 'icon-icon-insertdrivefile'
				}, {
					'name': 'insertEmoticon',
					'icon': 'icon-icon-insertemoticon'
				}, {
					'name': 'insertInvitation',
					'icon': 'icon-icon-insertinvitation'
				}, {
					'name': 'insertPhoto',
					'icon': 'icon-icon-insertphoto'
				}, {
					'name': 'modeComment',
					'icon': 'icon-icon-modecomment'
				}, {
					'name': 'modeEdit',
					'icon': 'icon-icon-modeedit'
				}, {
					'name': 'cloudDone',
					'icon': 'icon-icon-clouddone'
				}, {
					'name': 'cloudDownload',
					'icon': 'icon-icon-clouddownload'
				}, {
					'name': 'cloudOff',
					'icon': 'icon-icon-cloudoff'
				}, {
					'name': 'cloudQueue',
					'icon': 'icon-icon-cloudqueue'
				}, {
					'name': 'cloudUpload',
					'icon': 'icon-icon-cloudupload'
				}, {
					'name': 'cloudCircle',
					'icon': 'icon-icon-cloudcircle'
				}, {
					'name': 'folderShared',
					'icon': 'icon-icon-foldershared'
				}, {
					'name': 'desktopWindows',
					'icon': 'icon-icon-desktopwindows'
				}, {
					'name': 'desktopMac',
					'icon': 'icon-icon-desktopmac'
				}, {
					'name': 'headsetM',
					'icon': 'icon-icon-headsetm'
				}, {
					'name': 'keyboardArrowDown',
					'icon': 'icon-icon-keyboardarrowdown'
				}, {
					'name': 'keyboardArrowLeft',
					'icon': 'icon-icon-keyboardarrowleft'
				}, {
					'name': 'keyboardArrowUp',
					'icon': 'icon-icon-keyboardarrowup'
				}, {
					'name': 'keyboardBackspace',
					'icon': 'icon-icon-keyboardbackspace'
				}, {
					'name': 'keyboardArrowRight',
					'icon': 'icon-icon-keyboardarrowright'
				}, {
					'name': 'keyboardHide',
					'icon': 'icon-icon-keyboardhide'
				}, {
					'name': 'keyboardCapslock',
					'icon': 'icon-icon-keyboardcapslock'
				}, {
					'name': 'keyboardReturn',
					'icon': 'icon-icon-keyboardreturn'
				}, {
					'name': 'keyboardVoice',
					'icon': 'icon-icon-keyboardvoice'
				}, {
					'name': 'keyboardTab',
					'icon': 'icon-icon-keyboardtab'
				}, {
					'name': 'laptopMac',
					'icon': 'icon-icon-laptopmac'
				}, {
					'name': 'laptopChromebook',
					'icon': 'icon-icon-laptopchromebook'
				}, {
					'name': 'localGroceryStore',
					'icon': 'icon-icon-localgrocerystore'
				}, {
					'name': 'localLibrary',
					'icon': 'icon-icon-locallibrary'
				}, {
					'name': 'localMall',
					'icon': 'icon-icon-localmall'
				}, {
					'name': 'localOffer',
					'icon': 'icon-icon-localoffer'
				}, {
					'name': 'localMovies',
					'icon': 'icon-icon-localmovies'
				}, {
					'name': 'localPrintshop',
					'icon': 'icon-icon-localprintshop'
				}, {
					'name': 'myLocation',
					'icon': 'icon-icon-mylocation'
				}, {
					'name': 'pinDrop',
					'icon': 'icon-icon-pindrop'
				}, {
					'name': 'arrowBack',
					'icon': 'icon-icon-arrowback'
				}, {
					'name': 'arrowForward',
					'icon': 'icon-icon-arrowright'
				}, {
					'name': 'arrowDropUp',
					'icon': 'icon-icon-arrowdropup'
				}, {
					'name': 'moreVert',
					'icon': 'icon-icon-morevert'
				}, {
					'name': 'moreHoriz',
					'icon': 'icon-icon-morehoriz'
				}, {
					'name': 'unfoldLess',
					'icon': 'icon-icon-unfoldless'
				}, {
					'name': 'unfoldMore',
					'icon': 'icon-icon-unfoldmore'
				}, {
					'name': 'groupAdd',
					'icon': 'icon-icon-groupadd'
				}, {
					'name': 'partyMode',
					'icon': 'icon-icon-partymode'
				}, {
					'name': 'peopleOutline',
					'icon': 'icon-icon-peopleoutline'
				}, {
					'name': 'personOutline',
					'icon': 'icon-icon-personoutline'
				}, {
					'name': 'addToPhotos',
					'icon': 'icon-icon-addToPhotos'
				}, {
					'name': 'assistantPhoto',
					'icon': 'icon-icon-assistantphoto'
				}, {
					'name': 'brightness7',
					'icon': 'icon-icon-brightness7'
				}, {
					'name': 'cameraFront',
					'icon': 'icon-icon-camerafront'
				}, {
					'name': 'cameraRear',
					'icon': 'icon-icon-camerarear'
				}, {
					'name': 'cameraRoll',
					'icon': 'icon-icon-cameraroll'
				}, {
					'name': 'centerFocusStrong',
					'icon': 'icon-icon-centerfocusstrong'
				}, {
					'name': 'centerFocusWeak',
					'icon': 'icon-icon-centerfocusweak'
				}, {
					'name': 'colorLens',
					'icon': 'icon-icon-colorlens'
				}, {
					'name': 'cropFree',
					'icon': 'icon-icon-cropfree'
				}, {
					'name': 'filterCenterFocus',
					'icon': 'icon-icon-filtercenterfocus'
				}, {
					'name': 'filterDrama',
					'icon': 'icon-icon-filterdrama'
				}, {
					'name': 'filterHdr',
					'icon': 'icon-icon-filterhdr'
				}, {
					'name': 'filterTiltShift',
					'icon': 'icon-icon-filtertiltshift'
				}, {
					'name': 'filterVintage',
					'icon': 'icon-icon-filtervintage'
				}, {
					'name': 'movieCreation',
					'icon': 'icon-icon-moviecreation'
				}, {
					'name': 'panoramaFishEye',
					'icon': 'icon-icon-panoramafisheye'
				}, {
					'name': 'photoCamera',
					'icon': 'icon-icon-photocamera'
				}, {
					'name': 'photoLibrary',
					'icon': 'icon-icon-photolibrary'
				}, {
					'name': 'removeRedEye',
					'icon': 'icon-icon-removeredeye'
				}, {
					'name': 'switchVideo',
					'icon': 'icon-icon-switchvideo'
				}, {
					'name': 'tagFaces',
					'icon': 'icon-icon-tagfaces'
				}, {
					'name': '更多',
					'icon': 'icon-gengduo'
				}, {
					'name': 'icon-phone',
					'icon': 'icon-icon-phone'
				}, {
					'name': '用户',
					'icon': 'icon-yonghu'
				}, {
					'name': 'label',
					'icon': 'icon-icon-label'
				}, {
					'name': 'class',
					'icon': 'icon-icon-class'
				}, {
					'name': 'description',
					'icon': 'icon-icon-description'
				}, {
					'name': 'send',
					'icon': 'icon-icon-send'
				}, {
					'name': 'brightness-4',
					'icon': 'icon-icon-brightness4'
				}, {
					'name': 'clipboard-arrow-down',
					'icon': 'icon-icon-playdownload'
				}, {
					'name': 'contacts',
					'icon': 'icon-icon-contacts'
				}, {
					'name': 'reload',
					'icon': 'icon-icon-refresh'
				}, {
					'name': 'restore',
					'icon': 'icon-icon-restore'
				}, {
					'name': 'spellcheck',
					'icon': 'icon-icon-spellcheck'
				}, {
					'name': 'trending-neutral',
					'icon': 'icon-icon-trendingneutral'
				}, {
					'name': 'wallet-giftcard',
					'icon': 'icon-icon-walletgiftcard'
				}, {
					'name': 'wallet-travel',
					'icon': 'icon-icon-wallettravel'
				}, {
					'name': 'ic_pageview_24px',
					'icon': 'icon-icon-pageview'
				}, {
					'name': 'ic_settings_display_24px',
					'icon': 'icon-icon-settingsdisplay'
				}, {
					'name': 'ic_stars_24px',
					'icon': 'icon-icon-stars'
				}, {
					'name': 'ic_view_headline_24px',
					'icon': 'icon-icon-viewheadline'
				}, {
					'name': 'ic_play_shopping_bag_24px',
					'icon': 'icon-icon-playshoppingbag'
				}, {
					'name': 'ic_quick_contacts_dialer_24px',
					'icon': 'icon-icon-quickcontactsdialer'
				}, {
					'name': 'ic_quick_contacts_mail_24px',
					'icon': 'icon-icon-quickcontactsmail'
				}, {
					'name': 'ic_textsms_24px',
					'icon': 'icon-icon-textsms'
				}, {
					'name': 'ic_play_install_24px',
					'icon': 'icon-icon-playinstall'
				}, {
					'name': 'envelop-b',
					'icon': 'icon-icon-envelopeclosed'
				}, {
					'name': 'power',
					'icon': 'icon-icon-power'
				}, {
					'name': 'ic_selectall',
					'icon': 'icon-icon-selectall'
				}, {
					'name': 'ic_personadd',
					'icon': 'icon-icon-personadd'
				}, {
					'name': '附件',
					'icon': 'icon-fujian'
				}, {
					'name': 'ic_assignment_returned',
					'icon': 'icon-icon-assignmentreturned'
				}, {
					'name': 'ic_view_stream',
					'icon': 'icon-ic_view_stream'
				}, {
					'name': 'account',
					'icon': 'icon-icon-accountchild'
				}, {
					'name': '添加',
					'icon': 'icon-tianjia1'
				}, {
					'name': 'list-rich',
					'icon': 'icon-icon-listrich-copy'
				}, {
					'name': '群组2',
					'icon': 'icon-GroupCopy'
				}, {
					'name': '更多',
					'icon': 'icon-gengduo1'
				}, {
					'name': '设置',
					'icon': 'icon-shezhi1'
				}, {
					'name': '最小化',
					'icon': 'icon-zuixiaohua'
				}, {
					'name': '还原',
					'icon': 'icon-huanyuan1'
				}, {
					'name': '列表',
					'icon': 'icon-liebiao'
				}, {
					'name': '刷新',
					'icon': 'icon-shuaxin'
				}, {
					'name': '客户群组',
					'icon': 'icon-kehuqunzu'
				}, {
					'name': '用户 人像',
					'icon': 'icon-yonghurenxiang'
				}, {
					'name': '最大化',
					'icon': 'icon-zuidahua'
				}, {
					'name': '更多',
					'icon': 'icon-icon-test'
				}, {
					'name': '添加',
					'icon': 'icon-tianjia2'
				}, {
					'name': '还原',
					'icon': 'icon-huanyuan2'
				}, {
					'name': '最小化',
					'icon': 'icon-zuixiaohua1'
				}, {
					'name': '新东方-刷新图标',
					'icon': 'icon-refresh1'
				}, {
					'name': '删除',
					'icon': 'icon-shanchu3'
				}, {
					'name': '群组',
					'icon': 'icon-qunzu'
				}, {
					'name': '消息',
					'icon': 'icon-xiaoxi1'
				}]
			}
		},
		created() {
			this.getIconList()
		},
		methods: {
			loadData (ico) {
				this.ico = ico
			},
			getIconList() {
			},
			selectedIco() {
				this.$emit('closeAndRtnVal')
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>

.liItemClass {
		box-sizing: border-box;
		cursor: pointer;
		width: 150px;
		margin: 10px;
		border-bottom-color: red;
	}

.is-active {
		background: #cac8c6;
	}

	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	/*
KISSY CSS Reset
理念：1. reset 的目的不是清除浏览器的默认样式，这仅是部分工作。清除和重置是紧密不可分的。
2. reset 的目的不是让默认样式在所有浏览器下一致，而是减少默认样式有可能带来的问题。
3. reset 期望提供一套普适通用的基础样式。但没有银弹，推荐根据具体需求，裁剪和修改后再使用。
特色：1. 适应中文；2. 基于最新主流浏览器。
维护：玉伯<lifesinger@gmail.com>, 正淳<ragecarrier@gmail.com>
 */
	/** 清除内外边距 **/
	
	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	p,
	blockquote,
	/* structural elements 结构元素 */
	
	dl,
	dt,
	dd,
	ul,
	ol,
	li,
	/* list elements 列表元素 */
	
	pre,
	/* text formatting elements 文本格式元素 */
	
	form,
	fieldset,
	legend,
	button,
	input,
	textarea,
	/* form elements 表单元素 */
	
	th,
	td
	/* table elements 表格元素 */
	
	{
		margin: 0;
		padding: 0;
	}
	/** 设置默认字体 **/
	
	body,
	button,
	input,
	select,
	textarea
	/* for ie */
	
	{
		font: 12px/1.5 tahoma, arial, \5b8b\4f53, sans-serif;
	}
	
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 100%;
	}
	
	address,
	cite,
	dfn,
	em,
	var {
		font-style: normal;
	}
	/* 将斜体扶正 */
	
	code,
	kbd,
	pre,
	samp {
		font-family: courier new, courier, monospace;
	}
	/* 统一等宽字体 */
	
	small {
		font-size: 12px;
	}
	/* 小于 12px 的中文很难阅读，让 small 正常化 */
	/** 重置列表元素 **/
	
	ul,
	ol {
		list-style: none;
	}
	/** 重置文本格式元素 **/
	
	a {
		text-decoration: none;
	}
	
	a:hover {
		text-decoration: underline;
	}
	/** 重置表单元素 **/
	
	legend {
		color: #000;
	}
	/* for ie6 */
	
	fieldset,
	img {
		border: 0;
	}
	/* img 搭车：让链接里的 img 无边框 */
	
	button,
	input,
	select,
	textarea {
		font-size: 100%;
	}
	/* 使得表单元素在 ie 下能继承字体大小 */
	/* 注：optgroup 无法扶正 */
	/** 重置表格元素 **/
	
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	/* 清除浮动 */
	
	.ks-clear:after,
	.clear:after {
		content: '\20';
		display: block;
		height: 0;
		clear: both;
	}
	
	.ks-clear,
	.clear {
		*zoom: 1;
	}
	
	.main {}
	
	.main h1 {
		font-size: 36px;
		color: #333;
		text-align: left;
		margin-bottom: 30px;
		border-bottom: 1px solid #eee;
	}
	
	.helps {
		margin-top: 40px;
	}
	
	.helps pre {
		padding: 20px;
		margin: 10px 0;
		border: solid 1px #e7e1cd;
		background-color: #fffdef;
		overflow: auto;
	}
	
	.icon_lists {
		width: 100% !important;
	}
	
	.icon_lists li {
		float: left;
		width: 110px;
		height: 130px;
		text-align: center;
		list-style: none !important;
	}
	
	.icon_lists .icon {
		font-size: 30px;
		line-height: 70px;
		margin: 10px 0;
		color: #333;
		-webkit-transition: font-size 0.25s ease-out 0s;
		-moz-transition: font-size 0.25s ease-out 0s;
		transition: font-size 0.25s ease-out 0s;
	}
	
	.icon_lists .icon:hover {
		font-size: 60px;
	}
	
	.markdown {
		color: #666;
		font-size: 14px;
		line-height: 1.8;
	}
	
	.highlight {
		line-height: 1.5;
	}
	
	.markdown img {
		vertical-align: middle;
		max-width: 100%;
	}
	
	.markdown h1 {
		color: #404040;
		font-weight: 500;
		line-height: 40px;
		margin-bottom: 24px;
	}
	
	.markdown h2,
	.markdown h3,
	.markdown h4,
	.markdown h5,
	.markdown h6 {
		color: #404040;
		margin: 1.6em 0 0.6em 0;
		font-weight: 500;
		clear: both;
	}
	
	.markdown h1 {
		font-size: 28px;
	}
	
	.markdown h2 {
		font-size: 22px;
	}
	
	.markdown h3 {
		font-size: 16px;
	}
	
	.markdown h4 {
		font-size: 14px;
	}
	
	.markdown h5 {
		font-size: 12px;
	}
	
	.markdown h6 {
		font-size: 12px;
	}
	
	.markdown hr {
		height: 1px;
		border: 0;
		background: #e9e9e9;
		margin: 16px 0;
		clear: both;
	}
	
	.markdown p,
	.markdown pre {
		margin: 1em 0;
	}
	
	.markdown>p,
	.markdown>blockquote,
	.markdown>.highlight,
	.markdown>ol,
	.markdown>ul {
		width: 80%;
	}
	
	.markdown ul>li {
		list-style: circle;
	}
	
	.markdown>ul li,
	.markdown blockquote ul>li {
		margin-left: 20px;
		padding-left: 4px;
	}
	
	.markdown>ul li p,
	.markdown>ol li p {
		margin: 0.6em 0;
	}
	
	.markdown ol>li {
		list-style: decimal;
	}
	
	.markdown>ol li,
	.markdown blockquote ol>li {
		margin-left: 20px;
		padding-left: 4px;
	}
	
	.markdown code {
		margin: 0 3px;
		padding: 0 5px;
		background: #eee;
		border-radius: 3px;
	}
	
	.markdown pre {
		border-radius: 6px;
		background: #f7f7f7;
		padding: 20px;
	}
	
	.markdown pre code {
		border: none;
		background: #f7f7f7;
		margin: 0;
	}
	
	.markdown strong,
	.markdown b {
		font-weight: 600;
	}
	
	.markdown>table {
		border-collapse: collapse;
		border-spacing: 0px;
		empty-cells: show;
		border: 1px solid #e9e9e9;
		width: 95%;
		margin-bottom: 24px;
	}
	
	.markdown>table th {
		white-space: nowrap;
		color: #333;
		font-weight: 600;
	}
	
	.markdown>table th,
	.markdown>table td {
		border: 1px solid #e9e9e9;
		padding: 8px 16px;
		text-align: left;
	}
	
	.markdown>table th {
		background: #F7F7F7;
	}
	
	.markdown blockquote {
		font-size: 90%;
		color: #999;
		border-left: 4px solid #e9e9e9;
		padding-left: 0.8em;
		margin: 1em 0;
		font-style: italic;
	}
	
	.markdown blockquote p {
		margin: 0;
	}
	
	.markdown .anchor {
		opacity: 0;
		transition: opacity 0.3s ease;
		margin-left: 8px;
	}
	
	.markdown .waiting {
		color: #ccc;
	}
	
	.markdown h1:hover .anchor,
	.markdown h2:hover .anchor,
	.markdown h3:hover .anchor,
	.markdown h4:hover .anchor,
	.markdown h5:hover .anchor,
	.markdown h6:hover .anchor {
		opacity: 1;
		display: inline-block;
	}
	
	.markdown>br,
	.markdown>p>br {
		clear: both;
	}
	
	.hljs {
		display: block;
		background: white;
		padding: 0.5em;
		color: #333333;
		overflow-x: auto;
	}
	
	.hljs-comment,
	.hljs-meta {
		color: #969896;
	}
	
	.hljs-string,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-strong,
	.hljs-emphasis,
	.hljs-quote {
		color: #df5000;
	}
	
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-type {
		color: #a71d5d;
	}
	
	.hljs-literal,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-attribute {
		color: #0086b3;
	}
	
	.hljs-section,
	.hljs-name {
		color: #63a35c;
	}
	
	.hljs-tag {
		color: #333333;
	}
	
	.hljs-title,
	.hljs-attr,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #795da3;
	}
	
	.hljs-addition {
		color: #55a532;
		background-color: #eaffea;
	}
	
	.hljs-deletion {
		color: #bd2c00;
		background-color: #ffecec;
	}
	
	.hljs-link {
		text-decoration: underline;
	}
	
	pre {
		background: #fff;
	}
	@import url('../../assets/iconfont/iconfont.css');
</style>