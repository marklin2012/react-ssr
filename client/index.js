import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from '../src/App'
import { getClientStore } from '../src/store/store'
import { Provider } from 'react-redux'
import Header from '../src/component/Header'

// 注水, 客户端入口 
const Page = (<Provider store={getClientStore()}>
  <BrowserRouter >
    <Header></Header>
    <Switch>
      {routes.map(route => {
        return <Route {...route}></Route>
      })}
    </Switch>
  </BrowserRouter >
</Provider>)
ReactDom.hydrate(Page, document.getElementById('root'))
