import React, { useState } from 'react'
// import { Route } from 'react-router-dom'

import Index from './container/'
import About from './container/About'
import User from './container/User'
import './App.css'
import NotFound from './container/NotFound'

// export default (
//   <div>
//     <Route path="/" exact component={Index}></Route>
//     <Route path="/about" exact component={About}></Route>
//   </div>
// )

//  改成成 js 的配置，才能获取组建
export default [
  {
    path: "/",
    component: Index,
    // loadData: Index.loadData,
    exact: true,
    key: "index"
  },
  {
    path: "/about",
    component: About,
    exact: true,
    key: "about"
  },
  {
    path: "/user",
    component: User,
    exact: true,
    key: "user"
  },
  {
    component: NotFound,
    key: 'xxx'
  },
]