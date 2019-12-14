import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'

function User(props) {
  return <div>
    <h1>你好，{props.userInfo.name}, 你们最棒的是 {props.userInfo.best}</h1>
  </div>
}

User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}

export default connect(state =>
  ({ userInfo: state.user.userInfo }),
  // { getIndexList }
)(User)