import React, { useState, useRef } from 'react';
import useIsMount from '../../../services/hooks/useIsMount';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import PostItem from '../../posts/postItem/postItem.component';
import SkeletonPostItem from '../../layout/skeleton/skeletonPostItem/skeletonPostItem.component';
import ArrowButton from '../../layout/arrowButtons/arrowButton.component';
import { SvgArrowLeft, SvgArrowRight } from '../../layout/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import uuid from 'uuid';

import './swipeBlock.style.scss';

const SwipeBlock = () => {
  const swipeBlockRef = useRef(null);
  const [list, setList] = useState([
    <SkeletonPostItem key={uuid.v4()} />,
    <SkeletonPostItem key={uuid.v4()} />,
    <SkeletonPostItem key={uuid.v4()} />,
  ]);

  const onLeftArrowClick = () => {
    if (swipeBlockRef) swipeBlockRef.current.handleArrowClick();
  };

  const onRightArrowClick = () => {
    if (swipeBlockRef) swipeBlockRef.current.handleArrowClickRight();
  };

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts/?limit=20&page=1');
      setList(
        res.data.result.map((post) => <PostItem key={post._id} post={post} />),
      );
    } catch (error) {
      console.log(error);
    }
  };

  let isMounted = useIsMount();
  if (isMounted) {
    getPosts();
  }

  const [t] = useTranslation();

  return (
    <div>
      <div className="swipe-block-header">
        <h4 className="lead px-05">{t('landing.newListings')}</h4>
        <div className="arrows-block">
          <ArrowButton
            icon={SvgArrowLeft}
            onClick={onLeftArrowClick}
            classNameWrapper="arrow-wrapper"
            classNameButton="arrow-btn"
          />
          <ArrowButton
            icon={SvgArrowRight}
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
  );
};

export default SwipeBlock;
