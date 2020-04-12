import React from 'react'
import SkeletonLine from '../../layout/skeleton/skeletonLine.component'

import './postItemSkeleton.style.scss'

const PostItemSkeleton = () => {
  return (
    <div className="card">
      <div className="card-photos">
        <div className="skeleton-image">
          <i className="fas fa-home fa-5x"></i>
          <SkeletonLine />
        </div>
      </div>
      <div className="skeleton-content">
        <div className="mb-05">
          <SkeletonLine />
        </div>
        <div className="mb-1">
          <SkeletonLine />
        </div>
      </div>
    </div>
  )
}

export default PostItemSkeleton
