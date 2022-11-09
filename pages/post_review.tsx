import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import type { ParsedUrlQuery } from 'querystring';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PostsTable from '../components/postReview/PostsTable';
import {
  fetchUnreviewedPosts,
  getAlternativePostQuery,
  setAlternativeFilters,
  clearPosts,
} from '../actions/posts';
import { AppContext } from '../store/appContext';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import { QueryParams } from '../types';

type StringQueryParams = Record<keyof QueryParams, string>;

const PostReview: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: {
      auth: { isInit, user, token },
      posts: { alternativeFilters },
    },
    dispatch,
  } = useContext(AppContext);

  const [filtersAreInited, setFiltersAreInited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [queryString, setQueryString] = useState<string>('');

  useEffect(() => {
    if (isInit && (!user || user.role === 'user'))
      router.push({ pathname: '/', query: {} });
  }, [isInit, user, router]);

  const setFiltersFromURL = useCallback(
    async (query: ParsedUrlQuery) => {
      const { slug, ...otherParams } = query;
      const urlParams = otherParams as StringQueryParams;

      if (window) window.scrollTo({ top: 0, behavior: 'smooth' });

      setFiltersAreInited(false);

      try {
        setAlternativeFilters({
          reviewStatus: 'onreview',
          pagination: {
            current: urlParams.page ? Number(urlParams.page) : 1,
          },
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

      setFiltersAreInited(true);
    },
    [dispatch, enqueueSnackbar, t],
  );

  const getPosts = useCallback(async () => {
    if (!filtersAreInited || !isInit) return;

    setFiltersAreInited(false);
    setIsLoading(true);

    const query = getAlternativePostQuery(alternativeFilters);

    try {
      await fetchUnreviewedPosts(token ?? '', query)(dispatch);
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
    setIsLoading(false);
  }, [
    alternativeFilters,
    dispatch,
    enqueueSnackbar,
    filtersAreInited,
    isInit,
    t,
    token,
  ]);

  useEffect(() => {
    const queryHasChanged = (): boolean => {
      const newQueryString = JSON.stringify(router.query);
      const result = newQueryString !== queryString;
      if (result) setQueryString(newQueryString);
      return result;
    };

    if (queryHasChanged()) {
      setFiltersFromURL(router.query);
    }
  }, [queryString, router.query, setFiltersFromURL]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    return () => {
      clearPosts()(dispatch);
    };
  }, [dispatch]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    router.push(
      {
        pathname: `/post_review`,
        query: getAlternativePostQuery({
          ...alternativeFilters,
          pagination: {
            current: page,
          },
        }),
      },
      undefined,
    );
  };

  if (isLoading) {
    return (
      <Fragment>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress color="primary" size="2rem" />
        </Container>
      </Fragment>
    );
  }

  return (
    <Container
      sx={{
        mt: 12,
        mb: 10,
      }}
    >
      <PostsTable />
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          page={alternativeFilters.pagination.current}
          count={
            alternativeFilters.pagination.available ??
            alternativeFilters.pagination.current
          }
          onChange={handlePageChange}
          size="large"
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default PostReview;
