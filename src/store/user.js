// 首页的逻辑
import axios from 'axios'
// actionTYpe
const GET_LIST = 'INDEX/GET_USER_LIST'

// actionCreator
const changeUserInfo = data => ({
  type: GET_LIST,
  data
})

export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get("http://localhost:9090/api/user/info")
      .then(res => {
        const { data } = res.data
        // console.log('用户信息', data)
        dispatch(changeUserInfo(data))
      })
  }
}

const defaultState = {
  userInfo: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        userInfo: action.data
      }
      return newState
    default:
      return state
  }
}