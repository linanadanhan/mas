import Dropzone from './Dropzone'

Dropzone.install = function (Vue) {
  Vue.component(Dropzone.name, Dropzone)
}

export default Dropzone
