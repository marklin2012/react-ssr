import React from 'react'

function withStyle(Component, styles) {
  return function (props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss())
    }
    return <Component {...props} />
  }
}

export default withStyle