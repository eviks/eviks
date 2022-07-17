import React, { FC, useContext } from 'react';
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
import { useTheme } from '@mui/material/styles';
import { AppContext } from '../store/appContext';
import FavoriteButton from './postButtons/FavoriteButton';
import EditPostButton from './postButtons/EditPostButton';
import DeletePostButton from './postButtons/DeletePostButton';
import StyledCarousel from './layout/StyledCarousel';
import MetroIcon from './icons/MetroIcon';
import { Post } from '../types';
import useWindowSize from '../utils/hooks/useWindowSize';
import {
  getSettlementPresentation,
  getMetroPresentation,
  formatter,
} from '../utils';

const PostItem: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  const {
    state: {
      auth: { user, isInit },
    },
  } = useContext(AppContext);

  const router = useRouter();
  const locale =
    router.defaultLocale !== router.locale ? `/${router.locale}` : '';

  const theme = useTheme();
  const { width } = useWindowSize();

  const openPost = () => {
    window.open(`${locale}/posts/${post._id}`, '_blank');
  };

  const actionAreaOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const height = width && width >= 900 ? '320px' : '250px';

  return (
    <Card
      onClick={openPost}
      elevation={theme.palette.mode === 'light' ? 0 : 1}
      sx={{
        borderRadius: '20px',
        my: { xs: 2, md: 3 },
        p: { xs: 0, md: 3 },
        cursor: 'pointer',
        ':hover': {
          boxShadow:
            theme.palette.mode === 'light'
              ? 10
              : '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
          backgroundImage:
            theme.palette.mode === 'light'
              ? null
              : 'linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))',
        },
      }}
    >
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
          md={5}
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
              imageSize={640}
              thumbSize={150}
              height={height}
              onClickItem={openPost}
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <EditPostButton postId={post._id} />
                      <DeletePostButton postId={post._id} />
                    </Box>
                  ) : (
                    <FavoriteButton postId={post._id} />
                  ))}
              </CardActions>
            </Hidden>
          </Box>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <CardActionArea
            href={`${locale}/posts/${post._id}`}
            target={'_blank'}
            onClick={actionAreaOnClick}
            disableRipple={true}
            disableTouchRipple={true}
            sx={{
              height: '100%',
              width: '100%',
              '&:hover .MuiCardActionArea-focusHighlight': {
                opacity: 0,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                }}
              >
                {t(`common:postTitle.${post.estateType}`, {
                  rooms: post.rooms,
                  sqm: post.sqm,
                  floor: post.floor,
                  totalFloors: post.totalFloors,
                  lotSqm: post.lotSqm,
                })}
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
                  }}
                >
                  {post.description}
                </Typography>
              </Hidden>
            </CardContent>
          </CardActionArea>
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <EditPostButton postId={post._id} />
                    <DeletePostButton postId={post._id} />
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
