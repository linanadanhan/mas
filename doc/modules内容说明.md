 |-modules       第三方修饰器、布局器、主题和Widget等
 |  |-tile          项目名称 唯一不能重复
 |     |-decorators 修饰器
 |       |default  修饰器代码  唯一不能重复
 |         |bg.png 修饰器缩略图
 |         |index.js js文件
 |         |index.js.map js.map 文件
 |         |mainfest.json json文件
 |           |name 代码
 |           |title 名称
 |           |type 类型名decorator
 |           |projectCode 项目代码
 |           |description 描述
 |           |isSystem 是否系统内置 (1 是  0 否)
 |     |-layouts    布局器
 |       |default  布局代码  唯一不能重复
 |         |bg.png 布局缩略图
 |         |index.js js文件
 |         |index.js.map js.map 文件
 |         |mainfest.json json文件
 |           |name 代码
 |           |title 名称
 |           |type 类型名layout
 |           |projectCode 项目代码
 |           |description 描述
 |           |isSystem 是否系统内置 (1 是  0 否)
 |           |params 数组 ([{"position":"0","width":"100%"}])
 |     |-themes     主题
 |       |default  主题代码  唯一不能重复
 |         |bg.png 主题缩略图
 |         |index.js js文件
 |         |index.js.map js.map 文件
 |         |mainfest.json json文件
 |           |name 代码
 |           |title 名称
 |           |type 类型名theme
 |           |projectCode 项目代码
 |           |description 描述
 |			 |isOpen 是否公开 (1 是  0 否)
 |           |isSystem 是否系统内置 (1 是  0 否)
 |     |-widgets    Widget
 |       |default  widget代码  唯一不能重复
 |         |bg.png widget缩略图
 |         |index.js js文件
 |         |index.js.map js.map 文件
 |         |mainfest.json json文件
 |           |name 代码
 |           |title 名称
 |           |type 类型名widget
 |           |projectCode 项目代码
 |           |description 描述
 |           |category 分类 格式如 A/B
 |           |business 是否为业务组件(1 是  0 否)
 |           |params 初始参数值{"title":"图标Bar", "text":"图标Bar", "decorator":"default", "openMax": false, "openMin": false, "badge": "", "widgetHeight": "", "paddingTop": "", "paddingLeft": "", "paddingBottom": "", "paddingRight": "","widgetIco": "icon-cf-c57", "borderColor": "rgba(219,224,229, 1)", "borderRadius": "0", "decoratorBgColor": "rgba(255, 255, 255, 1)", "changeLayout": false}