import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setCurrentLocality } from '../../../actions/locality'
import defaultLocality from '../../../reducers/initialStates/localityInitialState'
import Localities from './localities.component'
import Ripple from '../ripple/ripple.component'
import { SvgClose } from '../icons'
import ReactModal from 'react-modal'
import useIsMount from '../../../services/hooks/useIsMount'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const LocalitiesQuestion = ({
  currentLocality: reduxCurrentLocality,
  setCurrentLocality,
}) => {
  const isMounted = useIsMount()

  if (isMounted) {
    setTimeout(() => {
      setShowQuestion(
        !currentLocality || currentLocality.nextQuestionDate < Date.now()
      )
    }, 5000)
  }

  useEffect(() => {
    if (!isMounted) setShowQuestion(false)
    // eslint-disable-next-line
  }, [reduxCurrentLocality])

  const [showQuestion, setShowQuestion] = useState(false)
  const [openLocalitiesSelect, setOpenLocalities] = useState(false)

  const currentLocality = localStorage.currentLocality
    ? JSON.parse(localStorage.currentLocality)
    : null

  const [t] = useTranslation()

  const selectCapital = () => {
    setCurrentLocality({
      nextQuestionDate: new Date(Date.now() + 86400000 * 365),
      city: defaultLocality.currentLocality.city,
    })
  }

  const onCloseClick = () => {
    setCurrentLocality({
      nextQuestionDate: new Date(Date.now() + 86400000),
      city: defaultLocality.currentLocality.city,
    })
  }

  const changeLocality = () => {
    setOpenLocalities(true)
  }

  return (
    <CSSTransition
      in={showQuestion}
      timeout={400}
      classNames="vertical-transition"
      unmountOnExit
    >
      <div className="localities-question-wrapper shadow-border">
        <button type="button" className="close-button" onClick={onCloseClick}>
          <SvgClose />
        </button>
        <div className="question">{t('localities.question.text')}</div>
        <div className="button-box">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={selectCapital}
          >
            {t('localities.question.yes')}
            <Ripple />
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={changeLocality}
          >
            {t('localities.question.no')}
            <Ripple />
          </button>
        </div>
        <ReactModal
          isOpen={openLocalitiesSelect}
          onRequestClose={() => setOpenLocalities(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <Localities
            citySelectMode={true}
            handleCloseModal={() => setOpenLocalities(false)}
          />
        </ReactModal>
      </div>
    </CSSTransition>
  )
}

LocalitiesQuestion.propTypes = {
  currentLocality: PropTypes.object.isRequired,
  setCurrentLocality: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  currentLocality: state.locality.currentLocality,
})

export default connect(mapStateToProps, { setCurrentLocality })(
  LocalitiesQuestion
)
