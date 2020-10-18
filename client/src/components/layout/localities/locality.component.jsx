import React from 'react'
import { connect } from 'react-redux'
import { getLocalities, setCurrentLocality } from '../../../actions/locality'
import PropTypes from 'prop-types'

const Locality = ({
  locality,
  getLocalities,
  setCurrentLocality,
  handleCloseModal,
  citySelectMode = false
}) => {
  const handleOnClick = () => {
    if (citySelectMode) {
      setCurrentLocality({
        nextQuestionDate: new Date(Date.now() + 86400000 * 365),
        city: {
          id: locality.id,
          name: locality.name,
          routeName: locality.routeName,
          location: [locality.x, locality.y],
          children: locality.children
        }
      })
      handleCloseModal()
    } else {
      getLocalities({ id: locality.id })
    }
  }

  return (
    <button className="link" onClick={() => handleOnClick()}>
      {locality.name}
    </button>
  )
}

Locality.propTypes = {
  locality: PropTypes.object.isRequired,
  getLocalities: PropTypes.func.isRequired,
  setCurrentLocality: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  citySelectMode: PropTypes.bool
}

export default connect(null, { getLocalities, setCurrentLocality })(Locality)
