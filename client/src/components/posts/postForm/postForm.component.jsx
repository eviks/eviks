import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ProgressBar from './progressBar/progressBar.component'
import PostGeneralInfo from './steps/postGeneralInfo.component'
import PostOpenlayersMap from './steps/postOpenlayersMap.component'
import PostEstateInfo from './steps/postEstateInfo.component'
import PostBuidingInfo from './steps/postBuildingInfo.component'
import PostAdditionalInfo from './steps/postAdditionalInfo.component'
import PostPrice from './steps/postPrice.component'
import PostImages from './steps/postImages.component'
import PostContact from './steps/postContact.component'
import { connect } from 'react-redux'
import {
  formNextStep,
  formPrevStep,
  getPostFormData,
  createUpdatePost,
  cleanPostForm,
} from '../../../actions/post'
import { toastr } from 'react-redux-toastr'
import { Player } from '@lottiefiles/react-lottie-player'
import successAnimation from '../../../assets/lottiefilesSources/success.json'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
import { useTranslation } from 'react-i18next'
import { baseUrl } from '../../../App'
import PropTypes from 'prop-types'

import './postForm.style.scss'

const PostForm = ({
  postForm,
  formSteps,
  formNextStep,
  formPrevStep,
  getPostFormData,
  createUpdatePost,
  cleanPostForm,
  loading,
  match,
}) => {
  const history = useHistory()

  const [t] = useTranslation()

  const { currentStep, totalSteps } = formSteps

  const [images, setImages] = useState([])

  useEffect(() => {
    if (match.params.id) {
      getPostFormData(match.params.id, setImages)
    }
    // eslint-disable-next-line
  }, [])

  // Scroll to top when step has changed
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  useEffect(() => {
    return () => {
      cleanPostForm()
    }
  }, [cleanPostForm])

  const submitForm = async () => {
    try {
      const result = await createUpdatePost(postForm)

      if (result) {
        const toastrOptions = {
          timeOut: 0,
          icon: (
            <Player
              autoplay
              loop={false}
              src={successAnimation}
              style={{ height: '70px', width: '70px' }}
            />
          ),
          status: 'info',
        }
        toastr.light(
          t('createPost.success'),
          t(`createPost.${postForm._id ? 'postIsUpdated' : 'postIsPublished'}`),
          toastrOptions
        )
        history.push(`${baseUrl}/`)
      }
    } catch (error) {
      console.log(error)
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
        return <PostOpenlayersMap />
      case 2:
        return <PostEstateInfo />
      case 3:
        return <PostBuidingInfo />
      case 4:
        return <PostAdditionalInfo />
      case 5:
        return <PostImages images={images} setImages={setImages} />
      case 6:
        return <PostPrice />
      case 7:
        return <PostContact />
      case 0:
      default:
        return <PostGeneralInfo />
    }
  }

  return (
    <div className="post-form-container px-2 light-border">
      <ProgressBar />
      <div className="helpers-button-box">
        <div className="tooltip">
          <div className="clean light-border" onClick={cleanPostForm}>
            <i className="fas fa-broom"></i>
          </div>
          <div className="tooltip-text tooltip-text-bottom">
            {t('createPost.clean')}
          </div>
        </div>
      </div>
      <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
        {renderSwitch()}
        <div className="form-button-box">
          {/* Back */}
          <button
            className="btn btn-secondary"
            onClick={(e) => stepChange(e)}
            style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
          >
            {t('createPost.back')}
            <Ripple />
          </button>

          {/* Next / Submit */}
          {currentStep === totalSteps ? (
            <button
              type="button"
              onClick={submitForm}
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
              onClick={(e) => stepChange(e, true)}
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
  getPostFormData: PropTypes.func.isRequired,
  createUpdatePost: PropTypes.func.isRequired,
  formNextStep: PropTypes.func.isRequired,
  formPrevStep: PropTypes.func.isRequired,
  cleanPostForm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  postForm: state.post.postForm,
  formSteps: state.post.formSteps,
  loading: state.async.loading,
})

export default connect(mapStateToProps, {
  formNextStep,
  formPrevStep,
  getPostFormData,
  createUpdatePost,
  cleanPostForm,
})(PostForm)
