# 如何开发Widget（高级篇）

### Widget中如何请求API服务？

```js
this.$ajax({
  path: '/api/user/login',
  data: {}
  }).then(data => {
    // 正确返回数据
  }).catch(err => {
    // 异常，含业务和系统错误时
  }).finally(() => {
    // 正确和错误时都执行
  })
```
> 详见《如何使用Ajax调用API服务》

### Widget中如何引入JS、CSS、Image等静态资源？

### Widget中如何嵌入其他Vue或其他js组件？（此时嵌入的组件将被widget合并打包）

可使用Webpack提供的import或require实现，被引用的组件将和widget合并打包，也就是多个widget引用相同的组件时，此组件代码将重复加载，因此此方法不适合被引用的组件代码量较大时。

```js
import Util from '../../common/util.js'
// 或
let util = require('../../common/util.js')
```

### Widget中如何异步加载Vue或第三方js组件？（此时嵌入的组件将独立js文件加载）

当被引用的组件比较重，代码量大时，需要异步加载，并且多个widget，甚至多个模块包重的widget间，都需要使用时，如果采用import或require方法，将导致此公用组件在运行时被多次加载，对页面性能造成明显影响。

此时可使用$include方法，如下：

```js
this.$include("moduleName", "componentName")
```

其中，moduleName为项目名称，如tile等；componentName为组件名称，也就是需要加载的共享js文件名。

> 注意：采用$include方法引入的组件必须独立打包，具体参见tile项目共享组件开发，componentName时组件的唯一标识，只要相同，即使组件内容不一样，也不会重复加载，因此要保证共享组件名称的唯一性，否则将导致平台运行的不可预见性错误。

### Widget如何加载其他Widget？

```html
<widget :widget="widget" :params="params" :page="page"></widget>
```
其中：widget为Widget的名称，params为widget实例化参数，定义如下：

```js
  {
    decorator: 'none', //修饰器，默认值'none'，可不设置
    widgetinwidget: true,  //默认值，可不设置
    ...     // 可设置其他业务参数，被嵌套的widget中使用
  }
```

### Widget中如何实现菜单，让每个菜单分别加载一个Vue组件？

### Widget在mounted事件中无法获取到$el和$refs对应的dom对象，如何解决？

由于Widget、修饰器等组件采用异步加载，因此导致Widget的mounted事件触发时，内部异步子组件尚未完成mounted，因此无法准确的通过$el或$refs获取对应的dom对象，为解决此问题，平台增加了一个container组件，当对应的dom节点准备好后，将触发ready事件，如下：

```html
<container @ready="init"></container>
```

在ready事件中，将返回一个div的dom对象，可用于异步渲染图表等。

```js
methods: {
  ...
  init (divDom) {
    divDom.innerHTML = "....."
    // 或
    divDom.appendChild(...)
  }
}
```

### Widget中如何实现弹出窗口？

Widget中需要弹出窗口，可直接调用如下代码：
```js
  this.$dialog(options)
```
> 重复弹出窗口，后弹出的窗口会覆盖在前面弹出窗口的上方

其中**options**为窗口定义参数对象，结构如下：
```js
  {
    title: '弹出窗口名称',
    body: () => import('views/config/Config.vue'), // 异步或同步加载弹出窗口的内容
    data: { // 弹出窗口的参数对象
    },
    onclosed (options, dialog, body) {  // 当弹出窗口被关闭后调用
      this....    // 此时this为打开窗口的页面对象
    },
    buttons: [{   // 定义弹出窗口的按钮数组
      text: '确定', 
      type: 'primary',
      handle: function (options, dialog, body) { // options当前定义对象， dialog为弹出窗口对象, body为弹出窗口内包含的组件或widget，当打开多Tab时，body是一个包含多个tab的对象
        this....  //此时this为打开窗口的页面对象
        dialog.close()
      }
    }]
  }
```
- #### 打开多Tab弹出窗口

可以在弹出窗口时，body属性设置为多个组件的数组，将自动显示为多Tab模式，每个Tab中显示一个组件

- #### 打开widget弹出窗口

可以在弹出窗口时，body属性设置为需要打开widget的name字符串，弹出窗口将自动加载对应的widget，需要传递的Widget参数放在data属性中

- #### 按钮回调函数中如何关闭弹出窗口

关闭弹出窗口，可以在按钮回调方法中采用如下代码关闭：
```js
  dialog.close()
```
- #### 在打开弹出窗口的页面上如何关闭弹出的窗口
此时无法拿到dialog可直接调用如下代码：
```js
  this.$dialog() // 关闭最前面的弹出窗口
  或
  this.$closeDialog() // 关闭最前面的弹出窗口
  或
  this.$closeAllDialog()  // 一次性，关闭所有弹出窗口，回到主界面
```
> 关闭窗口时，按最前面的最先关闭，多次调用可依次关闭弹出窗口

- #### 弹出窗口加载的组件中如何反向调用弹出窗口，并主动关闭窗口？
弹出窗口加载组件和Widget时，已经将dialog组件对象通过dialog参数传递到被加载的组件中，可以通过this.dialog获取：
```js
  this.dialog // 获取dialog组件对象
  this.dialog.close() // 关闭所在弹出窗口
  this.dialog.options // 获取打开dialog的配置对象，通过此，可修改dialog的样式
```

- #### 按钮回调函数中如何获取到弹出窗口中加载的组件？

按钮回调函数中，可使用第三个参数 body 来获取窗口内加载的组件、Tabs或Widget，页可以采用dialog.$refs访问加载的组件
```js
// 采用Tabs组件在弹出窗口中加载多个Tab时
body.tabnameA  // 获取tabnameA内加载的组件
body.tabnameB  // 获取tabnameB内加载的组件

// 弹出普通组件或Widget时
body // 此时body就是加载的组件或Widget组件

```

- #### 按钮回调函数中如何访问到弹出窗口中的表单或其他对象？

表单或对象上采用ref表现定义应用名称
```html
  <el-form ref="form" :model="form" label-width="80px"></el-form>
```
可以通过body再行获取内部对象
```js
body.$refs.form
body.tabnameA.$refs.form  //Tabs中时
```

### 如何让Widget在最大化时显示更多的内容？
```html
 <div v-if="page.maximized">最大化时显示的内容</div>
 <div v-else>默认显示的内容</div>
```
```js
if (this.page.maximized) {
  // Widget最大化显示
} else {
  // Widget正常显示
}
