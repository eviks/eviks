import React, { Fragment, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies, destroyCookie } from 'nookies';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import PostItem from '../components/PostItem';
import { AppContext } from '../store/appContext';
import {
  fetchPostsOnServer,
  getAlternativePostQuery,
  setAlternativeFilters,
  setPosts,
  clearPosts,
} from '../actions/posts';
import { loadUserOnServer } from '../actions/auth';
import {
  CustomNextPage,
  AlternativePostFilters,
  PostsWithPagination,
} from '../types';

interface QueryParams {
  page: string;
}
type StringQueryParams = Record<keyof QueryParams, string>;

interface FavoritesProps {
  alternativeFilters: AlternativePostFilters;
  postsWithPagination: PostsWithPagination;
}

const Favorites: CustomNextPage<FavoritesProps> = ({
  alternativeFilters,
  postsWithPagination,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { result: posts, pagination } = postsWithPagination;

  const {
    state: { auth },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    if (!auth.user && auth.isInit) router.push({ pathname: '/', query: {} });
  }, [auth.isInit, auth.user, router]);

  useEffect(() => {
    setAlternativeFilters(alternativeFilters)(dispatch);
    setPosts(postsWithPagination)(dispatch);
    return () => {
      clearPosts()(dispatch);
    };
  }, [alternativeFilters, dispatch, postsWithPagination]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    router.push(
      {
        pathname: `/favorites`,
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

  return (
    <Fragment>
      <Head>
        <title>{t(`common:projectTitle`)}</title>
      </Head>
      <Container
        sx={{
          mt: 12,
          mb: 10,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h1" fontSize={34} fontWeight={700}>
            {t('favorites:favorites')}
          </Typography>
        </Box>
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
            }}
          >
            <Image
              src={'/illustrations/favorites.svg'}
              alt="favorites"
              width={500}
              height={500}
            />
            <Typography variant="h4" textAlign={'center'}>
              {t('favorites:favoritesTitle')}
            </Typography>
            <Typography variant="subtitle1" textAlign={'center'}>
              {t('favorites:favoritesHint')}
            </Typography>
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const user = await loadUserOnServer(token);
  if (!user) {
    destroyCookie(context, 'token', {
      path: '/',
    });
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const { ...otherParams } = context.query;
  const urlParams = otherParams as StringQueryParams;

  const getFavoritePostsId = () => {
    let ids: string[] = [];
    const favorites = user?.favorites;
    if (favorites)
      ids = Object.keys(favorites).filter((key) => {
        return favorites[key] ?? false;
      });
    return ids;
  };

  const alternativeFilters = {
    ids: getFavoritePostsId(),
    pagination: {
      current: urlParams.page ? Number(urlParams.page) : 1,
    },
  };

  const query = getAlternativePostQuery(alternativeFilters);

  let postsWithPagination: PostsWithPagination = {
    result: [],
    pagination: { current: 1 },
  };

  if ((alternativeFilters.ids?.length ?? 0) > 0) {
    postsWithPagination = await fetchPostsOnServer(query);
  }

  return {
    props: { alternativeFilters, postsWithPagination },
  };
};

Favorites.displayBottomNavigationBar = true;

export default Favorites;
