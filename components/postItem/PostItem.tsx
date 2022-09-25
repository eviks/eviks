import React, { FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import PostItemReviewStatus from './PostItemReviewStatus';
import { AppContext } from '../../store/appContext';
import { fetchPostPhoneNumber } from '../../actions/posts';
import FavoriteButton from '../postButtons/FavoriteButton';
import EditPostButton from '../postButtons/EditPostButton';
import DeletePostButton from '../postButtons/DeletePostButton';
import StyledCarousel from '../layout/StyledCarousel';
import MetroIcon from '../icons/MetroIcon';
import { EstateType, Post } from '../../types';
import useWindowSize from '../../utils/hooks/useWindowSize';
import {
  getSettlementPresentation,
  getMetroPresentation,
  formatter,
} from '../../utils';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

const PostItem: FC<{ post: Post; unreviewed: boolean }> = ({
  post,
  unreviewed,
}) => {
  const { t } = useTranslation();

  const {
    state: {
      auth: { user, isInit },
    },
  } = useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const locale =
    router.defaultLocale !== router.locale ? `/${router.locale}` : '';

  const theme = useTheme();
  const { width } = useWindowSize();

  const postsRout = unreviewed ? 'posts/unreviewed' : 'posts';

  const openPost = () => {
    window.open(`${locale}/${postsRout}/${post._id}`, '_blank');
  };

  const height = width && width >= 900 ? '280px' : '250px';
  const imageSize = width && width >= 900 ? 640 : 320;

  const [phoneNumber, setPhoneNumber] = useState('');

  const getPhoneNumber = async () => {
    try {
      const result = await fetchPostPhoneNumber(post._id.toString());
      setPhoneNumber(result.phoneNumber);
      if (width && width < 900)
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

  return (
    <Card
      onClick={openPost}
      elevation={theme.palette.mode === 'light' ? 0 : 1}
      sx={{
        borderRadius: '20px',
        my: 3,
        p: { xs: 0, md: 3 },
        cursor: 'pointer',
        ':hover':
          width && width >= 900
            ? {
                boxShadow:
                  theme.palette.mode === 'light'
                    ? 10
                    : '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
                backgroundImage:
                  theme.palette.mode === 'light'
                    ? null
                    : 'linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))',
              }
            : null,
      }}
    >
      {unreviewed && post.reviewStatus && (
        <PostItemReviewStatus reviewStatus={post.reviewStatus} />
      )}
      <Grid
        container
        sx={{
          direction: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Grid
          item
          xs={12}
          md={4.5}
          onClick={(e) => {
            return e.stopPropagation();
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <StyledCarousel
              images={post.images}
              imageSize={imageSize}
              thumbSize={150}
              height={height}
              onClickItem={openPost}
              temp={unreviewed}
            />
            <Hidden mdUp>
              <CardActions
                sx={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  py: 2,
                }}
              >
                {isInit &&
                  (user?._id === post.user ? (
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      <EditPostButton
                        postId={post._id}
                        reviewStatus={post.reviewStatus}
                        unreviewed={unreviewed}
                      />
                      <DeletePostButton
                        postId={post._id}
                        reviewStatus={post.reviewStatus}
                      />
                    </Box>
                  ) : (
                    <FavoriteButton postId={post._id} />
                  ))}
              </CardActions>
            </Hidden>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: 'relative' }}
          onClick={(e) => {
            return e.stopPropagation();
          }}
        >
          <CardActionArea
            href={`${locale}/${postsRout}/${post._id}`}
            target={'_blank'}
            disableRipple={true}
            disableTouchRipple={true}
            sx={{
              height: { xs: 'auto', md: '100%' },
              width: '100%',
              '&:hover .MuiCardActionArea-focusHighlight': {
                opacity: 0,
              },
            }}
          >
            <CardContent sx={{ px: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  gap: 1,
                  fontWeight: '400',
                  fontSize: 16,
                }}
              >
                {`${post.sqm} ${t('post:m2')}`}
                <Divider orientation="vertical" sx={{ height: 20 }} />
                {t(
                  `post:${
                    post.estateType === EstateType.apartment
                      ? 'postApartmentRoomsTitle'
                      : 'postHouseRoomsTitle'
                  }`,
                  { rooms: post.rooms },
                )}
                <Divider orientation="vertical" sx={{ height: 20 }} />
                {t(
                  `post:${
                    post.estateType === EstateType.apartment
                      ? 'postFloorTitle'
                      : 'postLotSqmTitle'
                  }`,
                  {
                    floor: post.floor,
                    totalFloors: post.totalFloors,
                    lotSqm: post.lotSqm,
                  },
                )}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                {formatter.format(post.price)}
              </Typography>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                {post.subdistrict
                  ? getSettlementPresentation(post.subdistrict, router.locale)
                  : getSettlementPresentation(post.district, router.locale)}
              </Typography>
              {post.metroStation && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <MetroIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">
                    {getMetroPresentation(post.metroStation, router.locale)}
                  </Typography>
                </Box>
              )}
              <Hidden smDown>
                <Typography color={theme.palette.grey[500]}>
                  {post.address}
                </Typography>
              </Hidden>
              <Hidden smDown>
                <Typography
                  color={theme.palette.grey[500]}
                  sx={{
                    mt: 4,
                    wordWrap: 'break-word',
                  }}
                >
                  {post.description?.slice(0, 200)}
                </Typography>
              </Hidden>
            </CardContent>
          </CardActionArea>
          {/* Get phone number */}
          <Hidden mdDown>
            <Box
              sx={{
                px: 2,
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }}
            >
              {!phoneNumber ? (
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  onClick={getPhoneNumber}
                  sx={{ py: 1.2 }}
                >
                  {t('post:showPhoneNumber')}
                </Button>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontSize={28}>{phoneNumber}</Typography>
                  <Typography
                    variant="caption"
                    color={(theme) => {
                      return theme.palette.text.secondary;
                    }}
                  >
                    {t('post:callHint')}
                  </Typography>
                </Box>
              )}
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box
              sx={{
                px: 2,
                mb: 2,
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
        </Grid>
        <Grid
          item
          xs={12}
          md={1.5}
          onClick={(e) => {
            return e.stopPropagation();
          }}
        >
          <Hidden mdDown>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              {isInit &&
                (user?._id === post.user ? (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <EditPostButton
                      postId={post._id}
                      reviewStatus={post.reviewStatus}
                      unreviewed={unreviewed}
                    />
                    <DeletePostButton
                      postId={post._id}
                      reviewStatus={post.reviewStatus}
                    />
                  </Box>
                ) : (
                  <FavoriteButton postId={post._id} />
                ))}
            </CardActions>
          </Hidden>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostItem;
