import {gbs} from 'config'
import Vue from 'vue'

if (typeof window.exports === 'undefined') {
  window.exports = {}
}

export default function (moduleName, fileName, componentName) {
  moduleName += '/' + fileName
  let url = gbs.modules_host + '/' + moduleName + '.js'
  componentName = componentName || 'default'
  return (resolve, reject) => {
    return loadjs(url, moduleName, componentName)
  }
}

function loadjs (url, moduleName, componentName) {
  const instance = window.exports[moduleName]
  if (instance) {
    return new Promise((resolve, reject) => {
      resolve(instance[componentName])
    })
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          const instance = window.exports[moduleName]
          if (instance) {
            let component = instance[componentName]
            if (typeof component.install === 'function') {
              component.install(Vue)
            }
            resolve(component)
          } else {
            reject(Error(`Do not support for [${url}]!`))
          }
          document.body.removeChild(script)
        }
      }
    } else {
      script.onload = () => {
        const instance = window.exports[moduleName]
        if (instance) {
          let component = instance[componentName]
          if (typeof component.install === 'function') {
            component.install(Vue)
          }
          resolve(component)
        } else {
          reject(Error(`Do not support for [${url}]!`))
        }
        document.body.removeChild(script)
      }
    }
    script.onerror = () => {
      reject(Error(`${url} load error!`))
    }
    script.src = url
    document.body.appendChild(script)
  })
}
