import React, { FC, useState } from 'react';
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
import FavoriteButton from './postButtons/favoriteButton';
import StyledCarousel from './StyledCarousel';
import { Post } from '../types';
import useWindowSize from '../utils/hooks/useWindowSize';
import getSettlementPresentation from '../utils/getSettlementPresentation';

const PostItem: FC<{ post: Post }> = ({ post }) => {
  const [elevation, setElevation] = useState<number>(0);

  const { t } = useTranslation();

  const router = useRouter();
  const locale =
    router.defaultLocale !== router.locale ? `/${router.locale}` : '';

  const theme = useTheme();
  const { width } = useWindowSize();

  const onMouseOver = () => {
    return setElevation(width && width > 600 ? 6 : 0);
  };

  const onMouseOut = () => {
    return setElevation(0);
  };

  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'AZN',
    maximumFractionDigits: 0,
    currencyDisplay: 'narrowSymbol',
  });

  const openPost = () => {
    window.open(`${locale}/posts/${post._id}`, '_blank');
  };

  const actionAreaOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <Card
      onClick={openPost}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      elevation={elevation}
      sx={{
        borderRadius: '20px',
        my: { xs: 2, md: 3 },
        p: { xs: 0, md: 3 },
        cursor: 'pointer',
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
              imageSize={320}
              thumbSize={150}
              height={'320px'}
              onClickItem={openPost}
            />
            <Hidden mdUp>
              <CardActions
                sx={{
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                }}
              >
                <FavoriteButton postId={post._id} />
              </CardActions>
            </Hidden>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
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
              <Typography variant="h5">
                {post.subdistrict
                  ? getSettlementPresentation(post.subdistrict)
                  : getSettlementPresentation(post.district)}
              </Typography>
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
          md={1}
          onClick={(e) => {
            return e.stopPropagation();
          }}
        >
          <Hidden mdDown>
            <CardActions>
              <FavoriteButton postId={post._id} />
            </CardActions>
          </Hidden>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostItem;
