import React, {
  Fragment,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useContext,
} from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import StyledCarousel from '../../../components/layout/StyledCarousel';
import PostInfoCard from '../../../components/post/PostInfoCard';
import PostPrice from '../../../components/post/PostPrice';
import PostContacts from '../../../components/post/PostContacts';
import PostTitle from '../../../components/post/PostTitle';
import PostMainInfo from '../../../components/post/PostMainInfo';
import PostDescription from '../../../components/post/PostDescription';
import PostGeneralInfo from '../../../components/post/PostGeneralInfo';
import PostAdditionalInfo from '../../../components/post/PostAdditionalInfo';
import PostBuildingInfo from '../../../components/post/PostBuildingInfo';
import EditPostButton from '../../../components/postButtons/EditPostButton';
import DeletePostButton from '../../../components/postButtons/DeletePostButton';
import PostModerationPanel from '../../../components/post/PostModerationPanel';
import PostReviewStatus from '../../../components/post/PostReviewStatus';
import {
  fetchUnreviewedPost,
  fetchPostPhoneNumber,
  blockUnreviewedPostForModeration,
  unblockPostFromModeration,
} from '../../../actions/posts';
import { AppContext } from '../../../store/appContext';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import { getPostContent, getSettlementPresentation } from '../../../utils';
import Failure from '../../../utils/errors/failure';
import ServerError from '../../../utils/errors/serverError';
import { Post, EstateType } from '../../../types';

interface QueryParams {
  id: string;
}

type StringQueryParams = Record<keyof QueryParams, string>;

const UnreviewedPost: NextPage = () => {
  const { width } = useWindowSize();
  const router = useRouter();
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const { id } = router.query as StringQueryParams;

  const {
    state: {
      auth: { token, isInit, user },
    },
  } = useContext(AppContext);

  const mapHeight = width && width >= 900 ? 400 : 200;

  const getImageSize = () => {
    if (width && width >= 900) return 1280;
    if (width && width >= 600) return 640;
    return 320;
  };

  const imageSize = getImageSize();

  const PostMap = useMemo(() => {
    return dynamic(import('../../../components/post/PostMap'), {
      ssr: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapHeight]);

  const [post, setPost] = useState<Post | null>();
  const [isLoading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');

  const carouselContent = useMemo(() => {
    if (!post) return [];
    return getPostContent(post);
  }, [post]);

  const loadPost = useCallback(async () => {
    if (!isInit) return;
    if (!user) {
      // User not authenticated
      router.push('/404');
      return;
    }

    let result;

    if (user.role === 'user') {
      result = await fetchUnreviewedPost(token ?? '', id);
    } else {
      result = await blockUnreviewedPostForModeration(token ?? '', id);
    }

    if (!result) {
      // Post is not found or it's already blocked for moderation
      router.push('/404');
      return;
    }

    setPost(result);
    setLoading(false);
  }, [id, isInit, router, token, user]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  // Unblock post before leaving
  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      if (isInit && user?.role !== 'user') {
        const confirmationMessage = t('postReview:leavingAlert');

        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
      return undefined;
    };
    const beforeRouteHandler = () => {
      if (isInit && user?.role !== 'user')
        unblockPostFromModeration(token ?? '', id);
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);
    router.events.on('routeChangeStart', beforeRouteHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [id, isInit, router.events, t, token, user?.role]);

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

  if (!post) return null;

  const getPhoneNumber = async () => {
    try {
      const result = await fetchPostPhoneNumber(post._id.toString());
      setPhoneNumber(result.phoneNumber);
      window.location.href = `tel:${result.phoneNumber}`;
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
  };

  const capitalize = (value: String) => {
    return value[0].toUpperCase() + value.slice(1);
  };

  const getPostTitle = () => {
    let settlement = '';

    if (post.subdistrict) {
      settlement = getSettlementPresentation(post.subdistrict, router.locale);
    } else if (post.district) {
      settlement = getSettlementPresentation(post.district, router.locale);
    }

    return t(
      `post:fullPostTitle.${post.estateType}${capitalize(post.dealType)}${
        post.estateType === EstateType.apartment
          ? capitalize(post.apartmentType ?? '')
          : ''
      }`,
      {
        rooms: post.rooms,
        sqm: post.sqm,
        floor: post.floor,
        totalFloors: post.totalFloors,
        lotSqm: post.lotSqm,
        settlement,
      },
    );
  };

  const title = getPostTitle();

  return (
    <Fragment>
      <Head>
        <title>{`${title} | ${t('common:projectTitle')}`}</title>
      </Head>
      <Container sx={{ mt: 12, mb: 6, maxWidth: '1300px' }} maxWidth={false}>
        <Grid
          container
          alignItems="stretch"
          justifyContent="center"
          sx={{
            marginTop: {
              xs: 5,
              md: 0,
            },
          }}
        >
          <Grid item md={12} lg={8}>
            {isInit && user?.role !== 'moderator' && post.reviewStatus && (
              <PostReviewStatus
                reviewStatus={post.reviewStatus}
                reviewHistory={post.reviewHistory}
              />
            )}
            <PostTitle post={post} title={title} />
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <StyledCarousel
                content={carouselContent}
                imageSize={imageSize}
                thumbSize={150}
                height={width && width >= 900 ? '500px' : '320px'}
                external={post.isExternal}
                temp={true}
              />

              {isInit && user?._id === post.user && (
                <Hidden lgUp>
                  <Box
                    sx={{
                      position: 'absolute',
                      right: '0',
                      top: '0',
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <EditPostButton
                        postId={post._id}
                        reviewStatus={post.reviewStatus}
                        unreviewed={true}
                      />
                      <DeletePostButton
                        postId={post._id}
                        reviewStatus={post.reviewStatus}
                        unreviewed={true}
                      />
                    </Box>
                  </Box>
                </Hidden>
              )}
            </Box>
            <Hidden lgUp>
              <PostPrice post={post} />
            </Hidden>
            <PostMainInfo post={post} />
            <Hidden lgUp>
              <PostContacts
                post={post}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </Hidden>
            <PostDescription post={post} />
            <PostGeneralInfo post={post} />
            <PostAdditionalInfo post={post} />
            <PostBuildingInfo post={post} />
            <PostMap post={post} height={mapHeight} />(
            {isInit && user?.role === 'moderator' ? (
              <Hidden lgUp>
                <Box
                  sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    zIndex: 1000,
                    mb: 2,
                    px: 2,
                    width: '100%',
                  }}
                >
                  <Box sx={{ mt: 2 }}>
                    <PostModerationPanel postId={post._id} />
                  </Box>
                </Box>
              </Hidden>
            ) : (
              <Hidden mdUp>
                <Box
                  sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    zIndex: 1000,
                    mb: 2,
                    px: 2,
                    width: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    disableElevation
                    onClick={getPhoneNumber}
                    sx={{ py: 1.2 }}
                  >
                    {t('post:call')}
                  </Button>
                </Box>
              </Hidden>
            )}
          </Grid>
          <Hidden lgDown>
            <Grid item md={0} lg={4}>
              <Box sx={{ position: 'sticky', top: 85, mx: 2 }}>
                <PostInfoCard
                  post={post}
                  unreviewed={true}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
                {isInit && user?.role === 'moderator' && (
                  <Box sx={{ mt: 2 }}>
                    <PostModerationPanel postId={post._id} />
                  </Box>
                )}
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default UnreviewedPost;
