import React from 'react'
import { Route } from 'react-router-dom'

function Status({ code, children }) {
  return <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.statuscode = code // 404
    }
    return children
  }}></Route>
}

function NotFound(props) {
  // console.log('notfound', props)
  // 渲染了这个组件，就给 staticContext 赋值， statusCode =404
  return <Status code={404}>
    <h1>大兄弟瞅啥呢？</h1>
    <img id='img-404' src="/404.jpg" alt="" />
  </Status >
}

export default NotFound