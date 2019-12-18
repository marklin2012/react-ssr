// 存储入口

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'
import axios from 'axios'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer,
})

//创建 store
const store = createStore(reducer, applyMiddleware(thunk))


const serverAxios = axios.create({
  baseURL: 'http://localhost:9090'
})

const clientAxios = axios.create({
  // 当前路径的 node 服务
  baseURL: '/'
})

// export default store
export const getServerStore = () => {
  //  服务端用
  // 通过 server 的 dispatch 来获取和充实
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
  // 通过window.__context来获取数据
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}