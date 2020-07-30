import React, { useState, useRef } from 'react'
import useIsMount from '../../../utils/hooks/useIsMount'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import PostItem from '../../posts/postItem/postItem.component'
import PostItemSkeleton from '../../posts/postItemSkeleton/postItemSkeleton.component'
import ArrowButton from '../../layout/arrowButtons/arrowButton.component'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import uuid from 'uuid'

const SwipeBlock = () => {
  const swipeBlockRef = useRef(null)
  const [list, setList] = useState([
    <PostItemSkeleton key={uuid.v4()} />,
    <PostItemSkeleton key={uuid.v4()} />,
    <PostItemSkeleton key={uuid.v4()} />
  ])

  const onLeftArrowClick = () => {
    if (swipeBlockRef) swipeBlockRef.current.handleArrowClick()
  }

  const onRightArrowClick = () => {
    if (swipeBlockRef) swipeBlockRef.current.handleArrowClickRight()
  }

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts/?limit=20&page=1')
      setList(
        res.data.result.map(post => <PostItem key={post._id} post={post} />)
      )
    } catch (error) {
      console.log(error)
    }
  }

  let isMounted = useIsMount()
  if (isMounted) {
    getPosts()
  }

  const [t] = useTranslation()

  return (
    <div>
      <div className="swipe-block-header">
        <h2>{t('landing.newListings')}</h2>
        <div className="arrows-block">
          <ArrowButton
            type={'left'}
            onClick={onLeftArrowClick}
            classNameWrapper="arrow-wrapper"
            classNameButton="arrow-btn"
          />
          <ArrowButton
            type={'right'}
            onClick={onRightArrowClick}
            classNameWrapper="arrow-wrapper"
            classNameButton="arrow-btn"
          />
        </div>
      </div>
      <ScrollMenu
        ref={swipeBlockRef}
        data={list}
        alignCenter={false}
        dragging={false}
        wheel={false}
        hideArrows={true}
        scrollBy={1}
        innerWrapperClass={'swipe-block-wrapper'}
        itemClass={'swipe-block-item'}
      />
    </div>
  )
}

export default SwipeBlock
