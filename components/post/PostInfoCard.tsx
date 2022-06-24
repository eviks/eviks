import React, { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteButton from '../postButtons/favoriteButton';
import { formatter, getSettlementPresentation } from '../../utils';
import { Post, EstateType } from '../../types';

const PostInfoCard: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const getTitle = () => {
    switch (post.estateType) {
      case EstateType.apartment:
        return t('post:apartmentRooms', { rooms: post.rooms });
      case EstateType.house:
        return t('post:houseRooms', { rooms: post.rooms });

      default:
        return '';
    }
  };

  return (
    <Card
      variant="elevation"
      elevation={0}
      sx={{ mx: 2, position: 'sticky', top: 85 }}
    >
      <CardContent>
        <Box sx={{ pb: 2 }}>
          <FavoriteButton postId={post._id} />
        </Box>
        <Box sx={{ pb: 2 }}>
          <Typography variant="h5">{`${post.sqm} ${t(
            'post:m2',
          )}, ${getTitle()}`}</Typography>
          <Typography variant="h4" fontWeight={700}>
            {formatter.format(post.price)}
          </Typography>

          <Typography variant="h5">
            {post.subdistrict
              ? getSettlementPresentation(post.subdistrict, router.locale)
              : getSettlementPresentation(post.district, router.locale)}
          </Typography>

          <Typography
            variant="subtitle1"
            fontSize={16}
            color={(theme) => {
              return theme.palette.text.secondary;
            }}
          >
            {t('post:priceForM2', {
              price: formatter.format(post.price / post.sqm),
            })}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ pt: 2 }}>
          <Typography variant="subtitle1" fontWeight={500}>
            {t(`post:${post.userType}`)}
          </Typography>
          <Typography variant="subtitle1">{post.username}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth sx={{ py: 1.2 }}>
          {t('post:showPhoneNumber')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostInfoCard;
