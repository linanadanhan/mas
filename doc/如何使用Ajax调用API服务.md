# 如何使用Ajax调用API服务？

平台采用Axios作为Ajax调用组件，具体使用可参见[Axios官网](https://github.com/axios/axios)
### Request Config

url必填，method默认为get

```js
{
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  })
}
```
### Response Schema

```js
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```
为了使用方便，平台对Axios做了一定增强和封装，具体如下：

### 在Request Config对象中增加参数

```js
{
  path: String|Function,  // 类url参数，路径或返回路径的方法
  pathParams: Object,     // path方法的参数
  type: String,           // 同method参数
  beforeErrorHandle: (error) => {},  // 系统处理异常前回调，返回false可屏蔽系统处理逻辑，返回true继续执行系统处理逻辑
  fn: (data) => {},       // 获取数据后的回调
  errFn: (error) => {},    // 异常处理后的回调
  app: Vue Instance       // 发起Ajax请求的Vue实例
}
```

### API服务返回对象

- #### 业务数据结构
```js
      {
        status: 200,     // 业务状态码
        data: {          // 数据对象，可以是字符串等基本类型、对象或数组等
          ...
        }
      }
``` 
- #### 业务异常信息
```js
      {
        status: 401,        // 业务状态码
        data: '用户未登录'  // 异常信息
      }
``` 

- #### 业务状态码
    - 200 服务正常返回业务数据
    - 401 用户未登录
    - 404 未找到相应的资源
    - 405 业务逻辑错误
    - 408 服务调用超时
    - 500 系统未知错误
    - 503 集成的第三方应用配置无效


当正确返回业务数据时，回调函数获取的是Response的data属性

当出现异常时，回调函数获取的是整个Response，便于根据status代码分别处理，此时异常详情信息为data属性，值为异常信息字符串

- ### 如何调用？

系统将Axios实例绑定在Vue原型对象上，每个Vue组件代码可直接通过**this.$ajax**或**this.$http**访问，如下：

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

- ### 如何自定义系统级异常处理？

系统在封装Ajax对象时，已经增加了默认的异常处理机制，如果需要自定义，可在/src/config/setting.js中自定义

- ### 如何屏蔽或在系统异常处理的弹出窗口前执行逻辑？

在Request Config对象中，定义**beforErrorHandle**方法，此方法将在系统异常处理逻辑执行前执行，此方法返回Boolean值，当true时，继续执行系统异常处理逻辑，当false时，中断系统异常逻辑处理
