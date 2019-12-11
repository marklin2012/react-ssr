let express = require('express')
const app = express()

app.get('/api/course/list', (req, res) => {
  // 支持跨域调用
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Mehods', 'GET,POST,PUT,DELETE')
  res.header('Content-Type', "application/json;charset=utf-8")
  res.json({
    code: 0,
    list: [
      { name: 'web全栈', id: 1 },
      { name: 'js高级', id: 2 },
      { name: 'web小白', id: 3 },
      { name: 'java架构师', id: 4 },
    ]
  })
})

app.listen(9090, () => {
  console.log('mock启动完毕')
})