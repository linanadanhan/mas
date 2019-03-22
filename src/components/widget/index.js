import Widget from './Widget'

Widget.install = function (Vue) {
  Vue.component(Widget.name, Widget)
}

export default Widget
