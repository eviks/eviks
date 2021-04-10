import React from 'react'
import SkeletonLine from '../skeletonLine.component'

import './skeletonPostItem.style.scss'

const PostItemSkeleton = () => {
  return (
    <div className="card">
      <div className="skeleton-images">
        <div className="skeleton-image px-1 py-1">
          <i className="fas fa-home fa-5x"></i>
          <SkeletonLine />
        </div>
      </div>
      <div className="skeleton-content">
        <div className="mb-05">
          <SkeletonLine />
        </div>
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
