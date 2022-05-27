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
  priceMin: string;
  priceMax: string;
  sqmMin: string;
  sqmMax: string;
  livingRoomsSqmMin: string;
  livingRoomsSqmMax: string;
  kitchenSqmMin: string;
  kitchenSqmMax: string;
  rooms: string;
}

type StringQueryParams = Record<keyof QueryParams, string>;

const Posts: CustomNextPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(AppContext);
  const { posts, filters } = state.posts;

  const router = useRouter();

  const [isInit, setIsInit] = useState<boolean>(false);

  const setFiltersFromURL = useCallback(
    async (query: StringQueryParams) => {
      const { slug, ...urlParams } = query;
      const routeName = slug[0];
      const dealTypeString = slug[1];

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setIsInit(false);

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
          priceMin: Number(urlParams.priceMin ?? 0),
          priceMax: Number(urlParams.priceMax ?? 0),
          sqmMin: Number(urlParams.sqmMin ?? 0),
          sqmMax: Number(urlParams.sqmMax ?? 0),
          livingRoomsSqmMin: Number(urlParams.livingRoomsSqmMin ?? 0),
          livingRoomsSqmMax: Number(urlParams.livingRoomsSqmMax ?? 0),
          kitchenSqmMin: Number(urlParams.kitchenSqmMin ?? 0),
          kitchenSqmMax: Number(urlParams.kitchenSqmMax ?? 0),
          rooms: urlParams.rooms
            ? urlParams.rooms.split(',').map((e) => {
                return Number(e);
              })
            : [],
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
    const query = router.query as StringQueryParams;
    setFiltersFromURL(query);
  }, [router.query, setFiltersFromURL]);

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
    setIsInit(false);
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
