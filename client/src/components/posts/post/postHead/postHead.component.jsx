import React from 'react'
import Moment from 'react-moment'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const PostHead = ({
  post: { city, estateType, date, address, rooms, sqm }
}) => {
  const [t] = useTranslation()

  return (
    <div className="my-1 px-2">
      <h1>{t(`post.title.${estateType}`, { rooms, sqm })}</h1>
      <div>
        <i className="fas fa-map-marker-alt"></i> {`${city.name}, ${address}`}
      </div>
      <div className="text-secondary">
        <Moment locale="ru" format="DD MMMM YYYY">
          {date}
        </Moment>
      </div>
    </div>
  )
}

PostHead.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostHead
