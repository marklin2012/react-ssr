const express = require('express')
const puppeteer = require('puppeteer')
// /api 开头的
const axios = require('axios')
const app = express()

async function test() {
  console.log('截图')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://kaikeba.com')
  await page.screenshot({ path: 'kaikeba.png' })
  await browser.close()
}

test()
const urlCache = {}
app.get('*', async function (req, res) {
  console.log(req.url)
  // 遍历所有的路由，都写成html文件，或者都缓存上
  // 加缓存
  if (urlCache) {
    return res.send(urlCache[req.url])
  }
  if (req.url === '/favicon.ico') {
    return res.send({ code: 0 })
  }
  const url = 'http://localhost:9093' + req.url
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: ['networkidle0']
  })
  const html = await page.content()
  console.log('html', html)

  await page.screenshot({ path: 'kaikeba.png' })
  await browser.close()

  res.send({ code: 1 })
})

app.listen(9092, () => {
  console.log('server started at port 9092')
})

// 使用 next
//1. 查看网页使用的接口
//2. 左侧掘金热文， 
//3. 支持切换 