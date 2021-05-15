import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import LikeButton from '../../buttons/likeButton/likeButton.component'
import EditButton from '../../buttons/editButton/editButton.component'
import DeleteButton from '../../buttons/deleteButton/deleteButton.component'
import { SvgMapMarker } from '../../../layout/icons'
import Moment from 'react-moment'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './postHead.style.scss'

const PostHead = ({
  auth,
  post: { _id, city, dealType, estateType, date, address, rooms, sqm, user },
}) => {
  const [t] = useTranslation()

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="my-1">
      <h1>
        {t(`post.title.${estateType}${capitalizeFirstLetter(dealType)}`, {
          rooms,
          sqm,
        })}
      </h1>
      <div>
        <SvgMapMarker /> {`${city.name}, ${address}`}
      </div>
      <div className="post-head-pannel">
        <div className="text-secondary">
          <Moment locale="ru" format="DD MMMM YYYY">
            {date}
          </Moment>
        </div>
        <div className="post-head-btn-container">
          {auth.user && auth.user._id === user ? (
            <Fragment>
              <EditButton postId={_id} lg={true} />
              <DeleteButton postId={_id} lg={true} />
            </Fragment>
          ) : (
            <LikeButton postId={_id} lg={true} />
          )}
        </div>
      </div>
    </div>
  )
}

PostHead.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PostHead)
