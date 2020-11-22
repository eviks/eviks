import React from 'react'
import SkeletonLine from '../skeletonLine.component'

import './skeletonPost.style.scss'

const SkeletonPost = () => {
  return (
    <div className="post-wrapper">
      <div className="post-container shadow-border">
        <div className="my-1 px-2">
          <SkeletonLine />
        </div>
        <div className="my-1 px-2">
          <SkeletonLine />
        </div>
        <div style={{ position: 'relative', height: '50vh' }}>
          <div className="skeleton-image px-2">
            <i className="fas fa-home fa-5x"></i>
            <SkeletonLine />
          </div>
        </div>
        <div className="my-1 px-2">
          <SkeletonLine />
        </div>
      </div>
      <div className="side-card shadow-border">
        <div className="my-1" style={{ position: 'relative', width: '100%' }}>
          <SkeletonLine />
        </div>
        <div style={{ position: 'relative', width: '100%' }}>
          <SkeletonLine />
        </div>
      </div>
    </div>
  )
}

export default SkeletonPost
