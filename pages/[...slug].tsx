import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import type { ParsedUrlQuery } from 'querystring';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import PostItem from '../components/PostItem';
import { AppContext } from '../store/appContext';
import {
  fetchPosts,
  getPostsQuery,
  pushToNewPostsRoute,
  setFilters,
} from '../actions/posts';
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
  MetroStation,
  Settlement,
  QueryParams,
} from '../types';

type StringQueryParams = Record<keyof QueryParams, string>;

const Posts: CustomNextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(AppContext);
  const { posts, filters } = state.posts;

  const [isInit, setIsInit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

        const city = cityResponse.data[0];

        let metroStations: MetroStation[] = [];

        if (urlParams.metroStationId) {
          metroStations = urlParams.metroStationId
            .split(',')
            .map((id) => {
              return city.metroStations?.find((element) => {
                return element._id === Number(id);
              });
            })
            .filter((element) => {
              return element !== undefined;
            }) as Array<MetroStation>;
        }

        setFilters({
          ...defaultPostFilters,
          city,
          districts,
          subdistricts,
          metroStations,
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
          lotSqmMin: Number(urlParams.lotSqmMin ?? 0),
          lotSqmMax: Number(urlParams.lotSqmMax ?? 0),
          livingRoomsSqmMin: Number(urlParams.livingRoomsSqmMin ?? 0),
          livingRoomsSqmMax: Number(urlParams.livingRoomsSqmMax ?? 0),
          kitchenSqmMin: Number(urlParams.kitchenSqmMin ?? 0),
          kitchenSqmMax: Number(urlParams.kitchenSqmMax ?? 0),
          rooms: urlParams.rooms
            ? urlParams.rooms.split(',').map((e) => {
                return Number(e);
              })
            : [],
          floorMin: Number(urlParams.floorMin ?? 0),
          floorMax: Number(urlParams.floorMax ?? 0),
          totalFloorsMin: Number(urlParams.totalFloorsMin ?? 0),
          totalFloorsMax: Number(urlParams.totalFloorsMax ?? 0),
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

      setIsInit(true);
    },
    [dispatch, enqueueSnackbar, t],
  );

  useEffect(() => {
    setFiltersFromURL(router.query);
  }, [router.query, setFiltersFromURL]);

  const getPosts = useCallback(async () => {
    if (!isInit) return;

    setIsInit(false);
    setIsLoading(true);

    const query = getPostsQuery(filters, true);
    query.cityId = filters.city.id;
    query.estateType = filters.estateType;
    query.dealType = filters.dealType;

    try {
      await fetchPosts(query)(dispatch);
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
  }, [dispatch, enqueueSnackbar, filters, isInit, t]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    pushToNewPostsRoute({
      ...filters,
      pagination: {
        current: page,
      },
    });
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress color="primary" size="2rem" />
      </Box>
    );

  return (
    <Container
      sx={{
        mt:
          filters.districts.length > 0 ||
          filters.subdistricts.length > 0 ||
          filters.metroStations.length > 0
            ? 12
            : 5,
        mb: 10,
      }}
    >
      {posts.length > 0 ? (
        <Fragment>
          {posts.map((post) => {
            return <PostItem key={post._id} post={post} />;
          })}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              page={filters.pagination.current}
              count={filters.pagination.available ?? filters.pagination.current}
              onChange={handlePageChange}
              size="large"
              color="primary"
            />
          </Box>
        </Fragment>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Image
            src={'/illustrations/no_result.svg'}
            alt="auth"
            width={500}
            height={500}
          />
          <Typography variant="h4" textAlign={'center'}>
            {t('posts:noResult')}
          </Typography>
          <Typography variant="subtitle1" textAlign={'center'}>
            {t('posts:noResultHint')}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

Posts.displayBottomNavigationBar = true;
Posts.displaySearchBar = true;

export default Posts;
