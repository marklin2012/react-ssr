import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'
import { Redirect } from 'react-router-dom'

function User(props) {
  // 比如登陆逻辑
  // 没登录跳转 判断 cookie 
  return <Redirect to="/about"></Redirect>
  // return <div>
  //   <h1>你好，{props.userInfo.name}, 你们最棒的是 {props.userInfo.best}</h1>
  // </div>
}

User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}

export default connect(state =>
  ({ userInfo: state.user.userInfo }),
  // { getIndexList }
)(User)