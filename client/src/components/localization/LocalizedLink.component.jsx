import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'

import { prefixPath } from '../../services/util'

const LocalizedLink = ({ to, locale, className, onClick, children }) => {
  return (
    <Link to={prefixPath(to, locale)} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

const mapStateToProps = (state) => ({ locale: state.locale.locale })

export default connect(mapStateToProps)(LocalizedLink)
