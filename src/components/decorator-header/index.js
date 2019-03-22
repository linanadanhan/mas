import DecoratorHeader from './Header'

DecoratorHeader.install = function (Vue) {
  Vue.component(DecoratorHeader.name, DecoratorHeader)
}

export default DecoratorHeader
