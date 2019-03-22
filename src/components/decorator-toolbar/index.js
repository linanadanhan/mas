import DecoratorToolbar from './Toolbar'

DecoratorToolbar.install = function (Vue) {
  Vue.component(DecoratorToolbar.name, DecoratorToolbar)
}

export default DecoratorToolbar
