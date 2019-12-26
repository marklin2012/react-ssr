import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

function withStyle(Component, styles) {
  function NewComponent(props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss())
    }

    return <Component {...props} />
  }
  hoistNonReactStatics(NewComponent, Component)
  return NewComponent
}

export default withStyle