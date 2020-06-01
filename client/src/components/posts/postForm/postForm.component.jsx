import React, { useState, useEffect } from 'react'
import ProgressBar from './progressBar/progressBar.component'
import PostGeneralInfo from './steps/postGeneralInfo.component'
// import PostYandexMap from './steps/postYandexMap.component'
import PostMap from './steps/postMap.component'
import PostEstateInfo from './steps/postEstateInfo.component'
import PostBuidingInfo from './steps/postBuildingInfo.component'
import PostAdditionalInfo from './steps/postAdditionalInfo.component'
import PostPrice from './steps/postPrice.component'
import PostPhotos from './steps/postPhotos.component'
import PostContact from './steps/postContact.component'
import { connect } from 'react-redux'
import { formNextStep, formPrevStep, addPost } from '../../../actions/post'
import { toastr } from 'react-redux-toastr'
import SuccessIcon from '../../layout/icons/successIcon.component'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './postForm.style.scss'

const PostForm = ({
  postForm,
  formSteps,
  formNextStep,
  formPrevStep,
  addPost,
  loading,
  history
}) => {
  const { currentStep, totalSteps } = formSteps

  const [files, setFiles] = useState([])

  // Scroll to top when step is changed
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  const onSubmit = async e => {
    e.preventDefault()

    const res = await addPost(postForm)

    if (res) {
      const toastrOptions = {
        timeOut: 0,
        icon: <SuccessIcon />,
        status: 'info'
      }
      toastr.light('Success', 'Your post is published', toastrOptions)
      history.push('/')
    }
  }

  const stepChange = (e, inc = false) => {
    e.preventDefault()

    if (inc) {
      formNextStep(currentStep + 1)
    } else {
      formPrevStep(currentStep - 1)
    }
  }

  const renderSwitch = () => {
    switch (currentStep) {
      case 1:
        return <PostMap />
      // return <PostYandexMap formData={formData} setFormData={setFormData} />
      case 2:
        return <PostEstateInfo />
      case 3:
        return <PostBuidingInfo />
      case 4:
        return <PostAdditionalInfo />
      case 5:
        return <PostPhotos files={files} setFiles={setFiles} />
      case 6:
        return <PostPrice />
      case 7:
        return <PostContact />
      case 0:
      default:
        return <PostGeneralInfo />
    }
  }

  const [t] = useTranslation()

  return (
    <div className="post-form-container px-2 light-border">
      <ProgressBar />
      <form onSubmit={e => onSubmit(e)}>
        {renderSwitch()}
        <div className="form-button-box">
          {/* Back */}
          <button
            className="btn btn-secondary"
            onClick={e => stepChange(e)}
            style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
          >
            {t('createPost.back')}
            <Ripple />
          </button>

          {/* Next / Submit */}
          {currentStep === totalSteps ? (
            <button
              type="submit"
              className={`btn btn-primary ${loading && 'btn-loading'}`}
              disabled={loading}
            >
              {t('createPost.submit')}
              {loading && <ButtonSpinner />}
              <Ripple />
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={e => stepChange(e, true)}
              disabled={loading}
            >
              {t('createPost.next')}
              <Ripple />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  postForm: PropTypes.object.isRequired,
  formSteps: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  formNextStep: PropTypes.func.isRequired,
  formPrevStep: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  formSteps: state.post.formSteps,
  loading: state.async.loading
})

export default connect(mapStateToProps, {
  formNextStep,
  formPrevStep,
  addPost
})(PostForm)
