import React from 'react'
import SkeletonLine from '../skeletonLine.component'

const SkeletonAvatar = () => {
  return (
    <div className="user-profile py-1">
      <div className="user-avatar-wrapper">
        <div className="skeleton-image">
          <i className="fas fa-user fa-3x"></i>
          <SkeletonLine />
        </div>
      </div>
      <div className="user-info ml-05">
        <div className="skeleton-content">
          <div className="mb-05">
            <SkeletonLine />
          </div>
          <div className="mb-05">
            <SkeletonLine />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonAvatar
