import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './index.css'
import withStyle from '../withStyle'

// console.log('css', styles._getCss())

function Index(props) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    // if (props.staticContext) {
    //   props.staticContext.css.push(styles._getCss())
    // }
    // 异步数据首页显示
    if (!props.list.length) {
      // 客户端获取
      console.log('客户端获取 getIndexList')
      props.getIndexList()
    }
  }, [])
  return <div className={styles.container}>
    <h1 className={styles.title}>hello, {props.title}! {count}</h1>
    <button onClick={() => setCount(count + 1)}>累加</button>
    <hr />
    <ul>
      {props.list.map(item => {
        return <li key={item.id}>{item.name}</li>
      })}
    </ul>
  </div>
}

Index.loadData = (store) => {
  return store.dispatch(getIndexList())
}

export default connect(state =>
  ({ list: state.index.list }),
  { getIndexList }
)(withStyle(Index, styles))

// const NewIndex = connect(state =>
//   ({ list: state.index.list }),
//   { getIndexList }
// )(withStyle(Index, styles))

// NewIndex.loadData = (store) => {
//   return store.dispatch(getIndexList())
// }

// export default NewIndex