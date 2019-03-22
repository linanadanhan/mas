// 深度复制纯数据JSON对象
function deepcopy (from) {
  if (from === null) {
    return null
  }
  if (typeof from === 'object') {
    if (Array.isArray(from)) {
      let arr = []
      for (let i = 0; i < from.length; i++) {
        arr.push(deepcopy(from[i]))
      }
      return arr
    } else {
      let obj = {}
      for (let key in from) {
        obj[key] = deepcopy(from[key])
      }
      return obj
    }
  } else {
    return from
  }
}
// 深度遍历目标对象，从原对象中复制同名属性的值
function pickcopy (from, template, defaultValue) {
  if (template === null || typeof template !== 'object' || Array.isArray(template)) {
    return deepcopy(from)
  }
  let to = defaultValue !== null ? deepcopy(defaultValue) : {}
  for (let key in template) {
    if (from.hasOwnProperty(key)) {
      to[key] = pickcopy(from[key], template[key])
    }
  }
  return to
}
export default {
  deepcopy,
  pickcopy
}
