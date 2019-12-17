# React-ssr

a demo for learning react ssr

## How to use

```
yarn

yarn start

```

if you want to test mock, you should start another tab in zsh/bash to use code: 

```
node mock.js
```

then open link [http://localhost:9093](http://localhost:9093) in browser

## 同构

说到 SSR ，很多人第一反应是 “服务端渲染”， 但其实我们现在更倾向于称之为 ”同构“，

### 客户端渲染
客户端渲染模式下，页面加载通过服务端把渲染的 HTML 静态页面中展示内容，然后加载执行文件中的 js 代码（例如 react），再通过 根据 js 运行结果，生成相应 DOM并完成事件绑定，最后渲染给用户

#### 优点：
  1. 网络传输数据量小，减少服务器压力，
  2. 前后端分离，无需请求完整页面、交互好可实现各种效果

#### 缺点：
  1. 不利于 SEO，爬虫看不到完整的页面，
  2. 首屏渲染慢，（渲染前需要下载一堆 js 和 css 等）

### 服务端渲染
用户请求服务器，服务器上直接生成 HTML 内容并返回给客户端。服务器端渲染的页面内容是由服务器端生成的。
#### 优点：
  1. 首屏渲染快
  2. 利于 SEO
  3. 可生成静态化文件

#### 缺点：
  1. 传统服务端渲染用户体验差
  2. 代码不利于维护
  3. 服务器资源消耗大，并发压力大

### 同构 

这个概念存在于 Vue，React 这些前端框架中，实际上是客户端渲染和服务端渲染的一个整合。我们把页面展示内容和交互写在一起，让代码执行2次：
  1. 在服务端执行一次，用于实现服务端渲染，
  2. 在客户端再执行一次，用于接管页面交互

![ssr 原理实现图](/static/ssr.jpeg)

#### 缺点
1、理论上，SSR（包括传统的服务端渲染）最大的瓶颈就是服务端的性能
如果用户规模大，SPA本身就是一个大型分布式系统，充分利用用户的设备去运行JS的运算，SSR则是把这些工作包揽到自己的服务器上。所以对于需要大量计算（图表特别多）而且用户量巨大的页面，并不太适合，但SSR非常适合于大部分的内容展示页面

2、项目复杂度增加，需要前端团队有较高的技术素养
为了同构要处处兼容 Node.js 不同的执行环境，不能有浏览器相关的原生代码在服务端执行，前端代码使用的 window 在 node 环境是不存在的，所以要 mock window，其中最重要的是 cookie，userAgent，location

### SSR 难点

#### 1. 路由代码差异

服务器端需要通过请求路径，找到路由组件，而在客户端需通过浏览器中的网址，找到路由组件，是完全不同的两套机制，所以这部分代码无法公用

#### 2. 打包代码差异

虽然客户端和服务端共用组件代码，但由于入口路由代码不一致，所以客户端和服务端的入口代码是不一样的，所以打包的时候，webpack的打包机制有不同

#### 3. 异步数据的获取及状态管理不同

服务端渲染 + SPA 共存的模式看起来非常棒，但也是有缺点的：

第一，要同时保证两种模式共存的情况和两种模式独立的情况下都能够表现一致，开发和测试比较繁琐；
第二，多页应用（不用 Router 或刷新页面）的情况下，每一页都拥有完全独立的 window, document，但是共存模式下用 Router 切换到 SPA 后，由于单页面应用的特点，他们将会共用 window 和没有变化的 DOM，这个需要在开发每个页面每一个模块的时候特别注意对一些数据的销毁和事件的解绑，避免页面被切换掉之后旧逻辑依然生效，这个可能会引发很多意想不到的问题，而且难以排查。

如果是使用redux，要注意store不能是单例模式，因为store是所有页面需要公用的，每个用户访问的时候，生成store的函数需要重新执行，为每个用户提供一个独立的 Store

要避免出现这些问题，就需要很好的、统一的开发规范和踩坑意识，如果项目比较大比较复杂，开发成本就会比采用单个模式大得多。

#### 4. 生命周期的调用时机

React 组件的生命周期函数有的会在浏览器调用，有的会在服务端调用，有的则两端都会调用，例如在 componentWillMount 和 render 函数中不小心用了 window 或 document，在服务端渲染的时候就会报错，这些问题在两种环境公用代码的情况下是不可避免的，特别是有些不报错的代码，开发时察觉不到，却很有可能导致内存泄漏。

## 扩展

### 1. 接口报错处理

对每个请求列表单独进行错误处理的捕获，使其不报错

### 2. 前后端接口统一

  1. 服务端，使用 `express-http-proxy` 库对所有 `/api` 开头的请求进行代理
  2. 前端，改造全局 store， 使用中间件处理服务端请求和前端请求的接口地址转发
  3. 前端，action 调用接口时，使用封装好的 `axiosInstance` 进行接口调用