# React-ssr

a demo for learning react ssr

### How to use

```
yarn

yarn start

```

if you want to test mock, you should start another tab in zsh/bash to use code: 

```
node mock.js
```

then open link [http://localhost:9093](http://localhost:9093) in browser


### 练习思路

#### 1. 接口报错处理

对每个请求列表单独进行错误处理的捕获，使其不报错

#### 2. 前后端接口统一

  1. 服务端，使用 `express-http-proxy` 库对所有 `/api` 开头的请求进行代理
  2. 前端，改造全局 store， 使用中间件处理服务端请求和前端请求的接口地址转发
  3. 前端，action 调用接口时，使用封装好的 `axiosInstance` 进行接口调用