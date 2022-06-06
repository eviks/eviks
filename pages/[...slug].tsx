import React, { useState, useEffect, useCallback, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
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
import {
  ApartmentType,
  CustomNextPage,
  DealType,
  EstateType,
  Settlement,
} from '../types';

interface QueryParams {
  districtId: string;
  subdistrictId: string;
  apartmentType: string;
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
    async (query: ParsedUrlQuery) => {
      const { slug, ...otherParams } = query;
      const mainParams = slug as string[];
      const urlParams = otherParams as StringQueryParams;

      let cityString = '';
      let estateTypeString = '';
      let dealTypeString = '';
      let districtString = '';
      let subdistrictString = '';

      if (mainParams.length === 3) {
        [cityString, estateTypeString, dealTypeString] = mainParams;
      } else if (mainParams.length === 4) {
        [cityString, districtString, estateTypeString, dealTypeString] =
          mainParams;
      } else if (mainParams.length === 5) {
        [
          cityString,
          districtString,
          subdistrictString,
          estateTypeString,
          dealTypeString,
        ] = mainParams;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setIsInit(false);

      try {
        // Fetch city
        const cityResponse = await getLocalities({
          routeName: cityString,
          type: '2',
        });

        // Fetch district
        let districts: Settlement[] = [];
        if (districtString) {
          const districtResponse = await getLocalities({
            routeName: districtString,
            type: '8',
          });
          districts = [districtResponse.data[0]];
        } else if (urlParams.districtId) {
          const districtResponse = await getLocalities({
            id: urlParams.districtId,
            type: '8',
          });
          districts = districtResponse.data;
        }

        // Fetch subdistrict
        let subdistricts: Settlement[] = [];
        if (subdistrictString) {
          const subdistrictResponse = await getLocalities({
            routeName: subdistrictString,
            type: '32',
          });
          subdistricts = [subdistrictResponse.data[0]];
        } else if (urlParams.subdistrictId) {
          const subdistrictResponse = await getLocalities({
            id: urlParams.subdistrictId,
            type: '32',
          });
          subdistricts = subdistrictResponse.data;
        }

        const dealType = enumFromStringValue(DealType, dealTypeString);
        const estateType = enumFromStringValue(EstateType, estateTypeString);

        // City or deal type not found
        if (cityResponse.data.length === 0 || !dealType || !estateType) {
          return; // 404
        }

        setFilters({
          ...defaultPostFilters,
          city: cityResponse.data[0],
          districts,
          subdistricts,
          dealType,
          estateType,
          apartmentType: enumFromStringValue(
            ApartmentType,
            urlParams.apartmentType,
          ),
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
    setFiltersFromURL(router.query);
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
