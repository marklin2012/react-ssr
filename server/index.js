// 这里的node代码，会用babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import routes from '../src/App'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'
import proxy from 'express-http-proxy'
import path from 'path'
import fs from 'fs'
import config from './config'

const store = getServerStore()
const app = express()
app.use(express.static('public'))

/**
 * 处理所有的网络请求，捕捉错误，避免promise.all 的时候出错就 catch
 * @param {array} promises 网络请求列表
 */
function handlePromises(promises) {
  return promises.map(promise =>
    promise.then(res => {
      return { ok: true, data: res }
    }).catch(err => {
      return { ok: false, data: err }
    })
  )
}

app.use('/api', proxy('http://localhost:9090', {
  proxyReqPathResolver: (req) => {
    return '/api' + req.url
  }
}))

function csrRender(res) {
  // 读取csr文件返回
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}

app.get('*', (req, res) => {

  if (req.query._mode === 'csr' || config.csr) {
    console.log('url参数开启 csr 降级')
    return csrRender(res)
  }
  // 配置开关 开启 csr

  // 获取 根据路由渲染出的组建，并且拿到 loadData 方法，获取数据
  // 存储所有网络请求
  const promises = []
  console.log(routes)
  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const { loadData } = route.component
      if (loadData) {
        promises.push(loadData(store))
      }
    }
  })
  // 等待所有网络请求结束再渲染
  Promise.all(handlePromises(promises)).then(() => {
    const context = {
      css: [],
    }
    // 把react组件，解析成html
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header></Header>
          <Switch>
            {routes.map(route => {
              return <Route {...route}></Route>
            })}
          </Switch>
        </StaticRouter>
      </Provider>
    )
    console.log('context', context)
    if (context.statuscode) {
      // 状态切换和页面跳转
      res.status(context.statuscode)

    }

    if (context.action === "REPLACE") {
      res.redirect(301, context.url)
    }
    const css = context.css.join('\n')
    res.send(`
    <html>
      <head>
        <meta charset='utf-8'/>
        <title>react ssr</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div id='root'>${content}</div>
        <script>
          window.__context=${JSON.stringify(store.getState())}
        </script>
        <script src='/bundle.js'></script>
      </body>
    </html>`)
  }).catch((err) => {
    res.send('报错页面: 500')
  })


})

app.listen(9093, () => {
  console.log('server started at port 9093')
})