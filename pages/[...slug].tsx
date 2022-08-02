import React, { Fragment, useEffect, useContext } from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { GetServerSideProps } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import PostItem from '../components/PostItem';
import { AppContext } from '../store/appContext';
import {
  fetchPostsOnServer,
  getPostsQuery,
  pushToNewPostsRoute,
  setFilters,
  setPosts,
  clearPosts,
} from '../actions/posts';
import { getLocalitiesOnServer } from '../actions/localities';
import { enumFromStringValue } from '../utils';
import { defaultPostFilters } from '../utils/defaultValues';
import {
  ApartmentType,
  CustomNextPage,
  DealType,
  EstateType,
  MetroStation,
  Settlement,
  QueryParams,
  PostFilters,
  PostsWithPagination,
} from '../types';

type StringQueryParams = Record<keyof QueryParams, string>;

interface PostsProps {
  filters: PostFilters;
  postsWithPagination: PostsWithPagination;
}

const Posts: CustomNextPage<PostsProps> = ({
  filters,
  postsWithPagination,
}) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(AppContext);

  const { result: posts, pagination } = postsWithPagination;

  useEffect(() => {
    setFilters(filters)(dispatch);
    setPosts(postsWithPagination)(dispatch);
    return () => {
      clearPosts()(dispatch);
    };
  }, [dispatch, filters, postsWithPagination]);

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
              page={pagination.current}
              count={pagination.available ?? pagination.current}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug, ...otherParams } = context.query;
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
    [cityString, districtString, estateTypeString, dealTypeString] = mainParams;
  } else if (mainParams.length === 5) {
    [
      cityString,
      districtString,
      subdistrictString,
      estateTypeString,
      dealTypeString,
    ] = mainParams;
  }

  // Fetch city
  const cityResponse = await getLocalitiesOnServer({
    routeName: cityString,
    type: '2',
  });

  // Fetch district
  let districts: Settlement[] = [];
  if (districtString) {
    const districtResponse = await getLocalitiesOnServer({
      routeName: districtString,
      type: '8',
    });
    districts = [districtResponse.data[0]];
  } else if (urlParams.districtId) {
    const districtResponse = await getLocalitiesOnServer({
      id: urlParams.districtId,
      type: '8',
    });
    districts = districtResponse.data;
  }

  // Fetch subdistrict
  let subdistricts: Settlement[] = [];
  if (subdistrictString) {
    const subdistrictResponse = await getLocalitiesOnServer({
      routeName: subdistrictString,
      type: '32',
    });
    subdistricts = [subdistrictResponse.data[0]];
  } else if (urlParams.subdistrictId) {
    const subdistrictResponse = await getLocalitiesOnServer({
      id: urlParams.subdistrictId,
      type: '32',
    });
    subdistricts = subdistrictResponse.data;
  }

  const dealType = enumFromStringValue(DealType, dealTypeString);
  const estateType = enumFromStringValue(EstateType, estateTypeString);

  // City or deal type not found
  if (cityResponse.data.length === 0 || !dealType || !estateType) {
    // 404
    return {
      notFound: true,
    };
  }

  const city = cityResponse.data[0];

  // Metro stations
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

  const filters = {
    ...defaultPostFilters,
    city,
    districts,
    subdistricts,
    metroStations,
    dealType,
    estateType,
    apartmentType: enumFromStringValue(ApartmentType, urlParams.apartmentType),
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
  };

  const query = getPostsQuery(filters, true);
  query.cityId = filters.city.id;
  query.estateType = filters.estateType;
  query.dealType = filters.dealType;

  const postsWithPagination = await fetchPostsOnServer(query);

  return {
    props: {
      filters,
      postsWithPagination,
    },
  };
};

Posts.displayBottomNavigationBar = true;
Posts.displaySearchBar = true;

export default Posts;
