import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setCurrentRegion } from '../../../actions/region'
import defaultRegion from '../../../reducers/initialStates/regionInitialState'
import Regions from '../regions/regions.component'
import Ripple from '../ripple/ripple.component'
import ReactModal from 'react-modal'
import useIsMount from '../../../utils/hooks/useIsMount'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const RegionsQuestion = ({
  currentRegion: reduxCurrentRegion,
  setCurrentRegion
}) => {
  const isMounted = useIsMount()

  if (isMounted) {
    setTimeout(() => {
      setShowQuestion(
        !currentRegion || currentRegion.nextQuestionDate < Date.now()
      )
    }, 5000)
  }

  useEffect(() => {
    if (!isMounted) setShowQuestion(false)
    // eslint-disable-next-line
  }, [reduxCurrentRegion])

  const [showQuestion, setShowQuestion] = useState(false)
  const [openRegionsSelect, setOpenRegions] = useState(false)

  const currentRegion = localStorage.currentRegion
    ? JSON.parse(localStorage.currentRegion)
    : null

  const [t] = useTranslation()

  const selectCapital = () => {
    setCurrentRegion({
      nextQuestionDate: new Date(Date.now() + 86400000 * 365),
      city: defaultRegion.currentRegion.city
    })
  }

  const onCloseClick = () => {
    setCurrentRegion({
      nextQuestionDate: new Date(Date.now() + 86400000),
      city: defaultRegion.currentRegion.city
    })
  }

  const changeRegion = () => {
    setOpenRegions(true)
  }

  return (
    <CSSTransition
      in={showQuestion}
      timeout={400}
      classNames="vertical-transition"
      unmountOnExit
    >
      <div className="regions-question-wrapper shadow-border">
        <button type="button" className="close-button" onClick={onCloseClick}>
          <i className="fas fa-times"></i>
        </button>
        <div className="question">{t('regions.question.text')}</div>
        <div className="button-box">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={selectCapital}
          >
            {t('regions.question.yes')}
            <Ripple />
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={changeRegion}
          >
            {t('regions.question.no')}
            <Ripple />
          </button>
        </div>
        <ReactModal
          isOpen={openRegionsSelect}
          onRequestClose={() => setOpenRegions(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <Regions
            citySelectMode={true}
            handleCloseModal={() => setOpenRegions(false)}
          />
        </ReactModal>
      </div>
    </CSSTransition>
  )
}

RegionsQuestion.propTypes = {
  currentRegion: PropTypes.object.isRequired,
  setCurrentRegion: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentRegion: state.region.currentRegion
})

export default connect(mapStateToProps, { setCurrentRegion })(RegionsQuestion)
