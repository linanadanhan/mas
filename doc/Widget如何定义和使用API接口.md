# Widget如何定义和使用API接口

### Widget中如何定义接口
```js
export default {
  name: 'login',
  data () {},
  apis: [{                    // 接口定义数组
    name: 'login',            // 接口名称
    path: 'user/login',       // 接口访问url地址或function
    type: 'get'               // http method
  }, {
    name: 'logout',
    path: 'user/logout',
    type: 'get'
  }],
  ...
}
```


### Widget中如何调用定义的接口
```js
this.$api_[MethodName](options)
```
> api采用Ajax方式调用服务，此处options同Ajax的options定义，只是覆盖了path和type属性

>options具体定义可参见《如何使用Ajax调用API服务》
