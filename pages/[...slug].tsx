import React, { useState, useEffect, useCallback, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import { useSnackbar } from 'notistack';
import PostItem from '../components/PostItem';
import { AppContext } from '../store/appContext';
import { fetchPosts, setFilters } from '../actions/posts';
import { getLocalities } from '../actions/localities';
import { enumFromStringValue } from '../utils';
import { defaultPostFilters } from '../utils/defaultValues';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import { CustomNextPage, DealType } from '../types';

interface QueryParams {
  slug: string[];
}

type StringQueryParams = Record<keyof QueryParams, string>;

const Posts: CustomNextPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(AppContext);
  const { posts, filters } = state.posts;

  const router = useRouter();
  const { slug } = router.query as StringQueryParams;

  const [isInit, setIsInit] = useState<boolean>(false);

  const setFiltersFromURL = useCallback(
    async (routeName, dealTypeString) => {
      try {
        const localityResponse = await getLocalities({ routeName, type: '2' });
        const dealType = enumFromStringValue(DealType, dealTypeString);

        // City ID & deal type are required
        if (localityResponse.data.length === 0 || !dealType) {
          return; // 404
        }

        setFilters({
          ...defaultPostFilters,
          city: localityResponse.data[0],
          dealType,
        })(dispatch);
      } catch (error) {
        let errorMessage = '';
        if (error instanceof Failure) {
          errorMessage = error.message;
        } else if (error instanceof ServerError) {
          errorMessage = t('common:serverError');
        } else {
          errorMessage = t('common:unknownError');
        }
        enqueueSnackbar(errorMessage, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }

      setIsInit(true);
    },
    [dispatch, enqueueSnackbar, t],
  );

  useEffect(() => {
    const { 0: city, 1: dealType } = slug;
    setFiltersFromURL(city, dealType);
  }, [setFiltersFromURL, slug]);

  const getPosts = useCallback(async () => {
    if (!isInit) return;

    try {
      await fetchPosts(filters)(dispatch);
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Failure) {
        errorMessage = error.message;
      } else if (error instanceof ServerError) {
        errorMessage = t('common:serverError');
      } else {
        errorMessage = t('common:unknownError');
      }
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  }, [dispatch, enqueueSnackbar, filters, isInit, t]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Container>
      {posts &&
        posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
    </Container>
  );
};

Posts.displayBottomNavigationBar = true;
Posts.displaySearchBar = true;

export default Posts;
