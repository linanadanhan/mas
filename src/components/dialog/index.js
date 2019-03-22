import Dialog from './Dialog'
import Dialogs from './Dialogs'

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog)
  Vue.component(Dialogs.name, Dialogs)
}

export default Dialog
