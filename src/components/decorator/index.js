import Decorator from './Decorator'

Decorator.install = function (Vue) {
  Vue.component(Decorator.name, Decorator)
}

export default Decorator
