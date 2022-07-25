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
  getAlternativePostQuery,
  setAlternativeFilters,
  clearPosts,
} from '../actions/posts';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import { CustomNextPage, User } from '../types';

interface QueryParams {
  page: string;
}
type StringQueryParams = Record<keyof QueryParams, string>;

const Favorites: CustomNextPage<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(AppContext);
  const {
    posts: { posts, alternativeFilters },
    auth,
  } = state;

  const [isInit, setIsInit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth.user && auth.isInit) router.push({ pathname: '/', query: {} });
  }, [auth.isInit, auth.user, router]);

  const setFiltersFromURL = useCallback(
    async (query: ParsedUrlQuery) => {
      const { ...otherParams } = query;
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

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setIsInit(false);

      try {
        setAlternativeFilters({
          ids: getFavoritePostsId(),
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

    [dispatch, enqueueSnackbar, t, user?.favorites],
  );

  useEffect(() => {
    setFiltersFromURL(router.query);
    return () => {
      clearPosts()(dispatch);
    };
  }, [dispatch, router.query, setFiltersFromURL]);

  const getPosts = useCallback(async () => {
    if (!isInit) return;

    setIsInit(false);
    setIsLoading(true);

    const query = getAlternativePostQuery(alternativeFilters);

    if ((alternativeFilters.ids?.length ?? 0) > 0) {
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
    }

    setIsLoading(false);
  }, [dispatch, enqueueSnackbar, alternativeFilters, isInit, t]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
      { shallow: true },
    );
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
  );
};

Favorites.displayBottomNavigationBar = true;

export default Favorites;
