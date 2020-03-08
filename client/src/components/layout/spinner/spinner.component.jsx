import React, { Fragment } from 'react'
import spinner from './spinner.gif'

export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{
          width: '80px',
          margin: 'auto',
          display: 'block',
          position: 'absolute',
          left: '50%',
          top: '40%'
        }}
      />
    </Fragment>
  )
}
