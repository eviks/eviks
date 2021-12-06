import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../postItem/postItem.component';
import {
  getPosts,
  setSrearchFiltersFromURL,
  removeAllFilters,
  cleanPosts,
} from '../../../actions/post';
import { setCurrentLocality } from '../../../actions/locality';
import Searchbar from './searchbar/searchbar.component';
import SearchbarSmall from './searchbar/searchbarSmall.component';
import Pagination from '../../layout/pagination/pagination.component';
import SkeletonPostList from '../../layout/skeleton/skeletonPostList/skeletonPostList.component';
import { SvgSearch } from '../../layout/icons';
import useWindowDimensions from '../../../services/hooks/useWindowDimensions';
import { getURLParams } from '../../../services/util';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PropTypes from 'prop-types';

import './posts.style.scss';

const Posts = ({
  posts,
  currentLocality,
  getPosts,
  setSrearchFiltersFromURL,
  removeAllFilters,
  cleanPosts,
  setCurrentLocality,
  loading,
  loadingElements,
  navRef,
}) => {
  const { result, pagination } = posts;

  const [initialLoading, setInitialLoading] = useState(true);
  const [smallWidth, setSmallWidth] = useState(true);

  const history = useHistory();

  const { width } = useWindowDimensions();
  if (width <= 768 && !smallWidth) setSmallWidth(true);
  if (width > 768 && smallWidth) setSmallWidth(false);

  useEffect(() => {
    return () => {
      cleanPosts();
      removeAllFilters();
    };
  }, [cleanPosts, removeAllFilters]);

  useEffect(() => {
    const fetchData = async () => {
      const path = history.location.pathname;
      const pathArray = path.split('/');

      try {
        const result = await axios.get(
          `/api/localities?routeName=${pathArray[2]}`,
        );

        // City ID & deal type are required
        let searchParams = {
          cityId:
            result.data.length > 0
              ? result.data[0].id
              : currentLocality.city.id,
          dealType: pathArray[3],
        };

        // Other filters
        const query = history.location.search;
        if (query) {
          searchParams = {
            ...searchParams,
            ...Object.fromEntries(getURLParams(query)),
          };
        }

        // Update state
        setSrearchFiltersFromURL(searchParams);
        getPosts(searchParams);

        // Update current locality if needed
        if (
          result.data.length > 0 &&
          result.data[0].id !== currentLocality.city.id
        ) {
          setCurrentLocality({
            nextQuestionDate: new Date(Date.now() + 86400000 * 365),
            city: result.data[0],
          });
        }

        // Set initial loading to false
        if (initialLoading) setInitialLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // eslint-disable-next-line
  }, [history.location.search, history.location.pathname]);

  const handlePaginationOnClick = (page) => {
    // getPosts({ ...filters, page }, history)
  };

  const [t] = useTranslation();

  return (
    <Fragment>
      {width > 768 ? <Searchbar navRef={navRef} /> : <SearchbarSmall />}
      {!loading && !initialLoading && result.length === 0 ? (
        <div className="container container-center">
          <div className="no-results-img" />
          <span className="lead text-secondary">
            {t('postList.noResults')} <SvgSearch />
          </span>
        </div>
      ) : (
        <Fragment>
          <div className="cards-container my-2 mx-2">
            {(loading && loadingElements.includes('POST_LIST')) ||
            initialLoading ? (
              <SkeletonPostList />
            ) : (
              result.map((post) => <PostItem key={post._id} post={post} />)
            )}
          </div>
          <Pagination
            pagination={pagination}
            onClick={handlePaginationOnClick}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  currentLocality: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  setSrearchFiltersFromURL: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  cleanPosts: PropTypes.func.isRequired,
  setCurrentLocality: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingElements: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  currentLocality: state.locality.currentLocality,
  loading: state.async.loading,
  loadingElements: state.async.loadingElements,
});

export default connect(mapStateToProps, {
  getPosts,
  setSrearchFiltersFromURL,
  removeAllFilters,
  cleanPosts,
  setCurrentLocality,
})(Posts);
